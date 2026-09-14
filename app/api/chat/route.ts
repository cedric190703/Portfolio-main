import { z } from 'zod'
import { allowIngress, readChatBody } from '@/lib/chat/ingress'
import { faqs, matchFaq } from '@/lib/chat/faq'
import type { Quota } from '@/lib/chat/quota'
import { retrieve, type Source } from '@/lib/chat/knowledge'
import { configuredForInference, budget, unavailableQuota, visitor } from '@/lib/chat/limits'
import { completionTokens, freeModel, systemPrompt } from '@/lib/chat/provider'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30
const input = z.object({
  mode: z.enum(['ai', 'faq']).default('ai'),
  faqId: z.string().max(30).optional(),
  question: z.string().trim().min(2).max(800),
  language: z.enum(['en', 'fr']),
  previousQuestions: z.array(z.string().trim().max(800)).max(4).default([]),
}).strict()
const baseHeaders = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
const json = (data: unknown, status = 200, cookie?: string) => Response.json(data, { status, headers: { ...baseHeaders, ...(cookie ? { 'Set-Cookie': cookie } : {}) } })
function fallback(sources: Source[], language: 'en' | 'fr', reason: string, question: string, quota: Quota, faqId?: string) {
  const faq = faqId ? faqs(language).find(f => f.id === faqId) : matchFaq(question, language)
  return { mode: 'faq', reason, quota, answer: faq?.answer ?? (language === 'fr'
    ? 'Je n’ai pas de réponse prédéfinie à cette question. Choisissez un sujet dans « Questions classiques » ou contactez-moi directement.'
    : 'I don’t have a predefined answer to that question. Choose a topic under “Classic Q&A” or contact me directly.'),
    sources: faq ? [{id: faq.id, title: faq.question, url: faq.url, kind: 'predefined answer', text: ''}] : [],
  }
}
async function status(id: string): Promise<Quota> {
  if (!configuredForInference()) return unavailableQuota()
  try {
    const {quota} = await budget(id)
    freeModel()
    return configuredForInference() ? quota : {...quota, state: 'unavailable'}
  } catch { return unavailableQuota() }
}
export async function GET(request: Request) {
  if (!allowIngress()) return Response.json({error: 'busy'}, {status: 429, headers: {...baseHeaders, 'Retry-After': '60'}})
  if (request.headers.get('sec-fetch-site') === 'cross-site') return json({error: 'origin'}, 403)
  const {id, cookie} = visitor(request.headers.get('cookie'))
  return json({quota: await status(id)}, 200, cookie)
}
export async function POST(request: Request) {
  if (!allowIngress()) return Response.json({error: 'busy'}, {status: 429, headers: {...baseHeaders, 'Retry-After': '60'}})
  const origin = request.headers.get('origin')
  if (origin !== (process.env.CHAT_ALLOWED_ORIGIN || new URL(request.url).origin)) return json({ error: 'origin' }, 403)
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'content_type' }, 415)
  let parsed
  try { parsed = input.safeParse(await readChatBody(request)) } catch { return json({ error: 'invalid_request' }, 400) }
  if (!parsed.success) return json({ error: 'invalid_request' }, 400)
  const { question, language, previousQuestions, mode, faqId } = parsed.data
  const { id, cookie } = visitor(request.headers.get('cookie'))
  let quota = await status(id)
  const sources = mode === 'ai' && quota.state === 'available' ? retrieve(question, language, previousQuestions) : []
  const reply = (reason: string) => json(fallback(sources, language, reason, question, quota, faqId), 200, cookie)
  if (mode === 'faq') return reply('faq')
  if (quota.state !== 'available') return reply(quota.state === 'unavailable' ? 'unavailable' : 'limit')
  if (!sources.length) return reply('no_evidence')
  let model: string
  try {
    model = freeModel()
    const reservation = await budget(id, true)
    quota = reservation.quota
    if (!reservation.allowed) return reply('limit')
  } catch { quota = {...quota, state: 'unavailable'}; return reply('unavailable') }
  const abort = new AbortController()
  const signal = AbortSignal.any([request.signal, abort.signal, AbortSignal.timeout(25000)])
  let upstream: Response
  try {
    upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, stream: true, max_tokens: 550, temperature: .2,
        provider: { data_collection: 'deny', max_price: { prompt: 0, completion: 0 } },
        messages: [{ role: 'system', content: systemPrompt(language, sources) }, { role: 'user', content: JSON.stringify({ earlierQuestions: previousQuestions, currentQuestion: question }) }],
      }), signal, cache: 'no-store', redirect: 'error',
    })
    if (!upstream.ok || !upstream.body) { await upstream.body?.cancel(); return reply('unavailable') }
  } catch { return reply('unavailable') }
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`))
      let answer = ''
      try {
        send('quota', quota)
        send('sources', sources)
        for await (const token of completionTokens(upstream.body!)) { answer += token; send('token', token) }
        // Reference IDs come only from retrieved documents; ungrounded output is replaced by excerpts.
        const citations = [...answer.matchAll(/\[(\d+)\]/g)].map(m => Number(m[1]))
        if (!answer.trim() || !citations.length || citations.some(n => n < 1 || n > sources.length)) send('fallback', fallback(sources, language, 'unverified', question, quota))
        else send('done', { cited: [...new Set(citations)] })
      } catch { if (!request.signal.aborted) { try { send('fallback', fallback(sources, language, 'unavailable', question, quota)) } catch {} } }
      finally { abort.abort(); try { controller.close() } catch {} }
    },
    cancel() { abort.abort() },
  })
  return new Response(stream, { headers: { ...baseHeaders, 'Content-Type': 'text/event-stream; charset=utf-8', 'Set-Cookie': cookie, 'X-Accel-Buffering': 'no' } })
}
