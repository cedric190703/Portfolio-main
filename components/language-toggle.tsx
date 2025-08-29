"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LanguageToggle({ onLanguageChange }: { onLanguageChange: (lang: string) => void }) {
  const [language, setLanguage] = useState("en")

  const toggleLanguage = () => {
    const newLang = language === "en" ? "fr" : "en"
    setLanguage(newLang)
    onLanguageChange(newLang)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="hover:bg-accent/10 transition-all duration-300"
    >
      <Languages className="h-4 w-4 mr-1" />
      <span className="text-xs font-medium">{language.toUpperCase()}</span>
    </Button>
  )
}
