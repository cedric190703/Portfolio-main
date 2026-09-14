import { createHmac, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto'

import { mkdir, readFile, writeFile, rename } from 'node:fs/promises'
import type { Quota } from './quota'
const localSecret = randomBytes(32).toString('hex')
const memory = new Map<string, { count: number; expires: number }>()
export function visitor(cookie: string | null): { id: string; cookie: string } {
  const secret = process.env.CHAT_COOKIE_SECRET || localSecret
  const sign = (id: string) => createHmac('sha256', secret).update(id).digest('hex')
  const raw = cookie?.match(/(?:^|;\s*)portfolio-chat=([\w.-]+)/)?.[1] ?? ''
  const [candidate, signature] = raw.split('.')
  const valid = candidate && /^[a-f0-9-]{36}$/.test(candidate) && signature?.length === 64 && timingSafeEqual(Buffer.from(sign(candidate)), Buffer.from(signature))
  const id = valid ? candidate : randomUUID()
  return { id, cookie: `portfolio-chat=${id}.${sign(id)}; HttpOnly; SameSite=Strict; Path=/api/chat; Max-Age=86400${process.env.NODE_ENV === 'production' ? '; Secure' : ''}` }
}

export function localLimit(keys: string[], caps: number[], ttls: number[], now = Date.now()): boolean {
  for (const [key, value] of memory) if (value.expires <= now) memory.delete(key)
  if (keys.some((key, i) => (memory.get(key)?.count ?? 0) >= caps[i])) return false
  keys.forEach((key, i) => {
    const current = memory.get(key)
    memory.set(key, { count: (current?.count ?? 0) + 1, expires: current?.expires ?? now + ttls[i] * 1000 })
  })
  return true
}
export function configuredForInference(): boolean {
  return !!process.env.OPENROUTER_API_KEY && (process.env.NODE_ENV !== 'production' || !!(process.env.CHAT_REDIS_REST_URL && process.env.CHAT_REDIS_REST_TOKEN && (process.env.CHAT_COOKIE_SECRET?.length ?? 0) >= 32))
}
function cap(name: string, fallback: number, maximum: number) {
  const n = Number(process.env[name])
  return Number.isInteger(n) && n > 0 ? Math.min(n, maximum) : fallback
}
export function quotaWindow(id: string, now = Date.now()) {
  const day = new Date(now).toISOString().slice(0, 10)
  const reset = Date.parse(`${day}T00:00:00Z`) + 86400000
  return {
    keys: [`portfolio-chat:daily:${day}:${id}`, `portfolio-chat:day:${day}`, `portfolio-chat:burst:${Math.floor(now / 600000)}:${id}`, `portfolio-chat:minute:${Math.floor(now / 60000)}`],
    caps: [cap('CHAT_VISITOR_DAILY_LIMIT', 5, 5), cap('CHAT_DAILY_LIMIT', 40, 40), 8, 8],
    expires: [reset, reset, (Math.floor(now / 600000) + 1) * 600000, (Math.floor(now / 60000) + 1) * 60000],
    reset,
  }
}
export function quotaResult(counts: number[], window: ReturnType<typeof quotaWindow>): Quota {
  const hit = counts.findIndex((count, i) => count >= window.caps[i])
  return { limit: window.caps[0], remaining: Math.max(0, window.caps[0] - counts[0]), resetsAt: new Date(window.reset).toISOString(),
    state: hit === 0 ? 'visitor_daily' : hit === 1 ? 'site_daily' : hit >= 2 ? 'burst' : 'available',
    ...(hit >= 2 ? { retryAt: new Date(window.expires[hit]).toISOString() } : {}),
  }
}
let pending: Promise<unknown> = Promise.resolve()
async function localCounts(window: ReturnType<typeof quotaWindow>, consume: boolean, now: number) {
  const operation = pending.then(async () => {
    // Persist development usage across refreshes/restarts. Production uses Redis.
    if (process.env.NODE_ENV !== 'test') {
      try {
        const stored = JSON.parse(await readFile('.chat-state/budget.json', 'utf8'))
        if (!stored || typeof stored !== 'object' || Array.isArray(stored)) throw new Error('Invalid quota state')
        memory.clear()
        for (const [key, raw] of Object.entries(stored)) {
          const value = raw as {count: number; expires: number}
          if (!value || !Number.isSafeInteger(value.count) || value.count < 0 || !Number.isSafeInteger(value.expires)) throw new Error('Invalid quota state')
          memory.set(key, value)
        }
      } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error }
    }
    for (const [key, value] of memory) if (value.expires <= now) memory.delete(key)
    const counts = window.keys.map(key => memory.get(key)?.count ?? 0)
    const allowed = counts.every((n, i) => n < window.caps[i])
    if (consume && allowed) {
      window.keys.forEach((key, i) => { counts[i]++; memory.set(key, {count: counts[i], expires: window.expires[i]}) })
      if (process.env.NODE_ENV !== 'test') {
        await mkdir('.chat-state', {recursive: true})
        await writeFile('.chat-state/budget.tmp', JSON.stringify(Object.fromEntries(memory)), {mode: 0o600})
        await rename('.chat-state/budget.tmp', '.chat-state/budget.json')
      }
    }
    return {allowed, counts}
  })
  pending = operation.catch(() => {})
  return operation
}
export async function budget(id: string, consume = false, now = Date.now()): Promise<{allowed: boolean; quota: Quota}> {
  const window = quotaWindow(id, now)
  let result: {allowed: boolean; counts: number[]}
  if (!process.env.CHAT_REDIS_REST_URL || !process.env.CHAT_REDIS_REST_TOKEN) {
    if (process.env.NODE_ENV === 'production') throw new Error('Shared limits required')
    result = await localCounts(window, consume, now)
  } else {
    const script = `local counts={}; local allowed=1
for i=1,#KEYS do counts[i]=tonumber(redis.call('GET',KEYS[i]) or '0'); if counts[i]>=tonumber(ARGV[i]) then allowed=0 end end
if ARGV[#KEYS*2+1]=='1' and allowed==1 then for i=1,#KEYS do counts[i]=redis.call('INCR',KEYS[i]); redis.call('PEXPIREAT',KEYS[i],ARGV[#KEYS+i]) end end
table.insert(counts,1,allowed); return counts`
    const endpoint = new URL(process.env.CHAT_REDIS_REST_URL)
    if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) throw new Error('HTTPS quota endpoint required')
    const response = await fetch(endpoint, {
      method: 'POST', headers: {Authorization: `Bearer ${process.env.CHAT_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json'},
      body: JSON.stringify(['EVAL', script, window.keys.length, ...window.keys, ...window.caps, ...window.expires, consume ? '1' : '0']),
      signal: AbortSignal.timeout(4000), cache: 'no-store', redirect: 'error',
    })
    if (!response.ok) throw new Error('Quota unavailable')
    const data = await response.json()
    if (data.error || !Array.isArray(data.result) || data.result.length !== 5 || !data.result.every((n: unknown) => typeof n === 'number' && Number.isInteger(n) && n >= 0) || ![0, 1].includes(data.result[0])) throw new Error('Quota unavailable')
    result = {allowed: data.result[0] === 1, counts: data.result.slice(1)}
  }
  return {allowed: result.allowed, quota: quotaResult(result.counts, window)}
}
export function unavailableQuota(): Quota {
  return {...quotaResult([0, 0, 0, 0], quotaWindow('unknown')), state: 'unavailable'}
}
