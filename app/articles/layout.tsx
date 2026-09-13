import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Articles — Cédric Brzyski",
  description: "Bilingual essays on applied AI, offline systems, robotics and software engineering by Cédric Brzyski.",
}

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return children
}
