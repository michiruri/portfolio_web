"use client"

import * as React from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play, Sparkles, Zap, Shield, Trophy } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { getTagColor } from "@/lib/tag-colors"

const playgroundProjects = [
  {
    id: "typing-game",
    title: "Some Typing Game",
    category: "Typing Arcade Game",
    description:
      "A fast-paced space typing arcade game built from scratch in vanilla JavaScript. Features custom 2D particle physics, escalating boss encounters, and a real-time Firestore leaderboard.",
    features: [
      {
        icon: Zap,
        label: "60fps Canvas Physics",
        detail: "Custom particle collision system, recoil effects, and projectile mechanics built in pure JavaScript.",
      },
      {
        icon: Shield,
        label: "Dynamic Boss Encounters",
        detail: "Object-oriented event architecture managing boss attack patterns, phases, and stacked anomalies.",
      },
      {
        icon: Trophy,
        label: "Optimized Leaderboard",
        detail: "Real-time ranking with client-side query caching to eliminate redundant database read quotas.",
      },
    ],
    tags: ["Vanilla JS", "HTML5 Canvas", "Firebase", "Node.js", "OOP"],
    demo: "https://some-typing-game.web.app",
    demoLabel: "Launch Game",
    image: "/projects/typing-game/landing.png",
  },
]

export function ProjectsSection() {
  const { ref, inView } = useInView()
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <section id="projects" ref={ref} className="snap-section py-20 bg-transparent w-full scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Works
          </div>
          <h2
            className={`font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground transition-all duration-700 ${
              inView ? "animate-fade-up delay-100" : "opacity-0"
            }`}
          >
            Projects &amp; Experiments
          </h2>
          <p
            className={`mt-3 text-muted-foreground max-w-xl mx-auto font-medium text-sm sm:text-base leading-relaxed transition-all duration-700 ${
              inView ? "animate-fade-in delay-200" : "opacity-0"
            }`}
          >
            Custom canvas engines, algorithmic state systems, and interactive builds.
          </p>
        </div>

        {/* ─── ANIMATED PROJECT SHOWCASE DISPLAY ─── */}
        <div className="w-full">
          {playgroundProjects.map((project) => (
            <div
              key={project.id}
              className={`relative group transition-all duration-700 ${
                inView ? "animate-scale-in delay-200" : "opacity-0"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Cosmic Starlight Glow behind the project display */}
              <div
                className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-primary/20 to-orange-500/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none"
              />

              <Card className="relative overflow-hidden border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#07070d]/90 backdrop-blur-2xl rounded-3xl shadow-xl transition-all duration-300 hover:border-amber-500/40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                  
                  {/* Left Column: Visual Display Widescreen Showcase (Expanded to col-span-7) */}
                  <div className="lg:col-span-7 p-4 sm:p-6 bg-muted/20 dark:bg-black/35 border-b lg:border-b-0 lg:border-r border-border/60">
                    <div className="relative rounded-2xl overflow-hidden border border-border/70 dark:border-white/10 shadow-xl bg-black group/img">
                      
                      {/* Browser Header Bar */}
                      <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-black/60 text-[11px] font-mono text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/80" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                          <span className="w-2 h-2 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-foreground/80 truncate px-2">some-typing-game.web.app</span>
                        <span className="text-amber-400 font-semibold hidden sm:inline">60 FPS Canvas</span>
                      </div>

                      {/* Full-view uncropped screenshot viewport */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={`${project.title} Preview`}
                            fill
                            className="object-contain transition-transform duration-500 group-hover/img:scale-[1.02]"
                            sizes="(max-width: 1024px) 100vw, 700px"
                            priority
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                            Preview Unavailable
                          </div>
                        )}

                        {/* Subtle Star Particle Canvas simulation overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
                          <span className="text-xs text-white flex items-center gap-2 font-bold">
                            <Play className="h-3.5 w-3.5 fill-amber-400 text-amber-400 animate-pulse" />
                            Playable 60fps Typing Arcade
                          </span>
                          <p className="text-[11px] text-white/80 mt-0.5">
                            Real-time typing defense against multi-phase bosses
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Clean Project Value & Key Mechanics */}
                  <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
                          {project.category}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          Playable in Browser
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2 font-normal">
                        {project.description}
                      </p>

                      {/* Key Features (Straight to the point) */}
                      <div className="mt-3.5 space-y-2 pt-3 border-t border-border/50">
                        {project.features.map((feature, idx) => {
                          const Icon = feature.icon
                          return (
                            <div key={idx} className="flex items-start gap-2.5">
                              <Icon className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <div className="text-xs leading-snug">
                                <span className="font-bold text-foreground">
                                  {feature.label}:{" "}
                                </span>
                                <span className="text-muted-foreground">
                                  {feature.detail}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Bottom: Tags & Launch CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/40">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${getTagColor(
                              tag
                            )}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        className="font-bold text-xs gap-1.5 cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] border-transparent shrink-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        render={
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" />
                        }
                        nativeButton={false}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {project.demoLabel}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
