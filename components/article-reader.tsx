"use client"

import Link from "next/link"
import { useEffect, useState, type ReactNode } from "react"
import { ArrowLeft, Clock3, MoveLeft } from "lucide-react"

import { ArticleDiagram } from "@/components/article-diagrams"
import { LanguageToggle } from "@/components/language-toggle"
import { articleContent, type Article, type ArticleLanguage, type Block } from "@/lib/articles"

// Inline `code` and **bold** inside prose blocks.
function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean).map((part, i) => {
    if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>
    return <span key={i}>{part}</span>
  })
}

function Figure({ article, language, label }: { article: Article; language: ArticleLanguage; label: string }) {
  return <figure>
    <div><p>{label}</p><h3>{article.diagramTitle}</h3><ArticleDiagram kind={article.diagram} language={language} /></div>
    <figcaption>{article.diagramCaption}</figcaption>
  </figure>
}

function renderBlock(block: Block, index: number, article: Article, language: ArticleLanguage, figureLabel: string) {
  switch (block.type) {
    case "p": return <p key={index}>{inline(block.text)}</p>
    case "code": return <div className="article-code" key={index}><div className="article-code-bar"><span>{block.lang}</span>{block.caption && <em>{block.caption}</em>}</div><pre><code>{block.code}</code></pre></div>
    case "list": return block.ordered
      ? <ol className="article-list" key={index}>{block.items.map((item) => <li key={item}>{inline(item)}</li>)}</ol>
      : <ul className="article-list" key={index}>{block.items.map((item) => <li key={item}>{inline(item)}</li>)}</ul>
    case "quote": return <blockquote className="article-quote" key={index}><p>{block.text}</p>{block.cite && <cite>{block.cite}</cite>}</blockquote>
    case "table": return <div className="article-table" key={index}><table><thead><tr>{block.head.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{block.rows.map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={c}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>
    case "note": return <aside className="article-note" key={index}><strong>{block.label}</strong><p>{inline(block.text)}</p></aside>
    case "figure": return <Figure key={index} article={article} language={language} label={figureLabel} />
  }
}

export default function ArticleReader({ slug }: { slug: string }) {
  const [language, setLanguage] = useState<ArticleLanguage>("en")
  const article = articleContent[language].find((item) => item.slug === slug)

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
    ? { back: "All articles", published: "Published", takeaway: "Key takeaway", diagram: "Diagram", contact: "Discuss this article", more: "More articles" }
    : { back: "Tous les articles", published: "Publié", takeaway: "À retenir", diagram: "Schéma", contact: "Discuter de cet article", more: "Autres articles" }
  const others = articleContent[language].filter((item) => item.slug !== article.slug).slice(0, 3)

  return <main className="article-page" lang={language}>
    <header className="hub-header"><Link href="/articles"><MoveLeft size={16} />{copy.back}</Link><LanguageToggle language={language} onLanguageChange={changeLanguage} /></header>
    <article className="article-reading">
      <header className="article-header">
        <div className="article-kicker"><span>{article.number} / {article.topic}</span><span>{copy.published} · {article.date}</span></div>
        <h1>{article.title}</h1>
        <p>{article.subtitle}</p>
        <div className="article-meta"><Clock3 size={15} />{article.readTime}</div>
      </header>

      <div className="article-layout">
        <aside className="article-aside">
          <p>{copy.takeaway}</p><strong>{article.takeaway}</strong>
          <nav className="article-toc" aria-label="Sections">{article.sections.map((section, index) => <a key={section.heading} href={`#s${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.heading}</a>)}</nav>
        </aside>
        <div className="article-body">
          <p className="article-dek">{article.dek}</p>
          {article.sections.map((section, index) => <section key={section.heading} id={`s${index + 1}`}>
            <p className="article-section-number">{String(index + 1).padStart(2, "0")}</p>
            <h2>{section.heading}</h2>
            {section.blocks.map((block, b) => renderBlock(block, b, article, language, copy.diagram))}
          </section>)}
          <a className="article-contact" href={`mailto:cbrzyski2@gmail.com?subject=${encodeURIComponent(article.title)}`}><span>{copy.contact}</span><ArrowLeft size={17} /></a>
          <section className="article-more"><p className="article-section-number">{copy.more}</p>{others.map((item) => <Link key={item.slug} href={`/articles/${item.slug}`}><span>{item.number}</span><strong>{item.title}</strong><small>{item.topic} · {item.readTime}</small></Link>)}</section>
        </div>
      </div>
    </article>
    <footer className="hub-footer"><span>© 2026 Cédric Brzyski</span><Link href="/">Portfolio</Link></footer>
  </main>
}
