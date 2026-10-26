"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, GraduationCap, MapPin, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { useTheme } from "next-themes"

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

export function ExperienceSection() {
  const { ref, inView } = useInView()
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme } = useTheme()
  const isLight = mounted && resolvedTheme === "light"

  // Active expanded role index for PANELCO internship (default to 0: AI & Agentic Developer)
  const [activePanelcoRole, setActivePanelcoRole] = React.useState<number>(0)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const experiences = [
    {
      id: "panelco-internship",
      role: "Systems & Software Engineering Intern",
      company: "PANELCO III Electric Cooperative",
      division: "System Administration Division - Corporate Services Department",
      date: "2026",
      type: "OJT / Internship",
      logo: "/logos/panelco-logo.png",
      fallbackLogo: "PANELCO",
      highlight: true,
      description:
        "Served as a multi-role engineering and support intern, wearing multiple hats across software systems development, database operations, infrastructure management, and multimedia. Led and orchestrated advanced systems and AI integrations to accelerate cooperative deliveries.",
      skills: [],
      roles: [
        {
          title: "AI & Agentic Assisted Developer",
          shortTitle: "AI & Agentic",
          description:
            "Orchestrated AI-assisted coding pipelines using agentic tools like Cursor and Higgsfield to accelerate corporate software deliveries. Built automated workflows, custom prompt systems, and structured API layers. Spearheaded a creative initiative using Higgsfield AI and image generation tools to transform employee portraits into high-fidelity 'baby-fied' versions, generating custom AI videos of them dancing to popular themes that were featured in the company's 48th Anniversary Foundation Celebration and games.",
          skills: ["Agentic AI", "Cursor Composer", "Higgsfield", "Prompt Tuning", "LLM Workflows"],
        },
        {
          title: "Full Stack Web Developer",
          shortTitle: "Full Stack Web",
          description:
            "Designed and engineered next-generation corporate web portals, transforming PANELCO's traditional manual paper visitor entry and tracking logs into a secure, paperless digital portal integrated with a real-time SQL database.",
          skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SQL Database", "Paperless Migration"],
        },
        {
          title: "System Administrator",
          shortTitle: "SysAdmin",
          description:
            "Supervised and managed active directory networks, automated server updates, database backups, and secure system access permissions. During the 36th AGAM (Annual General Assembly Meeting), administered the backend and admin operations of the consumer registration system, and successfully executed manual data entry and synchronization workflows when the primary server failed and operations shifted to the backup server.",
          skills: ["Server Administration", "Network Diagnostics", "Active Directory", "Database Backups"],
        },
        {
          title: "IT Technical Support (L1)",
          shortTitle: "IT Support (L1)",
          description:
            "Provided primary tier technical support diagnosing network issues, client host configurations, hardware troubleshooting, and helpdesk ticketing resolutions. On regular days, performed hard reformats, system data backups, Microsoft OS/Office installations, and setup of all necessary software suites before deploying PC units to employees for active corporate work.",
          skills: ["Hardware Checks", "Operating Systems", "Client Troubleshooting", "Ticketing Support"],
        },
        {
          title: "Graphic Designer",
          shortTitle: "Graphic Design",
          description:
            "Created high-impact corporate slide decks, promotional web banners, and visual multimedia layouts for company-wide meetings and customer outreach. Designed and created the official event backdrop for the 48th Anniversary Foundation Celebration, and collaborated with fellow SAD interns to design the official new employee ID cards for PANELCO.",
          skills: ["Figma", "Digital Art", "Vector Graphics", "Brand Layouts", "ID Design", "Multimedia Presentation"],
        },
      ],
    },
    {
      id: "bs-it",
      role: "Bachelor of Science in Information Technology",
      company: "Pangasinan State University",
      division: "Major in Web and Mobile Technologies",
      date: "2022 - 2026",
      type: "Education",
      logo: "/logos/psu-logo.png",
      fallbackLogo: "PSU",
      highlight: false,
      description:
        "Completed comprehensive technical education in software design, mobile environment compilation, database management, and complex systems architecture. Gained strong foundational knowledge in cybersecurity principles and modern web/mobile developmental frameworks.",
      skills: [
        "Web Technologies",
        "Mobile Systems",
        "Databases",
        "Systems Architecture",
        "Cybersecurity",
        "Developmental Frameworks",
      ],
    },
  ]

  return (
    <section id="experience" ref={ref} className="snap-section py-20 w-full relative overflow-hidden bg-transparent scroll-mt-20">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Section Heading */}
        <div className={`text-center mb-14 ${inView ? "animate-fade-up delay-0" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Education &amp; Experience
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto font-semibold text-sm">
            Academic foundations and engineering impact across real-world systems.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative pl-4 sm:pl-8">
          {/* Vertical timeline axis line */}
          <div
            className={`absolute left-[5px] sm:left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary ${
              isLight ? "via-orange-500" : "via-purple-500"
            } to-transparent z-0`}
          />

          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-4 sm:pl-8 pb-10 last:pb-0 z-10">
              {/* Timeline dot */}
              {exp.highlight ? (
                <div
                  className={`absolute left-[-19px] sm:left-[-29px] top-1.5 w-[16px] h-[16px] rounded-full bg-primary border-4 border-background ring-4 ring-primary/30 transition-all duration-500 ${
                    inView ? "scale-100 opacity-100 animate-[pulse_2s_infinite]" : "scale-50 opacity-0"
                  }`}
                />
              ) : (
                <div
                  className={`absolute left-[-16px] sm:left-[-26px] top-2.5 w-[10px] h-[10px] rounded-full bg-muted-foreground/45 border-2 border-background transition-all duration-500 ${
                    inView ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                />
              )}

              <div
                className={`${inView ? `animate-slide-left` : "opacity-0"}`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <Card
                  className={`relative overflow-hidden border border-border/70 bg-card/75 dark:bg-[#07070d]/90 backdrop-blur-xl rounded-3xl hover:shadow-xl transition-all duration-300 group ${
                    exp.highlight
                      ? `border-primary/45 ${
                          isLight
                            ? "shadow-[0_0_20px_rgba(249,115,22,0.08)]"
                            : "shadow-[0_0_20px_rgba(139,92,246,0.08)]"
                        }`
                      : ""
                  }`}
                >
                  {/* Colored Tag Indicator */}
                  <div
                    className={`absolute top-0 left-0 h-full w-[3px] transition-all group-hover:w-[5px] ${
                      exp.highlight ? "bg-primary" : "bg-muted-foreground/30 group-hover:bg-primary/50"
                    }`}
                  />

                  <CardContent className="p-4 sm:p-6 lg:p-7 space-y-5">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <LogoImage
                          src={exp.logo}
                          alt={`${exp.company} Logo`}
                          fallbackText={exp.fallbackLogo}
                        />
                        <div>
                          <h3
                            className={`text-base sm:text-lg font-extrabold text-foreground leading-snug group-hover:text-primary transition-colors ${
                              exp.highlight ? "text-primary" : ""
                            }`}
                          >
                            {exp.role}
                          </h3>
                          <p className="text-xs text-muted-foreground font-semibold">{exp.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="flex items-center gap-1.5 bg-muted/65 px-2.5 py-1 rounded-lg border border-border/40 font-semibold text-foreground">
                          <Calendar
                            className={`h-3.5 w-3.5 ${
                              exp.highlight ? "text-primary animate-pulse" : "text-muted-foreground"
                            }`}
                          />
                          {exp.date}
                        </span>
                        <span className="flex items-center gap-1.5 bg-muted/65 px-2.5 py-1 rounded-lg border border-border/40 font-semibold text-foreground">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          Pangasinan, PH
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-border/40" />

                    {/* Department Division & Overview */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        {exp.type === "Education" ? (
                          <GraduationCap className="h-4 w-4 text-primary" />
                        ) : (
                          <Briefcase className="h-4 w-4 text-emerald-500" />
                        )}
                        <h4 className="text-xs font-bold text-foreground">{exp.division}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium text-justify">
                        {exp.description}
                      </p>
                    </div>

                    {/* ─── ROLE MATRIX (FOR PANELCO) ─── */}
                    {exp.roles && exp.roles.length > 0 && (
                      <div className="pt-2 space-y-4">
                        <div className="flex items-center justify-between border-b border-border/40 pb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Specialized Focus Areas ({exp.roles.length} Roles)
                          </span>
                        </div>

                        {/* Interactive Role Chips (Scrollable in one line) */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap pb-1.5 pt-0.5 -mx-1 px-1">
                          {exp.roles.map((subRole, rIdx) => {
                            const isRoleActive = activePanelcoRole === rIdx
                            return (
                              <button
                                key={subRole.title}
                                type="button"
                                onClick={() => setActivePanelcoRole(rIdx)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border shrink-0 ${
                                  isRoleActive
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                    : "bg-muted/40 hover:bg-muted/70 text-muted-foreground hover:text-foreground border-border/60"
                                }`}
                              >
                                {subRole.shortTitle || subRole.title}
                              </button>
                            )
                          })}
                        </div>

                        {/* Active Role Dossier Box */}
                        {exp.roles[activePanelcoRole] && (
                          <div className="p-4 sm:p-5 rounded-2xl border border-border/70 bg-muted/20 dark:bg-black/30 space-y-3 transition-all animate-fade-in">
                            <div className="flex items-center justify-between gap-2">
                              <h5 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                                {exp.roles[activePanelcoRole].title}
                              </h5>
                            </div>

                            <p className="text-xs text-muted-foreground leading-relaxed font-medium text-justify">
                              {exp.roles[activePanelcoRole].description}
                            </p>

                            {/* Skills/Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {exp.roles[activePanelcoRole].skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-[10px] font-bold px-2 py-0.5 rounded-md border border-border/60 bg-card/60 text-foreground/80 transition-all hover:border-primary/40"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Standard Coursework/Skills for Education */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground block mb-2">
                          Coursework &amp; Key Disciplines
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-border/60 bg-muted/40 text-foreground/80"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
