import Link from "next/link"
import { MoveLeft, PenLine } from "lucide-react"

const drafts = [
  { title: "IA local-first : les conséquences d’une inférence sur appareil", subtitle: "Un article sur les compromis entre confidentialité, performance, contrôle et expérience utilisateur.", topic: "Systèmes embarqués", status: "À préparer" },
  { title: "Évaluer un système agentique au-delà d’une démo", subtitle: "Une note sur l’observabilité, les points de contrôle, le coût et l’utilité réelle des workflows multi-agents.", topic: "Agentic AI", status: "À préparer" },
  { title: "Montrer l’incertitude dans les interfaces IA", subtitle: "Réflexions à partir de systèmes de transcription et de traduction utilisés dans des situations à forte contrainte.", topic: "Human-AI interaction", status: "À préparer" },
]

export default function ArticlesPage() {
  return <main className="hub-page articles-page">
    <header className="hub-header"><Link href="/"><MoveLeft size={16} />Retour au portfolio</Link><a href="mailto:cedric.brzyski@epita.fr?subject=Note"><PenLine size={16} />Me contacter</a></header>
    <section className="hub-hero articles-hero"><p>NOTES</p><h1>Notes sur l’IA <em>et le logiciel.</em></h1><div><p>Cet espace me sert à garder et partager des notes de travail sur l’IA appliquée, l’ingénierie logicielle et les systèmes techniques.</p></div></section>
    <section className="editorial-intro"><div><p className="case-label">À PROPOS</p><h2>Des notes de travail et de lecture.</h2></div><p>J’y ajouterai des idées, des retours d’expérience, des explications techniques et des pistes à approfondir, au fil des projets et des sujets qui m’intéressent.</p></section>
    <section className="article-list"><div className="article-list-heading"><p>NOTES À RÉDIGER</p><span>Les premières notes seront ajoutées ici</span></div>{drafts.map((draft, index) => <article className="draft-article" key={draft.title}><span>{String(index + 1).padStart(2, "0")} / {draft.status}</span><div><p>{draft.topic}</p><h2>{draft.title}</h2><p>{draft.subtitle}</p></div></article>)}</section>
    <section className="writing-note"><PenLine size={24} /><div><p>À VENIR</p><h2>Chaque note aura sa propre page, avec un format de lecture simple et les références utiles lorsque nécessaire.</h2></div></section>
    <footer className="hub-footer"><span>© 2026 Cédric Brzyski</span><Link href="/">Portfolio principal</Link></footer>
  </main>
}
