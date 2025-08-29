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
  Calendar,
  Award,
  Code,
  Brain,
  Gamepad2,
  ArrowRight,
  Target,
  Database,
  Zap,
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
        specialist: "AI student",
        description:
          "AI french student looking for a 6-month internship in AI/ML, Computer vision or VR/AR development in 2026.",
        getInTouch: "Get In Touch",
        viewProjects: "View Projects",
      },
      about: {
        title: "About Me",
        p1: "I'm a 22-year-old engineering student at EPITA with a deep interest for Medical AI and cutting-edge healthcare technologies.",
        p2: "Specializing in Medical AI and Computer Vision, I like to do projects that create value through innovative technological solutions.",
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
        inserm: "Mixed Reality Intern - Inserm, Paris",
        insermDesc: "VR/AR development for medical training and tele-expertise",
        insermTasks: [
          "Development of immersive VR/AR applications for medical training scenarios",
          "Integration of 360° videos and live streaming for remote medical education",
          "Network optimization for real-time medical tele-expertise systems",
        ],
        systhen: "Intern - Systhen, Fontenay-sous-Bois",
        systhenTasks: [
          "Administrative management and process optimization with Odoo ERP",
          "Creation and standardization of internal documentation systems",
        ],
        signaturit: "Partnership Intern - Signaturit France, Paris",
        signaturitTasks: [
          "Development of automated Power BI dashboards for business intelligence",
          "Active participation in strategic commercial meetings and partnerships",
        ],
      },
      projects: {
        title: "Projects",
        ovarian: "Ovarian Cancer Segmentation AI",
        ovarianDesc: "Finalist in medical AI competition - tumor segmentation system",
        ovarianPara:
          "Developed AI models for tumor and metastasis segmentation using ensemble learning techniques and image processing pipelines.",
        localChat: "Local AI Chat Interface",
        localChatDesc: "RAG-powered interface for local LLM deployment",
        localChatPara:
          "Built an interface for local LLM deployment with Retrieval-Augmented Generation (RAG) capabilities, enabling private AI conversations with document understanding.",
        hackathon: "GGH 2025 Hackathon",
        hackathonDesc: "Jury's Favorite Award - Innovative hackathon solution",
        hackathonPara: "Developed an application for dyslexic people.",
        compiler: "Tiger Compiler - LLVM Integration",
        compilerDesc: "Compiler development with LLVM-IR generation",
        compilerPara:
          "Implemented a complete compiler frontend featuring lexical and syntactic analysis with LLVM-IR code generation.",
      },
      interests: {
        title: "Interests",
        tennis: "Tennis",
        tennisDesc: "4/6",
        finance: "Personal Finance",
        financeDesc: "Investment strategies",
        tech: "New Technologies",
        techDesc: "AI, Blockchain, VR/AR",
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
        specialist: "Étudiant en IA",
        description:
          "Étudiant en IA à la recherche d'un stage de 6 mois en IA/ML, vision par ordinateur ou développement VR/AR en 2026.",
        getInTouch: "Me Contacter",
        viewProjects: "Voir les Projets",
      },
      about: {
        title: "À Propos de Moi",
        p1: "Je suis un étudiant de 22 ans à EPITA, très intéressé par les nouvelles technologies.",
        p2: "Spécialisé en IA médicale, j'aime faire des projets qui créent de la valeur grâce à des solutions technologiques innovantes.",
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
        inserm: "Stagiaire en Réalité Mixte - Inserm, Paris",
        insermDesc: "Développement d'applications VR/AR pour la formation médicale et la télé-expertise.",
        insermTasks: [
          "Développement d'applications immersives VR/AR pour des scénarios de formation médicale",
          "Intégration de vidéos 360° et de streaming en direct pour l'enseignement médical à distance",
          "Optimisation du réseau pour les systèmes de télé-expertise médicale en temps réel",
        ],
        systhen: "Stagiaire - Systhen, Fontenay-sous-Bois",
        systhenTasks: [
          "Gestion administrative et optimisation des processus avec l'ERP Odoo",
          "Création et standardisation des systèmes de documentation interne",
        ],
        signaturit: "Stagiaire Partenariats - Signaturit France, Paris",
        signaturitTasks: [
          "Développement de tableaux de bord Power BI automatisés pour l'informatique décisionnelle",
          "Participation active aux réunions commerciales stratégiques et aux partenariats",
        ],
      },
      projects: {
        title: "Projets",
        ovarian: "IA de Segmentation du Cancer de l'Ovaire",
        ovarianDesc: "Finaliste d'un concours d'IA médicale - Système de segmentation de tumeurs.",
        ovarianPara:
          "Développement de modèles d'IA pour la segmentation des tumeurs et des métastases à l'aide de techniques d'apprentissage d'ensemble et de pipelines de traitement d'images.",
        localChat: "Interface de Chat IA Locale",
        localChatDesc: "Interface alimentée par RAG pour le déploiement local de LLM.",
        localChatPara:
          "Création d'une interface pour le déploiement local de LLM avec des capacités de génération augmentée par récupération (RAG), permettant des conversations IA privées avec compréhension de documents.",
        hackathon: "Hackathon GGH 2025",
        hackathonDesc: "Prix Coup de Cœur du Jury - Solution innovante de hackathon.",
        hackathonPara: "Développement d'une application pour les personnes dyslexiques.",
        compiler: "Compilateur Tiger - Intégration LLVM",
        compilerDesc: "Développement de compilateur avec génération de LLVM-IR.",
        compilerPara:
          "Implémentation du frontend de compilateur complet avec analyse lexicale et syntaxique avec génération de code LLVM-IR.",
      },
      interests: {
        title: "Centres d'Intérêt",
        tennis: "Tennis",
        tennisDesc: "4/6",
        finance: "Finances Personnelles",
        financeDesc: "Stratégies d'investissement",
        tech: "Nouvelles Technologies",
        techDesc: "IA, Blockchain, VR/AR",
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
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20">
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
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
                <Brain className="h-3 w-3 mr-1" />
                Medical AI
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-accent/10 text-accent border-accent/20">
                <Zap className="h-3 w-3 mr-1" />
                Machine Learning
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
                <Code className="h-3 w-3 mr-1" />
                VR/AR Development
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-accent/10 text-accent border-accent/20">
                <Target className="h-3 w-3 mr-1" />
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
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
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

      <section className="section-spacing bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{t.education.title}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto"></div>
          </div>
          <div className="grid gap-6 max-w-4xl mx-auto">
            <Card className="glass border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">{t.education.epita}</span>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    2021 - 2026
                  </Badge>
                </CardTitle>
                <CardDescription className="text-lg">{t.education.epitaDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="glass border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">{t.education.uqac}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Jan - May 2023
                  </Badge>
                </CardTitle>
                <CardDescription className="text-lg">{t.education.uqacDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="glass border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">{t.education.lycee}</span>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    2021
                  </Badge>
                </CardTitle>
                <CardDescription className="text-lg">{t.education.lyceeDesc}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="experience" className="section-spacing">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{t.experience.title}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-8 max-w-4xl mx-auto">
            <Card className="border-border hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>{t.experience.inserm}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Sept. 2024 - Jan. 2025
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
                    June 2023
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
                    July 2022
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
              See more projects <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
      <section className="section-spacing">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{t.interests.title}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="glass border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="flex items-center space-x-4 p-8">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Gamepad2 className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.interests.tennis}</h3>
                  <p className="text-sm text-muted-foreground">{t.interests.tennisDesc}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="flex items-center space-x-4 p-8">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.interests.finance}</h3>
                  <p className="text-sm text-muted-foreground">{t.interests.financeDesc}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="flex items-center space-x-4 p-8">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Brain className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.interests.tech}</h3>
                  <p className="text-sm text-muted-foreground">{t.interests.techDesc}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="section-spacing bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-12">
              <h2 className="text-4xl font-bold tracking-tight mb-4">{t.contact.title}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-6"></div>
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