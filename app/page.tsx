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
    nav: ["Profile", "Experience", "Projects", "Education"],
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
    nav: ["Profil", "Expérience", "Projets", "Formation"],
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
  const ids = ["profile", "experience", "projects", "education"]

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

    <section id="projects" className="section-wrap section-block">
      <div className="section-title"><span>03</span><div><h2>{t.projects}</h2><p>{t.projectsIntro}</p></div></div>
      <div className="project-grid">{projects.map((project) => { const [title, text] = t.projectText[project.key as keyof typeof t.projectText]; return <article className="project" key={project.key}><div className="project-meta"><span>{project.featured ? t.pinned : t.additional}</span><a href={project.href} target="_blank" rel="noreferrer" aria-label={`${title} source code`}><ArrowUpRight size={18} /></a></div><h3>{title}</h3><p>{text}</p><div className="project-footer"><div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer">{t.source}</a></div></article>})}</div>
    </section>

    <section id="education" className="section-wrap section-block education">
      <div className="section-title"><span>04</span><div><h2>{t.education}</h2><p>{t.educationIntro}</p></div></div>
      <div className="studies">{t.studies.map(([date, school, degree]) => <article key={school}><time>{date}</time><div><h3>{school}</h3><p>{degree}</p></div><GraduationCap size={21} /></article>)}</div>
    </section>

    <section className="contact section-wrap"><BriefcaseBusiness size={22} /><div><p className="section-number">05 / {t.contact}</p><h2>cedric.brzyski@epita.fr</h2><p>{t.contactText}</p></div><div className="contact-links"><a href="mailto:cedric.brzyski@epita.fr"><Mail size={16} />Email</a><a href="https://linkedin.com/in/cedric-brzyski" target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a><a href="https://github.com/cedric190703" target="_blank" rel="noreferrer"><Github size={16} />GitHub</a></div></section>
    <footer><span>© 2026 Cédric Brzyski</span><span>{t.footer}</span><a href="/resume-cedric-brzyski.pdf" download>{t.resume}</a></footer>
  </main>
}
