"use client"

import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Monitor, Phone, Rocket, Shield, Terminal } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { useInView } from "@/hooks/use-in-view"
import { useTheme } from "next-themes"

// ── 1. PRODUCTS & SAAS (THE FOUNDER TIER) ────────────────────────────────────
const saasProjects = [
  {
    title: "Triage",
    description: "An AI-first multi-tenant helpdesk SaaS platform for B2B/SMEs. Architected a secure tenant-isolated GCIP authentication system and Firestore database partition ensuring strict client data isolation. Integrated retrieval-augmented generation (RAG) policies using Google Gemini API to drive automated first-responder deflection, combined with invoicing and payment pipelines for end-to-end support automation.",
    tags: ["React", "TypeScript", "Next.js", "Firebase GCIP", "Google Gemini API"],
    type: "web" as const,
    demo: "https://voltstream-portal.web.app",
  },
]

// ── 2. PROFESSIONAL ENGAGEMENTS (THE ARCHITECT TIER) ─────────────────────────
const professionalProjects = [
  {
    title: "PANELCO III - Visitor Management System",
    description: "Designed, built, and deployed as the sole software engineer a joint web and mobile solution to automate visitor tracking, gate operations, and internal routing at PANELCO III. Engineered secure regional MySQL databases, a web-based administration and monitoring portal, and a mobile application for gate guards with an integrated Google Gemini AI and ML Kit OCR engine for high-precision ID scanning, thermal receipt printing, and live audit logging.",
    tags: ["Flutter", "Dart", "PHP API", "MySQL", "Google Gemini", "ML Kit OCR"],
    type: "both" as const,
    github: "https://github.com/michiruri/visitor_management_app",
    demo: "https://github.com/michiruri/visitor_management_app/releases",
    role: "Lead Engineer",
  },
]

// ── 3. TECHNICAL EXPERIMENTS (THE PLAYGROUND) ────────────────────────────────
const playgroundProjects = [
  {
    title: "Mise",
    description: "An all-in-one SaaS recipe-building and cost-tracking application designed for home bakers and commercial bakeries. Built with Riverpod state management and GoRouter. Showcases complex UI components like the RecipeCanvas editor, dynamic ingredient scaling calculators, Firestore-linked inventory costing, and automated expense spreadsheets.",
    tags: ["Flutter", "Dart", "Riverpod", "Firestore", "Google Gemini"],
    type: "mobile" as const,
    github: "https://github.com/michiruri/mise",
    demo: "https://github.com/michiruri/mise",
  },
  {
    title: "typing_game_rai",
    description: "A HTML5 Canvas speed typing web game featuring boss-fight state logic. Features a state machine managing word clear intervals, secret keyword overlays (KEYWORD MODE ACTIVATED / RESTORING TO REALITY), and multi-event stacking logic (Black Hole + Abundance + Time Warp). Implemented Firebase Firestore score tracking with client-side caching to prevent API quota limits.",
    tags: ["JavaScript", "HTML5 Canvas", "Firebase", "State Management"],
    type: "web" as const,
    github: "https://github.com/michiruri/typing_game",
    demo: "https://github.com/michiruri/typing_game",
  },
]

type Project = {
  title: string
  description: string
  tags: string[]
  type: "web" | "mobile" | "both"
  demo: string
  github?: string
  role?: string
  image?: string
}

