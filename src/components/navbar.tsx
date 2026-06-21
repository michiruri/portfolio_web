"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, FileText, Code2 } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const navItems = [
  { label: "About",    href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Work",     href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",  href: "#contact" },
]

export function Navbar() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("about")

  const isLight = mounted && resolvedTheme === "light"

  // Highlight active nav item based on scroll position
  React.useEffect(() => {
    setMounted(true)
    const sectionIds = navItems.map((i) => i.href.replace("#", ""))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300 ${isLight ? "border-orange-500/10 shadow-[0_4px_30px_rgba(234,88,12,0.03)]" : "border-purple-500/10 dark:shadow-[0_4px_30px_rgba(139,92,246,0.03)]"}`}>
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

        {/* Left: Logo / Name */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className={`w-6 h-6 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-105 group-hover:border-primary/50 transition-all shrink-0 ${isLight ? "group-hover:shadow-[0_0_12px_rgba(249,115,22,0.4)]" : "group-hover:shadow-[0_0_12px_rgba(139,92,246,0.5)]"}`}>
              <Code2 className="h-3.5 w-3.5" />
            </div>
            <span className="hidden sm:block text-xs font-black text-foreground tracking-tight leading-snug">
              Railey Mitchell Q. Capitis
              <span className="block text-[8px] font-black text-muted-foreground tracking-[0.16em] uppercase mt-0.5">Web &amp; Mobile Architect</span>
            </span>
            <span className="sm:hidden text-xs font-black text-foreground tracking-wider bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-lg">
              RM.
            </span>
          </Link>
        </div>

        {/* Center: Nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full transition-[color,box-shadow,background-color] duration-300 ${
                  isActive
                    ? isLight
                      ? "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-bold shadow-[0_0_12px_rgba(249,115,22,0.35)]"
                      : "bg-gradient-to-r from-primary via-purple-600 to-indigo-500 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.45)]"
                    : isLight
                    ? "text-muted-foreground hover:text-foreground hover:bg-orange-500/10 hover:shadow-[0_0_8px_rgba(234,88,12,0.05)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-purple-500/10 hover:shadow-[0_0_8px_rgba(139,92,246,0.05)]"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: Theme toggle + Resume CTA */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <ThemeToggle />

          {/* Resume button — matching height of ThemeToggle (h-9) */}
          <Button
            variant="outline"
            className={`hidden sm:inline-flex h-9 gap-1.5 cursor-pointer px-4 font-bold text-xs hover:scale-105 transition-all duration-300 ${isLight ? "hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]" : "hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"} border-primary/30 text-primary hover:text-primary hover:border-primary/60 bg-primary/5 hover:bg-primary/10`}
            render={<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download Resume" />}
            nativeButton={false}
          >
            <FileText className="h-3.5 w-3.5" />
            Resume
          </Button>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="h-9 w-9" />}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </SheetTrigger>
              <SheetContent side="right" className={`w-[240px] sm:w-[300px] p-6 bg-background/90 backdrop-blur-md border-l ${isLight ? "border-orange-500/15" : "border-purple-500/15"}`}>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.replace("#", "")
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-[color,box-shadow,background-color] duration-300 ${
                          isActive
                            ? isLight
                              ? "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-bold shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                              : "bg-gradient-to-r from-primary via-purple-600 to-indigo-500 text-white font-bold shadow-[0_0_10px_rgba(168,85,247,0.35)]"
                            : isLight
                            ? "text-muted-foreground hover:text-foreground hover:bg-orange-500/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-purple-500/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                  {/* Mobile resume link */}
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-bold border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/60 ${isLight ? "hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]" : "hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"} transition-all`}
                  >
                    <FileText className="h-4 w-4" />
                    Resume
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  )
}
