"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, GraduationCap, MapPin, Sparkles, EyeOff, RefreshCw } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { GalleryModal } from "@/components/gallery-modal"

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

            {/* Availability badge */}
            <div className={`inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-8 shadow-sm ${inView ? "animate-fade-in delay-0" : "opacity-0"}`}>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Open to Opportunities · Class of 2026
            </div>

            {/* Heading — name emphasis */}
            <h1 className={`max-w-2xl font-heading tracking-tight ${inView ? "animate-fade-up delay-100" : "opacity-0"}`}>
              {/* "Hi, I'm" label */}
              <span className="text-[13px] font-black uppercase tracking-[0.3em] text-primary/95 block mb-4">
                Hi, I&apos;m
              </span>

              {/* Line 1 — first & middle name, foreground */}
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground block leading-[0.95] tracking-tight">
                Railey Mitchell
              </span>

              {/* Line 2 — last names, primary accent gradient */}
              <span className={`text-5xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent block leading-[0.95] tracking-tight mb-4 ${isLight ? "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" : "bg-gradient-to-r from-primary via-purple-600 to-indigo-500"}`}>
                Quimson Capitis
              </span>

              {/* Web & Mobile Developer — shimmer line */}
              <span className="text-sm sm:text-base font-bold tracking-[0.18em] uppercase text-shimmer block mt-3">
                Web &amp; Mobile Developer
              </span>
            </h1>

            {/* Description quote / philosophy — exactly 2 lines */}
            <p className={`mt-6 max-w-lg text-sm text-muted-foreground sm:text-base leading-relaxed ${inView ? "animate-fade-up delay-200" : "opacity-0"}`}>
              &ldquo;Full-stack by nature, custom-built by choice — efficient,
              personalized, and straight to the point.&rdquo;
            </p>

            {/* Details pills */}
            <div className={`mt-5 flex flex-wrap justify-center lg:justify-start gap-3 text-sm text-muted-foreground/80 ${inView ? "animate-fade-up delay-300" : "opacity-0"}`}>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Urdaneta City, Pangasinan
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
                render={<a href="#projects" />}
                nativeButton={false}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
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
                <EyeOff className="h-4 w-4 mr-2" />
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
            <div className="flex-1 flex flex-col min-h-[520px]">
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

                  {/* ── BACK: Profile Highlights Dashboard ── */}
                  <div
                    className={`rounded-2xl bg-[#07070a] p-6 flex flex-col justify-between relative group/card border border-white/5 transition-all duration-500 shadow-2xl hover:border-primary/50 min-h-0 overflow-hidden ${isLight ? "hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]" : "hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]"}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      pointerEvents: isFlipped ? "auto" : "none",
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        <span className="text-xs font-mono font-bold text-emerald-400">developer.json</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-white/60 group-hover/card:text-white transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Return</span>
                        <RefreshCw className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="font-mono text-[10px] sm:text-[11px] md:text-[12px] space-y-1.5 mt-5 flex-1 text-slate-300 leading-normal overflow-y-auto min-h-0" onClick={(e) => e.stopPropagation()}>
                      <p><span className="text-violet-400 font-bold">const</span> <span className="text-indigo-300">developer</span> = <span className="text-slate-400">{"{"}</span></p>
                      <p className="pl-4"><span className="text-indigo-300">name</span>: <span className="text-emerald-400">&quot;Railey Mitchell Q. Capitis&quot;</span><span className="text-slate-400">,</span></p>
                      <p className="pl-4"><span className="text-indigo-300">degree</span>: <span className="text-emerald-400">&quot;Bachelor of Science in Information Technology&quot;</span><span className="text-slate-400">,</span></p>
                      <p className="pl-4"><span className="text-indigo-300">major</span>: <span className="text-emerald-400">&quot;Web &amp; Mobile Technologies&quot;</span><span className="text-slate-400">,</span></p>
                      <p className="pl-4"><span className="text-indigo-300">university</span>: <span className="text-emerald-400">&quot;Pangasinan State University - Urdaneta City Campus&quot;</span><span className="text-slate-400">,</span></p>
                      <p className="pl-4"><span className="text-indigo-300">internship</span>: <span className="text-slate-400">{"{"}</span></p>
                      <p className="pl-8"><span className="text-indigo-300">company</span>: <span className="text-emerald-400">&quot;Pangasinan III Electric Cooperative (PANELCO III)&quot;</span><span className="text-slate-400">,</span></p>
                      <p className="pl-4"><span className="text-indigo-300">roles</span>: <span className="text-slate-400">[</span></p>
                      <p className="pl-8 text-xs">
                        <span className="text-emerald-400">&quot;Software Developer&quot;</span><span className="text-slate-400">,</span>{" "}
                        <span className="text-emerald-400">&quot;Systems Administrator & Data Operations&quot;</span><span className="text-slate-400">,</span>{" "}
                        <span className="text-emerald-400">&quot;IT Support & Hardware Technician&quot;</span><span className="text-slate-400">,</span>{" "}
                        <span className="text-emerald-400">&quot;Network & Infrastructure Technician&quot;</span><span className="text-slate-400">,</span>{" "}
                        <span className="text-emerald-400">&quot;Event Technology & Multimedia Specialist&quot;</span><span className="text-slate-400">,</span>{" "}
                      </p>
                      <p className="pl-4"><span className="text-slate-400">] ,</span></p>
                      <p className="pl-8"><span className="text-indigo-300">division</span>: <span className="text-emerald-400">&quot;System Administration Division&quot;</span><span className="text-slate-400">,</span></p>
                      <p className="pl-8"><span className="text-indigo-300">department</span>: <span className="text-emerald-400">&quot;Corporate Services Department&quot;</span></p>
                      <p className="pl-4"><span className="text-slate-400">{"} ,"}</span></p>
                      <p className="pl-4"><span className="text-indigo-300">topcit</span>: <span className="text-slate-400">{"{"}</span></p>
                      <p className="pl-8"><span className="text-indigo-300">score</span>: <span className="text-amber-400">522</span><span className="text-slate-400">,</span></p>
                      <p className="pl-8"><span className="text-indigo-300">level</span>: <span className="text-amber-400">3</span><span className="text-slate-400">,</span></p>
                      <p className="pl-8"><span className="text-indigo-300">definition</span>: <span className="text-emerald-400">&quot;competent&quot;</span></p>
                      <p className="pl-4"><span className="text-slate-400">{"} ,"}</span></p>
                      <p className="pl-4"><span className="text-indigo-300">csEligible</span>: <span className="text-emerald-400">&quot;Professional Level&quot;</span><span className="text-slate-400">,</span></p>
                      <p className="pl-4"><span className="text-indigo-300">likes</span>: <span className="text-slate-400">[</span></p>
                      <p className="pl-8">
                        <span className="text-emerald-400">&quot;cats&quot;</span><span className="text-slate-400">,</span>{" "}
                        <span className="text-emerald-400">&quot;open-source&quot;</span><span className="text-slate-400">,</span>{" "}
                        <span className="text-emerald-400">&quot;anime&quot;</span>
                      </p>
                      <p className="pl-4"><span className="text-slate-400">]</span></p>
                      <p><span className="text-slate-400">{"};"}</span></p>
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
