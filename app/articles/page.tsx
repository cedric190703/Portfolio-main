"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpRight, Clock3, MoveLeft, PenLine } from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { articleContent, type ArticleLanguage } from "@/lib/articles"

const pageContent = {
  en: {
    back: "Back to portfolio", contact: "Contact me", label: "ARTICLES", title: <>Notes on AI <em>and software.</em></>, intro: "Essays about practical AI systems: how they are designed, where they break and what makes them genuinely useful to the people who rely on them.", about: "EDITORIAL NOTE", aboutTitle: "Technical ideas, written for people.", aboutText: "This is a growing editorial archive. I will add more project notes, technical breakdowns and essays here as my work evolves. The writing is grounded in public project work and a simple conviction: strong technical systems should be understandable, reviewable and designed around the people who use them.", articlesLabel: "LATEST ARTICLES", articlesInfo: "Six essays · bilingual", portfolio: "Main portfolio", read: "Read article",
  },
  fr: {
    back: "Retour au portfolio", contact: "Me contacter", label: "ARTICLES", title: <>Notes sur l’IA <em>et le logiciel.</em></>, intro: "Des essais sur les systèmes d’IA concrets : leur conception, leurs points de rupture et ce qui les rend réellement utiles aux personnes qui s’en servent.", about: "NOTE ÉDITORIALE", aboutTitle: "Des idées techniques, écrites pour les personnes.", aboutText: "Cette archive éditoriale est amenée à grandir. J’y ajouterai d’autres notes de projet, décryptages techniques et essais au fil de mes travaux. Les articles s’appuient sur des projets publics et sur une conviction simple : les systèmes techniques solides doivent être compréhensibles, vérifiables et conçus autour des personnes qui les utilisent.", articlesLabel: "DERNIERS ARTICLES", articlesInfo: "Six essais · bilingues", portfolio: "Portfolio principal", read: "Lire l’article",
  },
}

export default function ArticlesPage() {
  const [language, setLanguage] = useState<ArticleLanguage>("en")
  const copy = pageContent[language]
  const articles = articleContent[language]

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language")
    if (savedLanguage === "en" || savedLanguage === "fr") setLanguage(savedLanguage)
  }, [])

  const changeLanguage = (value: ArticleLanguage) => {
    setLanguage(value)
    window.localStorage.setItem("portfolio-language", value)
  }

  return <main className="hub-page articles-page">
    <header className="hub-header"><Link href="/"><MoveLeft size={16} />{copy.back}</Link><div className="hub-header-actions"><LanguageToggle language={language} onLanguageChange={changeLanguage} /><a href="mailto:cbrzyski2@gmail.com?subject=Article"><PenLine size={16} />{copy.contact}</a></div></header>
    <section className="hub-hero articles-hero"><p>{copy.label}</p><h1>{copy.title}</h1><div><p>{copy.intro}</p></div></section>
    <section className="editorial-intro"><div><p className="case-label">{copy.about}</p><h2>{copy.aboutTitle}</h2></div><p>{copy.aboutText}</p></section>
    <section className="article-list"><div className="article-list-heading"><p>{copy.articlesLabel}</p><span>{copy.articlesInfo}</span></div>{articles.map((article) => <Link className="draft-article" href={`/articles/${article.slug}`} key={article.slug}><span>{article.number} / {article.date}</span><div><p>{article.topic} · <Clock3 size={13} /> {article.readTime}</p><h2>{article.title}</h2><p>{article.subtitle}</p></div><ArrowUpRight aria-label={copy.read} size={22} /></Link>)}</section>
    <section className="writing-note"><PenLine size={24} /><div><p>{copy.label}</p><h2>{language === "en" ? "More articles will be added here: project notes, engineering experiments and lessons from building applied AI systems." : "D’autres articles seront ajoutés ici : notes de projet, expérimentations d’ingénierie et retours sur la construction de systèmes d’IA appliquée."}</h2></div></section>
    <footer className="hub-footer"><span>© 2026 Cédric Brzyski</span><Link href="/">{copy.portfolio}</Link></footer>
  </main>
}
