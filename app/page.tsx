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
  { key: "localchat", featured: true, href: "https://github.com/cedric190703/local-chat", tags: ["TypeScript", "Ollama", "LangChain"] },
  { key: "ragui", featured: true, href: "https://github.com/cedric190703/RAG-chatting-UI", tags: ["Python", "RAG", "LLM"] },
  { key: "robotmanager", featured: true, href: "https://github.com/cedric190703/Robot-Manager-UI", tags: ["TypeScript", "LeRobot", "UI"] },
  { key: "newsagent", featured: false, href: "https://github.com/cedric190703/NewsAgent", tags: ["Python", "AI agents", "News"] },
]

const content = {
  en: {
    nav: ["Profile", "Experience", "Projects", "Hackathons", "Education"],
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
      { date: "Feb. 2026 – Jul. 2026", company: "Safran · Paris", title: "AI Engineer Intern", text: "Designed and deployed production-oriented agentic AI applications for internal audit workflows.", highlights: ["Built modular LLM pipelines and multi-agent architectures with AWS Bedrock, LangChain and FastAPI.", "Automated document understanding, findings extraction, executive summaries, report generation and slide creation.", "Worked with business stakeholders to translate operational needs into secure, deployable enterprise AI solutions."], tech: "AWS Bedrock · LangChain · FastAPI · Multi-agent architectures" },
      { date: "Sept. 2024 – Jan. 2025", company: "Inserm · Paris", title: "R&D Mixed Reality & Software Intern", text: "Developed real-time VR and AR interfaces for medical simulation.", highlights: ["Connected physical telemetry with interactive digital environments.", "Optimized low-latency communication and telemetry-processing pipelines.", "Stabilized real-time processing of multidimensional data for simulation workflows."], tech: "VR/AR · Real-time telemetry · Network optimization" },
      { date: "June 2023", company: "Systhen · Fontenay-sous-Bois", title: "Software & Operations Intern", text: "Supported the optimization of internal administrative processes.", highlights: ["Worked with the Odoo ERP environment.", "Created standardized internal documentation systems."], tech: "Odoo · Process documentation" },
      { date: "July 2022", company: "Signaturit France · Paris", title: "Partnership Intern", text: "Contributed to reporting and partnership operations.", highlights: ["Built automated Power BI dashboards.", "Contributed to strategic commercial and partnership meetings."], tech: "Power BI · Business intelligence" },
    ],
    projects: "Projects",
    projectsIntro: "Selected technical work",
    pinned: "Pinned repository",
    additional: "Additional project",
    projectText: {
      creditcard: ["Credit Card OCR", "Detects and extracts card numbers from credit-card images using OpenCV and Tesseract."],
      ovarian: ["Ovarian cancer segmentation", "Ovarian cancer segmentation project developed for a healthcare competition in France."],
      localchat: ["Local Chat", "Interface for working locally with multiple LLMs through Ollama, with tools built using LangChain and LangGraph."],
      ragui: ["RAG Chatting UI", "Simple RAG chatting application."],
      robotmanager: ["Robot Manager UI", "Interface for managing the different elements of a LeRobot setup."],
      offline: ["OfflineLingo", "Project developed for the European Defense Tech Hackathon in Berlin, 2026."],
      newsagent: ["NewsAgent", "Experimental project for agent-based work with news information."],
      gemmory: ["Gemmory", "Hackathon project created around Gemma 4."],
      ships: ["Ship Image Classification", "Convolutional neural-network project created for an internal Kaggle competition to classify ships into multiple image categories."],
    },
    source: "Source code",
    challenges: "Hackathons & challenges",
    challengesIntro: "Selected competitive and collaborative work",
    challengeResult: "Outcome",
    challengesList: [
      { date: "Jul. 2026", title: "Gemmory", event: "Gemma 4 Hackathon", result: "Local Android AI memory vault", text: "Private on-device memory assistant built with Gemma 4 and LiteRT-LM, including knowledge graphs, streaming generation and Room persistence.", href: "https://github.com/cedric190703/hackathon-gemma4-gemmory" },
      { date: "Jul. 2026", title: "Mistral Vibe", event: "Mistral Vibe Hackathon", result: "2nd place · 40 teams", text: "Extended the open-source coding assistant with adaptive model routing, local-model discovery and a Playwright browser tool.", href: "https://github.com/cedric190703/mistral-vibe" },
      { date: "Jul. 2026", title: "OfflineLingo", event: "EDTH Berlin Hackathon", result: "Offline Android translation", text: "Emergency translation application using whisper.cpp and llama.cpp with a quantized Qwen 2.5 model and confidence cues.", href: "https://github.com/cedric190703/EDTH-Hackathon-Berlin2026-OfflineLingo" },
      { date: "Apr. 2026", title: "Real-time fraud detection", event: "HEC Fintech Hackathon", result: "Full-stack prototype", text: "Phishing-risk scoring pipeline, Mistral explanations, Qdrant similarity search and a Chrome extension for real-time payment blocking.", href: "https://github.com/hec-fintech-hackathon-team/hackathon-project" },
      { date: "Mar. 2026", title: "PayTheTalent", event: "XRPL Hackathon", result: "Functional MVP", text: "Decentralized payment platform for talent marketplaces, built around secure XRPL wallet and transaction flows.", href: "https://github.com/XRP-Hackathon/PayTheTalent" },
      { date: "2025", title: "Robotic Camera Assistant", event: "AMD Robotics Hackathon", result: "Team project", text: "Voice-controlled camera assistant that stabilizes a camera and tracks a target in real time.", href: "https://github.com/crc-amd-hackathon-2025/mission" },
      { date: "2025", title: "Ovarian Cancer Segmentation", event: "PINKCC Challenge", result: "Finalist · 12th / 42 teams", text: "U-Net segmentation models for tumors and metastases, combined through ensemble voting.", href: "https://github.com/cedric190703/Ov-health-challenge" },
      { date: "2025", title: "Ship Image Classification", event: "EPITA Kaggle Competition", result: "Top 3 · 117 teams", text: "Custom CNN under 30 layers, with augmentation, regularization and staged training.", href: "https://github.com/cedric190703/Image-Classification" },
      { date: "2025", title: "LaD", event: "GotaGoHack", result: "Jury’s Favorite Award", text: "Accessible web reader designed to support note reading for people with dyslexia and attention disorders.", href: "https://github.com/cedric190703/GGH2025-LaD" },
    ],
    explore: "Explore",
    showcase: "Showcase",
    articles: "Articles",
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
    nav: ["Profil", "Expérience", "Projets", "Hackathons", "Formation"],
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
      { date: "Fév. 2026 – Juil. 2026", company: "Safran · Paris", title: "Stagiaire AI Engineer", text: "Conception et déploiement d’applications d’IA agentique orientées production pour les flux d’audit interne.", highlights: ["Développement de pipelines LLM modulaires et d’architectures multi-agents avec AWS Bedrock, LangChain et FastAPI.", "Automatisation de la compréhension documentaire, de l’extraction de constats, des synthèses de direction, des rapports et des présentations.", "Travail avec les équipes métier pour transformer des besoins opérationnels en solutions d’IA d’entreprise sécurisées et déployables."], tech: "AWS Bedrock · LangChain · FastAPI · Architectures multi-agents" },
      { date: "Sept. 2024 – Janv. 2025", company: "Inserm · Paris", title: "Stagiaire R&D Réalité Mixte & Logiciel", text: "Développement d’interfaces VR et AR temps réel pour la simulation médicale.", highlights: ["Connexion de télémétrie physique à des environnements numériques interactifs.", "Optimisation de la communication à faible latence et des pipelines de traitement de télémétrie.", "Stabilisation du traitement temps réel de données multidimensionnelles pour les flux de simulation."], tech: "VR/AR · Télémétrie temps réel · Optimisation réseau" },
      { date: "Juin 2023", company: "Systhen · Fontenay-sous-Bois", title: "Stagiaire logiciel & opérations", text: "Participation à l’optimisation des processus administratifs internes.", highlights: ["Travail avec l’environnement ERP Odoo.", "Création de systèmes de documentation interne standardisés."], tech: "Odoo · Documentation de processus" },
      { date: "Juil. 2022", company: "Signaturit France · Paris", title: "Stagiaire partenariats", text: "Contribution aux activités de reporting et de partenariats.", highlights: ["Création de tableaux de bord Power BI automatisés.", "Participation à des réunions commerciales et de partenariat stratégiques."], tech: "Power BI · Informatique décisionnelle" },
    ],
    projects: "Projets",
    projectsIntro: "Travaux techniques sélectionnés",
    pinned: "Dépôt épinglé",
    additional: "Projet complémentaire",
    projectText: {
      creditcard: ["OCR de cartes bancaires", "Détecte et extrait les numéros d’une carte bancaire à partir d’images avec OpenCV et Tesseract."],
      ovarian: ["Segmentation du cancer de l’ovaire", "Projet de segmentation du cancer de l’ovaire développé dans le cadre d’une compétition française en santé."],
      localchat: ["Local Chat", "Interface pour utiliser localement plusieurs LLM avec Ollama, avec des outils construits avec LangChain et LangGraph."],
      ragui: ["RAG Chatting UI", "Application de chat RAG simple."],
      robotmanager: ["Robot Manager UI", "Interface pour gérer les différents éléments d’une installation LeRobot."],
      offline: ["OfflineLingo", "Projet développé pour le European Defense Tech Hackathon à Berlin en 2026."],
      newsagent: ["NewsAgent", "Projet expérimental pour travailler avec des informations d’actualité au moyen d’agents."],
      gemmory: ["Gemmory", "Projet de hackathon créé autour de Gemma 4."],
      ships: ["Classification d’images de navires", "Projet de réseau de neurones convolutif créé pour une compétition Kaggle interne afin de classer des images de navires en plusieurs catégories."],
    },
    source: "Code source",
    challenges: "Hackathons & challenges",
    challengesIntro: "Compétitions et projets collectifs sélectionnés",
    challengeResult: "Résultat",
    challengesList: [
      { date: "Juil. 2026", title: "Gemmory", event: "Gemma 4 Hackathon", result: "Coffre de mémoire IA local sur Android", text: "Assistant de mémoire privé sur appareil, construit avec Gemma 4 et LiteRT-LM, graphe de connaissances, génération en streaming et persistance Room.", href: "https://github.com/cedric190703/hackathon-gemma4-gemmory" },
      { date: "Juil. 2026", title: "Mistral Vibe", event: "Mistral Vibe Hackathon", result: "2e place · 40 équipes", text: "Extension de l’assistant de code open source avec routage adaptatif, découverte de modèles locaux et outil navigateur Playwright.", href: "https://github.com/cedric190703/mistral-vibe" },
      { date: "Juil. 2026", title: "OfflineLingo", event: "EDTH Berlin Hackathon", result: "Traduction Android hors ligne", text: "Application de traduction d’urgence avec whisper.cpp, llama.cpp, Qwen 2.5 quantifié et indicateurs de confiance.", href: "https://github.com/cedric190703/EDTH-Hackathon-Berlin2026-OfflineLingo" },
      { date: "Avr. 2026", title: "Détection de fraude temps réel", event: "HEC Fintech Hackathon", result: "Prototype full stack", text: "Scoring de risque de phishing, explications Mistral, recherche de similarité Qdrant et extension Chrome qui bloque les paiements à risque.", href: "https://github.com/hec-fintech-hackathon-team/hackathon-project" },
      { date: "Mars 2026", title: "PayTheTalent", event: "XRPL Hackathon", result: "MVP fonctionnel", text: "Plateforme de paiement décentralisée pour les marketplaces de talents, avec transactions et portefeuilles XRPL sécurisés.", href: "https://github.com/XRP-Hackathon/PayTheTalent" },
      { date: "2025", title: "Assistant caméra robotique", event: "AMD Robotics Hackathon", result: "Projet d’équipe", text: "Assistant caméra contrôlé à la voix, capable de stabiliser l’image et de suivre une cible en temps réel.", href: "https://github.com/crc-amd-hackathon-2025/mission" },
      { date: "2025", title: "Segmentation du cancer de l’ovaire", event: "PINKCC Challenge", result: "Finaliste · 12e / 42 équipes", text: "Modèles U-Net de segmentation des tumeurs et métastases, combinés par vote d’ensemble.", href: "https://github.com/cedric190703/Ov-health-challenge" },
      { date: "2025", title: "Classification d’images de navires", event: "Compétition Kaggle EPITA", result: "Top 3 · 117 équipes", text: "CNN personnalisé de moins de 30 couches, avec augmentation, régularisation et entraînement en plusieurs étapes.", href: "https://github.com/cedric190703/Image-Classification" },
      { date: "2025", title: "LaD", event: "GotaGoHack", result: "Prix coup de cœur du jury", text: "Lecteur web accessible pour faciliter la lecture de notes chez les personnes avec dyslexie ou troubles de l’attention.", href: "https://github.com/cedric190703/GGH2025-LaD" },
    ],
    explore: "Explorer",
    showcase: "Showcase",
    articles: "Articles",
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
  const ids = ["profile", "experience", "projects", "challenges", "education"]

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return <main className="cv-shell">
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Cédric Brzyski home">CÉDRIC BRZYSKI<span> /</span></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{t.nav.map((item, index) => <button key={item} onClick={() => navigate(ids[index])}>{item}</button>)}</nav>
      <nav className="page-nav" aria-label="Dedicated pages"><p>{t.explore}</p><a href="/showcase"><span>01</span>{t.showcase}</a><a href="/articles"><span>02</span>{t.articles}</a></nav>
      <div className="header-actions">
        <a className="resume-link desktop-resume" href="/resume-cedric-brzyski.pdf" download><ArrowDownToLine size={14} />{t.resume}</a>
        <LanguageToggle onLanguageChange={(value) => setLanguage(value as Language)} /><ThemeToggle />
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {menuOpen && <nav className="mobile-nav">{t.nav.map((item, index) => <button key={item} onClick={() => navigate(ids[index])}>{item}</button>)}<a className="mobile-page-link" href="/showcase">01 / {t.showcase}</a><a className="mobile-page-link" href="/articles">02 / {t.articles}</a><a href="/resume-cedric-brzyski.pdf" download>{t.resume}</a></nav>}
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
      <div className="roles">{t.roles.map((role) => <article className="role" key={`${role.company}-${role.date}`}><time>{role.date}</time><div><p className="company">{role.company}</p><h3>{role.title}</h3></div><div className="role-description"><p>{role.text}</p><ul>{role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><span>{role.tech}</span></div></article>)}</div>
    </section>

    <section id="projects" className="section-wrap section-block">
      <div className="section-title"><span>03</span><div><h2>{t.projects}</h2><p>{t.projectsIntro}</p></div></div>
      <div className="project-grid">{projects.map((project) => { const [title, text] = t.projectText[project.key as keyof typeof t.projectText]; return <article className="project" key={project.key}><div className="project-meta"><span>{project.featured ? t.pinned : t.additional}</span><a href={project.href} target="_blank" rel="noreferrer" aria-label={`${title} source code`}><ArrowUpRight size={18} /></a></div><h3>{title}</h3><p>{text}</p><div className="project-footer"><div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer">{t.source}</a></div></article>})}</div>
    </section>

    <section id="challenges" className="section-wrap section-block challenges">
      <div className="section-title"><span>04</span><div><h2>{t.challenges}</h2><p>{t.challengesIntro}</p></div></div>
      <div className="challenge-list">{t.challengesList.map((challenge) => <article className="challenge" key={challenge.title}><time>{challenge.date}</time><div><p className="company">{challenge.event}</p><h3>{challenge.title}</h3><p>{challenge.text}</p></div><div className="challenge-result"><span>{t.challengeResult}</span><strong>{challenge.result}</strong><a href={challenge.href} target="_blank" rel="noreferrer">{t.source}<ArrowUpRight size={18} /></a></div></article>)}</div>
    </section>

    <section id="education" className="section-wrap section-block education">
      <div className="section-title"><span>05</span><div><h2>{t.education}</h2><p>{t.educationIntro}</p></div></div>
      <div className="studies">{t.studies.map(([date, school, degree]) => <article key={school}><time>{date}</time><div><h3>{school}</h3><p>{degree}</p></div><GraduationCap size={21} /></article>)}</div>
    </section>

    <section className="contact section-wrap"><BriefcaseBusiness size={22} /><div><p className="section-number">06 / {t.contact}</p><h2>cedric.brzyski@epita.fr</h2><p>{t.contactText}</p></div><div className="contact-links"><a href="mailto:cedric.brzyski@epita.fr"><Mail size={16} />Email</a><a href="https://linkedin.com/in/cedric-brzyski" target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a><a href="https://github.com/cedric190703" target="_blank" rel="noreferrer"><Github size={16} />GitHub</a></div></section>
    <footer><span>© 2026 Cédric Brzyski</span><span>{t.footer}</span><a href="/resume-cedric-brzyski.pdf" download>{t.resume}</a></footer>
  </main>
}
