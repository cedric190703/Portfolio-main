"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Clock3, MoveLeft } from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { articleContent, type ArticleLanguage } from "@/lib/articles"

function Diagram({ type, language }: { type: "agent" | "offline" | "uncertainty" | "harness" | "project"; language: ArticleLanguage }) {
  const englishLabels = type === "agent"
    ? ["Request", "Retrieve", "Plan", "Tools", "Review", "Deliver"]
    : type === "offline"
      ? ["Audio", "Transcript", "Local model", "Translation"]
      : type === "uncertainty"
        ? ["Model output", "Confidence", "Context", "User action"]
        : type === "harness"
          ? ["Task", "Context", "Tools", "Policy", "Trace", "Evaluate"]
          : ["Voice", "Capture", "Transcribe", "Translate", "Review", "Retry"]
  const frenchLabels = type === "agent"
    ? ["Demande", "Contexte", "Plan", "Outils", "Revue", "Livraison"]
    : type === "offline"
      ? ["Audio", "Transcription", "Modèle local", "Traduction"]
      : type === "uncertainty"
        ? ["Sortie modèle", "Confiance", "Contexte", "Action utilisateur"]
        : type === "harness"
          ? ["Tâche", "Contexte", "Outils", "Politique", "Trace", "Évaluer"]
          : ["Voix", "Capture", "Transcrire", "Traduire", "Revoir", "Réessayer"]
  const labels = language === "fr" ? frenchLabels : englishLabels
  const systemLabel = language === "fr" ? "SYSTÈME" : "SYSTEM"
  const feedback = language === "fr" ? "Boucle de retour : observer → vérifier → améliorer → réexécuter" : "Feedback loop: observe → verify → improve → run again"

  return <div className="article-diagram" aria-label={`${type} workflow diagram`}>
    <div className="diagram-system-label"><span>{systemLabel}</span><i /></div>
    <div className={`diagram-nodes ${type}`}>{labels.map((label, index) => <div className="diagram-step" key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong></div>)}</div>
    <div className="diagram-feedback"><span>↺</span>{feedback}</div>
  </div>
}

const systemNotes = {
  en: {
    agent: [["Boundary", "A defined task, evidence format and stop condition."], ["Control", "Typed tool calls and checkpoints between decisions."], ["Proof", "Sources and intermediate outputs available at review time."]],
    offline: [["Boundary", "No network, limited memory and variable device performance."], ["Control", "A local path with explicit retries and saved state."], ["Proof", "The user can see that processing remains on-device."]],
    uncertainty: [["Boundary", "A score is only useful when it changes a decision."], ["Control", "Reveal uncertainty where correction is possible."], ["Proof", "Give context, alternatives or source material—not just a percentage."]],
    harness: [["Boundary", "Constrained context, tools and permissions around a task."], ["Control", "Policies, sandboxes and typed contracts before actions execute."], ["Proof", "A trace and an evaluation set make behavior inspectable."]],
    project: [["Boundary", "Emergency communication with no assumed connectivity."], ["Control", "On-device transcription, local translation and a recovery path."], ["Proof", "Confidence cues let the user verify before relying on a result."]],
  },
  fr: {
    agent: [["Limite", "Une tâche définie, un format de preuve et une condition d’arrêt."], ["Contrôle", "Des appels d’outils typés et des points de contrôle entre les décisions."], ["Preuve", "Sources et sorties intermédiaires disponibles au moment de la revue."]],
    offline: [["Limite", "Pas de réseau, une mémoire limitée et des performances variables selon l’appareil."], ["Contrôle", "Un parcours local avec reprises explicites et état préservé."], ["Preuve", "L’utilisateur voit que le traitement reste sur l’appareil."]],
    uncertainty: [["Limite", "Un score n’est utile que s’il change une décision."], ["Contrôle", "Révéler l’incertitude là où une correction est possible."], ["Preuve", "Donner du contexte, des alternatives ou la source, pas seulement un pourcentage."]],
    harness: [["Limite", "Contexte, outils et permissions contraints autour d’une tâche."], ["Contrôle", "Politiques, sandbox et contrats typés avant l’exécution d’actions."], ["Preuve", "Une trace et un jeu d’évaluation rendent le comportement inspectable."]],
    project: [["Limite", "Communication d’urgence sans connectivité supposée."], ["Contrôle", "Transcription sur appareil, traduction locale et chemin de reprise."], ["Preuve", "Les repères de confiance permettent de vérifier avant de s’appuyer sur le résultat."]],
  },
} as const

