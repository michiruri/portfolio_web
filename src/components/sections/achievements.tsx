"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Award, ShieldCheck, Trophy } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

function LogoImage({ src, alt, fallbackText }: { src: string; alt: string; fallbackText: React.ReactNode }) {
  const [hasError, setHasError] = React.useState(false)

  return (
    <div className="relative h-12 w-12 shrink-0 flex items-center justify-center bg-muted/50 rounded-xl overflow-hidden border border-border shadow-sm transition-all group-hover:scale-105">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className="object-contain w-9 h-9 z-10"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-[9px] font-bold text-muted-foreground leading-tight text-center px-1 pointer-events-none select-none">
            {fallbackText}
          </span>
        </div>
      )}
    </div>
  )
}

function CircularGauge({ score, max = 1000, fromColor, toColor, glowColor }: { score: number; max?: number; fromColor: string; toColor: string; glowColor: string }) {
  const [currentScore, setCurrentScore] = React.useState(0)
  const { ref, inView } = useInView()
  const gradientId = React.useId().replace(/:/g, "")

  React.useEffect(() => {
    if (inView) {
      const duration = 1500;
      const steps = 60;
      const stepTime = duration / steps;
      let step = 0;
      
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = progress * (2 - progress);
        setCurrentScore(Math.min(Math.round(score * easeOut), score));
        
        if (step >= steps) {
          clearInterval(timer);
          setCurrentScore(score);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    } else {
      setCurrentScore(0);
    }
  }, [inView, score]);

  const pct = currentScore / max
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - pct * circumference

  return (
    <div ref={ref} className="relative w-24 h-24 flex items-center justify-center font-sans shrink-0">
      <svg className="w-full h-full transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="stroke-muted/20 dark:stroke-white/5 fill-none"
          strokeWidth="5"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="fill-none transition-all duration-300 ease-out"
          strokeWidth="5"
          stroke={`url(#${gradientId})`}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-lg font-black text-foreground tracking-tight leading-none">{currentScore}</span>
        <span className="text-[8px] text-muted-foreground font-black uppercase tracking-widest mt-0.5">/ {max}</span>
      </div>
    </div>
  )
}

export function AchievementsSection() {
  const { ref, inView } = useInView()

  return (
    <section id="achievements" ref={ref} className="snap-section py-20 w-full relative overflow-hidden bg-transparent">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground ${inView ? "animate-fade-up delay-0" : "opacity-0"}`}>
            Certifications &amp; Achievements
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-xl mx-auto font-semibold ${inView ? "animate-fade-in delay-150" : "opacity-0"}`}>
            Credentials and eligibility certifications proving technical competence and professional qualifications.
          </p>
        </div>

        {/* 3D perspective hover cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-stretch perspective-1000">

          {/* ─── 1. TOPCIT CARD ─── */}
          <div className={`transition-all duration-500 hover:rotate-y-4 hover:scale-[1.01] hover:shadow-2xl hover:shadow-red-500/[0.04] ${inView ? "animate-slide-left delay-200" : "opacity-0"}`}>
            <Card className="relative overflow-hidden border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-md rounded-2xl flex flex-col h-full group transition-all duration-300 hover:border-red-500/25">
              {/* Dynamic top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 to-amber-500 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Radial hover backing glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <CardHeader className="pb-0 pl-6 pt-6 z-10">
                <div className={`flex items-center gap-4 ${inView ? "animate-fade-up delay-300" : "opacity-0"}`}>
                  <LogoImage src="/logos/topcit-logo.png" alt="TOPCIT Logo" fallbackText="TOPCIT" />
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Trophy className="h-3.5 w-3.5 text-[#FFB300]" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-red-600 dark:text-red-400">
                        Korea NIA · IT Competency
                      </span>
                    </div>
                    <p className="text-base font-extrabold text-foreground leading-snug group-hover:text-red-500 transition-colors">TOPCIT</p>
                    <p className="text-xs text-muted-foreground font-semibold">Test of Practical Competence in IT</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 pl-6 pr-6 pb-6 flex-grow flex flex-col justify-between gap-6 z-10">
                <div className={`border-t border-border/40 dark:border-white/5 ${inView ? "animate-fade-in delay-350" : "opacity-0"}`} />

                {/* Score Dial + Level info */}
                <div className="flex items-center justify-between gap-6 bg-slate-500/[0.02] dark:bg-red-950/[0.12] p-5 rounded-2xl border border-red-500/10 flex-grow relative overflow-hidden">
                  <div className="space-y-2.5">
                    <div className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[9.5px] font-bold text-red-600 dark:text-red-400 border border-red-500/20">
                      Level 3 — Competent
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground leading-snug">13th TOPCIT Examination</h4>
                      <p className="text-[9.5px] text-muted-foreground font-semibold mt-0.5">December 10, 2025</p>
                    </div>
                  </div>

                  <CircularGauge score={522} max={1000} fromColor="#ef4444" toColor="#f59e0b" glowColor="rgba(239, 68, 68, 0.4)" />
                </div>

                {/* Tech Ref Code Tag */}
                <div className="flex items-center justify-between font-mono text-[8.5px] tracking-widest text-muted-foreground/40 shrink-0 border-t border-border/30 dark:border-white/5 pt-4">
                  <span>[REF_ID: 13_TOPCIT]</span>
                  <span>[VERIFIED_NIA_KOREA]</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ─── 2. CIVIL SERVICE COMMISSION CARD ─── */}
          <div className={`transition-all duration-500 hover:-rotate-y-4 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/[0.04] ${inView ? "animate-slide-right delay-200" : "opacity-0"}`}>
            <Card className="relative overflow-hidden border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-md rounded-2xl flex flex-col h-full group transition-all duration-300 hover:border-blue-500/25">
              {/* Dynamic top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 to-cyan-500 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Radial hover backing glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <CardHeader className="pb-0 pl-6 pt-6 z-10">
                <div className={`flex items-center gap-4 ${inView ? "animate-fade-up delay-300" : "opacity-0"}`}>
                  <LogoImage src="/logos/csc-logo.png" alt="Civil Service Commission Logo" fallbackText="CSC" />
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Award className="h-3.5 w-3.5 text-[#CE1126]" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Eligibility · Philippines
                      </span>
                    </div>
                    <p className="text-base font-extrabold text-foreground leading-snug group-hover:text-blue-500 transition-colors">Civil Service Commission</p>
                    <p className="text-xs text-muted-foreground font-semibold">Republic of the Philippines</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 pl-6 pr-6 pb-6 flex-grow flex flex-col justify-between gap-6 z-10">
                <div className={`border-t border-border/40 dark:border-white/5 ${inView ? "animate-fade-in delay-350" : "opacity-0"}`} />

                {/* Secure Holographic-badge style info */}
                <div className="flex items-center justify-between gap-6 bg-slate-500/[0.02] dark:bg-blue-950/[0.12] p-5 rounded-2xl border border-blue-500/10 flex-grow relative overflow-hidden">
                  <div className="space-y-2.5">
                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                      Status: Passed
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground leading-snug">Civil Service Examination</h4>
                      <p className="text-[9.5px] text-muted-foreground font-semibold mt-0.5">Professional Level (Lifetime)</p>
                    </div>
                  </div>

                  {/* Rotating security dashboard check badge */}
                  <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                    <div className="absolute inset-1 rounded-full border border-dashed border-emerald-500/20 animate-[spin_30s_linear_infinite]" />
                    <div className="w-16 h-16 rounded-full bg-emerald-500/[0.03] border border-emerald-500/15 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.06)]">
                      <ShieldCheck className="w-7 h-7 filter drop-shadow-[0_0_3px_rgba(16,185,129,0.3)]" />
                    </div>
                  </div>
                </div>

                {/* Tech Ref Code Tag */}
                <div className="flex items-center justify-between font-mono text-[8.5px] tracking-widest text-muted-foreground/40 shrink-0 border-t border-border/30 dark:border-white/5 pt-4">
                  <span>[REF_ID: CSC_ELIGIBILITY]</span>
                  <span>[VERIFIED_CSC_PHILIPPINES]</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}
