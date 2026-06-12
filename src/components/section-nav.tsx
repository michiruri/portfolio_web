"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

// Must match the id attributes on each section element
const SECTIONS = [
  { id: "about",        label: "Home" },
  { id: "skills",       label: "Tech Stack & Skills" },
  { id: "experience",   label: "Education & Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "projects",     label: "Projects" },
  { id: "contact",      label: "Contact" },
]

export function SectionNav() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)

  /* ── Track which section is in view ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((sec, idx) => {
      const el = document.getElementById(sec.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(idx) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    const t = setTimeout(() => setVisible(true), 600)
    return () => {
      observers.forEach((o) => o.disconnect())
      clearTimeout(t)
    }
  }, [])

  /* ── Scroll using the browser's native scrollIntoView — identical to navbar anchor behaviour ── */
  const scrollTo = useCallback((idx: number) => {
    const id = SECTIONS[idx]?.id
    if (!id) return
    const el = document.getElementById(id)
    if (el) {
      // block: "start" + scroll-margin-top on the section = same result as <a href="#id">
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setActive(idx)
  }, [])

  const prev = active > 0 ? active - 1 : null
  const next = active < SECTIONS.length - 1 ? active + 1 : null

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      aria-label="Section navigation"
    >
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 shadow-xl shadow-black/20 backdrop-blur-md ring-1 ring-white/5">

        {/* Previous button */}
        <button
          onClick={() => prev !== null && scrollTo(prev)}
          disabled={prev === null}
          aria-label="Previous section"
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
            prev !== null
              ? "cursor-pointer text-muted-foreground hover:bg-primary/10 hover:text-primary active:scale-95"
              : "cursor-default opacity-25 text-muted-foreground"
          }`}
        >
          <ChevronUp className="h-3.5 w-3.5" />
          {prev !== null && (
            <span className="hidden sm:block max-w-[130px] truncate">
              {SECTIONS[prev].label}
            </span>
          )}
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 px-2">
          {SECTIONS.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to ${sec.label}`}
              className={`rounded-full transition-all duration-300 ${
                idx === active
                  ? "w-4 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => next !== null && scrollTo(next)}
          disabled={next === null}
          aria-label="Next section"
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
            next !== null
              ? "cursor-pointer text-muted-foreground hover:bg-primary/10 hover:text-primary active:scale-95"
              : "cursor-default opacity-25 text-muted-foreground"
          }`}
        >
          {next !== null && (
            <span className="hidden sm:block max-w-[130px] truncate">
              {SECTIONS[next].label}
            </span>
          )}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>

      </div>
    </div>
  )
}
