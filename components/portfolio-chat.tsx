'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp, ArrowUpRight, MessageCircle, Square, X, RotateCcw } from 'lucide-react'
import { faqs, matchFaq, type Faq } from '@/lib/chat/faq'
import type { Quota } from '@/lib/chat/quota'
import type { Source } from '@/lib/chat/knowledge'

type Language = 'en' | 'fr'
type Turn = { question: string; answer: string; sources: Source[]; mode: 'answer' | 'sources' | 'faq'; reason?: string; cited?: number[] }
const copy = {
  en: { open: 'Ask about me', title: 'Ask about me', subtitle: 'Experience, projects & ideas', welcome: 'What would you like to know?', intro: 'Explore my work through a few questions. This assistant uses my public portfolio and links back to its sources.', suggestions: ['What is your backend experience?', 'Which of your projects run AI on a device?', 'What have you written about RAG?'], placeholder: 'Ask about experience, skills or a project…', send: 'Send question', close: 'Close chat', clear: 'Clear conversation', stop: 'Stop response', thinking: 'Looking through the portfolio…', generating: 'Writing an answer…', privacy: 'AI answers use OpenRouter and a model provider. Please keep personal or confidential information out of your questions. Chats are not saved by this site.', sources: 'Sources', excerpts: 'Portfolio excerpts', unavailable: 'AI answers are unavailable right now. Classic Q&A remains available below.', limit: 'The chat allowance has been reached. Classic Q&A remains available below.', unverified: 'This answer could not be verified against source references. A predefined answer is shown instead.', error: 'The request could not be completed. Please try again.', stopped: 'Response stopped.', contact: 'Contact me', disclaimer: 'AI can make mistakes. Check the linked sources.', empty: 'Please enter a question.', done: 'Answer ready.', switch: 'Passer le chat en français', max: 'This conversation has reached 12 questions. Clear it to start again.' },
  fr: { open: 'Une question sur moi ?', title: 'Une question sur moi ?', subtitle: 'Expériences, projets et idées', welcome: 'Que souhaitez-vous savoir ?', intro: 'Découvrez mon travail en quelques questions. Cet assistant s’appuie sur mon portfolio public et renvoie vers ses sources.', suggestions: ['Quelle est ton expérience en backend ?', 'Quels sont tes projets d’IA sur appareil ?', 'Quels articles as-tu écrits sur le RAG ?'], placeholder: 'Une question sur une expérience ou un projet…', send: 'Envoyer la question', close: 'Fermer le chat', clear: 'Effacer la conversation', stop: 'Arrêter la réponse', thinking: 'Recherche dans le portfolio…', generating: 'Rédaction de la réponse…', privacy: 'Les réponses IA utilisent OpenRouter et un fournisseur de modèle. Ne partagez pas d’informations personnelles ou confidentielles. Ce site ne sauvegarde pas les conversations.', sources: 'Sources', excerpts: 'Extraits du portfolio', unavailable: 'Les réponses IA sont indisponibles pour le moment. Les questions classiques restent disponibles ci-dessous.', limit: 'Le quota de questions est atteint. Les questions classiques restent disponibles ci-dessous.', unverified: 'Les références de cette réponse n’ont pas pu être vérifiées. Une réponse prédéfinie est affichée à la place.', error: 'La demande n’a pas abouti. Veuillez réessayer.', stopped: 'Réponse arrêtée.', contact: 'Me contacter', disclaimer: 'L’IA peut se tromper. Vérifiez les sources liées.', empty: 'Saisissez une question.', done: 'Réponse prête.', switch: 'Switch chat to English', max: 'Cette conversation a atteint 12 questions. Effacez-la pour recommencer.' },
}

