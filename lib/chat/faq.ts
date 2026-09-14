import { content } from '@/lib/portfolio-content'
export type Faq = { id: string; question: string; answer: string; keywords: string[]; url: string }
export function faqs(language: 'en' | 'fr'): Faq[] {
  const c = content[language], fr = language === 'fr'
  return [
    { id: 'profile', question: fr ? 'Peux-tu te présenter ?' : 'Can you introduce yourself?', answer: fr ? `Je suis ${c.intro.charAt(0).toLowerCase()}${c.intro.slice(1)}` : `I am an ${c.intro}`, keywords: ['profile', 'profil', 'presentation', 'background', 'introduce', 'yourself', 'presenter'], url: '/#profile' },
    { id: 'experience', question: fr ? 'Quelle est ton expérience professionnelle ?' : 'What is your professional experience?', answer: c.roles.slice(0, 3).map(r => `${r.title} — ${r.company} (${r.date}). ${r.text}`).join('\n\n'), keywords: ['experience', 'professional', 'professionnelle', 'work', 'worked', 'travail', 'emploi', 'safran', 'sia', 'inserm', 'backend'], url: '/#experience' },
    { id: 'skills', question: fr ? 'Quelles technologies utilises-tu ?' : 'Which technologies do you use?', answer: c.skills.map(s => s.join(': ')).join('\n\n'), keywords: ['skills', 'skill', 'competences', 'technologies', 'technology', 'stack', 'python', 'typescript', 'fastapi'], url: '/#profile' },
    { id: 'offline', question: fr ? 'Qu’est-ce qu’OfflineLingo ?' : 'What is OfflineLingo?', answer: c.projectText.offline[1] + (fr ? ' Le projet utilise Kotlin, Android, whisper.cpp et llama.cpp.' : ' The project uses Kotlin, Android, whisper.cpp and llama.cpp.'), keywords: ['offlinelingo', 'offline', 'android', 'device', 'appareil', 'traduction', 'translation'], url: '/#projects' },
    { id: 'projects', question: fr ? 'Quels sont tes projets IA ?' : 'What are your AI projects?', answer: [c.projectText.flightrec, c.projectText.finresearch, c.projectText.mistral].map(p => p.join(' — ')).join('\n\n'), keywords: ['projects', 'project', 'projets', 'projet', 'flightrec', 'finresearchagents', 'mistral'], url: '/#projects' },
    { id: 'education', question: fr ? 'Quelle est ta formation ?' : 'What is your education?', answer: c.studies.map(s => s.join(' · ')).join('\n\n'), keywords: ['education', 'formation', 'etudes', 'studies', 'degree', 'diplome', 'epita', 'uqac'], url: '/#education' },
    { id: 'writing', question: fr ? 'Sur quels sujets écris-tu ?' : 'What do you write about?', answer: fr ? 'Mes articles traitent notamment des agents IA, de l’IA hors ligne, de l’incertitude, de l’évaluation RAG, de la robotique et de la fiabilité des reprises. Ce sont des écrits techniques ; un sujet d’article ne constitue pas à lui seul une expérience professionnelle.' : 'My articles cover AI agents, offline AI, uncertainty, RAG evaluation, robotics and retry reliability. These are technical writings; an article topic alone does not establish professional experience.', keywords: ['article', 'articles', 'writing', 'write', 'written', 'ecrit', 'ecrire', 'read', 'lire', 'rag'], url: '/articles' },
    { id: 'contact', question: fr ? 'Comment te contacter et quelles langues parles-tu ?' : 'How can I contact you, and which languages do you speak?', answer: fr ? 'Vous pouvez me contacter à cbrzyski2@gmail.com. Je parle français (langue maternelle) et anglais (C1). Pour une opportunité ou une collaboration, contactez-moi directement.' : 'You can contact me at cbrzyski2@gmail.com. I speak French (native) and English (C1). Contact me directly about an opportunity or collaboration.', keywords: ['contact', 'contacter', 'email', 'mail', 'joindre', 'language', 'languages', 'langues', 'parle', 'speak', 'hire', 'recruter'], url: '/#contact' },
  ]
}
export function matchFaq(question: string, language: 'en' | 'fr'): Faq | undefined {
  const normalized = question.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  // Never guess sensitive or unpublished facts from a nearby topic.
  if (/\b(salary|salaire|age|birthday|naissance|private|prive|adresse|address|available|disponib\w*|married|marie|client|phone|telephone)\b/.test(normalized)) return undefined
  if (/^(who is|qui est) cedric/.test(normalized)) return faqs(language)[0]
  const words = new Set(normalized.match(/[a-z0-9]+/g) ?? [])
  const ranked = faqs(language).map(f => ({ f, score: f.keywords.reduce((n, k) => n + (words.has(k) ? 1 : 0), 0) })).sort((a, b) => b.score - a.score)
  return ranked[0]?.score > 0 ? ranked[0].f : undefined
}
