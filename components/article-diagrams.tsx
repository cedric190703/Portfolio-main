import type { ReactElement } from "react"
import type { ArticleLanguage, DiagramKind } from "@/lib/articles"

type Props = { kind: DiagramKind; language: ArticleLanguage }

// Shared primitives. Every diagram below has its own layout; these only keep
// stroke widths, corner radii and label sizes consistent across the archive.
const Box = ({ x, y, w = 150, h = 46, kind = "compute", lines }: { x: number; y: number; w?: number; h?: number; kind?: "input" | "compute" | "control" | "human" | "store" | "ghost"; lines: string[] }) => (
  <g transform={`translate(${x} ${y})`} className={`dg-box ${kind}`}>
    <rect width={w} height={h} rx="6" />
    <text x={w / 2} y={h / 2 + (lines.length === 1 ? 4 : -3)} textAnchor="middle">
      {lines.map((line, i) => <tspan key={line} x={w / 2} dy={i === 0 ? 0 : 14}>{line}</tspan>)}
    </text>
  </g>
)

const Tag = ({ x, y, text, tone = "data", anchor = "start" }: { x: number; y: number; text: string; tone?: "data" | "control" | "human" | "muted"; anchor?: "start" | "middle" | "end" }) => (
  <text x={x} y={y} textAnchor={anchor} className={`dg-tag ${tone}`}>{text}</text>
)

const Defs = ({ id }: { id: string }) => (
  <defs>
    <marker id={`${id}-d`} markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto"><path className="dg-marker data" d="M0,0.5 L7,4 L0,7.5 Z" /></marker>
    <marker id={`${id}-c`} markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto"><path className="dg-marker control" d="M0,0.5 L7,4 L0,7.5 Z" /></marker>
    <marker id={`${id}-h`} markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto"><path className="dg-marker human" d="M0,0.5 L7,4 L0,7.5 Z" /></marker>
  </defs>
)

const Edge = ({ d, id, tone = "data" }: { d: string; id: string; tone?: "data" | "control" | "human" }) => (
  <path d={d} className={`dg-edge ${tone}`} markerEnd={`url(#${id}-${tone[0]})`} />
)

