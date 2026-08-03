import Link from "next/link"
import { ArrowUpRight, MoveLeft, PenLine } from "lucide-react"

const drafts = [
  { title: "IA local-first : les conséquences d’une inférence sur appareil", subtitle: "Un article sur les compromis entre confidentialité, performance, contrôle et expérience utilisateur.", topic: "Systèmes embarqués", status: "À préparer" },
  { title: "Évaluer un système agentique au-delà d’une démo", subtitle: "Une note sur l’observabilité, les points de contrôle, le coût et l’utilité réelle des workflows multi-agents.", topic: "Agentic AI", status: "À préparer" },
  { title: "Montrer l’incertitude dans les interfaces IA", subtitle: "Réflexions à partir de systèmes de transcription et de traduction utilisés dans des situations à forte contrainte.", topic: "Human-AI interaction", status: "À préparer" },
]

export default function ArticlesPage() {
  return <main className="hub-page articles-page">
    <header className="hub-header"><Link href="/"><MoveLeft size={16} />Retour au portfolio</Link><a href="mailto:cedric.brzyski@epita.fr?subject=Article%20idea"><PenLine size={16} />Proposer un sujet</a></header>
    <section className="hub-hero articles-hero"><p>ARTICLES & NOTES</p><h1>Écrire pour <em>mieux comprendre.</em></h1><div><p>Un espace de publication pour des articles personnels sur l’IA appliquée, l’ingénierie logicielle et les systèmes techniques. Le format visé est celui d’une note argumentée : contexte, raisonnement, exemples et références.</p><span>Archive éditoriale · publications à venir</span></div></section>
    <section className="editorial-intro"><div><p className="case-label">LIGNE ÉDITORIALE</p><h2>Des textes de fond, pas des annonces.</h2></div><p>Les articles publiés ici ne seront ni des résumés d’actualité ni des contenus promotionnels. Ils partiront d’un problème précis, d’une expérience de construction ou d’une question de recherche, et prendront le temps d’expliciter les limites du raisonnement.</p></section>
    <section className="article-list"><div className="article-list-heading"><p>PUBLICATIONS</p><span>Aucun article publié pour le moment</span></div>{drafts.map((draft, index) => <article className="draft-article" key={draft.title}><span>{String(index + 1).padStart(2, "0")} / {draft.status}</span><div><p>{draft.topic}</p><h2>{draft.title}</h2><p>{draft.subtitle}</p></div><ArrowUpRight size={21} /></article>)}</section>
    <section className="writing-note"><PenLine size={24} /><div><p>PROCHAINES PUBLICATIONS</p><h2>Les premiers articles seront ajoutés ici sous forme de pages dédiées, avec une lecture confortable, des références et une date de publication.</h2></div></section>
    <footer className="hub-footer"><span>© 2026 Cédric Brzyski</span><Link href="/">Portfolio principal</Link></footer>
  </main>
}
