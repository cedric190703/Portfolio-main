"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useState } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Brain,
  ArrowRight,
  Database,
} from "lucide-react"

export default function Portfolio() {
  const [language, setLanguage] = useState("en")

  const content = {
    en: {
      nav: {
        about: "About",
        experience: "Experience",
        projects: "Projects",
        contact: "Contact",
      },
      hero: {
        specialist: "Data & AI Engineer",
        description:
          "Engineering student at EPITA specializing in AI and Data, currently interning at Safran. Seeking opportunities in Data Engineering, Data Analysis, or AI.",
        getInTouch: "Get In Touch",
        viewProjects: "View Projects",
      },
      about: {
        title: "About Me",
        p1: "I'm a 22-year-old engineering student at EPITA with a strong focus on Data Science, AI, and the development of concrete, high-value technological solutions.",
        p2: "I am actively looking for a position in Data Engineering, Data Analysis, or AI — domains where I can combine technical rigor with a genuine passion for turning data into actionable insights.",
        technical: "Technical Expertise",
        aiMl: "AI & Machine Learning",
        development: "Development",
        medicalTech: "Tools",
      },
      education: {
        title: "Education",
        epita: "EPITA - Engineering in Computer Science",
        epitaDesc: "Specializing in Medical AI",
        uqac: "UQAC - Canada",
        uqacDesc: "Semester in mathematics and computer science",
        lycee: "Lycée Marcelin Berthelot",
        lyceeDesc: "Scientific Baccalaureate",
      },
      experience: {
        title: "Professional Experience",
        safran: "Data Science & AI Intern — Safran, Paris",
        safranPeriod: "Feb. 2026 – Jul. 2026",
        safranDesc: "Development of an internal AI assistant for the audit and internal control division.",
        safranTasks: [
          "Development of an internal AI assistant for the audit and internal control division.",
          "Creation of a library of optimized prompts for task automation.",
          "Training auditors on AI usage and measuring operational performance gains.",
          "Analysis and identification of time-consuming processes for AI integration.",
        ],
        inserm: "Mixed Reality Intern — Inserm, Paris",
        insermPeriod: "Sept. 2024 – Jan. 2025",
        insermDesc: "VR/AR development for medical training and tele-expertise",
        insermTasks: [
          "Development of immersive VR/AR applications for medical training scenarios",
          "Integration of 360° videos and live streaming for remote medical education",
          "Network optimization for real-time medical tele-expertise systems",
        ],
        systhen: "Intern — Systhen, Fontenay-sous-Bois",
        systhenPeriod: "June 2023",
        systhenTasks: [
          "Administrative management and process optimization with Odoo ERP",
          "Creation and standardization of internal documentation systems",
        ],
        signaturit: "Partnership Intern — Signaturit France, Paris",
        signaturitPeriod: "July 2022",
        signaturitTasks: [
          "Development of automated Power BI dashboards for business intelligence",
          "Active participation in strategic commercial meetings and partnerships",
        ],
      },
      projects: {
        title: "Projects",
        ovarian: "Ovarian Cancer Segmentation AI",
        ovarianDesc: "Finalist in medical AI competition — tumor segmentation system",
        ovarianPara:
          "Developed AI models for tumor and metastasis segmentation using ensemble learning techniques and image processing pipelines.",
        localChat: "Local AI Chat Interface",
        localChatDesc: "RAG-powered interface for local LLM deployment",
        localChatPara:
          "Built an interface for local LLM deployment with Retrieval-Augmented Generation (RAG) capabilities, enabling private AI conversations with document understanding.",
        hackathon: "GGH 2025 Hackathon",
        hackathonDesc: "Jury's Favorite Award — Innovative hackathon solution",
        hackathonPara: "Developed an application for dyslexic people.",
        amd: "AMD Robotics Hackathon 2025",
        amdDesc: "Robotic camera assistant — team project",
        amdPara:
          "Developed a robotic camera assistant in a team of 3, capable of grabbing and stabilizing a camera, tracking and following a target in real time. The system is voice-controlled, enabling hands-free operation to assist content creators with dynamic and adaptive video recording.",
        ship: "Ship Image Classification — Kaggle Competition (Top 3)",
        shipDesc: "Ranked Top 3 out of 117 teams — EPITA internal Kaggle competition",
        shipPara:
          "Participated in an internal Kaggle competition hosted at EPITA, focused on classifying ship images into multiple categories. Designed and trained a CNN (Keras/TensorFlow) under a strict constraint of less than 30 layers. Ranked Top 3 out of 117 teams with a validation score of 0.87174.",
        compiler: "Tiger Compiler — LLVM Integration",
        compilerDesc: "Compiler development with LLVM-IR generation",
        compilerPara:
          "Implemented a complete compiler frontend featuring lexical and syntactic analysis with LLVM-IR code generation.",
      },
      interests: {
        title: "Interests",
        tennis: "Tennis",
        tennisDesc: "Ranked 4/6",
        finance: "Personal Finance",
        financeDesc: "Investment strategies",
        tech: "New Technologies",
        techDesc: "AI, Data, Blockchain",
      },
      contact: {
        title: "Get In Touch",
        email: "Email",
        phone: "Phone",
      },
    },
    fr: {
      nav: {
        about: "À propos",
        experience: "Expérience",
        projects: "Projets",
        contact: "Contact",
      },
      hero: {
        specialist: "Ingénieur Data & IA",
        description:
          "Étudiant ingénieur à l'EPITA spécialisé en IA et Data, actuellement en stage chez Safran. À la recherche d'opportunités en Data Engineering, Data Analyse ou IA.",
        getInTouch: "Me Contacter",
        viewProjects: "Voir les Projets",
      },
      about: {
        title: "À Propos de Moi",
        p1: "Je suis un étudiant de 22 ans à l'EPITA avec une forte orientation Data Science, IA et développement de solutions technologiques à forte valeur ajoutée.",
        p2: "Je recherche activement un poste en Data Engineering, Data Analyse ou IA — des domaines où je peux combiner rigueur technique et passion pour transformer les données en insights actionnables.",
        technical: "Expertise Technique",
        aiMl: "IA & Machine Learning",
        development: "Développement",
        medicalTech: "Outils",
      },
      education: {
        title: "Formation",
        epita: "EPITA - Ingénierie en Informatique",
        epitaDesc: "Spécialisation en IA Médicale",
        uqac: "UQAC - Canada",
        uqacDesc: "Semestre en mathématiques et informatique",
        lycee: "Lycée Marcelin Berthelot",
        lyceeDesc: "Baccalauréat Scientifique (Mention Bien)",
      },
      experience: {
        title: "Expérience Professionnelle",
        safran: "Stagiaire Data Science & IA — Safran, Paris",
        safranPeriod: "Févr. 2026 – Juil. 2026",
        safranDesc: "Développement d'un assistant IA interne pour la direction des audits et du contrôle interne.",
        safranTasks: [
          "Développement d'un assistant IA interne pour la direction des audits et du contrôle interne.",
          "Création d'une bibliothèque de prompts optimisés pour l'automatisation de tâches.",
          "Formation des auditeurs aux usages de l'IA et mesure des gains de performance opérationnelle.",
          "Analyse et recensement des processus chronophages pour intégration de solutions d'IA.",
        ],
        inserm: "Stagiaire en Réalité Mixte — Inserm, Paris",
        insermPeriod: "Sept. 2024 – Janv. 2025",
        insermDesc: "Développement d'applications VR/AR pour la formation médicale et la télé-expertise.",
        insermTasks: [
          "Développement d'applications immersives VR/AR pour des scénarios de formation médicale",
          "Intégration de vidéos 360° et de streaming en direct pour l'enseignement médical à distance",
          "Optimisation du réseau pour les systèmes de télé-expertise médicale en temps réel",
        ],
        systhen: "Stagiaire — Systhen, Fontenay-sous-Bois",
        systhenPeriod: "Juin 2023",
        systhenTasks: [
          "Gestion administrative et optimisation des processus avec l'ERP Odoo",
          "Création et standardisation des systèmes de documentation interne",
        ],
        signaturit: "Stagiaire Partenariats — Signaturit France, Paris",
        signaturitPeriod: "Juil. 2022",
        signaturitTasks: [
          "Développement de tableaux de bord Power BI automatisés pour l'informatique décisionnelle",
          "Participation active aux réunions commerciales stratégiques et aux partenariats",
        ],
      },
      projects: {
        title: "Projets",
        ovarian: "IA de Segmentation du Cancer de l'Ovaire",
        ovarianDesc: "Finaliste d'un concours d'IA médicale — Système de segmentation de tumeurs.",
        ovarianPara:
          "Développement de modèles d'IA pour la segmentation des tumeurs et des métastases à l'aide de techniques d'apprentissage d'ensemble et de pipelines de traitement d'images.",
        localChat: "Interface de Chat IA Locale",
        localChatDesc: "Interface alimentée par RAG pour le déploiement local de LLM.",
        localChatPara:
          "Création d'une interface pour le déploiement local de LLM avec des capacités de génération augmentée par récupération (RAG), permettant des conversations IA privées avec compréhension de documents.",
        hackathon: "Hackathon GGH 2025",
        hackathonDesc: "Prix Coup de Cœur du Jury — Solution innovante de hackathon.",
        hackathonPara: "Développement d'une application pour les personnes dyslexiques.",
        amd: "AMD Robotics Hackathon 2025",
        amdDesc: "Assistant caméra robotique — projet d'équipe",
        amdPara:
          "Développement en équipe de 3 d'un assistant caméra robotique capable de saisir et stabiliser une caméra, de suivre une cible en temps réel. Le système est contrôlé par la voix pour assister les créateurs de contenu.",
        ship: "Classification d'Images de Navires — Compétition Kaggle (Top 3)",
        shipDesc: "Classé Top 3 sur 117 équipes — compétition Kaggle interne à l'EPITA",
        shipPara:
          "Participation à une compétition Kaggle interne à l'EPITA portant sur la classification d'images de navires. Conception et entraînement d'un CNN (Keras/TensorFlow) sous contrainte stricte de moins de 30 couches. Classé Top 3 sur 117 équipes (score de validation : 0.87174).",
        compiler: "Compilateur Tiger — Intégration LLVM",
        compilerDesc: "Développement de compilateur avec génération de LLVM-IR.",
        compilerPara:
          "Implémentation du frontend de compilateur complet avec analyse lexicale et syntaxique avec génération de code LLVM-IR.",
      },
      interests: {
        title: "Centres d'Intérêt",
        tennis: "Tennis",
        tennisDesc: "Classé 4/6",
        finance: "Finances Personnelles",
        financeDesc: "Stratégies d'investissement",
        tech: "Nouvelles Technologies",
        techDesc: "IA, Data, Blockchain",
      },
      contact: {
        title: "Me Contacter",
        email: "Email",
        phone: "Téléphone",
      },
    },
  }

  const t = content[language as keyof typeof content]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl gradient-text">Portfolio</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button onClick={() => scrollToSection("about")} className="transition-colors hover:text-primary">
              {t.nav.about}
            </button>
            <button onClick={() => scrollToSection("experience")} className="transition-colors hover:text-primary">
              {t.nav.experience}
            </button>
            <button onClick={() => scrollToSection("projects")} className="transition-colors hover:text-primary">
              {t.nav.projects}
            </button>
            <button onClick={() => scrollToSection("contact")} className="transition-colors hover:text-primary">
              {t.nav.contact}
            </button>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10" asChild>
              <a href="https://github.com/cedric190703" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-primary/10" asChild>
              <a href="https://linkedin.com/in/cedric-brzyski" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-primary/10" asChild>
              <a href="https://kaggle.com/cedricbrzyski" target="_blank" rel="noopener noreferrer">
                <Database className="h-4 w-4" />
              </a>
            </Button>
            <LanguageToggle onLanguageChange={setLanguage} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="section-spacing pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-primary/10 px-4 py-1.5 rounded text-sm font-medium text-primary border border-primary/20 tracking-wide uppercase">
                <span>{t.hero.specialist}</span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-balance">
                <span className="gradient-text">Cédric</span> <span className="text-foreground">Brzyski</span>
              </h1>

              <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl text-balance leading-relaxed">
                {t.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="text-sm px-4 py-1.5 border-primary/30 text-primary">
                Data Engineering
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-1.5 border-primary/30 text-primary">
                Machine Learning
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-1.5 border-primary/30 text-primary">
                Data Analysis
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-1.5 border-primary/30 text-primary">
                Computer Vision
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg group"
                onClick={() => scrollToSection("contact")}
              >
                {t.hero.getInTouch}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg border-2 hover:bg-primary/5 hover:border-primary bg-transparent"
                onClick={() => scrollToSection("projects")}
              >
                {t.hero.viewProjects}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-spacing bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">{t.about.title}</h2>
                <div className="w-16 h-px bg-primary/40"></div>
              </div>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg border hover-lift">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Saint-Maur-des-Fossés, Paris, France</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-border hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="h-5 w-5 text-primary" />
                    <span>{t.about.technical}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">{t.about.aiMl}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        Python
                      </Badge>
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        TensorFlow
                      </Badge>
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        scikit-learn
                      </Badge>
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        LangChain
                      </Badge>
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        Ollama
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-accent">{t.about.development}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-accent/5 border-accent/20">
                        JavaScript/TypeScript
                      </Badge>
                      <Badge variant="outline" className="bg-accent/5 border-accent/20">
                        Next.js
                      </Badge>
                      <Badge variant="outline" className="bg-accent/5 border-accent/20">
                        FastAPI
                      </Badge>
                      <Badge variant="outline" className="bg-accent/5 border-accent/20">
                        C/C#
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-primary">{t.about.medicalTech}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        Three.js
                      </Badge>
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        WebXR
                      </Badge>
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        Unity
                      </Badge>
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        Medical Imaging
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{t.education.title}</h2>
            <div className="w-16 h-px bg-primary/40 mx-auto"></div>
          </div>
          <div className="grid gap-6 max-w-4xl mx-auto">
            <Card className="border-border hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">{t.education.epita}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    2021 - 2026
                  </Badge>
                </CardTitle>
                <CardDescription className="text-base">{t.education.epitaDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">{t.education.uqac}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Jan - May 2023
                  </Badge>
                </CardTitle>
                <CardDescription className="text-base">{t.education.uqacDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">{t.education.lycee}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    2021
                  </Badge>
                </CardTitle>
                <CardDescription className="text-base">{t.education.lyceeDesc}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="experience" className="section-spacing">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{t.experience.title}</h2>
            <div className="w-16 h-px bg-primary/40 mx-auto"></div>
          </div>

          <div className="grid gap-8 max-w-4xl mx-auto">
            <Card className="border-border hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>{t.experience.safran}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {t.experience.safranPeriod}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">{t.experience.safranDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {t.experience.safranTasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>{t.experience.inserm}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {t.experience.insermPeriod}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">{t.experience.insermDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {t.experience.insermTasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>{t.experience.systhen}</span>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    {t.experience.systhenPeriod}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {t.experience.systhenTasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>{t.experience.signaturit}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {t.experience.signaturitPeriod}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {t.experience.signaturitTasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="projects" className="section-spacing bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{t.projects.title}</h2>
            <div className="w-16 h-px bg-primary/40 mx-auto"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            <Card className="border-border hover-lift group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>{t.projects.ovarian}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <a
                      href="https://github.com/cedric190703/Ov-health-challenge"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
                <CardDescription className="text-base">
                  <span className="text-primary font-semibold">{t.projects.ovarianDesc}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Python
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Ensemble Learning
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Computer Vision
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Medical Imaging
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-primary mb-2">
                  <span className="font-semibold">Score: 0.5082</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.projects.ovarianPara}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover-lift group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>{t.projects.localChat}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <a href="https://github.com/cedric190703/local-chat" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
                <CardDescription className="text-base">{t.projects.localChatDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Node.js
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Next.js
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    LangChain
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Ollama
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.projects.localChatPara}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover-lift group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>{t.projects.hackathon}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <a href="https://github.com/cedric190703/GGH2025-LaD" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
                <CardDescription className="text-base">
                  <span className="text-accent font-semibold">{t.projects.hackathonDesc}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Node.js
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    React
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Innovation
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-accent mb-2">
                  <span className="font-semibold">Jury's Favorite Award Winner</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.projects.hackathonPara}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover-lift group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>{t.projects.amd}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <a
                      href="https://github.com/crc-amd-hackathon-2025/mission"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
                <CardDescription className="text-base">{t.projects.amdDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Robotics
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Computer Vision
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Voice Control
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Python
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{t.projects.amdPara}</p>
              </CardContent>
            </Card>

            <Card className="border-border hover-lift group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>{t.projects.ship}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <a
                      href="https://github.com/cedric190703/Image-Classification"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
                <CardDescription className="text-base">
                  <span className="text-primary font-semibold">{t.projects.shipDesc}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Python
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    TensorFlow / Keras
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    CNN
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Data Augmentation
                  </Badge>
                </div>
                <div className="text-sm text-primary font-semibold mb-2">Validation score: 0.87174</div>
                <p className="text-sm text-muted-foreground">{t.projects.shipPara}</p>
              </CardContent>
            </Card>

            <Card className="border-border hover-lift">
              <CardHeader>
                <CardTitle className="text-xl">{t.projects.compiler}</CardTitle>
                <CardDescription className="text-base">{t.projects.compilerDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    C++
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    LLVM-IR
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Compiler Design
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Systems Programming
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.projects.compilerPara}
                </p>
              </CardContent>
            </Card>
            
          </div>
        </div>
      </section>
      <section>
        <div className="text-center p-4">
          <Button asChild>
          <a href="https://github.com/cedric190703?tab=repositories" target="_blank" rel="noopener noreferrer">
            {language === "en" ? "See more projects" : "Voir plus de projets"} 
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
        </div>
      </section>
      <section className="section-spacing">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{t.interests.title}</h2>
            <div className="w-16 h-px bg-primary/40 mx-auto"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="border-border hover-lift">
              <CardContent className="p-6">
                <h3 className="font-semibold text-base mb-1">{t.interests.tennis}</h3>
                <p className="text-sm text-muted-foreground">{t.interests.tennisDesc}</p>
              </CardContent>
            </Card>
            <Card className="border-border hover-lift">
              <CardContent className="p-6">
                <h3 className="font-semibold text-base mb-1">{t.interests.finance}</h3>
                <p className="text-sm text-muted-foreground">{t.interests.financeDesc}</p>
              </CardContent>
            </Card>
            <Card className="border-border hover-lift">
              <CardContent className="p-6">
                <h3 className="font-semibold text-base mb-1">{t.interests.tech}</h3>
                <p className="text-sm text-muted-foreground">{t.interests.techDesc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="section-spacing bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-12">
              <h2 className="text-4xl font-bold tracking-tight mb-4">{t.contact.title}</h2>
              <div className="w-16 h-px bg-primary/40 mx-auto mb-6"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-12">
              <Card className="border-border hover-lift">
                <CardContent className="flex items-center space-x-4 p-8">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{t.contact.email}</h3>
                    <a
                      href="mailto:cedric.brzyski@epita.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      cedric.brzyski@epita.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border hover-lift">
                <CardContent className="flex items-center space-x-4 p-8">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{t.contact.phone}</h3>
                    <a href="tel:+33695671474" className="text-muted-foreground hover:text-accent transition-colors">
                      +33 6 95 67 14 74
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                className="border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300 bg-transparent"
                asChild
              >
                <a href="https://github.com/cedric190703" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 hover:bg-accent/5 hover:border-accent transition-all duration-300 bg-transparent"
                asChild
              >
                <a href="https://linkedin.com/in/cedric-brzyski" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300 bg-transparent"
                asChild
              >
                <a href="https://kaggle.com/cedricbrzyski" target="_blank" rel="noopener noreferrer">
                  <Database className="h-5 w-5 mr-2" />
                  Kaggle
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}