/* 01 · Agent — swimlane sequence: who holds the evidence at each step */
function AgentSwimlanes({ fr }: { fr: boolean }) {
  const id = "dg-agent"
  const lanes = fr ? ["Personne", "Planificateur", "Outils / sources", "Journal de preuves"] : ["Person", "Planner", "Tools / sources", "Evidence log"]
  const steps = fr
    ? ["brief + condition d’arrêt", "requêtes typées", "sources + identifiants", "brouillon lié aux sources", "paquet de revue", "accepte / corrige", "cas de régression"]
    : ["brief + stop condition", "typed queries", "sources + ids", "draft linked to sources", "review packet", "accept / edit", "regression case"]
  const laneY = [70, 150, 230, 310]
  const col = (i: number) => 150 + i * 84
  return (
    <svg viewBox="0 0 720 400" role="img" aria-label={fr ? "Flux de travail de l’agent par rôle" : "Agent workflow swimlanes"}>
      <Defs id={id} />
      {lanes.map((lane, i) => (
        <g key={lane}>
          <rect x="16" y={laneY[i] - 32} width="688" height="64" className={`dg-lane ${i % 2 ? "alt" : ""}`} />
          <text x="26" y={laneY[i] + 4} className="dg-lane-label">{lane}</text>
        </g>
      ))}
      <line x1="130" y1="28" x2="130" y2="352" className="dg-rule" />
      {steps.map((_, i) => <text key={i} x={col(i)} y="24" textAnchor="middle" className="dg-step">{String(i + 1).padStart(2, "0")}</text>)}

      {/* 1 person -> planner */}
      <Edge id={id} tone="human" d={`M${col(0)} ${laneY[0] + 14} V${laneY[1] - 12}`} />
      <Tag x={col(0) + 6} y={laneY[0] + 44} text={steps[0]} tone="human" />
      {/* 2 planner -> tools */}
      <Edge id={id} d={`M${col(1)} ${laneY[1] + 14} V${laneY[2] - 12}`} />
      <Tag x={col(1) + 6} y={laneY[1] + 44} text={steps[1]} />
      {/* 3 tools -> evidence */}
      <Edge id={id} d={`M${col(2)} ${laneY[2] + 14} V${laneY[3] - 12}`} />
      <Tag x={col(2) + 6} y={laneY[2] + 44} text={steps[2]} />
      {/* 4 planner -> evidence (draft) */}
      <Edge id={id} d={`M${col(3)} ${laneY[1] + 14} V${laneY[3] - 12}`} />
      <Tag x={col(3) + 6} y={laneY[2] - 6} text={steps[3]} />
      {/* 5 evidence -> person */}
      <Edge id={id} tone="control" d={`M${col(4)} ${laneY[3] - 14} V${laneY[0] + 12}`} />
      <Tag x={col(4) + 6} y={laneY[1] + 4} text={steps[4]} tone="control" />
      {/* 6 person -> planner */}
      <Edge id={id} tone="human" d={`M${col(5)} ${laneY[0] + 14} V${laneY[1] - 12}`} />
      <Tag x={col(5) + 6} y={laneY[0] + 44} text={steps[5]} tone="human" />
      {/* 7 evidence -> regression (loop back) */}
      <Edge id={id} tone="control" d={`M${col(6)} ${laneY[3] - 14} V${laneY[2] + 12}`} />
      <Tag x={col(6) - 6} y={laneY[3] - 30} text={steps[6]} tone="control" anchor="end" />

      {/* activation bars */}
      {[[0, 0], [1, 1], [2, 2], [3, 1], [4, 3], [5, 0], [6, 3]].map(([c, l]) => <rect key={`${c}-${l}`} x={col(c) - 5} y={laneY[l] - 12} width="10" height="24" rx="2" className="dg-activation" />)}
      {[[1, 3], [2, 3], [3, 3]].map(([c, l]) => <rect key={`s${c}`} x={col(c) - 5} y={laneY[l] - 12} width="10" height="24" rx="2" className="dg-activation store" />)}

      <text x="26" y="384" className="dg-legend">{fr ? "Le journal de preuves reçoit tout avant la personne — la revue lit des sources, pas un paragraphe." : "The evidence log receives everything before the person does — review reads sources, not a paragraph."}</text>
    </svg>
  )
}

