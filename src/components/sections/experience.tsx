"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, GraduationCap, MapPin, Briefcase, Check } from "lucide-react"
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
      description: "Served as a multi-role engineering and support intern, wearing multiple hats across software systems development, database operations, infrastructure management, and multimedia. Led and orchestrated advanced systems and AI integrations to accelerate cooperative deliveries.",
      skills: [],
      roles: [
        {
          title: "AI & Agentic Assisted Developer",
          description: "Orchestrated AI-assisted coding pipelines using agentic tools like Cursor and Higgsfield to accelerate corporate software deliveries. Built automated workflows, custom prompt systems, and structured API layers. Spearheaded a creative initiative using Higgsfield AI and image generation tools to transform employee portraits into high-fidelity 'baby-fied' versions, generating custom AI videos of them dancing to popular themes that were featured in the company's Foundation Day celebrations and games.",
          skills: ["Agentic AI", "Cursor Composer", "Higgsfield", "Prompt Tuning", "LLM Workflows"]
        },
        {
          title: "Full Stack Web Developer",
          description: "Designed and engineered next-generation corporate web portals, integrating real-time system administration databases with dynamic client-side forms and responsive dashboards.",
          skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs"]
        },
        {
          title: "System Administrator",
          description: "Supervised and managed active directory networks, automated server updates, database backups, and secure system access permissions.",
          skills: ["Server Administration", "Network Diagnostics", "Active Directory", "Database Backups"]
        },
        {
          title: "IT Technical Support (L1)",
          description: "Provided primary tier technical support diagnosing network issues, client host configurations, hardware troubleshooting, and helpdesk ticketing resolutions.",
          skills: ["Hardware Checks", "Operating Systems", "Client Troubleshooting", "Ticketing Support"]
        },
        {
          title: "Graphic Designer",
          description: "Created high-impact corporate slide decks, promotional web banners, and visual multimedia layouts for company-wide meetings and customer outreach.",
          skills: ["Figma", "Digital Art", "Vector Graphics", "Brand Layouts", "Multimedia Presentation"]
        }
      ]
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
      description: "Completed comprehensive technical education in software design, mobile environment compilation, database management, and complex information systems architecture.",
      skills: ["Web Technologies", "Mobile Systems", "Databases", "Systems Architecture"]
    }
  ]

  return (
    <section id="experience" ref={ref} className="snap-section py-20 w-full relative overflow-hidden bg-transparent">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Section Heading */}
        <div className={`text-center mb-16 ${inView ? "animate-fade-up delay-0" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Education &amp; Experience
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto font-semibold">
            My academic foundation and practical application in the field of information technology.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative pl-6 sm:pl-8">
          
          {/* Vertical timeline axis line */}
          <div className={`absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary ${isLight ? "via-orange-500" : "via-purple-500"} to-transparent z-0`} />

          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 pb-12 last:pb-0 z-10">
              
              {/* Timeline dot */}
              {exp.highlight ? (
                /* Glowing active dot */
                <div className={`absolute left-[-25px] sm:left-[-29px] top-1.5 w-[16px] h-[16px] rounded-full bg-primary border-4 border-background ring-4 ring-primary/30 transition-all duration-500 ${
                  inView ? "scale-100 opacity-100 animate-[pulse_2s_infinite]" : "scale-50 opacity-0"
                }`} />
              ) : (
                /* Subtler passive dot */
                <div className={`absolute left-[-22px] sm:left-[-26px] top-2.5 w-[10px] h-[10px] rounded-full bg-muted-foreground/45 border-2 border-background transition-all duration-500 ${
                  inView ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }`} />
              )}

              <div className={`${inView ? `animate-slide-left` : "opacity-0"}`} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <Card className={`relative overflow-hidden border border-border/70 bg-card/60 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all duration-300 group ${
                  exp.highlight ? `border-primary/45 ${isLight ? "shadow-[0_0_15px_rgba(249,115,22,0.08)]" : "shadow-[0_0_15px_rgba(139,92,246,0.08)]"} bg-card/85` : ""
                }`}>
                  {/* Left colored tag border */}
                  <div className={`absolute top-0 left-0 h-full w-[3px] transition-all group-hover:w-[5px] ${
                    exp.highlight ? "bg-primary" : "bg-muted-foreground/30 group-hover:bg-primary/50"
                  }`} />
                  
                  <CardContent className="p-5 space-y-4">
                    {/* Logo + Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <LogoImage
                          src={exp.logo}
                          alt={`${exp.company} Logo`}
                          fallbackText={exp.fallbackLogo}
                        />
                        <div>
                          <h3 className={`text-base font-extrabold text-foreground leading-snug group-hover:text-primary transition-colors ${exp.highlight ? "text-primary" : ""}`}>
                            {exp.role}
                          </h3>
                          <p className="text-xs text-muted-foreground font-semibold">{exp.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="flex items-center gap-1.5 bg-muted/65 px-2.5 py-1 rounded-lg border border-border/40 font-semibold text-foreground">
                          <Calendar className={`h-3.5 w-3.5 ${exp.highlight ? "text-primary animate-pulse" : "text-muted-foreground"}`} />
                          {exp.date}
                        </span>
                        <span className="flex items-center gap-1.5 bg-muted/65 px-2.5 py-1 rounded-lg border border-border/40 font-semibold text-foreground">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          Pangasinan, PH
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-border/40" />

                    {/* Details */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          {exp.type === "Education" ? (
                            <GraduationCap className="h-4 w-4 text-primary" />
                          ) : (
                            <Briefcase className="h-4 w-4 text-emerald-500" />
                          )}
                          <h4 className="text-xs font-bold text-foreground">{exp.division}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-5 font-semibold text-justify">
                          {exp.description}
                        </p>
                      </div>

                      {/* Render nested roles if present */}
                      {exp.roles ? (
                        <div className="pl-5 pt-4 space-y-6">
                          <p className="text-[10px] font-black text-foreground/80 tracking-wider uppercase mb-3 border-b border-border/40 pb-1.5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Core Focus Areas &amp; Specializations
                          </p>
                          {exp.roles.map((subRole) => (
                            <div key={subRole.title} className="relative group/role pl-4 border-l border-border/70 hover:border-primary/50 transition-all duration-300 space-y-2">
                              {/* Left dot inside role */}
                              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-border group-hover/role:bg-primary transition-all duration-300" />
                              
                              <h5 className="text-[13px] font-bold text-foreground group-hover/role:text-primary transition-colors flex items-center gap-2">
                                {subRole.title}
                              </h5>
                              <p className="text-xs text-muted-foreground leading-relaxed font-semibold text-justify">
                                {subRole.description}
                              </p>
                              
                              {/* Skills for sub role */}
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {subRole.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="text-[9px] font-bold px-2 py-0.5 rounded border border-border/60 bg-muted/30 text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/30"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Standard Single Skill Badge container (e.g. for Education) */
                        <div className="flex flex-wrap gap-1.5 pl-5 pt-1">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[9.5px] font-bold px-2 py-0.5 rounded border border-border/60 bg-muted/30 text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

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

