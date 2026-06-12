"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Send, CheckCircle2, MapPin, Clock, Sparkles, User, MessageSquare, ChevronRight } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { useInView } from "@/hooks/use-in-view"

export function ContactSection() {
  const { ref, inView } = useInView()
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle")
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    // Simulate network transmission delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStatus("sent")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="snap-section flex items-center py-20 bg-transparent w-full relative overflow-hidden bg-grid-subtle"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full z-10">

        {/* Header */}
        <div className={`text-center mb-16 ${inView ? "animate-fade-up delay-0" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Let&apos;s Build Something Great
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto font-semibold">
            Direct channel to my desk. No gatekeepers or ticketing systems—just a direct line to discuss your product architecture, features, or contract work.
          </p>
        </div>

        {/* Unified Connected Card */}
        <div className={`max-w-3xl mx-auto ${inView ? "animate-scale-in delay-200" : "opacity-0"}`}>
          <Card className="border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-sm rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-[0_0_25px_rgba(139,92,246,0.05)] transition-all duration-500">
            <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border/40 dark:divide-white/5 items-stretch">
              
              {/* Left Column: What to Expect */}
              <div className="md:col-span-5 p-6 flex flex-col justify-between gap-6">
                <div className="space-y-5">
                  {/* Heading */}
                  <div>
                    <h3 className="text-sm font-extrabold text-foreground tracking-tight leading-tight">What to Expect</h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-1.5 leading-relaxed text-justify">
                      I value direct communication and respect your time. Here is what to expect:
                    </p>
                  </div>

                  {/* Details List */}
                  <div className="space-y-4 text-xs font-semibold text-muted-foreground border-t border-border/40 dark:border-white/5 pt-4">
                    <div className="flex gap-2.5">
                      <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-foreground font-bold">Location &amp; Timezone</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5 text-justify">
                          Pangasinan, PH (GMT+8). Active 9:00 AM - 10:00 PM.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2.5">
                      <Clock className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-foreground font-bold">Response Time</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5 text-justify">
                          Daily inbox review. Response in 12-24 hours.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <Sparkles className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-foreground font-bold">Availability</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5 text-justify">
                          Open to contracts, consulting, or full-time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Badges */}
                <div className="space-y-2 border-t border-border/40 dark:border-white/5 pt-4">
                  <a
                    href="mailto:raileymitchellcapitis@gmail.com"
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border/50 dark:border-white/5 bg-background/50 dark:bg-black/20 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.08)] group/link"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 text-primary group-hover/link:bg-primary/20 group-hover/link:text-primary transition-colors shrink-0">
                        <Mail className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0 ml-0.5">
                        <span className="text-[11px] font-bold text-foreground leading-tight">Email</span>
                        <span className="truncate text-[10px] text-muted-foreground mt-0.5 group-hover/link:text-muted-foreground/80 transition-colors">raileymitchellcapitis@gmail.com</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/michiruri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border/50 dark:border-white/5 bg-background/50 dark:bg-black/20 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.08)] group/link"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 text-primary group-hover/link:bg-primary/20 group-hover/link:text-primary transition-colors shrink-0">
                        <LinkedinIcon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="flex flex-col min-w-0 ml-0.5">
                        <span className="text-[11px] font-bold text-foreground leading-tight">LinkedIn</span>
                        <span className="truncate text-[10px] text-muted-foreground mt-0.5 group-hover/link:text-muted-foreground/80 transition-colors">linkedin.com/in/michiruri</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </a>

                  <a
                    href="https://github.com/michiruri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border/50 dark:border-white/5 bg-background/50 dark:bg-black/20 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.08)] group/link"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 text-primary group-hover/link:bg-primary/20 group-hover/link:text-primary transition-colors shrink-0">
                        <GithubIcon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="flex flex-col min-w-0 ml-0.5">
                        <span className="text-[11px] font-bold text-foreground leading-tight">GitHub</span>
                        <span className="truncate text-[10px] text-muted-foreground mt-0.5 group-hover/link:text-muted-foreground/80 transition-colors">github.com/michiruri</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </a>
                </div>
              </div>

              {/* Right Column: The Form */}
              <div className="md:col-span-7 p-6 bg-black/5 dark:bg-black/10 flex flex-col justify-between gap-6">
                {status !== "sent" ? (
                  <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between gap-6">
                    
                    {/* Heading matching Left Column */}
                    <div>
                      <h3 className="text-sm font-extrabold text-foreground tracking-tight leading-tight">Send a Message</h3>
                      <p className="text-xs text-muted-foreground font-semibold mt-2 leading-relaxed text-justify">
                        Have a project, a contract to discuss, or a simple question?
                        Send me a message and let's get to work.
                      </p>
                    </div>

                    {/* Inputs Wrapper */}
                    <div className="space-y-4 flex-grow border-t border-border/40 dark:border-white/5 pt-5">
                      <div>
                        <label htmlFor="name" className="flex items-center gap-2 text-xs font-bold text-foreground mb-2 select-none">
                          <User className="h-4 w-4 text-primary shrink-0" />
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          disabled={status === "sending"}
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe or Organization"
                          className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-border/60 dark:border-white/5 bg-background/80 dark:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground/45 disabled:opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="flex items-center gap-2 text-xs font-bold text-foreground mb-2 select-none">
                          <Mail className="h-4 w-4 text-primary shrink-0" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          disabled={status === "sending"}
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="you@example.com"
                          className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-border/60 dark:border-white/5 bg-background/80 dark:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground/45 disabled:opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="flex items-center gap-2 text-xs font-bold text-foreground mb-2 select-none">
                          <MessageSquare className="h-4 w-4 text-primary shrink-0" />
                          What project are we building?
                        </label>
                        <textarea
                          id="message"
                          required
                          disabled={status === "sending"}
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          rows={6}
                          placeholder="Tell me about your project, ideas, or timeline..."
                          className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-border/60 dark:border-white/5 bg-background/80 dark:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/45 disabled:opacity-50 h-36"
                        />
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full gap-2 py-2.5 h-10 font-bold text-xs bg-primary text-primary-foreground hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer relative overflow-hidden shrink-0 mt-2"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-t-transparent border-primary-foreground" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-4 space-y-5 h-full min-h-[350px] animate-fade-up">
                    <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.15)] animate-pulse">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xs font-black tracking-widest uppercase text-green-400">
                        Message Sent!
                      </h3>
                      <p className="text-[11px] text-muted-foreground max-w-xs font-semibold leading-relaxed">
                        Thanks for reaching out! I have received your message and will get back to you within 24 hours.
                      </p>
                    </div>
                    
                    <div className="w-full border-t border-dashed border-border/40 dark:border-white/5 my-1" />
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStatus("idle")}
                      className="gap-1.5 hover:scale-102 active:scale-[0.98] transition-all text-[9px] font-black uppercase tracking-wider border-primary/30 text-primary hover:border-primary/60 bg-primary/5 hover:bg-primary/10"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </div>

            </div>
          </Card>
        </div>

      </div>
    </section>
  )
}