/* 02 · Offline — a latency budget on one timeline */
function OfflineBudget({ fr }: { fr: boolean }) {
  const id = "dg-offline"
  const t0 = 208, scale = 78 // px per second
  const rows: Array<[string, number, number, string, string]> = fr
    ? [["Capture micro · 16 kHz", 0, 2.5, "input", "flux + VAD"], ["whisper.cpp · base Q5_1", 2.5, 0.9, "compute", "≈ 60 Mo"], ["llama.cpp · Qwen 2.5 Q4_K_M", 3.4, 1.4, "compute", "≈ 1,0 Go"], ["Affichage + relecture", 4.8, 0.8, "human", "personne"]]
    : [["Mic capture · 16 kHz", 0, 2.5, "input", "stream + VAD"], ["whisper.cpp · base Q5_1", 2.5, 0.9, "compute", "≈ 60 MB"], ["llama.cpp · Qwen 2.5 Q4_K_M", 3.4, 1.4, "compute", "≈ 1.0 GB"], ["Render + review", 4.8, 0.8, "human", "person"]]
  return (
    <svg viewBox="0 0 720 330" role="img" aria-label={fr ? "Budget de latence hors ligne" : "Offline latency budget"}>
      <Defs id={id} />
      {[0, 1, 2, 3, 4, 5, 6].map((sec) => (
        <g key={sec}>
          <line x1={t0 + sec * scale} y1="40" x2={t0 + sec * scale} y2="232" className="dg-grid" />
          <text x={t0 + sec * scale} y="30" textAnchor="middle" className="dg-axis">{sec}s</text>
        </g>
      ))}
      {rows.map(([label, start, dur, kind, note], i) => {
        const y = 52 + i * 46
        return (
          <g key={label}>
            <text x="14" y={y + 19} className="dg-row-label">{label}</text>
            <rect x={t0 + start * scale} y={y} width={dur * scale} height="30" rx="4" className={`dg-bar ${kind}`} />
            <text x={t0 + start * scale + 8} y={y + 19} className="dg-bar-text">{dur.toFixed(1)}s</text>
            <text x={t0 + (start + dur) * scale + 8} y={y + 19} className="dg-tag muted">{note}</text>
          </g>
        )
      })}
      <line x1={t0 + 3.4 * scale} y1="44" x2={t0 + 3.4 * scale} y2="236" className="dg-marker-line" />
      <text x={t0 + 3.4 * scale} y="250" textAnchor="middle" className="dg-tag control">{fr ? "premier texte visible (transcription)" : "first visible text (transcript)"}</text>
      <line x1={t0 + 6 * scale} y1="44" x2={t0 + 6 * scale} y2="236" className="dg-marker-line budget" />
      <text x={t0 + 6 * scale} y="250" textAnchor="middle" className="dg-tag stop">{fr ? "budget 6 s" : "6 s budget"}</text>
      <text x="14" y="272" className="dg-legend">{fr ? "Cibles pour un Android milieu de gamme, pas des mesures de laboratoire — la barre la plus longue fixe le rythme." : "Targets for a mid-range Android phone, not lab measurements — the longest bar sets the pace."}</text>
      <rect x="14" y="286" width="692" height="30" rx="4" className="dg-strip" />
      <text x="24" y="305" className="dg-strip-text">{fr ? "Budget illustratif · mesurer le pic mémoire, le démarrage à froid et la pression thermique sur l’appareil cible" : "Illustrative budget · measure peak memory, cold start and thermal pressure on the target device"}</text>
    </svg>
  )
}

/* 03 · Uncertainty — consequence × confidence decision matrix */
function UncertaintyMatrix({ fr }: { fr: boolean }) {
  const cols = fr ? ["< 0,55", "0,55 ≤ p < 0,80", "≥ 0,80"] : ["< 0.55", "0.55 ≤ p < 0.80", "≥ 0.80"]
  const rows = fr
    ? [["Mot de remplissage", "afficher", "afficher", "afficher"], ["Nom, lieu", "souligner + alternatives", "souligner", "afficher"], ["Nombre, dose, négation", "bloquer + réécouter", "demander confirmation", "souligner"]]
    : [["Filler word", "show", "show", "show"], ["Name, place", "underline + alternatives", "underline", "show"], ["Number, dose, negation", "block + replay", "ask to confirm", "underline"]]
  const tone = (cell: string) => (/block|bloquer/.test(cell) ? "stop" : /ask|demander/.test(cell) ? "ask" : /underline|souligner/.test(cell) ? "flag" : "ok")
  const x0 = 200, y0 = 96, cw = 165, ch = 62
  return (
    <svg viewBox="0 0 720 360" role="img" aria-label={fr ? "Matrice de décision face à l’incertitude" : "Uncertainty decision matrix"}>
      <text x="14" y="30" className="dg-lane-label">{fr ? "Conséquence si faux ↓" : "Consequence if wrong ↓"}</text>
      <text x={x0 + cw * 1.5} y="30" textAnchor="middle" className="dg-lane-label">{fr ? "Probabilité du token (whisper) →" : "Token probability (whisper) →"}</text>
      {cols.map((c, i) => <text key={c} x={x0 + i * cw + cw / 2} y="72" textAnchor="middle" className="dg-axis">{c}</text>)}
      {rows.map((r, ri) => (
        <g key={r[0]}>
          <text x="14" y={y0 + ri * ch + ch / 2 + 4} className="dg-row-label">{r[0]}</text>
          {r.slice(1).map((cell, ci) => (
            <g key={ci} transform={`translate(${x0 + ci * cw + 4} ${y0 + ri * ch + 4})`} className={`dg-cell ${tone(cell)}`}>
              <rect width={cw - 8} height={ch - 8} rx="5" />
              <text x={(cw - 8) / 2} y={(ch - 8) / 2 + 4} textAnchor="middle">{cell}</text>
            </g>
          ))}
        </g>
      ))}
      {/* example callout */}
      <g transform="translate(200 300)">
        <rect width="504" height="44" rx="5" className="dg-callout" />
        <text x="12" y="18" className="dg-callout-text">{fr ? "« Donnez-lui deux comprimés » — p(deux) = 0,61 → même score qu’un « euh », action opposée." : "“Give him two tablets” — p(two) = 0.61 → same score as an “uh”, opposite action."}</text>
        <text x="12" y="35" className="dg-callout-text muted">{fr ? "Seuils illustratifs à calibrer ; le score ne garantit pas la justesse." : "Illustrative thresholds to calibrate; the score does not guarantee correctness."}</text>
      </g>
    </svg>
  )
}

