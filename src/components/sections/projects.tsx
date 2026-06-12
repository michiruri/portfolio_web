"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Monitor, Phone, Users, User } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { useInView } from "@/hooks/use-in-view"

// ── TODO: Replace placeholder entries with your real projects ──────────────

const soloProjects = [
  {
    title: "Triage",
    description: "A customer-facing dashboard utility designed for electric cooperative members. Displays real-time household energy estimates, previous meter reading histories, and billing statements.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    type: "web" as const,
    demo: "https://voltstream-portal.web.app",
    image: "/projects/voltstream.png",
  },
  {
    title: "PANELCO III - Visitor Management System",
    description: "A local student companion app for Pangasinan State University campus attendees. Allows students to log grade targets, track class schedules offline, and query campus directories.",
    tags: ["React Native", "Expo", "SQLite", "Tailwind CSS"],
    type: "mobile" as const,
    github: "https://github.com/michiruri/psu-campus-buddy",
    demo: "https://github.com/michiruri/psu-campus-buddy/releases",
    image: "/projects/psucampus.png",
  },
]

/** Projects you contributed to as part of a team */
const collaborativeProjects = [
  {
    title: "CoopAdmin System",
    description: "A multi-role back-office control panel designed for electric cooperative personnel. Manages database registers, logs customer service diagnostics, and resolves technical support tickets.",
    tags: ["Next.js", "Firebase", "PostgreSQL", "Tailwind CSS"],
    type: "web" as const,
    github: "https://github.com/michiruri/coopadmin-system",
    demo: "https://coopadmin-system.web.app",
    role: "Frontend Lead",
  },
  {
    title: "CoopField Tracker",
    description: "A mobile field technician dispatch system. Enables out-of-office cooperative crews to view maintenance locations, log resolved ticket diagnostics, and record hardware updates.",
    tags: ["Flutter", "Dart", "Firebase", "SQLite"],
    type: "mobile" as const,
    github: "https://github.com/michiruri/coopfield-tracker",
    demo: "https://github.com/michiruri/coopfield-tracker/releases",
    role: "Mobile Developer",
  },
]

type Project = (typeof soloProjects[number] & { image?: string; role?: string }) | (typeof collaborativeProjects[number] & { image?: string; role?: string })

function ProjectCard({ project, delay, showRole }: { project: Project; delay: string; showRole?: boolean }) {
  const glowColor = project.type === "web" ? "from-primary/20 to-cyan-500/20" : "from-purple-500/20 to-primary/20"
  
  return (
    <div className={`relative h-full group/card ${delay}`}>
      <div className={`absolute inset-0 bg-gradient-to-tr ${glowColor} rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      <Card className="relative flex flex-col h-full border border-border/60 bg-card/80 backdrop-blur-sm rounded-2xl hover:border-primary/30 transition-all duration-300 group">
        {project.image && (
          <div className="relative aspect-video w-full overflow-hidden border-b border-border/40 bg-muted rounded-t-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider">
            {project.type === "web" ? (
              <><Monitor className="h-3.5 w-3.5" />Web App</>
            ) : (
              <><Phone className="h-3.5 w-3.5" />Mobile App</>
            )}
          </span>
          {/* Role badge for collaborative projects */}
          {showRole && project.role && (
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border/50">
              <Users className="h-3 w-3" />
              {project.role}
            </span>
          )}
        </div>
        <CardTitle className="text-lg font-extrabold transition-colors group-hover:text-primary">{project.title}</CardTitle>
        <CardDescription className="line-clamp-3 mt-2 text-xs font-semibold text-muted-foreground leading-relaxed">
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
      <CardFooter className="pt-4 border-t border-border/50 flex gap-4 bg-muted/10 rounded-b-2xl">
        {showRole ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 hover:scale-105 transition-transform cursor-pointer"
              render={<a href={project.github} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
            >
              <GithubIcon className="h-4 w-4" />
              Code
            </Button>
            <Button
              size="sm"
              className="w-full gap-1.5 hover:scale-105 transition-transform cursor-pointer"
              render={<a href={project.demo} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            className="w-full gap-1.5 hover:scale-105 transition-transform cursor-pointer"
            render={<a href={project.demo} target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
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

  return (
    <section
      id="projects"
      ref={ref}
      className="snap-section py-16 bg-transparent w-full"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl ${inView ? "animate-fade-up delay-0" : "opacity-0"}`}>
            Projects
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-2xl mx-auto font-medium ${inView ? "animate-fade-in delay-150" : "opacity-0"}`}>
            A collection of applications I&apos;ve built and contributed to — from personal projects to team collaborations.
          </p>
        </div>

        {/* ── Solo / Personal Projects ───────────────────────────────── */}
        <div className="mb-16">
          <div className={`flex items-center gap-3 mb-6 ${inView ? "animate-fade-up delay-100" : "opacity-0"}`}>
            <div className="flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-primary" />
              <User className="h-4 w-4 text-primary" />
              <h3 className="text-base font-extrabold tracking-tight">Solo &amp; Personal Projects</h3>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {soloProjects.map((project, idx) => (
              <div
                key={idx}
                className={inView ? `animate-scale-in ${CARD_DELAYS[idx]}` : "opacity-0"}
              >
                <ProjectCard project={project} delay="" showRole={false} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Collaborative Projects ──────────────────────────────────── */}
        <div>
          <div className={`flex items-center gap-3 mb-6 ${inView ? "animate-fade-up delay-200" : "opacity-0"}`}>
            <div className="flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-muted-foreground/60" />
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-base font-extrabold tracking-tight">Collaborative Projects</h3>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {collaborativeProjects.map((project, idx) => (
              <div
                key={idx}
                className={inView ? `animate-scale-in ${CARD_DELAYS[idx + soloProjects.length] ?? "delay-400"}` : "opacity-0"}
              >
                <ProjectCard project={project} delay="" showRole={true} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
