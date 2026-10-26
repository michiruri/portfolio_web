"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Award, ShieldCheck, Trophy, Eye, ExternalLink, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"
import { CertificateModal, type CertificateItem } from "@/components/certificate-modal"

const TOPCIT_CERT: CertificateItem = {
  id: "topcit",
  title: "TOPCIT Examination Result",
  subtitle: "Test of Practical Competency in IT",
  issuer: "Institute for Information & Communications Technology Planning & Evaluation (IITP / NIA Korea)",
  category: "topcit",
  date: "December 10, 2025",
  levelBadge: "Level 3 — Competent",
  scoreBadge: "522 / 1000",
  refId: "13_TOPCIT_KOREA",
  pdfUrl: "/certificates/topcit/topcit-level-3.pdf",
  variants: [
    {
      id: "13th",
      label: "13th Exam (Latest)",
      sublabel: "Dec 10, 2025",
      date: "December 10, 2025",
      score: "Level 3 · 522/1000",
      pdfUrl: "/certificates/topcit/topcit-level-3.pdf",
    },
    {
      id: "12th",
      label: "12th Exam (Initial)",
      sublabel: "Jun 2, 2025",
      date: "June 2, 2025",
      score: "Level 2 · 370/1000",
      pdfUrl: "/certificates/topcit/topcit-first-attempt.pdf",
    },
  ],
}

