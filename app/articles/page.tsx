import Link from "next/link"
import { ArrowUpRight, MoveLeft, PenLine } from "lucide-react"

const themes = [
  { title: "IA local-first", text: "Ce que change une architecture où l’inférence, les données et les interactions restent sur l’appareil : confidentialité, contraintes de performance, expérience utilisateur et vérifiabilité.", label: "À venir" },
  { title: "Systèmes agentiques en pratique", text: "Réflexions sur les situations où l’orchestration multi-agents apporte réellement de la valeur, les compromis opérationnels qu’elle implique, et les moyens concrets de l’évaluer.", label: "À venir" },
  { title: "Construire pour les environnements contraints", text: "Notes issues de projets de traduction hors ligne, de robotique et de systèmes temps réel, où la fiabilité, la latence et l’incertitude comptent autant que la performance du modèle.", label: "À venir" },
]

export default function ArticlesPage() {
  return <main className="hub-page articles-page">
    <header className="hub-header"><Link href="/"><MoveLeft size={16} />Retour au portfolio</Link><a href="mailto:cedric.brzyski@epita.fr?subject=Article%20idea"><PenLine size={16} />Proposer un sujet</a></header>
    <section className="hub-hero articles-hero"><p>ARTICLES & NOTES</p><h1>Un espace pour <em>penser à voix haute.</em></h1><div><p>Des textes personnels sur l’IA appliquée, l’ingénierie logicielle, la robotique et les choix techniques derrière les projets. Ici, le format sera long, sourcé et volontairement moins immédiat que les réseaux sociaux.</p><span>Premiers textes en préparation</span></div></section>
    <section className="article-archive"><div className="archive-intro"><p className="archive-label">ARCHIVE</p><h2>Pas encore de publication.</h2><p>Cette page est déjà la destination dédiée qui accueillera les articles publiés. Les thèmes ci-dessous sont des pistes éditoriales, pas des articles déjà écrits.</p></div><div className="theme-list">{themes.map((theme, index) => <article key={theme.title}><span>{String(index + 1).padStart(2, "0")} / {theme.label}</span><h3>{theme.title}</h3><p>{theme.text}</p><ArrowUpRight size={18} /></article>)}</div></section>
    <section className="writing-note"><PenLine size={24} /><div><p>FORMAT ÉDITORIAL</p><h2>Chaque article sera une note autonome : contexte, point de vue, exemples techniques et références lorsque nécessaire.</h2></div></section>
    <footer className="hub-footer"><span>© 2026 Cédric Brzyski</span><Link href="/">Portfolio principal</Link></footer>
  </main>
}