export function PortfolioChat() {
  const [language, setLanguage] = useState<Language>('en')
  const [quota, setQuota] = useState<Quota | null>(null)
  const [classic, setClassic] = useState(false)
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [turns, setTurns] = useState<Turn[]>([])
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const field = useRef<HTMLTextAreaElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const abort = useRef<AbortController | null>(null)
  const follow = useRef(true)
  const t = copy[language]
  const fr = language === 'fr'
  const faqMode = classic || quota?.state !== 'available'
  const faqLabel = fr ? 'Questions classiques · sans IA' : 'Classic Q&A · no AI'

  useEffect(() => {
    if (!open || busy) return
    const controller = new AbortController()
    async function refresh() {
      try {
        const response = await fetch('/api/chat', {signal: controller.signal, cache: 'no-store'})
        if (!response.ok) throw new Error('Unavailable')
        const data = await response.json()
        if (!controller.signal.aborted) setQuota(data.quota)
      } catch { if (!controller.signal.aborted) setQuota(null) }
    }
    refresh()
    const interval = window.setInterval(refresh, 30000)
    window.addEventListener('focus', refresh)
    return () => { controller.abort(); clearInterval(interval); window.removeEventListener('focus', refresh) }
  }, [open, busy])

  useEffect(() => {
    try { if (localStorage.getItem('portfolio-language') === 'fr') setLanguage('fr') } catch {}
    const sync = (event: Event) => setLanguage((event as CustomEvent<Language>).detail)
    window.addEventListener('portfolio-language-change', sync)
    return () => { window.removeEventListener('portfolio-language-change', sync); abort.current?.abort() }
  }, [])
  useEffect(() => {
    if (open) { dialog.current?.showModal(); field.current?.focus() }
    else if (dialog.current?.open) dialog.current.close()
  }, [open])
  useEffect(() => {
    if (follow.current && scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [turns, status])

  function close() { setOpen(false); trigger.current?.focus() }
  function clear() { follow.current = false; if (scroller.current) scroller.current.scrollTop = 0; abort.current?.abort(); abort.current = null; setBusy(false); setTurns([]); setStatus(''); setQuestion(''); field.current?.focus() }
  function predefined(faq?: Faq, questionText?: string) {
    if (busy) return
    setTurns(previous => [...previous.slice(-49), {
      question: questionText || faq?.question || '',
      answer: faq?.answer || (fr ? 'Je n’ai pas de réponse prédéfinie à cette question. Choisissez un sujet ci-dessus ou contactez-moi.' : 'I don’t have a predefined answer to that question. Choose a topic above or contact me.'),
      mode: 'faq', sources: faq ? [{id: faq.id, title: faq.question, url: faq.url, kind: 'predefined answer', text: ''}] : [],
    }])
    setQuestion(''); setStatus(t.done); follow.current = true
  }
  async function ask(value: string) {
    const q = value.trim()
    if (q.length < 2 || busy || abort.current) return
    if (faqMode) { predefined(matchFaq(q, language), q); return }
    const controller = new AbortController(); abort.current = controller
    const currentLanguage = language
    const c = copy[currentLanguage]
    const index = Math.min(turns.length, 49)
    const update = (change: Partial<Turn>) => setTurns(previous => previous.map((turn, i) => i === index ? { ...turn, ...change } : turn))
    setTurns(previous => [...previous.slice(-49), { question: q, answer: '', sources: [], mode: 'answer' }])
    setQuestion(''); setBusy(true); setStatus(c.thinking); follow.current = true
    let answer = '', ended = false
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, language: currentLanguage, previousQuestions: turns.slice(-4).map(turn => turn.question) }), signal: controller.signal })
      if (!response.ok) throw new Error('Request failed')
      if (response.headers.get('content-type')?.includes('application/json')) {
        const result = await response.json(); update(result); if (result.quota) setQuota(result.quota); ended = true
      } else {
        if (!response.body) throw new Error('Missing response')
        const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = ''
        try {
          while (true) {
            const chunk = await reader.read()
            if (chunk.done) break
            buffer += decoder.decode(chunk.value, { stream: true })
            let end: number
            while ((end = buffer.indexOf('\n\n')) >= 0) {
              const block = buffer.slice(0, end); buffer = buffer.slice(end + 2)
              const event = block.match(/^event: (.+)$/m)?.[1]
              const raw = block.match(/^data: (.+)$/m)?.[1]
              if (!raw) continue
              const data = JSON.parse(raw)
              if (event === 'quota') setQuota(data)
              if (event === 'sources') update({ sources: data })
              if (event === 'token') { answer += data; update({ answer }); setStatus(c.generating) }
              if (event === 'fallback') { update({ ...data, cited: undefined }); if (data.quota) setQuota(data.quota); ended = true }
              if (event === 'done') { update({ cited: data.cited }); ended = true }
            }
          }
        } finally { await reader.cancel().catch(() => {}); reader.releaseLock() }
        if (!ended) throw new Error('Interrupted stream')
      }
      setStatus(c.done)
    } catch {
      if (abort.current !== controller) return
      // Do not leave incomplete generated text looking like a finished answer.
      update({ answer: controller.signal.aborted ? c.stopped : c.error, mode: 'sources' })
      setStatus(controller.signal.aborted ? c.stopped : c.error)
    } finally {
      if (abort.current === controller) { abort.current = null; setBusy(false); field.current?.focus() }
    }
  }

  return <>
    <button type="button" ref={trigger} className="chat-launcher" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-controls="portfolio-chat"><MessageCircle size={19} /><span>{t.open}</span></button>
    <dialog ref={dialog} id="portfolio-chat" className="portfolio-chat" aria-labelledby="chat-title" lang={language} onCancel={() => setOpen(false)} onClose={close} onClick={event => { if (event.target === dialog.current) { const r = dialog.current.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close() } }}>
      <header className="chat-header"><div className="chat-avatar"><MessageCircle size={20} /></div><div><h2 id="chat-title">{t.title}</h2><p>{t.subtitle}</p></div><button type="button" className="chat-icon" aria-label={t.switch} disabled={busy} onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}>{language.toUpperCase()}</button><button type="button" className="chat-icon" aria-label={t.close} onClick={close}><X size={19} /></button></header>
      <div className="chat-quota" role="status" aria-live="polite">
        <strong>{fr ? 'IA gratuite uniquement' : 'Free AI only'}<span>{quota ? `${quota.remaining} / ${quota.limit} ${fr ? 'restantes aujourd’hui' : 'left today'}` : (fr ? 'IA indisponible' : 'AI unavailable')}</span></strong>
        <p>{quota?.state === 'visitor_daily' ? (fr ? 'Votre quota IA du jour est épuisé. Les questions classiques restent disponibles.' : 'Your daily AI allowance is used up. Classic Q&A is still available.') : quota?.state === 'site_daily' ? (fr ? 'Le quota IA du site est épuisé pour aujourd’hui. Continuez sans IA.' : 'The site’s AI allowance is used up for today. Continue without AI.') : quota?.state === 'burst' ? (fr ? 'Courte pause entre les requêtes IA. Les questions classiques restent disponibles.' : 'AI requests are temporarily rate-limited. Classic Q&A is still available.') : quota?.state === 'available' ? (fr ? 'Les questions classiques ne consomment aucun quota.' : 'Classic Q&A does not use your allowance.') : (fr ? 'Continuez avec les réponses prédéfinies, sans IA.' : 'Continue with predefined answers, without AI.')}</p>
        {quota && <small>{fr ? 'Renouvellement : ' : 'Resets: '}{new Date(quota.resetsAt).toLocaleString(fr ? 'fr-FR' : 'en-GB', {timeZone: 'UTC', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'})} UTC{quota.state === 'burst' && quota.retryAt ? ` · ${fr ? 'Réessayer à' : 'Retry at'} ${new Date(quota.retryAt).toLocaleTimeString(fr ? 'fr-FR' : 'en-GB')}` : ''}</small>}
        <div className="chat-mode"><button type="button" disabled={busy || quota?.state !== 'available'} aria-pressed={!faqMode} onClick={() => setClassic(false)}>{fr ? 'Poser une question à l’IA' : 'Ask AI'}</button><button type="button" disabled={busy} aria-pressed={faqMode} onClick={() => setClassic(true)}>{faqLabel}</button></div>
      </div>
      <div className="chat-scroll" ref={scroller} onScroll={() => { const el = scroller.current; if (el) follow.current = el.scrollHeight - el.scrollTop - el.clientHeight < 100 }}>
        {!turns.length && !faqMode && <div className="chat-welcome"><span className="chat-eyebrow">PORTFOLIO ASSISTANT</span><h3>{t.welcome}</h3><p>{t.intro}</p><div className="chat-suggestions">{t.suggestions.map(s => <button type="button" key={s} onClick={() => ask(s)}>{s}<ArrowUpRight size={16} /></button>)}</div></div>}
        <details className="chat-faq" open={faqMode}>
          <summary>{faqLabel}</summary>
          <p>{fr ? 'Réponses prédéfinies à partir du portfolio. Toujours disponibles, aucun appel IA.' : 'Predefined answers from the portfolio. Always available, no AI calls.'}</p>
          <div>{faqs(language).map(faq => <button type="button" disabled={busy} key={faq.id} onClick={() => predefined(faq)}>{faq.question}<ArrowUpRight size={14} /></button>)}</div>
        </details>
        <p className="chat-privacy">{t.privacy}</p>
        <div className="chat-turns">{turns.map((turn, index) => <section className="chat-turn" key={index} aria-label={`${language === 'fr' ? 'Question' : 'Question'} ${index + 1}`}>
          <p className="chat-question">{turn.question}</p>
          <div className="chat-answer">
            {turn.reason && turn.reason !== 'no_evidence' && turn.reason !== 'faq' && <p className="chat-notice">{turn.reason === 'limit' ? t.limit : turn.reason === 'unverified' ? t.unverified : t.unavailable}</p>}
            <p className="chat-answer-label">{turn.mode === 'faq' ? (fr ? 'Réponse prédéfinie · sans IA' : 'Predefined answer · no AI') : turn.mode === 'answer' ? (fr ? 'Réponse IA' : 'AI answer') : t.excerpts}</p>
            <p className="chat-answer-text">{turn.answer || (busy && index === turns.length - 1 ? t.thinking : '')}</p>
            {!!turn.sources.length && <div className="chat-sources"><h3>{turn.mode === 'sources' ? t.excerpts : t.sources}</h3>{turn.sources.map((s, i) => (!turn.cited || turn.cited.includes(i + 1)) && <div className="chat-source" key={s.id}><a href={s.url} target="_blank" rel="noreferrer"><span>[{i + 1}] {s.title}</span><ArrowUpRight size={14} /></a>{turn.mode === 'sources' && <p>{s.text}</p>}</div>)}</div>}
          </div>
        </section>)}</div>
      </div>
      <div className="chat-status" role="status" aria-live="polite">{status}</div>
      <form className="chat-compose" onSubmit={event => { event.preventDefault(); ask(question) }}>
        <label className="sr-only" htmlFor="chat-question">{t.placeholder}</label>
        <textarea ref={field} id="chat-question" value={question} onChange={e => setQuestion(e.target.value)} maxLength={800} rows={2} placeholder={faqMode ? (fr ? 'Un sujet : formation, projets, contact…' : 'Try a topic: education, projects, contact…') : t.placeholder} disabled={busy} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); ask(question) } }} />
        {busy ? <button type="button" className="chat-send" aria-label={t.stop} onClick={() => abort.current?.abort()}><Square size={16} /></button> : <button type="submit" className="chat-send" aria-label={t.send} disabled={question.trim().length < 2}><ArrowUp size={20} /></button>}
      </form>
      <footer className="chat-footer"><button type="button" onClick={clear} disabled={!turns.length} aria-label={t.clear}><RotateCcw size={13} />{t.clear}</button><a href="mailto:cbrzyski2@gmail.com">{t.contact}<ArrowUpRight size={12} /></a><p>{t.disclaimer}</p></footer>
    </dialog>
  </>
}
