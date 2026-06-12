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

function CircularGauge({ score, max = 1000, colorClass }: { score: number; max?: number; colorClass: string }) {
  const [currentScore, setCurrentScore] = React.useState(0)
  const { ref, inView } = useInView()

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
    <div ref={ref} className="relative w-24 h-24 flex items-center justify-center font-sans">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="stroke-muted/40 fill-none"
          strokeWidth="6"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          className={`fill-none transition-all duration-300 ease-out ${colorClass}`}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
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
          <div className={`transition-all duration-500 hover:rotate-y-6 hover:scale-[1.01] hover:shadow-xl hover:shadow-red-600/5 ${inView ? "animate-slide-left delay-200" : "opacity-0"}`}>
            <Card className="relative overflow-hidden border border-border/70 bg-card/60 backdrop-blur-sm rounded-2xl flex flex-col h-full group">
              <div className="absolute top-0 left-0 h-full w-[3px] bg-red-600 transition-all group-hover:w-[5px]" />

              <CardHeader className="pb-0 pl-6 pt-5">
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

              <CardContent className="pt-6 pl-6 pr-6 pb-6 flex-grow flex flex-col justify-between gap-6">
                <div className={`border-t border-border/40 ${inView ? "animate-fade-in delay-350" : "opacity-0"}`} />

                {/* Score Dial + Level info */}
                <div className="flex items-center justify-between gap-6 bg-red-500/5 dark:bg-red-500/10 p-5 rounded-2xl border border-red-500/10 flex-grow">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[9.5px] font-bold text-red-600 dark:text-red-400 border border-red-500/20">
                      Level 3 — Competent
                    </div>
                    <h4 className="text-xs font-bold text-foreground leading-snug">13th TOPCIT Examination</h4>
                    <p className="text-[10px] text-muted-foreground font-semibold">December 10, 2025</p>
                  </div>

                  <CircularGauge score={522} max={1000} colorClass="stroke-red-600 dark:stroke-red-500" />
                </div>

                {/* Subtle SK Flag inspired ribbon for alignment */}
                <div className="flex h-1 rounded-full overflow-hidden border border-border/30 bg-muted">
                  <div className="flex-1 bg-red-600" />
                  <div className="flex-1 bg-neutral-400" />
                  <div className="w-4 bg-[#002D62]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ─── 2. CIVIL SERVICE COMMISSION CARD ─── */}
          <div className={`transition-all duration-500 hover:-rotate-y-6 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-900/10 ${inView ? "animate-slide-right delay-200" : "opacity-0"}`}>
            <Card className="relative overflow-hidden border border-border/70 bg-card/60 backdrop-blur-sm rounded-2xl flex flex-col h-full group">
              <div className="absolute top-0 left-0 h-full w-[3px] bg-[#003366] transition-all group-hover:w-[5px]" />

              <CardHeader className="pb-0 pl-6 pt-5">
                <div className={`flex items-center gap-4 ${inView ? "animate-fade-up delay-300" : "opacity-0"}`}>
                  <LogoImage src="/logos/csc-logo.png" alt="Civil Service Commission Logo" fallbackText="CSC" />
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Award className="h-3.5 w-3.5 text-[#CE1126]" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#003366] dark:text-blue-300">
                        Eligibility · Philippines
                      </span>
                    </div>
                    <p className="text-base font-extrabold text-foreground leading-snug group-hover:text-blue-400 transition-colors">Civil Service Commission</p>
                    <p className="text-xs text-muted-foreground font-semibold">Republic of the Philippines</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 pl-6 pr-6 pb-6 flex-grow flex flex-col justify-between gap-6">
                <div className={`border-t border-border/40 ${inView ? "animate-fade-in delay-350" : "opacity-0"}`} />

                {/* ID badge styling */}
                <div className="flex items-center justify-between gap-6 bg-[#003366]/5 dark:bg-[#003366]/10 p-5 rounded-2xl border border-[#003366]/10 flex-grow">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                      Status: Passed
                    </div>
                    <h4 className="text-xs font-bold text-foreground leading-snug">Civil Service Examination</h4>
                    <p className="text-[10px] text-muted-foreground font-semibold">Professional Level (Lifetime Eligibility)</p>
                  </div>
                </div>

                {/* Subtle PH Flag accent ribbon */}
                <div className="flex h-1 rounded-full overflow-hidden border border-border/30 bg-muted">
                  <div className="flex-1 bg-[#003366]" />
                  <div className="flex-1 bg-[#CE1126]" />
                  <div className="w-4 bg-[#FCD116]" />
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}
