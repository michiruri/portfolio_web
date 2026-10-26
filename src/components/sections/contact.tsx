"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Send, CheckCircle2, MapPin, Clock, User, MessageSquare, ChevronRight, RefreshCw } from "lucide-react"
import { GithubIcon, LinkedinIcon, XIcon, KofiIcon } from "@/components/icons"
import { useInView } from "@/hooks/use-in-view"
import { useTheme } from "next-themes"
import { useDeveloperGifs } from "@/hooks/use-developer-gifs"

export function ContactSection() {
  const { ref, inView } = useInView()
  const [mounted, setMounted] = React.useState(false)
  const [isFlipped, setIsFlipped] = React.useState(false)
  const { resolvedTheme } = useTheme()
  const isLight = mounted && resolvedTheme === "light"
  const { currentGif, currentIndex, totalGifs, cycleKey } = useDeveloperGifs({ isFlipped })

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle")
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const response = await fetch("https://formsubmit.co/ajax/raileymitchellcapitis@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`
        })
      })

      if (response.ok) {
        setStatus("sent")
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again or email directly at raileymitchellcapitis@gmail.com.")
      setStatus("idle")
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="snap-section flex items-center py-20 bg-transparent w-full relative overflow-hidden bg-grid-subtle"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">

        {/* Header */}
        <div className={`text-center mb-8 ${inView ? "animate-fade-up delay-0" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Contact
          </h2>
          <p className="mt-2.5 text-muted-foreground max-w-2xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
            Operating 100% remotely. Currently open to flexible contract builds and part-time engineering engagements, as well as select full-time roles depending on scope, timeline, and compensation. Have a product in mind? Send a message below or email directly.
          </p>
        </div>

        {/* Two-Column Layout: Left (Wider Contact Hub), Right (Equal Height 3D Flipping Card) */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch ${inView ? "animate-scale-in delay-200" : "opacity-0"}`}>
          
          {/* Left Column: Wider Unified Contact Card (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col h-full">
            <Card className={`h-full flex flex-col border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-sm rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-500 p-0 ${isLight ? "hover:shadow-[0_0_25px_rgba(249,115,22,0.08)]" : "hover:shadow-[0_0_25px_rgba(139,92,246,0.05)]"}`}>
              <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border/40 dark:divide-white/5 items-stretch flex-1 h-full">
              
              {/* Left Column: Direct Channels & Details (col-span-6) */}
              <div className="md:col-span-6 p-4 sm:p-5 flex flex-col justify-between gap-4 h-full">
                <div className="flex flex-col gap-3.5">
                  {/* Heading */}
                  <div>
                    <h3 className="text-sm font-extrabold text-foreground tracking-tight leading-tight">Direct Channels</h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-1 leading-relaxed">
                      I&apos;m easy to reach and usually reply within the day:
                    </p>
                  </div>

                  {/* Details List */}
                  <div className="space-y-2.5 text-xs font-semibold text-muted-foreground border-t border-border/40 dark:border-white/5 pt-3">
                    <div className="flex gap-2.5 items-center">
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <span className="text-foreground font-bold">Location: </span>
                        <span className="text-[11px] text-muted-foreground">Pangasinan, PH (GMT+8)</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2.5 items-center">
                      <Clock className="h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <span className="text-foreground font-bold">Response: </span>
                        <span className="text-[11px] text-muted-foreground">Usually within 12–24 hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Badges - Greyed out inactive, personalized brand color on hover */}
                <div className="space-y-2 border-t border-border/40 dark:border-white/5 pt-3">
                  <a
                    href="mailto:raileymitchellcapitis@gmail.com"
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border/50 dark:border-white/5 bg-background/50 dark:bg-black/20 hover:border-rose-500/40 hover:bg-rose-500/5 transition-all duration-300 group/link"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-muted/40 dark:bg-white/[0.04] flex items-center justify-center border border-border/50 dark:border-white/5 text-muted-foreground/60 group-hover/link:bg-rose-500/15 group-hover/link:border-rose-500/40 group-hover/link:text-rose-500 dark:group-hover/link:text-rose-400 transition-all duration-300 shrink-0">
                        <Mail className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0 ml-0.5">
                        <span className="text-[11px] font-bold text-foreground group-hover/link:text-rose-400 leading-tight transition-colors">Email</span>
                        <span className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 group-hover/link:text-foreground transition-colors truncate max-w-[165px] min-[360px]:max-w-[210px] sm:max-w-none">
                          raileymitchellcapitis@gmail.com
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover/link:text-rose-400 group-hover/link:translate-x-0.5 transition-all shrink-0 ml-1 sm:ml-2" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/michiruri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border/50 dark:border-white/5 bg-background/50 dark:bg-black/20 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 group/link"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-muted/40 dark:bg-white/[0.04] flex items-center justify-center border border-border/50 dark:border-white/5 text-muted-foreground/60 group-hover/link:bg-blue-500/15 group-hover/link:border-blue-500/40 group-hover/link:text-blue-500 dark:group-hover/link:text-blue-400 transition-all duration-300 shrink-0">
                        <LinkedinIcon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0 ml-0.5">
                        <span className="text-[11px] font-bold text-foreground group-hover/link:text-blue-400 leading-tight transition-colors">LinkedIn</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5 group-hover/link:text-foreground transition-colors truncate max-w-[165px] min-[360px]:max-w-[210px] sm:max-w-none">linkedin.com/in/michiruri</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover/link:text-blue-400 group-hover/link:translate-x-0.5 transition-all shrink-0 ml-1 sm:ml-2" />
                  </a>

                  <a
                    href="https://github.com/michiruri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border/50 dark:border-white/5 bg-background/50 dark:bg-black/20 hover:border-white/30 hover:bg-white/5 transition-all duration-300 group/link"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-muted/40 dark:bg-white/[0.04] flex items-center justify-center border border-border/50 dark:border-white/5 text-muted-foreground/60 group-hover/link:bg-white/15 group-hover/link:border-white/40 group-hover/link:text-zinc-200 dark:group-hover/link:text-white transition-all duration-300 shrink-0">
                        <GithubIcon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0 ml-0.5">
                        <span className="text-[11px] font-bold text-foreground group-hover/link:text-white leading-tight transition-colors">GitHub</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5 group-hover/link:text-foreground transition-colors truncate max-w-[165px] min-[360px]:max-w-[210px] sm:max-w-none">github.com/michiruri</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover/link:text-white group-hover/link:translate-x-0.5 transition-all shrink-0 ml-1 sm:ml-2" />
                  </a>

                  <a
                    href="https://x.com/michiruri_dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border/50 dark:border-white/5 bg-background/50 dark:bg-black/20 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all duration-300 group/link"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-muted/40 dark:bg-white/[0.04] flex items-center justify-center border border-border/50 dark:border-white/5 text-muted-foreground/60 group-hover/link:bg-sky-500/15 group-hover/link:border-sky-500/40 group-hover/link:text-sky-500 dark:group-hover/link:text-sky-400 transition-all duration-300 shrink-0">
                        <XIcon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0 ml-0.5">
                        <span className="text-[11px] font-bold text-foreground group-hover/link:text-sky-400 leading-tight transition-colors">X (Twitter)</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5 group-hover/link:text-foreground transition-colors truncate max-w-[165px] min-[360px]:max-w-[210px] sm:max-w-none">x.com/michiruri_dev</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover/link:text-sky-400 group-hover/link:translate-x-0.5 transition-all shrink-0 ml-1 sm:ml-2" />
                  </a>

                  <a
                    href="https://ko-fi.com/michiruri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border/50 dark:border-white/5 bg-background/50 dark:bg-black/20 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-300 group/link"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-muted/40 dark:bg-white/[0.04] flex items-center justify-center border border-border/50 dark:border-white/5 text-muted-foreground/60 group-hover/link:bg-amber-500/15 group-hover/link:border-amber-500/40 group-hover/link:text-amber-500 dark:group-hover/link:text-amber-400 transition-all duration-300 shrink-0">
                        <KofiIcon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0 ml-0.5">
                        <span className="text-[11px] font-bold text-foreground group-hover/link:text-amber-400 leading-tight transition-colors">Support on Ko-fi</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5 group-hover/link:text-foreground transition-colors truncate max-w-[165px] min-[360px]:max-w-[210px] sm:max-w-none">ko-fi.com/michiruri</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover/link:text-amber-400 group-hover/link:translate-x-0.5 transition-all shrink-0 ml-1 sm:ml-2" />
                  </a>
                </div>
              </div>

              {/* Right Column: Shorter, Cleaner Form (col-span-6) */}
              <div className={`md:col-span-6 p-4 sm:p-5 transition-colors duration-300 ${isLight ? "bg-orange-500/[0.02]" : "bg-black/5 dark:bg-black/10"} flex flex-col justify-between gap-4`}>
                {status !== "sent" ? (
                  <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between gap-4">
                    
                    <div className="flex flex-col gap-3">
                      <div>
                        <h3 className="text-sm font-extrabold text-foreground tracking-tight leading-tight">Send a Message</h3>
                        <p className="text-xs text-muted-foreground font-semibold mt-1 leading-relaxed">
                          For project proposals, engineering opportunities, or contract work.
                        </p>
                      </div>

                      {/* Inputs Wrapper */}
                      <div className="space-y-3 border-t border-border/40 dark:border-white/5 pt-3">
                        <div>
                          <label htmlFor="name" className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-1.5 select-none">
                            <User className="h-3.5 w-3.5 text-primary shrink-0" />
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            disabled={status === "sending"}
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Your name or organization"
                            className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border/60 dark:border-white/5 bg-background/80 dark:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground/45 disabled:opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-1.5 select-none">
                            <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
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
                            className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border/60 dark:border-white/5 bg-background/80 dark:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground/45 disabled:opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-1.5 select-none">
                            <MessageSquare className="h-3.5 w-3.5 text-primary shrink-0" />
                            Your Message
                          </label>
                          <textarea
                            id="message"
                            required
                            disabled={status === "sending"}
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            rows={3}
                            placeholder="Describe your project, role, or inquiry..."
                            className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-border/60 dark:border-white/5 bg-background/80 dark:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/45 disabled:opacity-50 h-24"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full gap-2 py-2 h-9 font-bold text-xs bg-primary text-primary-foreground hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer relative overflow-hidden shrink-0 mt-1"
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
                  <div className="flex flex-col items-center justify-center text-center p-4 space-y-4 h-full min-h-[300px] animate-fade-up">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.15)] animate-pulse">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <h3 className="text-xs font-black tracking-widest uppercase text-green-400">
                        Message Sent!
                      </h3>
                      <p className="text-[11px] text-muted-foreground max-w-xs font-semibold leading-relaxed">
                        Thanks for reaching out! I have received your message and will get back to you within 24 hours.
                      </p>
                    </div>
                    
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

          {/* Right Column: 3D Flipping Profile & Persona Card (col-span-4) — Matches Contact Card Height */}
          <div className="lg:col-span-4 flex flex-col items-center w-full h-full">
            <div className="w-full max-w-[340px] h-full min-h-[390px] flex flex-col">
              {/* Flip wrapper */}
              <div
                className="flex-1 cursor-pointer select-none relative group/wrapper h-full w-full"
                style={{ perspective: "1000px" }}
                onClick={() => setIsFlipped((prev) => !prev)}
              >
                {/* Static Cosmic Glow behind the card */}
                <div className={`absolute inset-3 rounded-2xl blur-2xl opacity-75 pointer-events-none transition-all duration-500 group-hover/wrapper:scale-105 group-hover/wrapper:opacity-90 ${isLight ? "bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-yellow-500/20" : "bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-purple-600/30 dark:from-purple-500/15 dark:via-indigo-500/10 dark:to-purple-500/15"}`} />

                {/* Inner — rotates on flip, always sized to parent */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d",
                    transition: "transform 0.5s cubic-bezier(0.4,0.2,0.2,1)",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >

                  {/* ── FRONT: Profile Photo ── */}
                  <div
                    className={`rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between relative group/card bg-card border border-border/70 dark:bg-[#07070a] dark:border-white/5 transition-all duration-500 shadow-2xl hover:border-primary/60 dark:hover:border-primary/50 ${isLight ? "hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]" : "hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]"}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      pointerEvents: isFlipped ? "none" : "auto",
                    }}
                  >
                    <div className="relative z-10 flex-1 w-full rounded-xl overflow-hidden flex items-center justify-center bg-black/20">
                      <img
                        src="/profile.png"
                        alt="Railey Mitchell Q. Capitis"
                        className="object-cover w-full h-full pointer-events-none"
                      />
                    </div>
                    
                    <div className="pt-3 flex items-center justify-between text-xs relative z-10">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white/90 tracking-wide uppercase text-[10px] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                          Professional Mode
                        </p>
                        <p className="text-[10px] font-medium text-slate-500 dark:text-white/50 mt-0.5">
                          Click to flip
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 dark:text-white/60 group-hover/card:text-slate-900 dark:group-hover/card:text-white transition-colors px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md">
                        <span className="text-[9px] font-bold uppercase tracking-wider">Flip</span>
                        <RefreshCw className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* ── BACK: Profile Photo (Meme / Humor) ── */}
                  <div
                    className={`rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between relative group/card bg-card border border-border/70 dark:bg-[#07070a] dark:border-white/5 transition-all duration-500 shadow-2xl hover:border-primary/60 dark:hover:border-primary/50 ${isLight ? "hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]" : "hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]"}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      pointerEvents: isFlipped ? "auto" : "none",
                    }}
                  >
                    <div className="relative z-10 flex-1 w-full rounded-xl overflow-hidden flex items-center justify-center bg-black/20">
                      <img
                        key={`${currentGif.url}-${cycleKey}`}
                        src={currentGif.url}
                        alt={`Developer Mode Meme ${currentIndex + 1}`}
                        className="object-cover w-full h-full pointer-events-none select-none transition-opacity duration-300"
                      />
                    </div>
                    
                    <div className="pt-3 flex items-center justify-between text-xs relative z-10">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-800 dark:text-white/90 tracking-wide uppercase text-[10px] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                            Actual Developer Mode
                          </p>
                          {totalGifs > 1 && (
                            <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                              {currentIndex + 1}/{totalGifs}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] font-medium text-slate-500 dark:text-white/50 mt-0.5">
                          Click to return
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 dark:text-white/60 group-hover/card:text-slate-900 dark:group-hover/card:text-white transition-colors px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md">
                        <span className="text-[9px] font-bold uppercase tracking-wider">Return</span>
                        <RefreshCw className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
