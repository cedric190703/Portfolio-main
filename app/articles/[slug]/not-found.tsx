import Link from "next/link"

export default function ArticleNotFound() {
  return <main className="article-page article-reading">
    <header className="article-header">
      <p>404</p>
      <h1>Article not found</h1>
      <p>This article is unavailable. Explore the archive to keep reading.</p>
      <p lang="fr">Cet article est introuvable. Retrouvez les autres textes dans les archives.</p>
      <Link className="article-contact" href="/articles">All articles / Tous les articles</Link>
    </header>
  </main>
}
