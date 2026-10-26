"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const badges = [
  { label: "Svelte 5",        color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-orange-600/20" },
  { label: "TypeScript",      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-600/20" },
  { label: "React & Next.js", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-indigo-600/20" },
  { label: "Firebase & GCP",  color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-600/20" },
  { label: "TOPCIT Level 3",  color: "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-600/20" },
  { label: "CS Eligible",     color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-600/20" },
]

export function HeroSection() {
  const { ref, inView } = useInView()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && resolvedTheme === "light"

  return (
    <section
      id="about"
      className="snap-section relative overflow-hidden flex items-center justify-center w-full min-h-[100dvh] py-20 lg:py-0"
      ref={ref}
    >
      {/* Background Glowing Orbs */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse ${isLight ? "bg-orange-500/10" : "bg-primary/20"}`} />
      <div className={`absolute bottom-10 -right-20 w-[30rem] h-[30rem] rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse ${isLight ? "bg-yellow-500/8" : "bg-indigo-500/10"}`} style={{ animationDelay: '2s' }} />
      
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        {/* Heading — Cinematic Solo Indie Developer Identity */}
        <h1 className={`max-w-4xl font-heading tracking-tight flex flex-col items-center ${inView ? "animate-fade-up delay-100" : "opacity-0"}`}>
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-400 block mb-3 sm:mb-4">
            Hi, I'm
          </span>
          <span className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground block leading-[0.95] tracking-tight break-words max-w-full">
            Railey Mitchell
          </span>
          <span className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black block leading-[0.95] tracking-tight bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#6366F1] bg-clip-text text-transparent mt-1.5 sm:mt-2 break-words max-w-full">
            Quimson Capitis
          </span>

          <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-[0.22em] uppercase text-shimmer block mt-4 sm:mt-5">
            Solo Indie Developer
          </span>
        </h1>

        {/* Bio statement */}
        <p className={`mt-6 sm:mt-7 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed ${inView ? "animate-fade-up delay-200" : "opacity-0"}`}>
          Solo engineer designing, building, and deploying full-stack web platforms from scratch. Fueled by coffee, curiosity, and the drive to ship real products.
        </p>

        {/* Action Buttons: Explore Products + Contact */}
        <div className={`mt-8 sm:mt-9 flex flex-wrap items-center justify-center gap-3.5 ${inView ? "animate-fade-up delay-400" : "opacity-0"}`}>
          <Button
            size="lg"
            className={`group cursor-pointer gap-2 hover:scale-105 transition-all duration-300 ${isLight ? "hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]" : "hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"} relative overflow-hidden px-6 py-3`}
            render={<a href="#products" />}
            nativeButton={false}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2 font-bold">
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className={`cursor-pointer font-bold text-sm hover:scale-105 transition-all duration-300 ${isLight ? "hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:border-primary/60" : "hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:border-primary/60"} border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 px-6 py-3`}
            render={<a href="#contact" />}
            nativeButton={false}
          >
            Contact
          </Button>
        </div>

        {/* Skill badges */}
        <div className={`mt-9 sm:mt-10 flex flex-wrap justify-center gap-2.5 max-w-2xl ${inView ? "animate-fade-up delay-500" : "opacity-0"}`}>
          {badges.map((b, i) => (
            <span
              key={b.label}
              className={`inline-flex items-center rounded-md px-3.5 py-1 text-xs font-semibold ring-1 ring-inset transition-all hover:scale-105 hover:-translate-y-0.5 cursor-default ${b.color}`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {b.label}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className={`mt-14 sm:mt-16 hidden sm:flex flex-col items-center gap-2 ${inView ? "animate-fade-up delay-600" : "opacity-0"}`}>
          <a
            href="#products"
            className="group flex flex-col items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 hover:text-white transition-colors cursor-pointer"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary animate-bounce transition-colors" />
          </a>
        </div>

      </div>
    </section>
  )
}
