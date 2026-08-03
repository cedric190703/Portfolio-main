"use client"

import { useState } from "react"
import {
  ArrowDownToLine,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Github,
  GraduationCap,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"

type Language = "en" | "fr"

const projects = [
  { key: "creditcard", featured: true, href: "https://github.com/cedric190703/Credit_Card_OCR", tags: ["Python", "OpenCV", "Tesseract"] },
  { key: "ovarian", featured: true, href: "https://github.com/cedric190703/Ov-health-challenge", tags: ["Python", "TensorFlow", "Medical imaging"] },
  { key: "localchat", featured: true, href: "https://github.com/cedric190703/local-chat", tags: ["TypeScript", "Ollama", "LangChain"] },
  { key: "ragui", featured: true, href: "https://github.com/cedric190703/RAG-chatting-UI", tags: ["Python", "RAG", "LLM"] },
  { key: "robotmanager", featured: true, href: "https://github.com/cedric190703/Robot-Manager-UI", tags: ["TypeScript", "LeRobot", "UI"] },
  { key: "offline", featured: true, href: "https://github.com/cedric190703/EDTH-Hackathon-Berlin2026-OfflineLingo", tags: ["Kotlin", "Android", "Offline AI"] },
  { key: "newsagent", featured: false, href: "https://github.com/cedric190703/NewsAgent", tags: ["Python", "AI agents", "News"] },
  { key: "gemmory", featured: false, href: "https://github.com/cedric190703/hackathon-gemma4-gemmory", tags: ["Hackathon", "Gemma", "AI"] },
  { key: "ships", featured: false, href: "https://github.com/cedric190703/Image-Classification", tags: ["Python", "CNN", "TensorFlow"] },
]

const content = {
  en: {
    nav: ["Profile", "Experience", "Showcase", "Articles", "Education"],
    availability: "Available for AI & software engineering opportunities",
    title: "AI Engineer · Software Engineer",
    intro: "Final-year computer science engineering student at EPITA, specializing in Artificial Intelligence and Data Science. I work on agentic AI, computer vision, robotics software, and real-time applications.",
    details: [["Location", "Saint-Maur-des-Fossés, France"], ["Email", "cedric.brzyski@epita.fr"], ["Languages", "French (native), English (C1)"]],
    resume: "Download résumé",
    profile: "Profile",
    profileText: "My projects combine applied machine learning with software engineering: designing useful LLM workflows, working with visual and sensor data, and building interfaces that make technical systems usable. I am particularly interested in practical AI systems that operate reliably in constrained or professional environments.",
    competencies: "Technical competencies",
    skills: [
      ["AI & LLMs", "Agentic AI, RAG, LLM orchestration, LangChain, Hugging Face, vector databases"],
      ["Machine learning", "PyTorch, TensorFlow, scikit-learn, deep learning, computer vision, reinforcement learning"],
      ["Software engineering", "Python, C++, C, C#, SQL, JavaScript, TypeScript, Kotlin"],
      ["Platform & delivery", "FastAPI, Docker, AWS, Linux, Git, CI/CD, REST APIs, MLflow, ROS2"],
    ],
    experience: "Experience",
    experienceIntro: "Professional experience",
    roles: [
      { date: "Feb. 2026 – Jul. 2026", company: "Safran · Paris", title: "AI Engineer Intern", text: "Designed and deployed agentic AI applications for internal audit workflows, document analysis, findings extraction, executive summaries, report generation, and automated presentations.", tech: "AWS Bedrock · LangChain · FastAPI · Multi-agent architectures" },
      { date: "Sept. 2024 – Jan. 2025", company: "Inserm · Paris", title: "R&D Mixed Reality & Software Intern", text: "Developed VR and AR interfaces for medical simulation, linking physical telemetry to interactive environments and optimizing low-latency data processing.", tech: "VR/AR · Real-time telemetry · Network optimization" },
      { date: "June 2023", company: "Systhen · Fontenay-sous-Bois", title: "Software & Operations Intern", text: "Supported administrative process optimization with Odoo ERP and created standardized internal documentation systems.", tech: "Odoo · Process documentation" },
      { date: "July 2022", company: "Signaturit France · Paris", title: "Partnership Intern", text: "Built automated Power BI dashboards and contributed to strategic commercial and partnership meetings.", tech: "Power BI · Business intelligence" },
    ],
    projects: "Project showcase",
    projectsIntro: "Detailed work drawn from my public repositories",
    pinned: "Pinned repository",
    additional: "Additional project",
    projectText: {
      creditcard: ["Credit Card OCR", "Detects and extracts data from credit-card images with OpenCV and Tesseract.", "Includes perspective correction, digit-group extraction, OCR-A digit recognition with a CNN, and a planned fraud-detection component."],
      ovarian: ["Ovarian cancer segmentation", "Two-person entry for the pinkcc French healthcare segmentation competition.", "Separate tumor and metastasis models were combined with ensemble voting. The final submission achieved a 0.5082 score on the competition’s Dilated Dice / F2 metric."],
      localchat: ["Local Chat", "Local multi-model LLM interface powered by Ollama and LangChain.", "Supports document and image uploads, RAG, prompt enhancement, code blocks, connection status, and web-search experimentation through DuckDuckGo."],
      ragui: ["RAG Chatting UI", "Local document-chat application built with Ollama, LangChain, FAISS, and Streamlit.", "PDF, DOCX, and TXT files are chunked, embedded, indexed locally, and queried with source excerpts displayed below each response."],
      robotmanager: ["Robot Manager UI", "Full-stack interface for controlling LeRobot SO-101 / SO-100 robotic arms.", "The FastAPI and React application covers port and camera management, calibration, zero-latency teleoperation, recording, trajectory replay, and dataset workflows."],
      offline: ["OfflineLingo", "Android speech-to-text translation prototype for cross-border emergency operations.", "Runs on device without cloud inference, offers large field-ready controls, confidence cues, an emergency glossary, language switching, and support for emergency communication scenarios."],
      newsagent: ["Good News Agent", "Multi-agent news-intelligence platform that builds personalised newsletters from web and RSS sources.", "LangGraph coordinates planning, parallel research, credibility and relevance scoring, fact checking, summarisation, composition, subscription groups, and email delivery."],
      gemmory: ["Gemmory", "Private, local AI memory vault for Android, built around on-device Gemma 4 inference.", "Notes, linked knowledge, chat history, answers, and graph exploration stay in app-private storage; the app includes model integrity checks, streaming, Room persistence, and no cloud fallback."],
      ships: ["Ship Image Classification", "Custom CNN for an internal Kaggle competition under a strict limit of fewer than 30 layers.", "The TensorFlow / Keras model used augmentation, regularisation, learning-rate scheduling, and staged training to finish Top 3 of 117 teams with a 0.87174 validation score."],
    },
    source: "Source code",
    articles: "Articles & notes",
    articlesIntro: "A space for writing about applied AI, software engineering, and the questions behind the work.",
    articleStatus: "In preparation",
    articleNote: "No article has been published yet. The first notes will appear here as long-form, personal pieces rather than reposted news or generic summaries.",
    articleThemes: [
      ["Local-first AI", "What changes when models, data, and inference are designed to stay on a device?"],
      ["Agentic systems in practice", "Where multi-agent workflows are useful, where they create unnecessary complexity, and how to evaluate them."],
      ["Building for constrained environments", "Lessons from offline translation, robotics, and real-time systems where reliability matters as much as model capability."],
    ],
    education: "Education",
    educationIntro: "Academic background",
    studies: [
      ["2021 – 2026", "EPITA", "M.Eng. in Computer Science · Artificial Intelligence & Data Science"],
      ["2023", "UQAC, Canada", "Exchange semester in mathematics and computer science"],
      ["2021", "Lycée Marcelin Berthelot", "Scientific Baccalaureate, honours"],
    ],
    contact: "Contact",
    contactText: "For an opportunity or collaboration, please get in touch by email or LinkedIn.",
    footer: "Portfolio · Cédric Brzyski",
  },
  fr: {
    nav: ["Profil", "Expérience", "Showcase", "Articles", "Formation"],
    availability: "Disponible pour des opportunités en ingénierie IA et logiciel",
    title: "Ingénieur IA · Ingénieur logiciel",
    intro: "Étudiant ingénieur en dernière année à l’EPITA, spécialisé en Intelligence Artificielle et Data Science. Je travaille sur l’IA agentique, la vision par ordinateur, la robotique et les applications temps réel.",
    details: [["Localisation", "Saint-Maur-des-Fossés, France"], ["Email", "cedric.brzyski@epita.fr"], ["Langues", "Français (natif), anglais (C1)"]],
    resume: "Télécharger le CV",
    profile: "Profil",
    profileText: "Mes projets combinent machine learning appliqué et ingénierie logicielle : conception de flux LLM utiles, traitement de données visuelles et de capteurs, et création d’interfaces qui rendent les systèmes techniques utilisables. Je m’intéresse particulièrement aux systèmes IA pratiques, fiables et adaptés aux environnements contraints ou professionnels.",
    competencies: "Compétences techniques",
    skills: [
      ["IA & LLM", "IA agentique, RAG, orchestration LLM, LangChain, Hugging Face, bases vectorielles"],
      ["Machine learning", "PyTorch, TensorFlow, scikit-learn, deep learning, vision par ordinateur, reinforcement learning"],
      ["Ingénierie logicielle", "Python, C++, C, C#, SQL, JavaScript, TypeScript, Kotlin"],
      ["Plateforme & livraison", "FastAPI, Docker, AWS, Linux, Git, CI/CD, APIs REST, MLflow, ROS2"],
    ],
    experience: "Expérience",
    experienceIntro: "Expérience professionnelle",
    roles: [
      { date: "Fév. 2026 – Juil. 2026", company: "Safran · Paris", title: "Stagiaire AI Engineer", text: "Conception et déploiement d’applications d’IA agentique pour les flux d’audit interne, l’analyse documentaire, l’extraction de constats, les synthèses de direction, les rapports et les présentations automatisées.", tech: "AWS Bedrock · LangChain · FastAPI · Architectures multi-agents" },
      { date: "Sept. 2024 – Janv. 2025", company: "Inserm · Paris", title: "Stagiaire R&D Réalité Mixte & Logiciel", text: "Développement d’interfaces VR et AR pour la simulation médicale, reliant télémétrie physique et environnements interactifs avec traitement de données à faible latence.", tech: "VR/AR · Télémétrie temps réel · Optimisation réseau" },
      { date: "Juin 2023", company: "Systhen · Fontenay-sous-Bois", title: "Stagiaire logiciel & opérations", text: "Participation à l’optimisation des processus administratifs avec l’ERP Odoo et création de systèmes de documentation interne standardisés.", tech: "Odoo · Documentation de processus" },
      { date: "Juil. 2022", company: "Signaturit France · Paris", title: "Stagiaire partenariats", text: "Création de tableaux de bord Power BI automatisés et participation à des réunions commerciales et de partenariat stratégiques.", tech: "Power BI · Informatique décisionnelle" },
    ],
    projects: "Showcase projets",
    projectsIntro: "Travaux détaillés issus de mes dépôts publics",
    pinned: "Dépôt épinglé",
    additional: "Projet complémentaire",
    projectText: {
      creditcard: ["OCR de cartes bancaires", "Détecte et extrait des données de cartes bancaires avec OpenCV et Tesseract.", "Inclut correction de perspective, extraction de groupes de chiffres, reconnaissance de chiffres OCR-A avec un CNN et un composant de détection de fraude prévu."],
      ovarian: ["Segmentation du cancer de l’ovaire", "Projet à deux pour la compétition française de segmentation en santé pinkcc.", "Des modèles séparés pour la tumeur et les métastases sont combinés par vote d’ensemble. Le résultat final atteint 0,5082 sur la métrique Dilated Dice / F2."],
      localchat: ["Local Chat", "Interface LLM multi-modèles locale avec Ollama et LangChain.", "Prend en charge les documents et images, le RAG, l’amélioration de prompts, les blocs de code, l’état de connexion et des expérimentations de recherche web avec DuckDuckGo."],
      ragui: ["RAG Chatting UI", "Application de chat documentaire locale créée avec Ollama, LangChain, FAISS et Streamlit.", "Les fichiers PDF, DOCX et TXT sont découpés, vectorisés, indexés et interrogés localement ; les extraits sources sont affichés sous chaque réponse."],
      robotmanager: ["Robot Manager UI", "Interface full-stack de contrôle des bras robotiques LeRobot SO-101 / SO-100.", "L’application FastAPI et React couvre la gestion des ports et caméras, la calibration, la téléopération faible latence, l’enregistrement, le replay et les jeux de données."],
      offline: ["OfflineLingo", "Prototype Android de traduction parole-vers-texte pour les opérations d’urgence transfrontalières.", "Fonctionne sur l’appareil sans inférence cloud, avec contrôles adaptés au terrain, indicateurs de confiance, glossaire d’urgence, changement de langue et scénarios de communication d’urgence."],
      newsagent: ["Good News Agent", "Plateforme multi-agents d’intelligence d’actualité qui construit des newsletters personnalisées à partir de sources web et RSS.", "LangGraph orchestre la planification, la recherche parallèle, le scoring de crédibilité et pertinence, la vérification, la synthèse, la composition, les groupes d’abonnés et l’envoi email."],
      gemmory: ["Gemmory", "Coffre de mémoire IA privé et local pour Android, conçu autour de l’inférence Gemma 4 sur appareil.", "Les notes, connaissances liées, conversations, réponses et graphes restent dans le stockage privé de l’application ; intégrité du modèle, streaming, persistance Room et aucun repli cloud."],
      ships: ["Classification d’images de navires", "CNN sur mesure pour une compétition Kaggle interne, sous une contrainte de moins de 30 couches.", "Le modèle TensorFlow / Keras utilise augmentation, régularisation, planification du taux d’apprentissage et entraînement par étapes ; Top 3 sur 117 équipes avec 0,87174 en validation."],
    },
    source: "Code source",
    articles: "Articles & notes",
    articlesIntro: "Un espace d’écriture sur l’IA appliquée, l’ingénierie logicielle et les questions derrière les projets.",
    articleStatus: "En préparation",
    articleNote: "Aucun article n’est encore publié. Les premières notes apparaîtront ici sous forme de textes personnels et approfondis, plutôt que de reprises d’actualité ou de résumés génériques.",
    articleThemes: [
      ["IA local-first", "Que change une architecture où les modèles, les données et l’inférence restent sur l’appareil ?"],
      ["Systèmes agentiques en pratique", "Quand les workflows multi-agents apportent une vraie valeur, quand ils ajoutent de la complexité, et comment les évaluer."],
      ["Concevoir pour les environnements contraints", "Retours sur la traduction hors ligne, la robotique et les systèmes temps réel, où la fiabilité compte autant que la capacité du modèle."],
    ],
    education: "Formation",
    educationIntro: "Parcours académique",
    studies: [
      ["2021 – 2026", "EPITA", "Diplôme d’ingénieur informatique · Intelligence Artificielle & Data Science"],
      ["2023", "UQAC, Canada", "Semestre d’échange en mathématiques et informatique"],
      ["2021", "Lycée Marcelin Berthelot", "Baccalauréat scientifique, mention bien"],
    ],
    contact: "Contact",
    contactText: "Pour une opportunité ou une collaboration, vous pouvez me contacter par email ou LinkedIn.",
    footer: "Portfolio · Cédric Brzyski",
  },
}

export default function Portfolio() {
  const [language, setLanguage] = useState<Language>("en")
  const [menuOpen, setMenuOpen] = useState(false)
  const t = content[language]
  const ids = ["profile", "experience", "showcase", "articles", "education"]

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return <main className="cv-shell">
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Cédric Brzyski home">CÉDRIC BRZYSKI<span> /</span></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{t.nav.map((item, index) => <button key={item} onClick={() => navigate(ids[index])}>{item}</button>)}</nav>
      <div className="header-actions">
        <a className="resume-link desktop-resume" href="/resume-cedric-brzyski.pdf" download><ArrowDownToLine size={14} />{t.resume}</a>
        <LanguageToggle onLanguageChange={(value) => setLanguage(value as Language)} /><ThemeToggle />
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {menuOpen && <nav className="mobile-nav">{t.nav.map((item, index) => <button key={item} onClick={() => navigate(ids[index])}>{item}</button>)}<a href="/resume-cedric-brzyski.pdf" download>{t.resume}</a></nav>}
    </header>

    <section id="top" className="intro section-wrap">
      <div className="intro-heading"><p>{t.availability}</p><h1>Cédric Brzyski</h1><h2>{t.title}</h2></div>
      <div className="intro-summary"><p>{t.intro}</p><a className="resume-button" href="/resume-cedric-brzyski.pdf" download><ArrowDownToLine size={17} />{t.resume}</a></div>
      <div className="detail-grid">{t.details.map(([label, value], index) => <div key={label}><span>{index === 0 ? <MapPin size={15} /> : index === 1 ? <Mail size={15} /> : <Languages size={15} />}{label}</span><strong>{value}</strong></div>)}</div>
    </section>

    <section id="profile" className="profile section-wrap section-block">
      <div className="section-title"><span>01</span><h2>{t.profile}</h2></div>
      <div className="profile-body"><p>{t.profileText}</p><div className="skills"><h3>{t.competencies}</h3>{t.skills.map(([area, list]) => <div className="skill-row" key={area}><strong>{area}</strong><span>{list}</span></div>)}</div></div>
    </section>

    <section id="experience" className="section-wrap section-block">
      <div className="section-title"><span>02</span><div><h2>{t.experience}</h2><p>{t.experienceIntro}</p></div></div>
      <div className="roles">{t.roles.map((role) => <article className="role" key={`${role.company}-${role.date}`}><time>{role.date}</time><div><p className="company">{role.company}</p><h3>{role.title}</h3></div><div className="role-description"><p>{role.text}</p><span>{role.tech}</span></div></article>)}</div>
    </section>

    <section id="showcase" className="section-wrap section-block">
      <div className="section-title"><span>03</span><div><h2>{t.projects}</h2><p>{t.projectsIntro}</p></div></div>
      <div className="project-grid">{projects.map((project) => { const [title, summary, detail] = t.projectText[project.key as keyof typeof t.projectText]; return <article className="project" key={project.key}><div className="project-meta"><span>{project.featured ? t.pinned : t.additional}</span><a href={project.href} target="_blank" rel="noreferrer" aria-label={`${title} source code`}><ArrowUpRight size={18} /></a></div><h3>{title}</h3><p>{summary}</p><p className="project-detail">{detail}</p><div className="project-footer"><div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer">{t.source}</a></div></article>})}</div>
    </section>

    <section id="articles" className="section-wrap section-block articles">
      <div className="section-title"><span>04</span><div><h2>{t.articles}</h2><p>{t.articlesIntro}</p></div></div>
      <div className="article-layout"><div className="article-intro"><p>{t.articleNote}</p><a href="mailto:cedric.brzyski@epita.fr?subject=Article%20idea">{t.contact} <ArrowUpRight size={16} /></a></div><div className="article-grid">{t.articleThemes.map(([title, text], index) => <article className="article-card" key={title}><span>{String(index + 1).padStart(2, "0")} / {t.articleStatus}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
    </section>

    <section id="education" className="section-wrap section-block education">
      <div className="section-title"><span>05</span><div><h2>{t.education}</h2><p>{t.educationIntro}</p></div></div>
      <div className="studies">{t.studies.map(([date, school, degree]) => <article key={school}><time>{date}</time><div><h3>{school}</h3><p>{degree}</p></div><GraduationCap size={21} /></article>)}</div>
    </section>

    <section className="contact section-wrap"><BriefcaseBusiness size={22} /><div><p className="section-number">06 / {t.contact}</p><h2>cedric.brzyski@epita.fr</h2><p>{t.contactText}</p></div><div className="contact-links"><a href="mailto:cedric.brzyski@epita.fr"><Mail size={16} />Email</a><a href="https://linkedin.com/in/cedric-brzyski" target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a><a href="https://github.com/cedric190703" target="_blank" rel="noreferrer"><Github size={16} />GitHub</a></div></section>
    <footer><span>© 2026 Cédric Brzyski</span><span>{t.footer}</span><a href="/resume-cedric-brzyski.pdf" download>{t.resume}</a></footer>
  </main>
}
