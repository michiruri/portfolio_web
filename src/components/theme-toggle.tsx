"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const current = resolvedTheme ?? theme
    const nextTheme = current === "dark" ? "light" : "dark"
    window.dispatchEvent(
      new CustomEvent("trigger-theme-transition", {
        detail: { targetTheme: nextTheme }
      })
    )
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="relative h-9 w-9" aria-label="Toggle theme">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 cursor-pointer"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
