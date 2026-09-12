"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Clock3, MoveLeft } from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { articleContent, type ArticleLanguage } from "@/lib/articles"

function Diagram({ type, language }: { type: "agent" | "offline" | "uncertainty"; language: ArticleLanguage }) {
  const englishLabels = type === "agent"
    ? ["Request", "Retrieve", "Plan", "Tools", "Review", "Deliver"]
    : type === "offline"
      ? ["Audio", "Transcript", "Local model", "Translation"]
      : ["Model output", "Confidence", "Context", "User action"]
  const frenchLabels = type === "agent"
    ? ["Demande", "Contexte", "Plan", "Outils", "Revue", "Livraison"]
    : type === "offline"
      ? ["Audio", "Transcription", "Modèle local", "Traduction"]
      : ["Sortie modèle", "Confiance", "Contexte", "Action utilisateur"]
  const labels = language === "fr" ? frenchLabels : englishLabels

  return <div className={`article-diagram ${type}`} aria-label={`${type} workflow diagram`}>
    {labels.map((label, index) => <div className="diagram-step" key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong></div>)}
  </div>
}

export default function ArticlePage() {
  const [language, setLanguage] = useState<ArticleLanguage>("en")
  const params = useParams<{ slug: string }>()
  const article = articleContent[language].find((item) => item.slug === params.slug)

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language")
    if (savedLanguage === "en" || savedLanguage === "fr") setLanguage(savedLanguage)
  }, [])

  const changeLanguage = (value: ArticleLanguage) => {
    setLanguage(value)
    window.localStorage.setItem("portfolio-language", value)
  }

  if (!article) return <main className="article-page"><p>Article not found.</p><Link href="/articles">Back to articles</Link></main>

  const copy = language === "en"
    ? { back: "All articles", published: "Published", takeaway: "Key takeaway", diagram: "System sketch", contact: "Discuss this article" }
    : { back: "Tous les articles", published: "Publié", takeaway: "À retenir", diagram: "Schéma du système", contact: "Discuter de cet article" }

  return <main className="article-page">
    <header className="hub-header"><Link href="/articles"><MoveLeft size={16} />{copy.back}</Link><LanguageToggle language={language} onLanguageChange={changeLanguage} /></header>
    <article className="article-reading">
      <header className="article-header">
        <div className="article-kicker"><span>{article.number} / {article.topic}</span><span>{copy.published} · {article.date}</span></div>
        <h1>{article.title}</h1>
        <p>{article.subtitle}</p>
        <div className="article-meta"><Clock3 size={15} />{article.readTime}</div>
      </header>

      <div className="article-layout">
        <aside className="article-aside"><p>{copy.takeaway}</p><strong>{article.takeaway}</strong></aside>
        <div className="article-body">
          <p className="article-dek">{article.dek}</p>
          {article.sections.map((section, index) => <section key={section.heading}><p className="article-section-number">{String(index + 1).padStart(2, "0")}</p><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{index === 1 && <figure><div><p>{copy.diagram}</p><h3>{article.diagramTitle}</h3><Diagram type={article.diagram} language={language} /></div><figcaption>{article.diagramCaption}</figcaption></figure>}</section>)}
          <Link className="article-contact" href="mailto:cbrzyski2@gmail.com?subject=Portfolio%20article"><span>{copy.contact}</span><ArrowLeft size={17} /></Link>
        </div>
      </div>
    </article>
    <footer className="hub-footer"><span>© 2026 Cédric Brzyski</span><Link href="/">Portfolio</Link></footer>
  </main>
}