const CSC_CERT: CertificateItem = {
  id: "csc",
  title: "Civil Service Certificate of Eligibility",
  subtitle: "Career Service Examination — Pen and Paper Test (CSE-PPT)",
  issuer: "Civil Service Commission, Republic of the Philippines",
  category: "csc",
  date: "March 8, 2026",
  levelBadge: "Professional Level",
  scoreBadge: "Lifetime Eligibility",
  refId: "CSC_CSE_PPT_PROF",
  pdfUrl: "/certificates/civil-service/csc-eligibility.pdf",
}

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
  const [selectedCert, setSelectedCert] = React.useState<CertificateItem | null>(null)
  const [selectedVariantId, setSelectedVariantId] = React.useState<string | undefined>(undefined)

  const handleOpenCert = (cert: CertificateItem, variantId?: string) => {
    setSelectedVariantId(variantId)
    setSelectedCert(cert)
  }

  return (
    <section id="achievements" ref={ref} className="snap-section py-20 w-full relative overflow-hidden bg-transparent">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl lg:max-w-6xl px-4 sm:px-6 lg:px-8 w-full z-10">

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl lg:max-w-6xl mx-auto items-stretch perspective-1000">

          {/* ─── 1. TOPCIT CARD ─── */}
          <div className={`transition-all duration-500 hover:rotate-y-4 hover:scale-[1.01] hover:shadow-2xl hover:shadow-red-500/[0.04] ${inView ? "animate-slide-left delay-200" : "opacity-0"}`}>
            <Card className="relative overflow-hidden border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-md rounded-2xl flex flex-col h-full group transition-all duration-300 hover:border-red-500/25">
              {/* Dynamic top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 to-amber-500 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Radial hover backing glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <CardHeader className="pb-0 pl-6 pr-6 pt-6 z-10">
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

                {/* Score Dial + Dual Attempt Comparison */}
                <div className="bg-slate-500/[0.02] dark:bg-red-950/[0.10] p-4 sm:p-5 rounded-2xl border border-red-500/10 flex-grow flex flex-col justify-between gap-3.5 relative overflow-hidden">
                  
                  {/* Latest Attempt vs Previous Attempt Grid */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    
                    {/* Attempts Stack */}
                    <div className="flex-grow space-y-2">
                      
                      {/* Latest: 13th Examination */}
                      <div
                        onClick={() => handleOpenCert(TOPCIT_CERT, "13th")}
                        className="group/item flex items-center justify-between p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 transition-all cursor-pointer shadow-sm"
                        title="Click to view 13th TOPCIT Certificate"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-foreground group-hover/item:text-red-400 transition-colors">
                              13th TOPCIT (Latest)
                            </span>
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/30">
                              Level 3
                            </span>
                          </div>
                          <p className="text-[10px] text-muted-foreground font-medium">December 10, 2025 · Competent</p>
                        </div>
                        <div className="text-right pl-3">
                          <span className="text-base font-black text-foreground">522</span>
                          <span className="text-[9px] text-muted-foreground font-bold"> / 1000</span>
                        </div>
                      </div>

                      {/* Initial: 12th Examination */}
                      <div
                        onClick={() => handleOpenCert(TOPCIT_CERT, "12th")}
                        className="group/item flex items-center justify-between p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                        title="Click to view 12th TOPCIT Certificate"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-muted-foreground group-hover/item:text-foreground transition-colors">
                              12th TOPCIT (Baseline)
                            </span>
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-white/5 text-muted-foreground border border-white/10">
                              Level 2
                            </span>
                          </div>
                          <p className="text-[10px] text-muted-foreground/60 font-medium">June 2, 2025 · Basic</p>
                        </div>
                        <div className="text-right pl-3">
                          <span className="text-sm font-bold text-muted-foreground">370</span>
                          <span className="text-[9px] text-muted-foreground/60 font-semibold"> / 1000</span>
                        </div>
                      </div>

                    </div>

                    {/* Circular Gauge for Latest Score */}
                    <div className="flex flex-col items-center justify-center shrink-0 sm:pl-1">
                      <CircularGauge score={522} max={1000} fromColor="#ef4444" toColor="#f59e0b" glowColor="rgba(239, 68, 68, 0.4)" />
                    </div>
                  </div>

                  {/* Growth Velocity Callout */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>+152 pts (+41.1% gain) in 6 mos</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-500/90 font-semibold">
                      Level 2 → Level 3
                    </span>
                  </div>

                </div>

                {/* Actions & Verification */}
                <div className="flex items-center justify-between gap-3 border-t border-border/30 dark:border-white/5 pt-4">
                  <div className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-muted-foreground/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
                    <span>REF: 13_TOPCIT</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenCert(TOPCIT_CERT, "13th")}
                    className="h-8 px-3.5 text-xs font-bold gap-1.5 rounded-xl border-red-500/25 bg-red-500/5 hover:bg-red-500/15 text-red-500 hover:text-red-400 hover:border-red-500/40 transition-all cursor-pointer shadow-sm shadow-red-500/5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Certificate
                  </Button>
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

              <CardHeader className="pb-0 pl-6 pr-6 pt-6 z-10">
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
                <div className="bg-slate-500/[0.02] dark:bg-blue-950/[0.10] p-4 sm:p-5 rounded-2xl border border-blue-500/10 flex-grow flex flex-col justify-between gap-3.5 relative overflow-hidden">
                  
                  {/* Main Details Stack & Rotating Shield */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    
                    <div className="flex-grow space-y-2">
                      {/* Examination info */}
                      <div className="p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span className="text-xs font-bold text-foreground">
                            CSE-PPT Professional Level
                          </span>
                          <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Passed
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium mt-0.5">
                          March 8, 2026 · Lifetime Career Service Eligibility
                        </p>
                      </div>

                      {/* Scope & Conferment */}
                      <div className="p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                        <p className="text-xs font-semibold text-foreground">
                          Second-Level Executive Eligibility
                        </p>
                        <p className="text-[10px] text-muted-foreground/70 font-medium mt-0.5">
                          Conferred by CSC Philippines under Presidential Decree No. 807
                        </p>
                      </div>
                    </div>

                    {/* Rotating security dashboard check badge */}
                    <div className="flex flex-col items-center justify-center shrink-0 sm:pl-1">
                      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                        <div className="absolute inset-1 rounded-full border border-dashed border-emerald-500/20 animate-[spin_30s_linear_infinite]" />
                        <div className="w-16 h-16 rounded-full bg-emerald-500/[0.04] border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                          <ShieldCheck className="w-8 h-8 filter drop-shadow-[0_0_4px_rgba(16,185,129,0.4)]" />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Verification Status Callout */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>Permanent Public Sector Qualification</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-blue-400/90 font-semibold">
                      CSC Masterlist Verified
                    </span>
                  </div>

                </div>

                {/* Actions & Verification */}
                <div className="flex items-center justify-between gap-3 border-t border-border/30 dark:border-white/5 pt-4">
                  <div className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-muted-foreground/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse" />
                    <span>REF: CSC_PROF</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenCert(CSC_CERT)}
                    className="h-8 px-3.5 text-xs font-bold gap-1.5 rounded-xl border-blue-500/25 bg-blue-500/5 hover:bg-blue-500/15 text-blue-500 hover:text-blue-400 hover:border-blue-500/40 transition-all cursor-pointer shadow-sm shadow-blue-500/5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <CertificateModal
        certificate={selectedCert}
        initialVariantId={selectedVariantId}
        onClose={() => {
          setSelectedCert(null)
          setSelectedVariantId(undefined)
        }}
      />
    </section>
  )
}