/* 04 · Harness — concentric rings around the model */
function HarnessRings({ fr }: { fr: boolean }) {
  const id = "dg-harness"
  const cx = 205, cy = 205
  const rings = fr
    ? [[62, "modèle", ""], [108, "contexte", "fichiers choisis · budget de tokens"], [154, "outils typés", "schéma validé · résultat structuré"], [200, "permissions", "sandbox · liste d’autorisation · approbation"], [246, "trace + éval", "spans · replay · suite de régression"]]
    : [[62, "model", ""], [108, "context", "selected files · token budget"], [154, "typed tools", "validated schema · structured result"], [200, "permissions", "sandbox · allowlist · approval gate"], [246, "trace + eval", "spans · replay · regression suite"]]
  return (
    <svg viewBox="0 0 860 450" role="img" aria-label={fr ? "Couches du harness" : "Harness layers"}>
      <Defs id={id} />
      {[...rings].reverse().map(([r, label], i) => (
        <circle key={label as string} cx={cx} cy={cy} r={(r as number) * 0.75} className={`dg-ring r${rings.length - 1 - i}`} />
      ))}
      {rings.map(([r, label, sub], i) => (
        <g key={label as string}>
          <text x={cx} y={i === 0 ? cy + 5 : cy - (r as number) * 0.75 + 18} textAnchor="middle" className={`dg-ring-label ${i === 0 ? "core" : ""}`}>{label}</text>
          <text x="420" y={65 + i * 65} className="dg-lane-label">{String(i + 1).padStart(2, "0")} · {label}</text>
          {sub && <text x="420" y={85 + i * 65} className="dg-tag muted">{sub}</text>}
        </g>
      ))}
      {/* task in, outcome out */}
      <text x="420" y="380" className="dg-tag control">{fr ? "trace → évaluation → nouveau contrat" : "trace → evaluation → tighter contract"}</text>
      <text x="20" y="426" className="dg-legend">{fr ? "Le modèle est au centre ; les contrats et la trace l’entourent." : "The model sits at the centre; contracts and traces surround it."}</text>
    </svg>
  )
}

