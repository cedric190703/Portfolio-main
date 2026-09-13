"use client"

import { useId, useState } from "react"
import { ArrowDown, ArrowRight, GitCompareArrows, Layers3, RotateCw, Workflow } from "lucide-react"
import type { ArticleLanguage, VisualSchema } from "@/lib/articles"

const icons = { flow: Workflow, layers: Layers3, compare: GitCompareArrows, cycle: RotateCw }

export function ArticleSchema({ visual, language, number, id }: { visual: VisualSchema; language: ArticleLanguage; number: number; id: string }) {
  const [selected, setSelected] = useState(0)
  const detailId = useId()
  const Icon = icons[visual.layout]
  const node = visual.nodes[selected]
  const fr = language === "fr"
  const layouts = fr
    ? { flow: "Flux de données", layers: "Architecture", compare: "Comparaison", cycle: "Boucle de retour" }
    : { flow: "Data flow", layers: "Architecture", compare: "Comparison", cycle: "Feedback loop" }

  return <figure className={`article-schema schema-${visual.layout}`} id={id} aria-labelledby={`${id}-title`}>
    <div className="schema-heading">
      <p><Icon size={15} aria-hidden="true" />{fr ? "Schéma" : "Figure"} {String(number).padStart(2, "0")}<span>{layouts[visual.layout]}</span></p>
      <h3 id={`${id}-title`}>{visual.title}</h3>
      <div className="schema-instruction">{fr ? "Sélectionnez un élément pour explorer son rôle." : "Select an element to explore its role."}</div>
    </div>
    <div className="schema-canvas">
      <div className="schema-nodes" role="group" aria-label={visual.title}>
        {visual.nodes.map((item, index) => <div className="schema-step" key={item.title}>
          <button type="button" className="schema-node" aria-pressed={selected === index} aria-controls={detailId} onClick={() => setSelected(index)}>
            <span className="schema-node-number">{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.title}</strong>
            <span className="schema-node-summary">{item.summary}</span>
          </button>
          {index < visual.nodes.length - 1 && visual.layout !== "compare" && <span className="schema-connector" aria-hidden="true"><ArrowRight size={17} /><ArrowDown size={17} /></span>}
        </div>)}
      </div>
      {visual.layout === "cycle" && <div className="schema-return"><RotateCw size={14} aria-hidden="true" />{fr ? "Le résultat alimente l’itération suivante" : "The result informs the next iteration"}</div>}
      <div className="schema-detail" id={detailId} aria-live="polite" aria-atomic="true">
        <span>{String(selected + 1).padStart(2, "0")} / {String(visual.nodes.length).padStart(2, "0")}</span>
        <div><strong>{node.title}</strong><p>{node.detail}</p></div>
      </div>
    </div>
    <figcaption>{visual.caption}</figcaption>
  </figure>
}
