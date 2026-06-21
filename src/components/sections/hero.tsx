"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, Lightbulb, MapPin, Sparkles, RefreshCw } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { GalleryModal } from "@/components/gallery-modal"
import { STUDIO } from "@/lib/studio-products"

const badges = [
  { label: "TypeScript",      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-600/20" },
  { label: "React & Next.js", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-indigo-600/20" },
  { label: "React Native",    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-600/20" },
  { label: "Firebase",        color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-600/20" },
  { label: "TOPCIT Level 3",  color: "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-600/20" },
  { label: "CS Eligible",     color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-600/20" },
]

export function HeroSection() {
  const { ref, inView } = useInView()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isFlipped, setIsFlipped] = React.useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && resolvedTheme === "light"

  return (
    <section
      id="about"
      className="snap-section relative overflow-hidden flex items-center justify-center w-full min-h-[100dvh]"
      ref={ref}
    >
      {/* Background Glowing Orbs */}
      <div className={`absolute top-20 -left-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse ${isLight ? "bg-orange-500/10" : "bg-primary/20"}`} />
      <div className={`absolute bottom-10 -right-20 w-[30rem] h-[30rem] rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse ${isLight ? "bg-yellow-500/8" : "bg-indigo-500/10"}`} style={{ animationDelay: '2s' }} />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">

            {/* Heading — founder identity */}
            <h1 className={`max-w-2xl font-heading tracking-tight ${inView ? "animate-fade-up delay-100" : "opacity-0"}`}>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-primary block mb-3.5">
                Hi, I'm
              </span>
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground block leading-[0.95] tracking-tight">
                Railey Mitchell
              </span>
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold block leading-[0.95] tracking-tight bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6366F1] bg-clip-text text-transparent">
                Quimson Capitis
              </span>

              <span className="text-sm sm:text-base font-bold tracking-[0.14em] uppercase text-shimmer block mt-5">
                Founder &amp; Lead Engineer
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.12em] uppercase text-muted-foreground block mt-2">
                Owner of{" "}
                <a
                  href="#products"
                  className="font-black text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors cursor-pointer no-underline"
                >
                  RI SOFTWARE SOLUTIONS
                </a>
              </span>
            </h1>

            <p className={`mt-5 max-w-lg text-sm text-muted-foreground sm:text-base leading-relaxed ${inView ? "animate-fade-up delay-200" : "opacity-0"}`}>
              Full-stack by nature, custom-built by choice — efficient, personalized, and straight to the point.
            </p>

            {/* Details pills */}
            <div className={`mt-5 flex flex-wrap justify-center lg:justify-start gap-3 text-sm text-muted-foreground/80 ${inView ? "animate-fade-up delay-300" : "opacity-0"}`}>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Pangasinan, PH
              </span>
              <span className="hidden sm:block text-muted-foreground/40">·</span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <GraduationCap className="h-3.5 w-3.5 text-primary" />
                Pangasinan State University — Urdaneta City Campus
              </span>
            </div>

            {/* Action Buttons */}
            <div className={`mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 ${inView ? "animate-fade-up delay-400" : "opacity-0"}`}>
              <Button
                size="lg"
                className={`group cursor-pointer gap-2 hover:scale-105 transition-all duration-300 ${isLight ? "hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]" : "hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"} relative overflow-hidden`}
                render={<a href="#products" />}
                nativeButton={false}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  View Products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`cursor-pointer font-bold text-sm hover:scale-105 transition-all duration-300 ${isLight ? "hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:border-primary/60" : "hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:border-primary/60"} border-primary/30 text-primary bg-primary/5 hover:bg-primary/10`}
                render={<a href="#contact" />}
                nativeButton={false}
              >
                Contact Me
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className={`cursor-pointer font-bold text-sm hover:scale-105 transition-all duration-300 ${isLight ? "hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:border-primary/50" : "hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:border-primary/50"} border-primary/20 text-primary bg-primary/5 hover:bg-primary/10`}
                onClick={() => setIsGalleryOpen(true)}
              >
                Side Quests
              </Button>

              <Button
                size="lg"
                variant="outline"
                className={`hidden sm:inline-flex cursor-pointer font-bold text-sm hover:scale-105 transition-all duration-300 ${isLight ? "hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:border-primary/50" : "hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:border-primary/50"} border-primary/20 text-primary bg-primary/5 hover:bg-primary/10`}
                render={<a href="/404" />}
                nativeButton={false}
              >
                ???
              </Button>
            </div>
            
            <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />

            {/* Skill badges */}
            <div className={`mt-8 flex flex-wrap justify-center lg:justify-start gap-2.5 ${inView ? "animate-fade-up delay-500" : "opacity-0"}`}>
              {badges.map((b, i) => (
                <span
                  key={b.label}
                  className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold ring-1 ring-inset transition-all hover:scale-105 hover:-translate-y-0.5 cursor-default ${b.color}`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: 3D Flipping Profile Card */}
          <div className={`flex-shrink-0 w-full max-w-md lg:w-[460px] flex flex-col ${inView ? "animate-slide-right delay-200" : "opacity-0"}`}>
            {/* Spacer to push card top to align with "Hi, I'm" label */}
            <div className="flex-1 flex flex-col min-h-[460px] sm:min-h-[520px]">
              {/* Flip wrapper — needs a sized parent for absolute children */}
              <div
                className="flex-1 cursor-pointer select-none relative group/wrapper"
                style={{ perspective: "1000px" }}
                onClick={() => setIsFlipped((prev) => !prev)}
              >
                {/* Static Cosmic Glow behind the card */}
                <div className={`absolute inset-4 rounded-2xl blur-3xl opacity-80 pointer-events-none transition-all duration-500 group-hover/wrapper:scale-105 group-hover/wrapper:opacity-95 ${isLight ? "bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-yellow-500/20" : "bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-purple-600/30 dark:from-purple-500/15 dark:via-indigo-500/10 dark:to-purple-500/15"}`} />

                {/* Inner — rotates on flip, always sized to parent */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d",
                    transition: "transform 0.5s cubic-bezier(0.4,0.2,0.2,1)",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >

                  {/* ── FRONT: Profile Photo ── */}
                  <div
                    className={`rounded-2xl p-4 flex flex-col justify-between relative group/card bg-card border border-border/70 dark:bg-[#07070a] dark:border-white/5 transition-all duration-500 shadow-2xl hover:border-primary/60 dark:hover:border-primary/50 ${isLight ? "hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]" : "hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]"}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      pointerEvents: isFlipped ? "none" : "auto",
                    }}
                  >
                    <div className="relative z-10 flex-1 w-full rounded-xl overflow-hidden flex items-center justify-center">
                      <img
                        src="/profile.png"
                        alt="Railey Mitchell Q. Capitis"
                        className="object-cover w-full h-full pointer-events-none"
                      />
                    </div>
                    
                    <div className="pt-5 flex items-center justify-between text-xs relative z-10">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white/90 tracking-wide uppercase text-[11px] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                          Interactive Profile
                        </p>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-white/50 mt-1">
                          Click card to view details
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-white/60 group-hover/card:text-slate-900 dark:group-hover/card:text-white transition-colors px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Flip</span>
                        <RefreshCw className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* ── BACK: Profile Photo (Meme / Humor) ── */}
                  <div
                    className={`rounded-2xl p-4 flex flex-col justify-between relative group/card bg-card border border-border/70 dark:bg-[#07070a] dark:border-white/5 transition-all duration-500 shadow-2xl hover:border-primary/60 dark:hover:border-primary/50 ${isLight ? "hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]" : "hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]"}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      pointerEvents: isFlipped ? "auto" : "none",
                    }}
                  >
                    <div className="relative z-10 flex-1 w-full rounded-xl overflow-hidden flex items-center justify-center">
                      <img
                        src="/profile_back.gif"
                        alt="Railey Mitchell Q. Capitis Meme"
                        className="object-cover w-full h-full pointer-events-none"
                      />
                    </div>
                    
                    <div className="pt-5 flex items-center justify-between text-xs relative z-10">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white/90 tracking-wide uppercase text-[11px] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                          Secret Mode
                        </p>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-white/50 mt-1">
                          Click card to return
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-white/60 group-hover/card:text-slate-900 dark:group-hover/card:text-white transition-colors px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Return</span>
                        <RefreshCw className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