/* 05 · OfflineLingo — the app as a state machine with timeouts */
function ProjectStates({ fr }: { fr: boolean }) {
  const id = "dg-project"
  const s = fr
    ? { idle: ["Repos"], rec: ["Enregistre", "≤ 12 s"], stt: ["Transcrit", "whisper.cpp"], mt: ["Traduit", "Qwen 2.5"], review: ["Relecture", "confiance"], edit: ["Corrige le texte"], done: ["Affiché · grand format"] }
    : { idle: ["Idle"], rec: ["Recording", "≤ 12 s"], stt: ["Transcribing", "whisper.cpp"], mt: ["Translating", "Qwen 2.5"], review: ["Review", "confidence"], edit: ["Edit text"], done: ["Shown · large type"] }
  const e = fr
    ? { hold: "appui maintenu", release: "relâché / silence 1,5 s", ok: "segments ok", low: "p < 0,55 sur mot clé", tok: "premier token < 1 s", accept: "valider", retry: "réenregistrer", edit: "corriger", next: "phrase suivante", fail: "échec / délai 8 s" }
    : { hold: "press & hold", release: "release / 1.5 s silence", ok: "segments ok", low: "p < 0.55 on key word", tok: "first token < 1 s", accept: "accept", retry: "re-record", edit: "fix text", next: "next phrase", fail: "failure / 8 s timeout" }
  return (
    <svg viewBox="0 -20 780 392" role="img" aria-label={fr ? "Machine à états OfflineLingo" : "OfflineLingo state machine"}>
      <Defs id={id} />
      <Box x={10} y={150} w={100} kind="input" lines={s.idle} />
      <Box x={190} y={150} w={120} kind="human" lines={s.rec} />
      <Box x={350} y={60} w={130} lines={s.stt} />
      <Box x={350} y={240} w={130} lines={s.mt} />
      <Box x={540} y={150} w={140} kind="control" lines={s.review} />
      <Box x={540} y={20} w={140} h={40} kind="human" lines={s.edit} />
      <Box x={540} y={280} w={140} h={40} kind="store" lines={s.done} />

      <Edge id={id} tone="human" d="M110 173 H188" /><Tag x={149} y={165} text={e.hold} tone="human" anchor="middle" />
      <Edge id={id} d="M250 150 V83 H348" /><Tag x={244} y={122} text={e.release} tone="muted" anchor="end" />
      <Edge id={id} d="M415 106 V238" /><Tag x={421} y={160} text={e.ok} tone="muted" />
      <Edge id={id} d="M480 263 H585 V198" /><Tag x={488} y={256} text={e.tok} tone="muted" />
      <Edge id={id} tone="control" d="M480 83 H560 V148" /><Tag x={486} y={77} text={e.low} tone="control" />
      <Edge id={id} tone="human" d="M620 150 V62" /><Tag x={626} y={110} text={e.edit} tone="human" />
      <Edge id={id} tone="human" d="M680 40 H722 V263 H482" /><Tag x={716} y={230} text={fr ? "retraduire" : "translate again"} tone="human" anchor="end" />
      <Edge id={id} tone="human" d="M650 196 V278" /><Tag x={656} y={242} text={e.accept} tone="human" />
      <Edge id={id} tone="human" d="M540 192 C 480 215 300 215 250 198" /><Tag x={340} y={226} text={e.retry} tone="human" anchor="middle" />
      <Edge id={id} d="M610 320 V346 H60 V198" /><Tag x={335} y={341} text={e.next} tone="muted" anchor="middle" />
      <Edge id={id} tone="control" d="M415 60 V46 H60 V148" /><Tag x={240} y={41} text={e.fail} tone="control" anchor="middle" />

      <text x="14" y="-5" className="dg-legend">{fr ? "La correction revient à la traduction ; la relecture permet de reprendre ou de valider." : "Editing returns to translation; review offers a retry or acceptance."}</text>
    </svg>
  )
}

