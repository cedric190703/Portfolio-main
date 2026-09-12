"use client"

import { useEffect, useState } from "react"
import {
  ArrowDownToLine,
  ArrowUpRight,
  BadgeCheck,
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
  { key: "mistral", featured: true, href: "https://github.com/cedric190703/mistral-vibe", tags: ["Python", "TypeScript", "LLM agents", "Chrome extensions"] },
  { key: "offline", featured: true, href: "https://github.com/cedric190703/EDTH-Hackathon-Berlin2026-OfflineLingo", tags: ["Kotlin", "Android", "whisper.cpp", "llama.cpp"] },
  { key: "amd", featured: true, href: "https://github.com/crc-amd-hackathon-2025/mission", tags: ["Python", "PyTorch", "LeRobot", "AMD ROCm"] },
  { key: "ovarian", featured: true, href: "https://github.com/cedric190703/Ov-health-challenge", tags: ["Python", "TensorFlow", "CNNs", "Medical imaging"] },
]

const content = {
  en: {
    nav: ["Profile", "Experiences", "Projects", "Hackathons", "Education", "Certifications"],
    availability: "Associate Consultant, AI Platforms at Sia Partners",
    title: "Applied AI Engineer",
    intro: "EPITA engineering graduate in Artificial Intelligence and Data Science, now an Associate Consultant in AI Platforms within Sia Partners’ GenAI Solutions practice. I design and build AI applications and backend systems from business need to production.",
    details: [["Location", "Saint-Maur-des-Fossés, France"], ["Email", "cbrzyski2@gmail.com"], ["Languages", "French (native), English (C1)"]],
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
    experience: "Experiences",
    experienceIntro: "Professional experiences",
    roles: [
      { date: "Sept. 2026 – Present", company: "Sia Partners · Paris", title: "Associate Consultant, AI Platforms", text: "Part of the GenAI Solutions practice within the AI Platforms & Data Science team, contributing to enterprise AI platform strategy, design and delivery.", highlights: ["Translate client needs into robust AI products, automated workflows and enterprise integrations that connect business requirements with implementation.", "Contribute across the GenAI platform lifecycle, from opportunity framing and solution design to delivery and adoption support.", "Use LLM platforms and cloud infrastructure to build scalable, production-oriented AI solutions for clients across industries."], tech: "GenAI platforms · LLMs · Python · Cloud · Consulting methods" },
      { date: "Feb. 2026 – Jul. 2026", company: "Safran · Paris", title: "AI Engineer Intern", text: "Translated ambiguous business requirements into production-ready AI workflows for Internal Audit teams.", highlights: ["Designed agentic applications for document analysis, findings extraction and automated reporting with Python, FastAPI, LangChain and AWS Bedrock.", "Developed and deployed full-stack backend services on AWS and OpenShift ROSA with Terraform and Docker, within enterprise security and infrastructure constraints.", "Worked directly with end users through discovery, development and deployment to refine requirements and workflows."], tech: "Python · FastAPI · LangChain · AWS Bedrock · AWS · OpenShift ROSA · Terraform · Docker" },
      { date: "Sept. 2024 – Jan. 2025", company: "Inserm · Paris", title: "R&D Mixed Reality & Software Intern", text: "Developed real-time VR and AR interfaces for medical simulation.", highlights: ["Connected physical telemetry with interactive digital environments.", "Optimized low-latency communication and telemetry-processing pipelines.", "Stabilized real-time processing of multidimensional data for simulation workflows."], tech: "VR/AR · Real-time telemetry · Network optimization" },
      { date: "June 2023", company: "Systhen · Fontenay-sous-Bois", title: "Software & Operations Intern", text: "Supported the optimization of internal administrative processes.", highlights: ["Worked with the Odoo ERP environment.", "Created standardized internal documentation systems."], tech: "Odoo · Process documentation" },
      { date: "July 2022", company: "Signaturit France · Paris", title: "Partnership Intern", text: "Contributed to reporting and partnership operations.", highlights: ["Built automated Power BI dashboards.", "Contributed to strategic commercial and partnership meetings."], tech: "Power BI · Business intelligence" },
    ],
    projects: "Projects",
    projectsIntro: "Selected technical work",
    pinned: "Pinned repository",
    additional: "Additional project",
    projectText: {
      mistral: ["Mistral Vibe", "2nd-place overall project at the Mistral AI Hackathon. Extended Mistral’s Vibe CLI with reusable agent skills, browser automation and intelligent routing between local and cloud models."],
      offline: ["OfflineLingo", "Offline Android speech-to-text translation application for emergency responders, using on-device speech recognition and local language models for private, low-latency multilingual communication."],
      amd: ["Autonomous Manipulation", "Robotic manipulation pipelines combining imitation learning, computer vision and perception algorithms for real-world tasks, developed for the AMD Open Robotics Hackathon."],
      ovarian: ["Ovarian Cancer Segmentation", "Deep-learning semantic-segmentation project for medical images, developed as a PINKCC Challenge finalist among more than 40 teams."],
    },
    source: "Source code",
    challenges: "Hackathons & challenges",
    challengesIntro: "Selected competitive and collaborative work",
    challengeResult: "Outcome",
    challengesList: [
      { date: "Jul. 2026", title: "Gemmory", event: "Gemma 4 Hackathon", result: "Local Android AI memory vault", text: "Private on-device memory assistant built with Gemma 4 and LiteRT-LM, including knowledge graphs, streaming generation and Room persistence.", href: "https://github.com/cedric190703/hackathon-gemma4-gemmory" },
      { date: "Jul. 2026", title: "Mistral Vibe", event: "Mistral AI Hackathon", result: "2nd place overall", text: "Extended Mistral’s Vibe CLI with reusable agent skills, browser automation and intelligent routing between local and cloud models.", href: "https://github.com/cedric190703/mistral-vibe" },
      { date: "Jul. 2026", title: "OfflineLingo", event: "EDTH Berlin Hackathon", result: "Offline Android translation", text: "Emergency translation application using whisper.cpp and llama.cpp with a quantized Qwen 2.5 model and confidence cues.", href: "https://github.com/cedric190703/EDTH-Hackathon-Berlin2026-OfflineLingo" },
      { date: "Apr. 2026", title: "Real-time fraud detection", event: "HEC Fintech Hackathon", result: "Full-stack prototype", text: "Phishing-risk scoring pipeline, Mistral explanations, Qdrant similarity search and a Chrome extension for real-time payment blocking.", href: "https://github.com/hec-fintech-hackathon-team/hackathon-project" },
      { date: "Mar. 2026", title: "PayTheTalent", event: "XRPL Hackathon", result: "Functional MVP", text: "Decentralized payment platform for talent marketplaces, built around secure XRPL wallet and transaction flows.", href: "https://github.com/XRP-Hackathon/PayTheTalent" },
      { date: "Dec. 2025", title: "Autonomous Manipulation", event: "AMD Open Robotics Hackathon", result: "Team project", text: "Designed robotic manipulation pipelines combining imitation learning, computer vision and perception algorithms for real-world tasks.", href: "https://github.com/crc-amd-hackathon-2025/mission" },
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
    certifications: "Certifications",
    certificationsIntro: "Professional learning credentials",
    viewCredential: "View credential",
    certificationsList: [
      { provider: "Kaggle Learn", title: "Intro to AI Ethics", detail: "Course completion certificate", href: "/certifications/kaggle/C%C3%A9dric%20Brz%20-%20Intro%20to%20AI%20Ethics.png" },
    ],
    contact: "Contact",
    contactText: "For an opportunity or collaboration, please get in touch by email or LinkedIn.",
    footer: "Portfolio · Cédric Brzyski",
  },
  fr: {
    nav: ["Profil", "Expériences", "Projets", "Hackathons", "Formation", "Certifications"],
    availability: "Consultant Associé, Plateformes IA chez Sia Partners",
    title: "Ingénieur IA appliquée",
    intro: "Ingénieur diplômé de l’EPITA en Intelligence Artificielle et Data Science, aujourd’hui Consultant Associé en Plateformes IA au sein de la practice GenAI Solutions de Sia Partners. Je conçois et développe des applications IA et des systèmes backend, du besoin métier jusqu’à la production.",
    details: [["Localisation", "Saint-Maur-des-Fossés, France"], ["Email", "cbrzyski2@gmail.com"], ["Langues", "Français (natif), anglais (C1)"]],
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
    experience: "Expériences",
    experienceIntro: "Expériences professionnelles",
    roles: [
      { date: "Sept. 2026 – aujourd’hui", company: "Sia Partners · Paris", title: "Consultant Associé, Plateformes IA", text: "Intégré à la practice GenAI Solutions au sein de l’équipe AI Platforms & Data Science, je contribue à la stratégie, à la conception et au déploiement de plateformes IA pour des clients grands comptes.", highlights: ["Traduction des besoins clients en produits IA robustes, en workflows automatisés et en intégrations d’entreprise, faisant le lien entre exigences métier et mise en œuvre technique.", "Contribution aux missions de conseil sur l’ensemble du cycle de vie des plateformes GenAI, du cadrage des opportunités et de la conception des solutions jusqu’au déploiement et à l’accompagnement à l’adoption.", "Exploitation de plateformes basées sur les LLM et d’infrastructures cloud pour construire des solutions IA évolutives et orientées production pour des clients de différents secteurs."], tech: "Plateformes GenAI · LLM · Python · Cloud · Méthodes de conseil" },
      { date: "Fév. 2026 – Juil. 2026", company: "Safran · Paris", title: "Stagiaire Ingénieur IA", text: "Traduction de besoins métier ambigus en workflows IA prêts pour la production pour les équipes d’Audit Interne.", highlights: ["Conception d’applications agentiques pour l’analyse documentaire, l’extraction de constats et la génération automatisée de rapports avec Python, FastAPI, LangChain et AWS Bedrock.", "Développement et déploiement de services backend full stack sur AWS et OpenShift ROSA avec Terraform et Docker, dans le respect des contraintes de sécurité et d’infrastructure de l’entreprise.", "Collaboration directe avec les utilisateurs finaux tout au long de la découverte, du développement et du déploiement pour itérer sur les besoins et les workflows."], tech: "Python · FastAPI · LangChain · AWS Bedrock · AWS · OpenShift ROSA · Terraform · Docker" },
      { date: "Sept. 2024 – Janv. 2025", company: "Inserm · Paris", title: "Stagiaire R&D Réalité Mixte & Logiciel", text: "Développement d’interfaces VR et AR temps réel pour la simulation médicale.", highlights: ["Connexion de télémétrie physique à des environnements numériques interactifs.", "Optimisation de la communication à faible latence et des pipelines de traitement de télémétrie.", "Stabilisation du traitement temps réel de données multidimensionnelles pour les flux de simulation."], tech: "VR/AR · Télémétrie temps réel · Optimisation réseau" },
      { date: "Juin 2023", company: "Systhen · Fontenay-sous-Bois", title: "Stagiaire logiciel & opérations", text: "Participation à l’optimisation des processus administratifs internes.", highlights: ["Travail avec l’environnement ERP Odoo.", "Création de systèmes de documentation interne standardisés."], tech: "Odoo · Documentation de processus" },
      { date: "Juil. 2022", company: "Signaturit France · Paris", title: "Stagiaire partenariats", text: "Contribution aux activités de reporting et de partenariats.", highlights: ["Création de tableaux de bord Power BI automatisés.", "Participation à des réunions commerciales et de partenariat stratégiques."], tech: "Power BI · Informatique décisionnelle" },
    ],
    projects: "Projets",
    projectsIntro: "Travaux techniques sélectionnés",
    pinned: "Dépôt épinglé",
    additional: "Projet complémentaire",
    projectText: {
      mistral: ["Mistral Vibe", "Projet classé 2e au général du Hackathon Mistral AI. Extension du CLI Vibe de Mistral avec des skills d’agents réutilisables, l’automatisation du navigateur et un routage intelligent entre modèles locaux et cloud."],
      offline: ["OfflineLingo", "Application Android de traduction vocale hors ligne pour les services de secours, utilisant la reconnaissance vocale embarquée et des modèles de langage locaux pour une communication multilingue privée et à faible latence."],
      amd: ["Manipulation autonome", "Pipelines de manipulation robotique combinant apprentissage par imitation, vision par ordinateur et algorithmes de perception pour des tâches réelles, développés pour l’AMD Open Robotics Hackathon."],
      ovarian: ["Segmentation du cancer de l’ovaire", "Projet de segmentation sémantique d’images médicales par deep learning, finaliste du PINKCC Challenge parmi plus de 40 équipes."],
    },
    source: "Code source",
    challenges: "Hackathons & challenges",
    challengesIntro: "Compétitions et projets collectifs sélectionnés",
    challengeResult: "Résultat",
    challengesList: [
      { date: "Juil. 2026", title: "Gemmory", event: "Gemma 4 Hackathon", result: "Coffre de mémoire IA local sur Android", text: "Assistant de mémoire privé sur appareil, construit avec Gemma 4 et LiteRT-LM, graphe de connaissances, génération en streaming et persistance Room.", href: "https://github.com/cedric190703/hackathon-gemma4-gemmory" },
      { date: "Juil. 2026", title: "Mistral Vibe", event: "Hackathon Mistral AI", result: "2e place au classement général", text: "Extension du CLI Vibe de Mistral avec des skills d’agents réutilisables, l’automatisation du navigateur et un routage intelligent entre modèles locaux et cloud.", href: "https://github.com/cedric190703/mistral-vibe" },
      { date: "Juil. 2026", title: "OfflineLingo", event: "EDTH Berlin Hackathon", result: "Traduction Android hors ligne", text: "Application de traduction d’urgence avec whisper.cpp, llama.cpp, Qwen 2.5 quantifié et indicateurs de confiance.", href: "https://github.com/cedric190703/EDTH-Hackathon-Berlin2026-OfflineLingo" },
      { date: "Avr. 2026", title: "Détection de fraude temps réel", event: "HEC Fintech Hackathon", result: "Prototype full stack", text: "Scoring de risque de phishing, explications Mistral, recherche de similarité Qdrant et extension Chrome qui bloque les paiements à risque.", href: "https://github.com/hec-fintech-hackathon-team/hackathon-project" },
      { date: "Mars 2026", title: "PayTheTalent", event: "XRPL Hackathon", result: "MVP fonctionnel", text: "Plateforme de paiement décentralisée pour les marketplaces de talents, avec transactions et portefeuilles XRPL sécurisés.", href: "https://github.com/XRP-Hackathon/PayTheTalent" },
      { date: "Déc. 2025", title: "Manipulation autonome", event: "AMD Open Robotics Hackathon", result: "Projet d’équipe", text: "Conception de pipelines de manipulation robotique combinant apprentissage par imitation, vision par ordinateur et algorithmes de perception pour des tâches réelles.", href: "https://github.com/crc-amd-hackathon-2025/mission" },
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
    certifications: "Certifications",
    certificationsIntro: "Certificats de formation professionnelle",
    viewCredential: "Voir le certificat",
    certificationsList: [
      { provider: "Kaggle Learn", title: "Introduction à l’éthique de l’IA", detail: "Certificat de fin de formation", href: "/certifications/kaggle/C%C3%A9dric%20Brz%20-%20Intro%20to%20AI%20Ethics.png" },
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
  const ids = ["profile", "experience", "projects", "challenges", "education", "certifications"]
  const resumeHref = language === "fr" ? "/resumes/CV_Cedric_Brzyski.pdf" : "/resumes/Resume_Cedric_Brzyski.pdf"

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language")
    if (savedLanguage === "en" || savedLanguage === "fr") setLanguage(savedLanguage)
  }, [])

  const changeLanguage = (value: Language) => {
    setLanguage(value)
    window.localStorage.setItem("portfolio-language", value)
  }

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
        <a className="resume-link desktop-resume" href={resumeHref} download><ArrowDownToLine size={14} />{t.resume}</a>
        <LanguageToggle language={language} onLanguageChange={changeLanguage} /><ThemeToggle />
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {menuOpen && <nav className="mobile-nav">{t.nav.map((item, index) => <button key={item} onClick={() => navigate(ids[index])}>{item}</button>)}<a className="mobile-page-link" href="/showcase">01 / {t.showcase}</a><a className="mobile-page-link" href="/articles">02 / {t.articles}</a><a href={resumeHref} download>{t.resume}</a></nav>}
    </header>

    <section id="top" className="intro section-wrap">
      <div className="intro-heading"><p>{t.availability}</p><h1>Cédric Brzyski</h1><h2>{t.title}</h2></div>
      <div className="intro-summary"><p>{t.intro}</p><a className="resume-button" href={resumeHref} download><ArrowDownToLine size={17} />{t.resume}</a></div>
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

    <section id="certifications" className="section-wrap section-block certifications">
      <div className="section-title"><span>06</span><div><h2>{t.certifications}</h2><p>{t.certificationsIntro}</p></div></div>
      <div className="certification-grid">{t.certificationsList.map((certification) => <article className="certification" key={certification.href}><BadgeCheck aria-hidden="true" /><div><p className="company">{certification.provider}</p><h3>{certification.title}</h3><p>{certification.detail}</p></div><a href={certification.href} target="_blank" rel="noreferrer">{t.viewCredential}<ArrowUpRight size={18} /></a></article>)}</div>
    </section>

    <section className="contact section-wrap"><BriefcaseBusiness size={22} /><div><p className="section-number">07 / {t.contact}</p><h2>cbrzyski2@gmail.com</h2><p>{t.contactText}</p></div><div className="contact-links"><a href="mailto:cbrzyski2@gmail.com"><Mail size={16} />Email</a><a href="https://linkedin.com/in/cedric-brzyski" target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a><a href="https://github.com/cedric190703" target="_blank" rel="noreferrer"><Github size={16} />GitHub</a></div></section>
    <footer><span>© 2026 Cédric Brzyski</span><span>{t.footer}</span><a href={resumeHref} download>{t.resume}</a></footer>
  </main>
}
