"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { MoveLeft, PenLine } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"

type Language = "en" | "fr"

const articlesContent = {
  en: {
    back: "Back to portfolio", contact: "Contact me", label: "NOTES", title: <>Notes on AI <em>and software.</em></>, intro: "This space is for keeping and sharing working notes on applied AI, software engineering and technical systems.", about: "ABOUT", aboutTitle: "Working and reading notes.", aboutText: "I will add ideas, feedback from projects, technical explanations and topics to explore further as I work on projects and subjects that interest me.", draftsLabel: "NOTES TO WRITE", draftsInfo: "The first notes will be added here", upcoming: "UPCOMING", upcomingText: "Each note will have its own page, with a simple reading format and useful references when needed.", portfolio: "Main portfolio",
    drafts: [
      { title: "Local-first AI: what on-device inference changes", subtitle: "A note on the trade-offs between privacy, performance, control and user experience.", topic: "Embedded systems", status: "To prepare" },
      { title: "Evaluating an agentic system beyond a demo", subtitle: "A note on observability, checkpoints, cost and the actual usefulness of multi-agent workflows.", topic: "Agentic AI", status: "To prepare" },
      { title: "Showing uncertainty in AI interfaces", subtitle: "Reflections from transcription and translation systems used in highly constrained situations.", topic: "Human-AI interaction", status: "To prepare" },
    ],
  },
  fr: {
    back: "Retour au portfolio", contact: "Me contacter", label: "NOTES", title: <>Notes sur l’IA <em>et le logiciel.</em></>, intro: "Cet espace me sert à garder et partager des notes de travail sur l’IA appliquée, l’ingénierie logicielle et les systèmes techniques.", about: "À PROPOS", aboutTitle: "Des notes de travail et de lecture.", aboutText: "J’y ajouterai des idées, des retours d’expérience, des explications techniques et des pistes à approfondir, au fil des projets et des sujets qui m’intéressent.", draftsLabel: "NOTES À RÉDIGER", draftsInfo: "Les premières notes seront ajoutées ici", upcoming: "À VENIR", upcomingText: "Chaque note aura sa propre page, avec un format de lecture simple et les références utiles lorsque nécessaire.", portfolio: "Portfolio principal",
    drafts: [
      { title: "IA local-first : les conséquences d’une inférence sur appareil", subtitle: "Un article sur les compromis entre confidentialité, performance, contrôle et expérience utilisateur.", topic: "Systèmes embarqués", status: "À préparer" },
      { title: "Évaluer un système agentique au-delà d’une démo", subtitle: "Une note sur l’observabilité, les points de contrôle, le coût et l’utilité réelle des workflows multi-agents.", topic: "IA agentique", status: "À préparer" },
      { title: "Montrer l’incertitude dans les interfaces IA", subtitle: "Réflexions à partir de systèmes de transcription et de traduction utilisés dans des situations à forte contrainte.", topic: "Interaction humain-IA", status: "À préparer" },
    ],
  },
}

export default function ArticlesPage() {
  const [language, setLanguage] = useState<Language>("en")
  const copy = articlesContent[language]

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language")
    if (savedLanguage === "en" || savedLanguage === "fr") setLanguage(savedLanguage)
  }, [])

  const changeLanguage = (value: Language) => {
    setLanguage(value)
    window.localStorage.setItem("portfolio-language", value)
  }

  return <main className="hub-page articles-page">
    <header className="hub-header"><Link href="/"><MoveLeft size={16} />{copy.back}</Link><div className="hub-header-actions"><LanguageToggle language={language} onLanguageChange={changeLanguage} /><a href="mailto:cedric.brzyski@epita.fr?subject=Note"><PenLine size={16} />{copy.contact}</a></div></header>
    <section className="hub-hero articles-hero"><p>{copy.label}</p><h1>{copy.title}</h1><div><p>{copy.intro}</p></div></section>
    <section className="editorial-intro"><div><p className="case-label">{copy.about}</p><h2>{copy.aboutTitle}</h2></div><p>{copy.aboutText}</p></section>
    <section className="article-list"><div className="article-list-heading"><p>{copy.draftsLabel}</p><span>{copy.draftsInfo}</span></div>{copy.drafts.map((draft, index) => <article className="draft-article" key={draft.title}><span>{String(index + 1).padStart(2, "0")} / {draft.status}</span><div><p>{draft.topic}</p><h2>{draft.title}</h2><p>{draft.subtitle}</p></div></article>)}</section>
    <section className="writing-note"><PenLine size={24} /><div><p>{copy.upcoming}</p><h2>{copy.upcomingText}</h2></div></section>
    <footer className="hub-footer"><span>© 2026 Cédric Brzyski</span><Link href="/">{copy.portfolio}</Link></footer>
  </main>
}