function ProjectCard({ project, isLight }: { project: Project; isLight: boolean }) {
  const glowColor = isLight
    ? project.type === "web"
      ? "from-primary/20 to-amber-500/20"
      : project.type === "mobile"
      ? "from-orange-500/20 to-primary/20"
      : "from-primary/25 via-orange-500/20 to-amber-500/25"
    : project.type === "web" 
    ? "from-primary/20 to-cyan-500/20" 
    : project.type === "mobile" 
    ? "from-purple-500/20 to-primary/20" 
    : "from-primary/25 via-purple-500/20 to-cyan-500/25"
  
  return (
    <div className="relative h-full group/card">
      <div className={`absolute inset-0 bg-gradient-to-tr ${glowColor} rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      <Card className="relative flex flex-col h-full border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-sm rounded-2xl hover:border-primary/30 transition-all duration-300 group">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider">
              {project.type === "web" ? (
                <><Monitor className="h-3.5 w-3.5" />Web App</>
              ) : project.type === "mobile" ? (
                <><Phone className="h-3.5 w-3.5" />Mobile App</>
              ) : (
                <><Monitor className="h-3.5 w-3.5" /><span className="mx-0.5">&amp;</span><Phone className="h-3.5 w-3.5" />Web &amp; Mobile App</>
              )}
            </span>
            {project.role && (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-muted-foreground bg-muted/50 px-2.5 py-0.5 rounded-full border border-border/50">
                {project.role}
              </span>
            )}
          </div>
          <CardTitle className="text-lg font-extrabold transition-colors group-hover:text-primary">{project.title}</CardTitle>
          
          {/* Image Preview Placeholder (after the title and before the description) */}
          <div className={`aspect-[16/9] w-full rounded-xl ${isLight ? "bg-orange-500/5" : "bg-black/40"} border border-border/70 dark:border-white/5 flex items-center justify-center relative overflow-hidden my-3 group-hover/card:border-primary/35 transition-all`}>
            <div className={`absolute inset-0 bg-gradient-to-tr ${isLight ? "from-orange-500/10 to-amber-500/10" : "from-purple-500/5 to-cyan-500/5"} opacity-50 pointer-events-none`} />
            <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground/50 group-hover/card:text-primary/60 transition-colors z-10">
              [ {project.title} Preview Placeholder ]
            </span>
          </div>

          <CardDescription className="mt-2 text-xs font-semibold text-muted-foreground leading-relaxed text-justify">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default border border-border/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-4 border-t border-border/50 dark:border-white/5 flex gap-3.5 bg-muted/10 rounded-b-2xl mt-auto">
          {project.github && project.demo ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex-grow gap-1.5 hover:scale-105 transition-all duration-300 cursor-pointer"
                render={<a href="#" onClick={(e) => e.preventDefault()} />}
                nativeButton={false}
              >
                <GithubIcon className="h-4 w-4" />
                Code
              </Button>
              <Button
                size="sm"
                className="flex-grow gap-1.5 hover:scale-105 transition-all duration-300 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                render={<a href="#" onClick={(e) => e.preventDefault()} />}
                nativeButton={false}
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </Button>
            </>
          ) : project.demo ? (
            <Button
              size="sm"
              className="w-full gap-1.5 hover:scale-105 transition-all duration-300 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
              render={<a href="#" onClick={(e) => e.preventDefault()} />}
              nativeButton={false}
            >
              <ExternalLink className="h-4 w-4" />
              Live Product
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 hover:scale-105 transition-all duration-300 cursor-pointer"
              render={<a href="#" onClick={(e) => e.preventDefault()} />}
              nativeButton={false}
            >
              <GithubIcon className="h-4 w-4" />
              Source Code
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

const CARD_DELAYS = ["delay-100", "delay-200", "delay-300", "delay-400"]

export function ProjectsSection() {
  const { ref, inView } = useInView()
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme } = useTheme()
  const isLight = mounted && resolvedTheme === "light"

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="projects"
      ref={ref}
      className="snap-section py-20 bg-transparent w-full"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className={`font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground ${inView ? "animate-fade-up delay-0" : "opacity-0"}`}>
            Featured Work
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-xl mx-auto font-semibold ${inView ? "animate-fade-in delay-150" : "opacity-0"}`}>
            A structured look at my software engineering work — from revenue-generating SaaS to high-scale enterprise systems and technical playgrounds.
          </p>
        </div>

        {/* ─── SECTION 1: PRODUCTS & SAAS (THE FOUNDER TIER) ─── */}
        <div className="mb-20">
          <div className={`flex items-center gap-3 mb-6 ${inView ? "animate-fade-up delay-100" : "opacity-0"}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${isLight ? "bg-amber-500/10 border-amber-500/20 text-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.15)]" : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]"}`}>
                <Rocket className="h-4 w-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-black tracking-tight text-foreground leading-none">Products &amp; SaaS</h3>
                  <span className={`inline-flex items-center rounded-full text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border transition-all duration-300 ${isLight ? "bg-amber-500/10 text-amber-600 border-amber-500/25" : "bg-cyan-500/10 text-cyan-400 border-cyan-500/25"}`}>The Founder Tier</span>
                </div>
                <p className="text-xs text-muted-foreground font-semibold mt-1">Complete, revenue-generating platforms built for B2B/SMEs.</p>
              </div>
            </div>
            <div className={`flex-1 h-px transition-colors duration-300 ${isLight ? "bg-orange-500/15" : "bg-purple-500/10"}`} />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className={inView ? "animate-scale-in delay-200" : "opacity-0"}>
              <ProjectCard project={saasProjects[0]} isLight={isLight} />
            </div>
          </div>
        </div>

        {/* ─── SECTION 2: PROFESSIONAL ENGAGEMENTS (THE ARCHITECT TIER) ─── */}
        <div className="mb-20">
          <div className={`flex items-center gap-3 mb-6 ${inView ? "animate-fade-up delay-200" : "opacity-0"}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${isLight ? "bg-orange-500/10 border-orange-500/20 text-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.15)]" : "bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.15)]"}`}>
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-black tracking-tight text-foreground leading-none">Professional Engagements</h3>
                  <span className={`inline-flex items-center rounded-full text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border transition-all duration-300 ${isLight ? "bg-orange-500/10 text-orange-600 border-orange-500/25" : "bg-purple-500/10 text-purple-400 border-purple-500/25"}`}>The Architect Tier</span>
                </div>
                <p className="text-xs text-muted-foreground font-semibold mt-1">Production systems engineered as the sole developer for client scale.</p>
              </div>
            </div>
            <div className={`flex-1 h-px transition-colors duration-300 ${isLight ? "bg-orange-500/15" : "bg-purple-500/10"}`} />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className={inView ? "animate-scale-in delay-300" : "opacity-0"}>
              <ProjectCard project={professionalProjects[0]} isLight={isLight} />
            </div>
          </div>
        </div>

        {/* ─── SECTION 3: TECHNICAL EXPERIMENTS (THE PLAYGROUND) ─── */}
        <div>
          <div className={`flex items-center gap-3 mb-6 ${inView ? "animate-fade-up delay-300" : "opacity-0"}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${isLight ? "bg-amber-500/10 border-amber-500/20 text-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.15)]" : "bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)]"}`}>
                <Terminal className="h-4 w-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-black tracking-tight text-foreground leading-none">Technical Experiments</h3>
                  <span className={`inline-flex items-center rounded-full text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border transition-all duration-300 ${isLight ? "bg-amber-500/10 text-amber-600 border-amber-500/25" : "bg-amber-500/10 text-amber-400 border-amber-500/25"}`}>The Playground</span>
                </div>
                <p className="text-xs text-muted-foreground font-semibold mt-1">Explorations in complex component designs, states, and algorithms.</p>
              </div>
            </div>
            <div className={`flex-1 h-px transition-colors duration-300 ${isLight ? "bg-orange-500/15" : "bg-purple-500/10"}`} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {playgroundProjects.map((project, idx) => (
              <div
                key={idx}
                className={inView ? `animate-scale-in ${CARD_DELAYS[idx + 2] ?? "delay-400"}` : "opacity-0"}
              >
                <ProjectCard project={project} isLight={isLight} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