const playbooks = {
  en: {
    agent: ["Define the decision, owner and stop condition before selecting a model.", "Store the evidence a reviewer will need beside each consequential output.", "Evaluate tool use and trajectory, not only the final answer.", "Add human review where an error would change a meaningful outcome."],
    offline: ["Write down the no-network promise in one sentence.", "Budget latency, memory, storage and battery before choosing the model.", "Make retry, correction and state recovery part of the primary flow.", "Explain local processing in the interface, not only in a privacy policy."],
    uncertainty: ["Show a signal only when it changes the next user action.", "Match the cue to the consequence of being wrong.", "Keep the main result readable and reveal details progressively.", "Make correction faster than working around the product."],
    harness: ["Constrain the task, context and permissions before adding more autonomy.", "Use narrow, typed tool interfaces with validation at the boundary.", "Record a trace that can explain a single run end to end.", "Turn recurring failures into representative evaluation cases."],
    project: ["Start from the operating environment, not the preferred stack.", "Keep the complete critical path on-device when the promise requires it.", "Surface uncertainty close to the result that needs checking.", "Test the workflow with the noise, language and time pressure of real use."],
  },
  fr: {
    agent: ["Définir la décision, son responsable et la condition d’arrêt avant de choisir un modèle.", "Conserver les preuves dont un relecteur aura besoin près de chaque sortie conséquente.", "Évaluer l’usage d’outils et la trajectoire, pas seulement la réponse finale.", "Ajouter une revue humaine là où une erreur changerait un résultat important."],
    offline: ["Écrire en une phrase la promesse de fonctionnement sans réseau.", "Budgéter latence, mémoire, stockage et batterie avant de choisir le modèle.", "Faire de la reprise, de la correction et de la récupération d’état une partie du flux principal.", "Expliquer le traitement local dans l’interface, pas seulement dans une politique de confidentialité."],
    uncertainty: ["N’afficher un signal que s’il modifie l’action suivante de l’utilisateur.", "Adapter le repère à la conséquence d’une erreur.", "Garder le résultat principal lisible et révéler les détails progressivement.", "Rendre la correction plus rapide que le contournement du produit."],
    harness: ["Contraindre la tâche, le contexte et les permissions avant d’ajouter de l’autonomie.", "Utiliser des interfaces d’outils étroites et typées, avec validation à la frontière.", "Enregistrer une trace qui explique un run de bout en bout.", "Transformer les échecs récurrents en cas d’évaluation représentatifs."],
    project: ["Partir de l’environnement d’utilisation, pas de la stack préférée.", "Garder le chemin critique complet sur l’appareil lorsque la promesse l’exige.", "Afficher l’incertitude près du résultat qui doit être vérifié.", "Tester le workflow avec le bruit, les langues et la pression temporelle de l’usage réel."],
  },
} as const

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
    ? { back: "All articles", published: "Published", takeaway: "Key takeaway", diagram: "System sketch", lens: "Engineering lenses", playbook: "Practical playbook", contact: "Discuss this article" }
    : { back: "Tous les articles", published: "Publié", takeaway: "À retenir", diagram: "Schéma du système", lens: "Angles d’ingénierie", playbook: "Checklist pratique", contact: "Discuter de cet article" }
  const notes = systemNotes[language][article.diagram]
  const playbook = playbooks[language][article.diagram]

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
          {article.sections.map((section, index) => <section key={section.heading}><p className="article-section-number">{String(index + 1).padStart(2, "0")}</p><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{index === 1 && <figure><div><p>{copy.diagram}</p><h3>{article.diagramTitle}</h3><Diagram type={article.diagram} language={language} /><div className="diagram-insights">{notes.map(([label, text]) => <div key={label}><strong>{label}</strong><span>{text}</span></div>)}</div></div><figcaption>{article.diagramCaption}</figcaption></figure>}</section>)}
          <section className="article-playbook"><p className="article-section-number">{copy.playbook}</p><ol>{playbook.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>
          <Link className="article-contact" href="mailto:cbrzyski2@gmail.com?subject=Portfolio%20article"><span>{copy.contact}</span><ArrowLeft size={17} /></Link>
        </div>
      </div>
    </article>
    <footer className="hub-footer"><span>© 2026 Cédric Brzyski</span><Link href="/">Portfolio</Link></footer>
  </main>
}
