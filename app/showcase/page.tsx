import Link from "next/link"
import { ArrowUpRight, Github, MoveLeft } from "lucide-react"

const caseStudies = [
  {
    number: "01", title: "OfflineLingo", category: "Edge AI · Android", repo: "https://github.com/cedric190703/EDTH-Hackathon-Berlin2026-OfflineLingo",
    question: "Comment soutenir une communication d’urgence lorsque le réseau est indisponible et que l’incertitude de la transcription ne doit pas être masquée ?",
    system: "Une application Android de traduction parole-vers-texte exécutée localement, conçue pour un scénario d’intervention transfrontalière.",
    decisions: ["Transcription et traduction sur l’appareil, sans dépendance à un service cloud.", "Indicateurs de confiance par mot et sur le résultat global, afin de rendre visible l’incertitude.", "Interface à grand contraste, contrôle d’enregistrement unique, changement rapide de langue et glossaire de vocabulaire d’urgence."],
    stack: ["Kotlin", "Android", "Speech-to-text", "On-device AI"],
  },
  {
    number: "02", title: "Good News Agent", category: "Multi-agent systems", repo: "https://github.com/cedric190703/NewsAgent",
    question: "Comment assembler une newsletter personnalisée sans réduire la sélection éditoriale à une simple requête et un résumé LLM ?",
    system: "Une plateforme d’intelligence d’actualité qui orchestre la recherche, l’évaluation des sources, la vérification et la composition de newsletters.",
    decisions: ["Planification d’angles de recherche et collecte parallèle par sous-thème avec LangGraph.", "Scoring explicite de pertinence, fraîcheur, crédibilité, signal journalistique et valence constructive.", "Vérification des faits, déduplication des sources, gestion des groupes d’abonnés et livraison par email."],
    stack: ["Python", "FastAPI", "LangGraph", "React", "SQLite"],
  },
  {
    number: "03", title: "Gemmory", category: "Private AI · Android", repo: "https://github.com/cedric190703/hackathon-gemma4-gemmory",
    question: "À quoi ressemble un assistant de mémoire quand les notes, les réponses et le modèle doivent rester sur le téléphone ?",
    system: "Un coffre de mémoire IA local-first qui transforme des notes brutes en connaissances liées, interrogeables avec Gemma 4 sur appareil.",
    decisions: ["Inférence locale avec LiteRT-LM, sans backend, compte, synchronisation cloud ni API de repli.", "Installation de modèle contrôlée par taille et SHA-256, puis maintien du modèle chargé hors du thread principal.", "Conversations, backlinks et graphe de connaissances persistés dans Room et stockés dans l’espace privé de l’application."],
    stack: ["Kotlin", "Android", "Gemma 4", "LiteRT-LM", "Room"],
  },
  {
    number: "04", title: "Robot Manager UI", category: "Robotics · Full stack", repo: "https://github.com/cedric190703/Robot-Manager-UI",
    question: "Comment rendre un environnement LeRobot utilisable au quotidien, de la détection du matériel jusqu’à l’enregistrement d’épisodes ?",
    system: "Une interface web et API pour les bras LeRobot SO-101 / SO-100, organisée autour des étapes concrètes de mise en service et d’expérimentation.",
    decisions: ["Gestion guidée des ports USB et des flux caméra avant le contrôle du robot.", "Calibration, téléopération faible latence et visualisation temps réel dans une interface à onglets.", "Pipeline unique pour enregistrer, rejouer des trajectoires et administrer les jeux de données."],
    stack: ["TypeScript", "React", "FastAPI", "Docker", "LeRobot"],
  },
  {
    number: "05", title: "Ovarian Cancer Segmentation", category: "Medical AI", repo: "https://github.com/cedric190703/Ov-health-challenge",
    question: "Comment traiter séparément la tumeur et les métastases tout en tenant compte de la métrique spécifique d’une compétition médicale ?",
    system: "Un pipeline de segmentation pour le challenge pinkcc, développé à deux et organisé autour de l’entraînement, de l’évaluation et du vote d’ensemble.",
    decisions: ["Un modèle spécialisé par type de région, puis combinaison par majority voting.", "Pipelines de préparation, augmentation, validation croisée, évaluation et visualisation des prédictions.", "Score final de 0,5082 sur une métrique composée de Dilated Dice et de F2."],
    stack: ["Python", "TensorFlow", "Ensemble learning", "Medical imaging"],
  },
]

const additionalProjects = [
  ["Local Chat", "Interface locale pour plusieurs LLM avec Ollama, RAG et outils LangChain.", "https://github.com/cedric190703/local-chat"],
  ["RAG Chatting UI", "Chat documentaire local utilisant LangChain, FAISS, Ollama et Streamlit.", "https://github.com/cedric190703/RAG-chatting-UI"],
  ["Credit Card OCR", "Pipeline OpenCV, Tesseract et CNN pour l’extraction de données de cartes.", "https://github.com/cedric190703/Credit_Card_OCR"],
  ["Ship Image Classification", "CNN Top 3/117 dans une compétition Kaggle interne.", "https://github.com/cedric190703/Image-Classification"],
]

export default function ShowcasePage() {
  return <main className="hub-page case-page">
    <header className="hub-header"><Link href="/"><MoveLeft size={16} />Retour au portfolio</Link><a href="https://github.com/cedric190703" target="_blank" rel="noreferrer"><Github size={16} />GitHub</a></header>
    <section className="hub-hero case-hero"><p>SHOWCASE</p><h1>Quelques projets, <em>en détail.</em></h1><div><p>Voici quelques projets que je souhaite présenter plus en détail. Pour chacun : le contexte, les choix techniques et les éléments importants de sa réalisation.</p></div></section>
    <section className="case-studies">{caseStudies.map((study) => <article className="case-study" key={study.title}><div className="case-index"><span>{study.number}</span><p>{study.category}</p></div><div className="case-body"><div className="case-heading"><h2>{study.title}</h2><a href={study.repo} target="_blank" rel="noreferrer">Voir le dépôt <ArrowUpRight size={17} /></a></div><div className="case-columns"><div><p className="case-label">QUESTION</p><p>{study.question}</p></div><div><p className="case-label">SYSTÈME</p><p>{study.system}</p></div></div><div className="case-decisions"><p className="case-label">CHOIX DE CONCEPTION</p><ul>{study.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></div><div className="case-stack">{study.stack.map((item) => <span key={item}>{item}</span>)}</div></div></article>)}</section>
    <section className="additional-projects"><p>PROJETS COMPLÉMENTAIRES</p><div>{additionalProjects.map(([title, text, repo]) => <a href={repo} target="_blank" rel="noreferrer" key={title}><h2>{title}</h2><span>{text}</span><ArrowUpRight size={17} /></a>)}</div></section>
    <footer className="hub-footer"><span>© 2026 Cédric Brzyski</span><Link href="/">Portfolio principal</Link></footer>
  </main>
}
