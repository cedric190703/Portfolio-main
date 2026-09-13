import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ArticleReader from "@/components/article-reader"
import { articleContent } from "@/lib/articles"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return articleContent.en.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articleContent.en.find((item) => item.slug === slug)
  if (!article) notFound()
  return {
    title: `${article.title} — Cédric Brzyski`,
    description: article.subtitle,
    openGraph: { type: "article", title: article.title, description: article.subtitle, authors: ["Cédric Brzyski"] },
    twitter: { card: "summary", title: article.title, description: article.subtitle },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  if (!articleContent.en.some((article) => article.slug === slug)) notFound()
  return <ArticleReader slug={slug} />
}
