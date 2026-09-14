import { content, projects } from "@/lib/portfolio-content"
import { articleContent, type ArticleLanguage } from "@/lib/articles"

export type Source = { id: string; title: string; url: string; kind: string; text: string }
const stop = new Set('the a an is are was were of to for and or in on with about his he him her she you your me my what which how does did can could tell please who has have do le la les un une des du de et ou en sur avec ce cette ses son sa il elle moi me que quels quelles quel quelle comment est sont pour dans au aux vous tu qui fait peut propos cedric brzyski'.split(' '))
export function tokens(text: string): string[] {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().match(/[a-z0-9+#]+/g)?.filter(t => t.length > 1 && !stop.has(t)) ?? []
}
const synonyms = [
  ['work', 'experience', 'experiences', 'travail', 'professionnel', 'professional', 'emploi', 'worked', 'backend'],
  ['education', 'studies', 'study', 'formation', 'etudes', 'diplome', 'graduate', 'epita'],
  ['offline', 'device', 'android', 'local', 'mobile', 'embarque', 'reseau'],
  ['skills', 'skill', 'competences', 'technologies', 'stack', 'competencies'],
  ['contact', 'email', 'contacter', 'joindre', 'reach'],
  ['articles', 'article', 'read', 'lire', 'writing', 'ecrit'],
  ['projects', 'project', 'projet', 'projets', 'built', 'construit'],
  ['language', 'languages', 'langues', 'parle', 'speak'],
]

export function knowledge(language: ArticleLanguage): Source[] {
  const c = content[language]
  const result: Source[] = [
    { id: 'profile', title: c.profile, url: '/#profile', kind: 'profile', text: `${c.title}. ${c.intro} ${c.profileText} ${c.details.map(d => d.join(': ')).join('. ')}` },
    { id: 'skills', title: c.competencies, url: '/#profile', kind: 'stated skills', text: c.skills.map(s => s.join(': ')).join('. ') },
    { id: 'education', title: c.education, url: '/#education', kind: 'education', text: c.studies.map(s => s.join(' · ')).join('. ') },
    { id: 'contact', title: c.contact, url: '/#contact', kind: 'contact', text: `${c.contactText} Email: cbrzyski2@gmail.com. French / français: native / natif. English / anglais: C1.` },
  ]
  c.roles.forEach((r, i) => result.push({ id: `role-${i}`, title: `${r.company} · ${r.title}`, url: '/#experience', kind: 'professional experience', text: `${r.date}. ${r.text} ${r.highlights.join(' ')} ${r.tech}` }))
  projects.forEach(p => {
    const copy = c.projectText[p.key as keyof typeof c.projectText]
    result.push({ id: `project-${p.key}`, title: copy[0], url: p.href, kind: 'project', text: `${copy[1]} Technologies: ${p.tags.join(', ')}.` })
  })
  c.challengesList.forEach((h, i) => result.push({ id: `challenge-${i}`, title: `${h.title} · ${h.event}`, url: h.href, kind: 'project / hackathon', text: `${h.date}. ${h.result}. ${h.text}` }))
  articleContent[language].forEach(a => {
    result.push({ id: `article-${a.slug}`, title: a.title, url: `/articles/${a.slug}`, kind: 'writing (not employment evidence)', text: `${a.topic}. ${a.subtitle} ${a.takeaway}` })
    a.sections.forEach((s, i) => {
      const text = s.blocks.flatMap(b => b.type === 'p' ? [b.text] : b.type === 'note' ? [b.text] : []).join(' ').slice(0, 1400)
      if (text) result.push({ id: `article-${a.slug}-${i}`, title: `${a.title} · ${s.heading}`, url: `/articles/${a.slug}#s${i + 1}`, kind: 'writing (not employment evidence)', text })
    })
  })
  return result
}

export function retrieve(question: string, language: ArticleLanguage, previousQuestions: string[] = []): Source[] {
  const normalized = question.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const direct = tokens(question)
  if (/who is|qui est|present[eé]|introduc|tell me about (him|cedric)|parle.*cedric|current (role|job)|poste actuel/.test(normalized)) direct.push('profile', 'profil')
  // Carry a little context only for short follow-up questions, never let it dominate.
  const query = new Set(direct)
  const expanded = new Set(direct)
  synonyms.forEach(group => { if (group.some(t => query.has(t))) group.forEach(t => expanded.add(t)) })
  const prior = new Set(direct.length < 5 ? tokens(previousQuestions.slice(-1).join(' ')) : [])
  const documents = knowledge(language)
  const frequency = new Map<string, number>()
  const sets = documents.map(d => new Set(tokens(`${d.title} ${d.text} ${d.kind}`)))
  sets.forEach(set => set.forEach(t => frequency.set(t, (frequency.get(t) ?? 0) + 1)))
  const ranked = documents.map((d, i) => {
    const title = new Set(tokens(d.title))
    let score = 0, matches = 0
    expanded.forEach(t => {
      if (!sets[i].has(t)) return
      if (query.has(t)) matches++
      const weight = query.has(t) ? 1 : .22
      score += weight * Math.log(1 + documents.length / (frequency.get(t) ?? 1)) * (title.has(t) ? 2 : 1)
    })
    prior.forEach(t => { if (sets[i].has(t)) score += .15 })
    if (d.kind.startsWith('writing') && !['article', 'articles', 'read', 'lire', 'writing', 'ecrit'].some(t => query.has(t))) score *= .65
    return { d, score, matches }
  }).filter(r => r.score > 1.2 && (r.matches > 0 || direct.length < 3)).sort((a, b) => b.score - a.score)
  const seen = new Set<string>()
  return ranked.filter(r => { const key = r.d.kind.startsWith('writing') ? r.d.url.split('#s')[0] : r.d.url.startsWith('https://') ? r.d.url : r.d.id; if (seen.has(key)) return false; seen.add(key); return true }).slice(0, 5).map(r => r.d)
}