/* 06 · Robotics — closed control loop with failure exits */
function RoboticsLoop({ fr }: { fr: boolean }) {
  const id = "dg-robot"
  const cx = 300, cy = 190, r = 128
  const nodes = fr
    ? [["Écoute", "commande vocale"], ["Cible", "YOLO · COCO"], ["Repère", "calibration.json"], ["Plan", "limites articulaires"], ["Exécute", "SO-101"], ["Vérifie", "cible dans le cadre ?"]]
    : [["Listen", "voice command"], ["Target", "YOLO · COCO"], ["Frame", "calibration.json"], ["Plan", "joint limits"], ["Execute", "SO-101"], ["Verify", "target in frame?"]]
  const exits = fr
    ? [[1, "aucune détection 1 s → Pause"], [2, "hors espace atteignable → Demande"], [5, "dérive > 15 % → replanifie"]]
    : [[1, "no detection for 1 s → Pause"], [2, "outside reach → Ask"], [5, "drift > 15 % → re-plan"]]
  const pos = (i: number) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 6; return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) } }
  return (
    <svg viewBox="0 0 780 430" role="img" aria-label={fr ? "Boucle de contrôle du robot" : "Robot control loop"}>
      <Defs id={id} />
      <circle cx={cx} cy={cy} r={r} className="dg-loop" />
      {nodes.map((_, i) => {
        const a1 = -Math.PI / 2 + (i * 2 * Math.PI) / 6 + 0.36, a2 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / 6 - 0.36
        return <path key={i} d={`M${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} A${r} ${r} 0 0 1 ${cx + r * Math.cos(a2)} ${cy + r * Math.sin(a2)}`} className="dg-edge data" markerEnd={`url(#${id}-d)`} />
      })}
      {nodes.map(([label, sub], i) => {
        const p = pos(i)
        return (
          <g key={label} transform={`translate(${p.x - 58} ${p.y - 22})`} className={`dg-box ${i === 0 ? "human" : i === 5 ? "control" : "compute"}`}>
            <rect width="116" height="44" rx="22" />
            <text x="58" y="18" textAnchor="middle">{label}</text>
            <text x="58" y="33" textAnchor="middle" className="sub">{sub}</text>
          </g>
        )
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" className="dg-ring-label">10 Hz</text>
      <text x={cx} y={cy + 12} textAnchor="middle" className="dg-tag muted">{fr ? "une observation par tour" : "one observation per turn"}</text>
      {exits.map(([i, text]) => {
        const p = pos(i as number)
        const right = p.x > cx
        const ex = right ? 470 : 130
        return (
          <g key={text as string}>
            <Edge id={id} tone="control" d={right ? `M${p.x + 58} ${p.y} H${ex + 25}` : `M${p.x - 58} ${p.y} H100 V365 H145`} />
            <Tag x={right ? ex + 31 : 150} y={right ? p.y + 4 : 369} text={text as string} tone="control" />
          </g>
        )
      })}
      <text x="14" y="410" className="dg-legend">{fr ? "Les sorties pointillées attendent une nouvelle observation valide." : "Dashed exits wait for a fresh, valid observation."}</text>
    </svg>
  )
}

/* 07 · BCI — signal, windows, markers, and a split that respects sessions */
function BciTimeline({ fr }: { fr: boolean }) {
  // deterministic pseudo-EEG trace
  const pts: string[] = []
  for (let i = 0; i <= 640; i += 4) {
    const t = i / 640
    const v = Math.sin(t * 60) * 6 + Math.sin(t * 17 + 1) * 9 + Math.sin(t * 143) * 2.5 + (t > 0.42 && t < 0.58 ? Math.sin((t - 0.42) * 40) * 14 : 0)
    pts.push(`${40 + i},${70 + v}`)
  }
  const wins = [0, 1, 2, 3, 4, 5].map((k) => 100 + k * 50)
  return (
    <svg viewBox="0 0 720 380" role="img" aria-label={fr ? "Signal BCI et découpage par session" : "BCI signal timeline and split"}>
      <text x="14" y="26" className="dg-lane-label">{fr ? "C3 · 250 Hz · réf. moyenne · notch 50 Hz · passe-bande 8–30 Hz" : "C3 · 250 Hz · avg ref · 50 Hz notch · 8–30 Hz band-pass"}</text>
      <line x1="40" y1="70" x2="680" y2="70" className="dg-grid" />
      <polyline points={pts.join(" ")} className="dg-signal" />
      {/* event marker */}
      <line x1="308" y1="36" x2="308" y2="150" className="dg-marker-line" />
      <text x="313" y="46" className="dg-tag control">{fr ? "cue · t = 0" : "cue · t = 0"}</text>
      <line x1="408" y1="36" x2="408" y2="150" className="dg-marker-line budget" />
      <text x="413" y="46" className="dg-tag control">{fr ? "+1,0 s" : "+1.0 s"}</text>
      {/* sliding windows */}
      {wins.map((x, k) => <rect key={k} x={x} y={100 + k * 5} width="200" height="16" rx="3" className={`dg-window ${x + 200 > 308 && x < 408 ? "hit" : ""}`} />)}
      <text x="40" y="150" className="dg-tag muted">{fr ? "fenêtres 2 s · pas 0,5 s · chaque échantillon appartient à 4 fenêtres" : "2 s windows · 0.5 s stride · every sample belongs to 4 windows"}</text>

      {/* split bars */}
      <text x="14" y="196" className="dg-lane-label">{fr ? "Découpage A — fenêtres mélangées" : "Split A — shuffled windows"}</text>
      {Array.from({ length: 32 }).map((_, i) => <rect key={i} x={40 + i * 20} y={204} width="18" height="22" rx="2" className={`dg-split ${[3, 7, 8, 12, 15, 19, 22, 26, 29].includes(i) ? "test" : "train"}`} />)}
      <text x="40" y="246" className="dg-tag stop">{fr ? "voisines des deux côtés → score gonflé (fuite)" : "neighbours on both sides → inflated score (leakage)"}</text>

      <text x="14" y="282" className="dg-lane-label">{fr ? "Découpage B — par session, dans l’ordre" : "Split B — by session, in order"}</text>
      <rect x="40" y="290" width="270" height="22" rx="2" className="dg-split train" /><text x="46" y="305" className="dg-split-text">{fr ? "session 1 · lundi" : "session 1 · Monday"}</text>
      <rect x="314" y="290" width="200" height="22" rx="2" className="dg-split train" /><text x="320" y="305" className="dg-split-text">{fr ? "session 2 · mercredi" : "session 2 · Wednesday"}</text>
      <rect x="518" y="290" width="162" height="22" rx="2" className="dg-split test" /><text x="524" y="305" className="dg-split-text">{fr ? "session 3 · vendredi · test" : "session 3 · Friday · test"}</text>
      <text x="40" y="332" className="dg-tag ok">{fr ? "le test contient l’électrode qui a bougé et la fatigue de fin de semaine" : "the test set contains the electrode that shifted and the end-of-week fatigue"}</text>
      <text x="14" y="366" className="dg-legend">{fr ? "Même modèle, mêmes données : seul le découpage change, et c’est lui qui décide si le chiffre veut dire quelque chose." : "Same model, same data: only the split changes, and the split decides whether the number means anything."}</text>
    </svg>
  )
}

export function ArticleDiagram({ kind, language }: Props) {
  const fr = language === "fr"
  const hint = fr ? "← faites glisser pour explorer le schéma →" : "← swipe to explore the diagram →"
  const map: Record<DiagramKind, ReactElement> = {
    agent: <AgentSwimlanes fr={fr} />,
    offline: <OfflineBudget fr={fr} />,
    uncertainty: <UncertaintyMatrix fr={fr} />,
    harness: <HarnessRings fr={fr} />,
    project: <ProjectStates fr={fr} />,
    robotics: <RoboticsLoop fr={fr} />,
    bci: <BciTimeline fr={fr} />,
  }
  return <div className="system-graph" tabIndex={0} role="region" aria-label={fr ? "Schéma défilant" : "Scrollable diagram"} data-swipe-hint={hint}>{map[kind]}</div>
}
