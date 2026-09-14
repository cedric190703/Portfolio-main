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

import { content, projects } from "@/lib/portfolio-content"

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

    <section id="contact" className="contact section-wrap"><BriefcaseBusiness size={22} /><div><p className="section-number">07 / {t.contact}</p><h2>cbrzyski2@gmail.com</h2><p>{t.contactText}</p></div><div className="contact-links"><a href="mailto:cbrzyski2@gmail.com"><Mail size={16} />Email</a><a href="https://linkedin.com/in/cedric-brzyski" target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a><a href="https://github.com/cedric190703" target="_blank" rel="noreferrer"><Github size={16} />GitHub</a></div></section>
    <footer><span>© 2026 Cédric Brzyski</span><span>{t.footer}</span><a href={resumeHref} download>{t.resume}</a></footer>
  </main>
}
