import { articlesEn } from "@/lib/article-content/en"
import { articlesFr } from "@/lib/article-content/fr"

export type ArticleLanguage = "en" | "fr"

export type DiagramKind = "agent" | "offline" | "uncertainty" | "harness" | "project" | "robotics" | "bci"

// Articles are built from blocks so each piece can have its own shape:
// a project note can lean on code and lists, an essay on prose and a table.
// Paragraph text may use `backticks` for inline code.
export type Block =
  | { type: "p"; text: string }
  | { type: "code"; lang: string; code: string; caption?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; cite?: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "note"; label: string; text: string }
  | { type: "figure" }
  | { type: "references"; items: Array<{ title: string; url: string }> }

export type Article = {
  slug: string
  number: string
  topic: string
  date: string
  readTime: string
  title: string
  subtitle: string
  dek: string
  takeaway: string
  diagram: DiagramKind
  diagramTitle: string
  diagramCaption: string
  sections: Array<{ heading: string; blocks: Block[] }>
}

export const articleContent: Record<ArticleLanguage, Article[]> = { en: articlesEn, fr: articlesFr }
