"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Clock3, MoveLeft } from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { articleContent, type ArticleLanguage } from "@/lib/articles"

type DiagramType = "agent" | "offline" | "uncertainty" | "harness" | "project"

function SystemGraph({ type, language, variant = "runtime" }: { type: DiagramType; language: ArticleLanguage; variant?: "runtime" | "assurance" }) {
  const english = {
    agent: ["Task & sources", "Evidence retrieval", "Task planner", "Typed tool gateway", "Policy & approval", "Review queue", "Decision / draft", "Run trace store", "Evaluation suite"],
    offline: ["Voice input", "Local session state", "Audio pipeline", "Local inference", "No-network budget", "Confidence check", "Translation", "Device diagnostics", "Device test matrix"],
    uncertainty: ["Model result", "Evidence & ambiguity", "Confidence policy", "Alternative / replay", "Risk threshold", "Correction surface", "Actionable result", "Correction events", "Calibration tests"],
    harness: ["Task specification", "Context selection", "Agent runtime", "Typed tool interface", "Permissions & sandbox", "Approval boundary", "Scoped outcome", "Trace / spans", "Regression suite"],
    project: ["Voice capture", "Local session state", "Android orchestration", "whisper.cpp + Qwen", "Offline / privacy", "Confidence + retry", "Checkable translation", "On-device diagnostics", "Field test matrix"],
  } as const
  const french = {
    agent: ["Tâche & sources", "Recherche de preuves", "Planificateur", "Passerelle d’outils typés", "Politique & approbation", "File de revue", "Décision / brouillon", "Stockage des traces", "Suite d’évaluation"],
    offline: ["Entrée vocale", "État local de session", "Pipeline audio", "Inférence locale", "Budget sans réseau", "Contrôle de confiance", "Traduction", "Diagnostics appareil", "Matrice de test appareil"],
    uncertainty: ["Résultat modèle", "Preuves & ambiguïté", "Politique de confiance", "Alternative / réécoute", "Seuil de risque", "Surface de correction", "Résultat exploitable", "Événements correction", "Tests de calibrage"],
    harness: ["Spécification de tâche", "Sélection du contexte", "Runtime agent", "Interface d’outils typée", "Permissions & sandbox", "Frontière d’approbation", "Résultat cadré", "Traces / spans", "Suite de régression"],
    project: ["Capture vocale", "État local de session", "Orchestration Android", "whisper.cpp + Qwen", "Hors ligne / vie privée", "Confiance + reprise", "Traduction vérifiable", "Diagnostics sur appareil", "Matrice terrain"],
  } as const
  const labels = (language === "fr" ? french : english)[type]
  const edge = language === "fr"
    ? { input: "entrée", context: "contexte sélectionné", command: "commande typée", result: "résultat structuré", permit: "autorise / bloque", review: "brouillon + preuves", approved: "validé", trace: "événements", history: "historique de run", feedback: "retour de régression", observes: "observe", escalates: "escalade" }
    : { input: "input", context: "selected context", command: "typed command", result: "structured result", permit: "allow / deny", review: "draft + evidence", approved: "approved", trace: "events", history: "run history", feedback: "regression feedback", observes: "observes", escalates: "escalates" }
  const marker = `arrow-${type}-${variant}`
  const Node = ({ x, y, label, kind }: { x: number; y: number; label: string; kind: "input" | "compute" | "control" | "human" | "store" }) => {
    const lines = label.length > 21 ? [label.slice(0, label.lastIndexOf(" ", 21)), label.slice(label.lastIndexOf(" ", 21) + 1)] : [label]
    return <g transform={`translate(${x} ${y})`} className={`system-node ${kind}`}><rect width="156" height="58" rx="7" /><text x="12" y={lines.length === 1 ? 34 : 25}>{lines.map((line, index) => <tspan x="12" dy={index === 0 ? 0 : 15} key={`${line}-${index}`}>{line}</tspan>)}</text></g>
  }
  const Arrow = ({ d, label, x, y, control = false }: { d: string; label: string; x: number; y: number; control?: boolean }) => <g><path d={d} className={`system-edge${control ? " control" : ""}`} markerEnd={`url(#${control ? `${marker}-control` : marker})`} /><rect x={x - 4} y={y - 11} width={Math.max(46, label.length * 5.2)} height="16" rx="3" className="system-edge-backdrop" /><text x={x} y={y} className="system-edge-label">{label}</text></g>

  const swipeHint = language === "fr" ? "← faites glisser pour explorer le schéma →" : "← swipe to explore the system map →"

  if (variant === "assurance") return <div className="system-graph" data-swipe-hint={swipeHint} aria-label={`${type} assurance architecture`}>
    <svg viewBox="0 0 720 460" role="img" aria-label={`${type} control-plane map`}>
      <defs><marker id={marker} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path className="system-marker" d="M0,0 L8,4.5 L0,9 Z" /></marker><marker id={`${marker}-control`} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path className="system-marker control" d="M0,0 L8,4.5 L0,9 Z" /></marker></defs>
      <rect x="1" y="1" width="718" height="458" rx="10" className="system-frame" />
      <text x="28" y="38" className="system-zone">CONTROL PLANE</text><text x="28" y="60" className="system-subtitle">policy, review and evidence change what the runtime is allowed to do</text>
      <rect x="24" y="82" width="672" height="304" rx="10" className="system-group" />
      <Node x={282} y={190} label={labels[2]} kind="compute" /><Node x={42} y={120} label={labels[4]} kind="control" /><Node x={42} y={278} label={labels[5]} kind="human" /><Node x={522} y={120} label={labels[7]} kind="store" /><Node x={522} y={278} label={labels[8]} kind="control" /><Node x={282} y={322} label={labels[6]} kind="input" />
      <Arrow d="M198 149 C246 149 239 203 282 213" label={edge.permit} x={207} y={170} control /><Arrow d="M282 230 C228 239 218 299 198 307" label={edge.escalates} x={205} y={261} control /><Arrow d="M438 215 C476 202 488 157 522 149" label={edge.trace} x={452} y={179} /><Arrow d="M438 232 C480 250 489 295 522 307" label={edge.history} x={454} y={273} /><Arrow d="M522 307 C476 363 454 370 438 351" label={edge.feedback} x={448} y={392} control /><Arrow d="M360 248 V322" label={edge.approved} x={372} y={286} /><Arrow d="M360 322 C350 291 280 292 198 307" label={edge.observes} x={252} y={299} control />
      <text x="38" y="424" className="system-legend"><tspan className="legend-data">●</tspan> data flow&nbsp;&nbsp;&nbsp; <tspan className="legend-control">– –</tspan> control / policy flow&nbsp;&nbsp;&nbsp; <tspan className="legend-human">●</tspan> human decision</text>
    </svg>
  </div>

  return <div className="system-graph" data-swipe-hint={swipeHint} aria-label={`${type} system architecture`}>
    <svg viewBox="0 0 720 540" role="img" aria-label={`${type} runtime system map`}>
      <defs><marker id={marker} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path className="system-marker" d="M0,0 L8,4.5 L0,9 Z" /></marker><marker id={`${marker}-control`} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path className="system-marker control" d="M0,0 L8,4.5 L0,9 Z" /></marker></defs>
      <rect x="1" y="1" width="718" height="538" rx="10" className="system-frame" />
      <text x="28" y="38" className="system-zone">RUNTIME DATA FLOW</text><text x="28" y="60" className="system-subtitle">each arrow carries a specific artifact or decision, not an opaque handoff</text>
      <rect x="24" y="82" width="672" height="348" rx="10" className="system-group" />
      <Node x={30} y={175} label={labels[0]} kind="input" /><Node x={204} y={175} label={labels[1]} kind="store" /><Node x={378} y={175} label={labels[2]} kind="compute" /><Node x={552} y={175} label={labels[3]} kind="compute" />
      <Node x={30} y={325} label={labels[4]} kind="control" /><Node x={204} y={325} label={labels[5]} kind="human" /><Node x={378} y={325} label={labels[7]} kind="store" /><Node x={552} y={325} label={labels[8]} kind="control" /><Node x={291} y={414} label={labels[6]} kind="input" />
      <Arrow d="M186 204 H204" label={edge.input} x={173} y={191} /><Arrow d="M360 204 H378" label={edge.context} x={326} y={191} /><Arrow d="M534 204 H552" label={edge.command} x={500} y={191} /><Arrow d="M552 230 H534" label={edge.result} x={534} y={251} /><Arrow d="M630 325 C630 286 630 267 630 233" label={edge.trace} x={640} y={279} /><Arrow d="M552 208 C488 274 409 330 360 354" label={edge.review} x={442} y={279} /><Arrow d="M282 383 C282 401 332 400 369 414" label={edge.approved} x={290} y={400} /><Arrow d="M186 354 C236 354 297 298 378 230" label={edge.permit} x={225} y={326} control /><Arrow d="M534 354 H552" label={edge.history} x={500} y={342} /><Arrow d="M630 325 C674 265 627 137 534 204" label={edge.feedback} x={596} y={143} control />
      <line x1="38" y1="493" x2="682" y2="493" className="system-legend-rule" />
      <text x="38" y="520" className="system-legend"><tspan className="legend-data">●</tspan> data flow&nbsp;&nbsp;&nbsp; <tspan className="legend-control">– –</tspan> control / policy flow&nbsp;&nbsp;&nbsp; <tspan className="legend-human">●</tspan> human decision</text>
    </svg>
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

const operatingMatrices = {
  en: {
    agent: [["Context", "Relevant source is missing", "Measure evidence coverage before review"], ["Tools", "A valid-looking call changes the wrong thing", "Validate arguments and preserve the tool result"], ["Review", "A polished answer hides weak reasoning", "Require evidence for consequential claims"]],
    offline: [["Device", "Inference exhausts the available budget", "Track latency, memory and battery on target hardware"], ["Recognition", "Noise or accent degrades the transcript", "Expose replay and correction next to the result"], ["Recovery", "A failed step loses the user’s place", "Persist state and make retry deterministic"]],
    uncertainty: [["Signal", "A confidence value does not change behavior", "Test whether users take the intended next action"], ["Context", "The warning lacks a reason", "Show the ambiguous word, source or alternative"], ["Correction", "Fixing the result costs more than ignoring it", "Measure time-to-correction, not just model accuracy"]],
    harness: [["Scope", "The agent receives more capability than the task needs", "Review permissions and tool surface per workflow"], ["Trace", "A failure cannot be reconstructed", "Record model, tool, guardrail and handoff events"], ["Evaluation", "A change improves one demo but breaks another", "Run a representative suite before release"]],
    project: [["Field use", "The device has no workable connection", "Verify the critical path stays local"], ["Language", "Speech is unclear or vocabulary is unfamiliar", "Test accents, noise and emergency terminology"], ["Trust", "The user assumes every translation is final", "Make verification and rephrasing visible"]],
  },
  fr: {
    agent: [["Contexte", "Une source pertinente manque", "Mesurer la couverture des preuves avant la revue"], ["Outils", "Un appel plausible modifie la mauvaise chose", "Valider les arguments et conserver le résultat de l’outil"], ["Revue", "Une réponse polie masque un raisonnement faible", "Exiger des preuves pour les affirmations conséquentes"]],
    offline: [["Appareil", "L’inférence dépasse le budget disponible", "Suivre latence, mémoire et batterie sur le matériel cible"], ["Reconnaissance", "Bruit ou accent dégrade la transcription", "Proposer réécoute et correction près du résultat"], ["Reprise", "Une étape échouée fait perdre le contexte", "Préserver l’état et rendre la reprise déterministe"]],
    uncertainty: [["Signal", "Une confiance n’entraîne aucun changement de comportement", "Tester si l’utilisateur fait l’action suivante attendue"], ["Contexte", "L’avertissement n’explique pas sa raison", "Montrer le mot ambigu, la source ou une alternative"], ["Correction", "Réparer coûte plus cher qu’ignorer", "Mesurer le temps de correction, pas seulement la précision"]],
    harness: [["Périmètre", "L’agent reçoit plus de capacité que la tâche n’en demande", "Revoir permissions et surface d’outils par workflow"], ["Trace", "Un échec ne peut pas être reconstruit", "Enregistrer modèle, outils, garde-fous et handoffs"], ["Évaluation", "Un changement améliore une démo mais en casse une autre", "Exécuter un jeu représentatif avant publication"]],
    project: [["Terrain", "L’appareil n’a pas de connexion exploitable", "Vérifier que le chemin critique reste local"], ["Langue", "La parole est peu claire ou le vocabulaire inconnu", "Tester accents, bruit et terminologie d’urgence"], ["Confiance", "L’utilisateur suppose chaque traduction définitive", "Rendre vérification et reformulation visibles"]],
  },
} as const

const dossiers = {
  en: {
    agent: { title: "Implementation dossier: make every handoff inspectable", text: ["A production agent should not pass a free-form paragraph from one step to the next. Each handoff needs a contract: a retrieval step returns sources with identifiers, a planning step returns a bounded action list, a tool call returns structured data, and a review step receives both the result and the evidence behind it. This makes an agent easier to test because failure has a location. If the final finding is weak, the team can ask whether the source selection, extraction, tool call or review rule was at fault instead of rewriting one giant prompt.", "The practical unit of improvement is therefore the run, not the model answer. Record the input version, selected evidence, tool arguments, tool results, review decision, latency and cost. Then build a small evaluation set from real representative tasks—not only happy paths. A change earns its way into the workflow when it improves the relevant failure mode without making the rest of the run less safe, slower or harder to review."], actors: ["User", "Workflow", "Agent", "Reviewer"], steps: ["submits task + sources", "retrieves and plans", "returns evidence-backed draft", "approves or corrects"] },
    offline: { title: "Implementation dossier: budget the whole local path", text: ["Local-first design succeeds or fails at the boundaries around the model. An implementation needs a budget for cold start, model loading, recording, inference, rendering and recovery. The slowest stage sets the pace of the experience; if transcription takes too long, a strong translation model later in the pipeline cannot rescue the interaction. Measuring on the target device matters more than a benchmark on a development machine, because memory pressure and thermal limits are part of the product constraint.", "The product contract should also be visible in state transitions. A person needs to know whether the app is listening, processing, ready to check or safe to retry. Persisting the current transcript and selected language avoids turning a recoverable model failure into lost work. This is the kind of implementation detail that determines whether an offline tool feels dependable in a constrained setting."], actors: ["Speaker", "Device", "Local models", "User"], steps: ["records phrase", "captures state", "transcribes + translates", "checks or retries"] },
    uncertainty: { title: "Implementation dossier: connect confidence to a recovery path", text: ["Confidence should be treated as a routing signal, not decorative telemetry. First decide which uncertainty classes matter: unclear audio, missing source support, a near-tie between labels or a tool response outside its expected range. Then define the recovery action for each class. It may be replaying audio, surfacing the supporting excerpt, asking a targeted clarification or escalating to a reviewer. Without that action, a confidence number creates anxiety without offering control.", "Validation needs to test the interaction rather than only the score. Use examples that are deliberately ambiguous and observe whether users spot the risk, understand why it appeared and can recover quickly. The useful metric is not only calibration; it is whether the interface changed a risky decision into an informed one. A well-designed uncertainty cue can be small, but it has to arrive at the moment a correction is still cheap."], actors: ["Model", "Interface", "Evidence", "User"], steps: ["returns result + signal", "explains the signal", "offers context", "verifies or corrects"] },
    harness: { title: "Implementation dossier: treat the harness as the product surface", text: ["The harness is where an agent becomes an engineering system. It frames the task, selects context, narrows the tool surface, applies permissions and captures a trace. Those responsibilities should be separate enough to change independently. If a context policy is too broad, refine it without altering execution permissions. If a tool contract is unclear, type and validate it without retraining a model. This separation is what makes the system maintainable as models, tasks and risks evolve.", "A useful harness also has a release discipline. Run a representative evaluation suite before a change reaches users, inspect traces for regressions and keep the approval boundary explicit for consequential actions. This makes autonomy a controlled capability rather than a vague promise. The system can act quickly inside its guardrails while still making it clear who owns the final decision when the cost of error rises."], actors: ["Task", "Harness", "Agent", "Evaluation"], steps: ["frames task", "applies context + policy", "acts through tools", "records and scores run"] },
    project: { title: "Implementation dossier: build the interaction around field conditions", text: ["OfflineLingo’s architecture was driven by the absence of a dependable network. The critical path is intentionally short: voice capture, local speech recognition, local translation and an interface that leaves room to verify the output. whisper.cpp and a quantized Qwen 2.5 model through llama.cpp address the inference part, but the more important product decision is that the path remains useful without requesting a remote service or account at the moment of need.", "The interface is therefore part of the safety model. A strong recording affordance, visible processing state, rapid language switching and confidence-aware results reduce the chances that a user mistakes a partial or uncertain output for a final one. The next engineering step would be systematic field testing: device profiles, background noise, accents, vocabulary and interruption recovery. That is where a prototype becomes an accountable tool."], actors: ["Responder", "Android", "Local AI", "Partner"], steps: ["speaks phrase", "captures + transcribes", "translates locally", "checks then shares"] },
  },
  fr: {
    agent: { title: "Dossier d’implémentation : rendre chaque passage de relais inspectable", text: ["Un agent de production ne devrait pas transmettre un paragraphe libre d’une étape à l’autre. Chaque passage a besoin d’un contrat : la recherche retourne des sources identifiées, la planification une liste d’actions bornée, l’outil des données structurées et la revue reçoit le résultat avec ses preuves. L’agent devient testable parce que l’échec a une localisation. Si un constat final est faible, l’équipe peut déterminer si le problème vient des sources, de l’extraction, de l’outil ou de la revue plutôt que de réécrire un prompt géant.", "L’unité pratique d’amélioration est donc le run, pas la réponse du modèle. Enregistrez la version de l’entrée, les preuves sélectionnées, les arguments et résultats d’outils, la décision de revue, la latence et le coût. Construisez ensuite un petit jeu d’évaluation issu de tâches représentatives, pas seulement de cas favorables. Un changement mérite d’entrer dans le workflow lorsqu’il améliore le bon mode de défaillance sans rendre le run moins sûr, plus lent ou plus difficile à relire."], actors: ["Utilisateur", "Workflow", "Agent", "Relecteur"], steps: ["soumet tâche + sources", "recherche et planifie", "retourne un brouillon sourcé", "approuve ou corrige"] },
    offline: { title: "Dossier d’implémentation : budgéter tout le parcours local", text: ["Un design local-first réussit ou échoue aux frontières autour du modèle. L’implémentation doit budgéter le démarrage, le chargement, l’enregistrement, l’inférence, l’affichage et la reprise. L’étape la plus lente fixe le rythme de l’expérience ; si la transcription est trop longue, un excellent modèle de traduction ne sauvera pas l’interaction. Mesurer sur l’appareil cible compte davantage qu’un benchmark sur une machine de développement, car pression mémoire et limites thermiques font partie de la contrainte produit.", "Le contrat produit doit aussi être visible dans les transitions d’état. La personne doit savoir si l’application écoute, traite, est prête à être vérifiée ou peut être relancée. Préserver la transcription et la langue sélectionnée évite de transformer une erreur récupérable du modèle en travail perdu. C’est ce détail d’implémentation qui détermine si un outil hors ligne paraît fiable dans un contexte contraint."], actors: ["Locuteur", "Appareil", "Modèles locaux", "Utilisateur"], steps: ["enregistre une phrase", "conserve l’état", "transcrit + traduit", "vérifie ou réessaie"] },
    uncertainty: { title: "Dossier d’implémentation : relier la confiance à un chemin de reprise", text: ["La confiance doit être traitée comme un signal de routage, pas comme une télémétrie décorative. Commencez par définir les classes d’incertitude importantes : audio peu clair, source insuffisante, égalité entre labels ou réponse d’outil hors plage attendue. Définissez ensuite une action de reprise pour chaque classe : réécouter, afficher l’extrait support, demander une clarification ciblée ou escalader à un relecteur. Sans cette action, un nombre de confiance crée de l’anxiété sans donner de contrôle.", "La validation doit tester l’interaction, pas seulement le score. Utilisez des exemples délibérément ambigus et observez si les utilisateurs voient le risque, comprennent sa raison et récupèrent rapidement. La métrique utile n’est pas seulement le calibrage : c’est la capacité de l’interface à transformer une décision risquée en décision informée. Un bon repère peut être discret, mais il doit arriver au moment où une correction reste peu coûteuse."], actors: ["Modèle", "Interface", "Preuves", "Utilisateur"], steps: ["retourne résultat + signal", "explique le signal", "propose du contexte", "vérifie ou corrige"] },
    harness: { title: "Dossier d’implémentation : traiter le harnais comme la surface produit", text: ["Le harnais est l’endroit où un agent devient un système d’ingénierie. Il cadre la tâche, sélectionne le contexte, réduit la surface d’outils, applique les permissions et capture une trace. Ces responsabilités doivent être assez séparées pour évoluer indépendamment. Si une politique de contexte est trop large, on la resserre sans modifier les permissions. Si un contrat d’outil est ambigu, on le type et le valide sans réentraîner le modèle. Cette séparation rend le système maintenable lorsque les modèles, tâches et risques évoluent.", "Un harnais utile possède aussi une discipline de release. Exécutez un jeu représentatif avant toute mise à disposition, inspectez les traces pour détecter les régressions et gardez une frontière d’approbation explicite pour les actions conséquentes. L’autonomie devient alors une capacité contrôlée plutôt qu’une promesse vague. Le système peut agir vite dans ses garde-fous tout en montrant clairement qui porte la décision finale quand le coût de l’erreur augmente."], actors: ["Tâche", "Harnais", "Agent", "Évaluation"], steps: ["cadre la tâche", "applique contexte + politique", "agit via les outils", "trace et note le run"] },
    project: { title: "Dossier d’implémentation : construire l’interaction autour des conditions terrain", text: ["L’architecture d’OfflineLingo est pilotée par l’absence de réseau fiable. Le chemin critique est volontairement court : capture vocale, reconnaissance sur appareil, traduction locale et interface qui laisse de la place à la vérification. whisper.cpp et un modèle Qwen 2.5 quantifié via llama.cpp répondent à l’inférence, mais la décision produit la plus importante est que ce parcours reste utile sans service distant ni compte au moment du besoin.", "L’interface fait donc partie du modèle de sécurité. Un contrôle d’enregistrement net, un état de traitement visible, un changement de langue rapide et des résultats tenant compte de la confiance réduisent le risque qu’un utilisateur prenne une sortie partielle pour une conclusion. La prochaine étape d’ingénierie serait un test terrain systématique : appareils, bruit, accents, vocabulaire et reprise après interruption. C’est là qu’un prototype devient un outil responsable."], actors: ["Intervenant", "Android", "IA locale", "Partenaire"], steps: ["prononce une phrase", "capture + transcrit", "traduit en local", "vérifie puis partage"] },
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
    ? { back: "All articles", published: "Published", takeaway: "Key takeaway", diagram: "System sketch", lens: "Engineering lenses", dossier: "Technical dossier", playbook: "Practical playbook", matrix: "Operational failure modes", matrixTitle: "What to watch in the real system", concern: "Concern", failure: "Failure signature", response: "Design response", contact: "Discuss this article" }
    : { back: "Tous les articles", published: "Publié", takeaway: "À retenir", diagram: "Schéma du système", lens: "Angles d’ingénierie", dossier: "Dossier technique", playbook: "Checklist pratique", matrix: "Modes de défaillance opérationnels", matrixTitle: "Ce qu’il faut surveiller dans le système réel", concern: "Sujet", failure: "Signal de défaillance", response: "Réponse de conception", contact: "Discuter de cet article" }
  const notes = systemNotes[language][article.diagram]
  const playbook = playbooks[language][article.diagram]
  const matrix = operatingMatrices[language][article.diagram]
  const dossier = dossiers[language][article.diagram]

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
          {article.sections.map((section, index) => <section key={section.heading}><p className="article-section-number">{String(index + 1).padStart(2, "0")}</p><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{index === 1 && <figure><div><p>{copy.diagram}</p><h3>{article.diagramTitle}</h3><SystemGraph type={article.diagram} language={language} /><div className="diagram-insights">{notes.map(([label, text]) => <div key={label}><strong>{label}</strong><span>{text}</span></div>)}</div></div><figcaption>{article.diagramCaption}</figcaption></figure>}</section>)}
          <section className="article-dossier"><p className="article-section-number">{copy.dossier}</p><h2>{dossier.title}</h2>{dossier.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<SystemGraph type={article.diagram} language={language} variant="assurance" /></section>
          <section className="article-operating-matrix"><p className="article-section-number">{copy.matrix}</p><h2>{copy.matrixTitle}</h2><div className="matrix-table"><div className="matrix-head"><span>{copy.concern}</span><span>{copy.failure}</span><span>{copy.response}</span></div>{matrix.map(([concern, failure, response]) => <div className="matrix-row" key={concern}><strong>{concern}</strong><span>{failure}</span><span>{response}</span></div>)}</div></section>
          <section className="article-playbook"><p className="article-section-number">{copy.playbook}</p><ol>{playbook.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>
          <Link className="article-contact" href="mailto:cbrzyski2@gmail.com?subject=Portfolio%20article"><span>{copy.contact}</span><ArrowLeft size={17} /></Link>
        </div>
      </div>
    </article>
    <footer className="hub-footer"><span>© 2026 Cédric Brzyski</span><Link href="/">Portfolio</Link></footer>
  </main>
}
