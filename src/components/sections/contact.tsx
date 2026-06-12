"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Send } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { useInView } from "@/hooks/use-in-view"

export function ContactSection() {
  const { ref, inView } = useInView()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="snap-section flex items-center py-20 bg-transparent w-full relative overflow-hidden bg-grid-subtle"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full z-10">

        {/* Header */}
        <div className={`text-center mb-16 ${inView ? "animate-fade-up delay-0" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Get In Touch
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto font-semibold">
            Have a project in mind, want to hire me, or just want to connect? Let&apos;s talk!
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 max-w-3xl mx-auto items-stretch">

          {/* Info Card */}
          <div className={`md:col-span-2 flex flex-col justify-between gap-6 ${inView ? "animate-slide-left delay-200" : "opacity-0"}`}>
            <Card className="flex-grow border border-border/70 bg-card/60 backdrop-blur-sm rounded-2xl flex flex-col justify-center hover:shadow-lg transition-all duration-300 group">
              <CardContent className="space-y-6 p-6">
                <h3 className="text-sm font-extrabold border-b border-border/40 pb-3 text-foreground">
                  Contact Details
                </h3>

                <div className="space-y-5 text-xs font-semibold text-muted-foreground">
                  <a
                    href="mailto:raileymitchellcapitis@gmail.com"
                    className="flex items-center gap-3.5 px-3 py-2 -mx-3 rounded-lg hover:bg-primary/10 hover:text-primary hover:translate-x-1 transition-all"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-primary" />
                    raileymitchellcapitis@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/michiruri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 px-3 py-2 -mx-3 rounded-lg hover:bg-primary/10 hover:text-primary hover:translate-x-1 transition-all"
                  >
                    <LinkedinIcon className="h-5 w-5 shrink-0 text-primary" />
                    linkedin.com/in/michiruri
                  </a>
                  <a
                    href="https://github.com/michiruri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 px-3 py-2 -mx-3 rounded-lg hover:bg-primary/10 hover:text-primary hover:translate-x-1 transition-all"
                  >
                    <GithubIcon className="h-5 w-5 shrink-0 text-primary" />
                    github.com/michiruri
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Card */}
          <div className={`md:col-span-3 ${inView ? "animate-slide-right delay-300" : "opacity-0"}`}>
            <Card className="border border-border/70 bg-card/60 backdrop-blur-sm rounded-2xl h-full hover:shadow-lg transition-all duration-500 focus-within:shadow-[0_0_30px_rgba(var(--primary),0.1)] focus-within:border-primary/40 relative group/form overflow-hidden">
              {/* Subtle animated border glow when focused */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-focus-within/form:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardContent className="p-6 relative z-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-wider mb-1.5 text-muted-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Your name or organization"
                      className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-border/60 bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-wider mb-1.5 text-muted-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-border/60 bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-wider mb-1.5 text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="What project are we building?"
                      className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-border/60 bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all text-foreground"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gap-1.5 py-2.5 h-10 font-bold text-xs bg-primary text-primary-foreground hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}
