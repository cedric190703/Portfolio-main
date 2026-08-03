"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LanguageToggle({ language, onLanguageChange }: { language: "en" | "fr"; onLanguageChange: (lang: "en" | "fr") => void }) {
  const toggleLanguage = () => {
    const newLang = language === "en" ? "fr" : "en"
    onLanguageChange(newLang)
  }

  return (
    <Button
      variant="ghost"
    size="sm"
    onClick={toggleLanguage}
    aria-label={language === "en" ? "Switch to French" : "Passer en anglais"}
      className="hover:bg-accent/10 transition-all duration-300"
    >
      <Languages className="h-4 w-4 mr-1" />
      <span className="text-xs font-medium">{language.toUpperCase()}</span>
    </Button>
  )
}
