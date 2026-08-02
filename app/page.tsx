"use client"

import { useState } from "react"
import {
  ArrowDownToLine,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronRight,
  Cpu,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Sparkles,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"

type Language = "en" | "fr"

const projects = [
  {
    key: "mistral",
    eyebrow: "01 / AGENTIC AI",
    icon: Sparkles,
    href: "https://github.com/cedric190703/mistral-vibe",
    tags: ["Python", "TypeScript", "LLM Agents"],
  },
  {
    key: "offline",
    eyebrow: "02 / EDGE AI",
    icon: Globe2,
    href: "https://github.com/cedric190703/EDTH-Hackathon-Berlin2026-OfflineLingo",
    tags: ["Kotlin", "whisper.cpp", "llama.cpp"],
  },
  {
    key: "robotics",
    eyebrow: "03 / ROBOTICS",
    icon: Cpu,
    href: "https://github.com/cedric190703/lerobot",
    tags: ["PyTorch", "LeRobot", "ROCm"],
  },
  {
    key: "medical",
    eyebrow: "04 / COMPUTER VISION",
    icon: BrainCircuit,
    href: "https://github.com/cedric190703/Ov-health-challenge",
    tags: ["TensorFlow", "CNNs", "Medical Imaging"],
  },
]

const copy = {
  en: {
    nav: ["About", "Experience", "Selected work", "Contact"],
    availability: "OPEN TO AI & SOFTWARE OPPORTUNITIES",
    role: "AI Engineer & Software Builder",
    intro:
      "I build useful AI systems—from secure enterprise copilots to offline intelligence and real-time robotic applications.",
    location: "Based in Paris, France",
    viewWork: "Explore selected work",
    resume: "Download résumé",
    impact: [
      ["2nd", "Mistral AI Hackathon"],
      ["4+", "AI systems in production contexts"],
      ["C1", "English · French native"],
    ],
    aboutLabel: "PROFILE / 01",
    aboutTitle: "I turn ambitious AI ideas into dependable software.",
    about:
      "Final-year EPITA engineering student specializing in Artificial Intelligence and Data Science. My work sits at the intersection of LLM systems, computer vision, robotics, and product-minded software engineering.",
    capabilities: ["Agentic AI & RAG", "Machine learning & vision", "Backend & API engineering", "Robotics & real-time systems"],
    stackLabel: "Core toolkit",
    stack: ["Python", "PyTorch", "LangChain", "FastAPI", "TypeScript", "Docker", "AWS", "ROS2"],
    experienceLabel: "EXPERIENCE / 02",
    experienceTitle: "Building AI where it has to work.",
    experiences: [
      {
        date: "Feb 2026 — Jul 2026",
        company: "Safran",
        role: "AI Engineer Intern",
        text: "Designed enterprise agentic-AI applications that automate audit workflows, document analysis, findings extraction, executive summaries, and report generation.",
        detail: "AWS Bedrock · LangChain · FastAPI · Multi-agent systems",
      },
      {
        date: "Sept 2024 — Jan 2025",
        company: "Inserm",
        role: "R&D Mixed Reality & Software Intern",
        text: "Developed real-time VR/AR interfaces for medical simulations, connecting physical telemetry with interactive digital environments and low-latency data pipelines.",
        detail: "VR / AR · Telemetry · Real-time systems",
      },
    ],
    workLabel: "SELECTED WORK / 03",
    workTitle: "A practical portfolio across the AI stack.",
    projectText: {
      mistral: {
        title: "Mistral Vibe: agent capabilities",
        result: "2nd place overall · Mistral AI Hackathon 2026",
        text: "Extended Mistral’s Vibe CLI with reusable skills, browser automation, live testing, local-model discovery, and intelligent model routing for lower inference cost.",
      },
      offline: {
        title: "OfflineLingo",
        result: "Private multilingual communication, without a network",
        text: "Built an Android speech-to-text translation app for emergency responders, combining on-device recognition and language models for low-latency operation.",
      },
      robotics: {
        title: "Autonomous manipulation",
        result: "AMD Open Robotics Hackathon 2025",
        text: "Developed robotic manipulation pipelines that combine imitation learning, vision, and perception; optimized inference on AMD ROCm for real-time decision-making.",
      },
      medical: {
        title: "Ovarian cancer segmentation",
        result: "Finalist team · 40+ participants",
        text: "Trained deep-learning models for semantic tumor segmentation, combining image-processing pipelines and ensemble methods for medical imaging.",
      },
    },
    more: "View project",
    githubLabel: "MORE ON GITHUB",
    githubTitle: "Also exploring OCR, local LLM interfaces, RAG products, vision, and data-driven tooling.",
    githubAction: "Explore all repositories",
    contactLabel: "CONTACT / 04",
    contactTitle: "Let’s build something that matters.",
    contactText: "Have an opportunity, problem, or ambitious idea? I’d love to hear about it.",
    email: "Email me",
    footer: "Designed and built by Cédric Brzyski.",
  },
  fr: {
    nav: ["À propos", "Expérience", "Projets", "Contact"],
    availability: "OUVERT AUX OPPORTUNITÉS IA & LOGICIEL",
    role: "Ingénieur IA & créateur de logiciels",
    intro:
      "Je conçois des systèmes d’IA utiles : copilotes d’entreprise sécurisés, intelligence hors ligne et applications robotiques temps réel.",
    location: "Basé à Paris, France",
    viewWork: "Découvrir les projets",
    resume: "Télécharger le CV",
    impact: [
      ["2e", "Mistral AI Hackathon"],
      ["4+", "systèmes IA en contexte de production"],
      ["C1", "anglais · français natif"],
    ],
    aboutLabel: "PROFIL / 01",
    aboutTitle: "Je transforme des idées IA ambitieuses en logiciels fiables.",
    about:
      "Étudiant ingénieur en dernière année à l’EPITA, spécialisé en Intelligence Artificielle et Data Science. Mon travail se situe à la croisée des systèmes LLM, de la vision par ordinateur, de la robotique et de l’ingénierie logicielle orientée produit.",
    capabilities: ["IA agentique & RAG", "Machine learning & vision", "Backend & API", "Robotique & temps réel"],
    stackLabel: "Outils clés",
    stack: ["Python", "PyTorch", "LangChain", "FastAPI", "TypeScript", "Docker", "AWS", "ROS2"],
    experienceLabel: "EXPÉRIENCE / 02",
    experienceTitle: "Construire des IA là où elles doivent fonctionner.",
    experiences: [
      {
        date: "Fév. 2026 — Juil. 2026",
        company: "Safran",
        role: "Stagiaire AI Engineer",
        text: "Conception d’applications d’IA agentique pour automatiser les flux d’audit, l’analyse documentaire, l’extraction de constats, les synthèses de direction et les rapports.",
        detail: "AWS Bedrock · LangChain · FastAPI · Systèmes multi-agents",
      },
      {
        date: "Sept. 2024 — Janv. 2025",
        company: "Inserm",
        role: "Stagiaire R&D Réalité Mixte & Logiciel",
        text: "Développement d’interfaces VR/AR temps réel pour simulations médicales, reliant télémétrie physique, environnements interactifs et pipelines de données faible latence.",
        detail: "VR / AR · Télémétrie · Systèmes temps réel",
      },
    ],
    workLabel: "PROJETS SÉLECTIONNÉS / 03",
    workTitle: "Un portfolio concret sur toute la chaîne IA.",
    projectText: {
      mistral: {
        title: "Mistral Vibe : capacités agentiques",
        result: "2e place · Mistral AI Hackathon 2026",
        text: "Extension de la CLI Vibe de Mistral avec des compétences réutilisables, de l’automatisation navigateur, des tests en direct, la découverte de modèles locaux et du routage intelligent.",
      },
      offline: {
        title: "OfflineLingo",
        result: "Communication multilingue privée, sans réseau",
        text: "Application Android de traduction vocale conçue pour les intervenants d’urgence, combinant reconnaissance et modèles de langage embarqués à faible latence.",
      },
      robotics: {
        title: "Manipulation autonome",
        result: "AMD Open Robotics Hackathon 2025",
        text: "Pipelines de manipulation robotique associant imitation learning, vision et perception ; inférence optimisée sur AMD ROCm pour la prise de décision en temps réel.",
      },
      medical: {
        title: "Segmentation du cancer de l’ovaire",
        result: "Équipe finaliste · 40+ participants",
        text: "Modèles de deep learning pour la segmentation sémantique de tumeurs, combinant pipelines de traitement d’images et méthodes d’ensemble.",
      },
    },
    more: "Voir le projet",
    githubLabel: "PLUS SUR GITHUB",
    githubTitle: "J’explore aussi l’OCR, les interfaces LLM locales, les produits RAG, la vision et les outils data.",
    githubAction: "Explorer tous les dépôts",
    contactLabel: "CONTACT / 04",
    contactTitle: "Construisons quelque chose qui compte.",
    contactText: "Une opportunité, un problème ou une idée ambitieuse ? Parlons-en.",
    email: "M’écrire",
    footer: "Conçu et développé par Cédric Brzyski.",
  },
}

export default function Portfolio() {
  const [language, setLanguage] = useState<Language>("en")
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[language]

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Cédric Brzyski home">CB<span>.</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {t.nav.map((item, index) => (
            <button key={item} onClick={() => navigate(["about", "experience", "work", "contact"][index])}>{item}</button>
          ))}
        </nav>
        <div className="header-actions">
          <a className="resume-link desktop-resume" href="/resume-cedric-brzyski.pdf" download>
            <ArrowDownToLine size={15} /> {t.resume}
          </a>
          <LanguageToggle onLanguageChange={(value) => setLanguage(value as Language)} />
          <ThemeToggle />
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {t.nav.map((item, index) => (
              <button key={item} onClick={() => navigate(["about", "experience", "work", "contact"][index])}>{item}</button>
            ))}
            <a href="/resume-cedric-brzyski.pdf" download>{t.resume}</a>
          </nav>
        )}
      </header>

      <section id="top" className="hero section-wrap">
        <div className="hero-grid" />
        <div className="hero-main">
          <p className="eyebrow"><span className="status-dot" />{t.availability}</p>
          <p className="hero-kicker">{t.role}</p>
          <h1>Cédric<br /><em>Brzyski.</em></h1>
          <p className="hero-copy">{t.intro}</p>
          <div className="hero-actions">
            <Button className="button-primary" onClick={() => navigate("work")}>{t.viewWork}<ChevronRight size={17} /></Button>
            <a className="button-text" href="/resume-cedric-brzyski.pdf" download>{t.resume}<ArrowDownToLine size={16} /></a>
          </div>
        </div>
        <aside className="hero-aside">
          <div className="location"><MapPin size={15} /> {t.location}</div>
          <div className="hero-card">
            <span className="card-index">FOCUSED ON</span>
            <BrainCircuit size={28} />
            <strong>AI systems<br />with real-world utility.</strong>
            <div className="mini-line" />
            <span>LLMs · Vision · Robotics</span>
          </div>
        </aside>
      </section>

      <section className="impact section-wrap" aria-label="Highlights">
        {t.impact.map(([number, label]) => <div className="impact-item" key={label}><strong>{number}</strong><span>{label}</span></div>)}
      </section>

      <section id="about" className="about section-wrap">
        <div className="section-label">{t.aboutLabel}</div>
        <div className="about-content">
          <h2>{t.aboutTitle}</h2>
          <div className="about-side">
            <p>{t.about}</p>
            <ul className="capabilities">{t.capabilities.map((item) => <li key={item}><ChevronRight size={16} />{item}</li>)}</ul>
          </div>
        </div>
        <div className="stack-row"><span>{t.stackLabel}</span><div>{t.stack.map((item) => <b key={item}>{item}</b>)}</div></div>
      </section>

      <section id="experience" className="experience section-wrap">
        <div className="section-heading"><div className="section-label">{t.experienceLabel}</div><h2>{t.experienceTitle}</h2></div>
        <div className="experience-list">
          {t.experiences.map((item) => (
            <article className="experience-card" key={item.company}>
              <div className="experience-date">{item.date}</div>
              <div><span className="company">{item.company}</span><h3>{item.role}</h3></div>
              <p>{item.text}</p>
              <span className="experience-detail">{item.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="work section-wrap">
        <div className="section-heading"><div className="section-label">{t.workLabel}</div><h2>{t.workTitle}</h2></div>
        <div className="project-grid">
          {projects.map((project) => {
            const item = t.projectText[project.key as keyof typeof t.projectText]
            const Icon = project.icon
            return <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.key}>
              <div className="project-top"><span>{project.eyebrow}</span><ArrowUpRight size={19} /></div>
              <div className="project-icon"><Icon size={31} strokeWidth={1.45} /></div>
              <h3>{item.title}</h3><strong>{item.result}</strong><p>{item.text}</p>
              <div className="project-bottom"><div>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="project-link">{t.more}</span></div>
            </a>
          })}
        </div>
      </section>

      <section className="github-banner section-wrap">
        <div><p className="section-label">{t.githubLabel}</p><h2>{t.githubTitle}</h2></div>
        <a className="github-button" href="https://github.com/cedric190703" target="_blank" rel="noreferrer"><Github size={20} />{t.githubAction}<ArrowUpRight size={18} /></a>
      </section>

      <section id="contact" className="contact section-wrap">
        <p className="section-label">{t.contactLabel}</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <a className="email-link" href="mailto:cedric.brzyski@epita.fr">cedric.brzyski@epita.fr <ArrowUpRight size={24} /></a>
        <div className="contact-links"><a href="https://linkedin.com/in/cedric-brzyski" target="_blank" rel="noreferrer"><Linkedin size={17} />LinkedIn</a><a href="https://github.com/cedric190703" target="_blank" rel="noreferrer"><Github size={17} />GitHub</a><a href="mailto:cedric.brzyski@epita.fr"><Mail size={17} />Email</a></div>
      </section>

      <footer><span>© 2026 Cédric Brzyski</span><span>{t.footer}</span></footer>
    </main>
  )
}
