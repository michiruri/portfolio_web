"use client"

import * as React from "react"
import { ArrowUpRight, User, MapPin, Link2, Activity, Mail, Rocket } from "lucide-react"
import { GithubIcon, LinkedinIcon, XIcon, KofiIcon } from "@/components/icons"
import { useTheme } from "next-themes"
import { FUTARI_URL } from "@/lib/studio-products"
import { GalleryModal } from "@/components/gallery-modal"

export function Footer() {
  const [mounted, setMounted] = React.useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false)
  const { resolvedTheme } = useTheme()
  const isLight = mounted && resolvedTheme === "light"

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <footer className={`relative bg-background/50 text-foreground border-t ${isLight ? "border-orange-500/10" : "border-purple-500/10"} pt-16 pb-8 backdrop-blur-md`}>
        
        {/* Subtle background glow */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] ${isLight ? "bg-orange-500/5" : "bg-purple-500/5"} rounded-full blur-[80px] pointer-events-none`} />

        {/* Top Info Grid */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-[1400px] mx-auto">
          
          {/* Identity & Note */}
          <div className="flex flex-col">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isLight ? "text-orange-600" : "text-primary"} mb-4 flex items-center gap-2`}>
              <User className="w-4 h-4" /> Developer &amp; Founder
            </span>
            <p className="text-[13px] font-medium text-muted-foreground leading-relaxed max-w-sm">
              Solo engineer designing, building, and deploying full-stack web platforms from scratch. Fueled by coffee, curiosity, and the drive to ship real products.
            </p>
            <p className="text-[12px] text-muted-foreground/70 mt-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Urdaneta City, Pangasinan, PH</span>
            </p>
          </div>

          {/* Products & Builds */}
          <div className="flex flex-col">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isLight ? "text-orange-600" : "text-purple-400"} mb-4 flex items-center gap-2`}>
              <Rocket className="w-4 h-4" /> Products &amp; Work
            </span>
            <div className="flex flex-col gap-2.5">
              <a href={FUTARI_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-[#E29B9B] transition-colors w-fit">
                Futari <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground/60 group-hover:text-[#E29B9B]" />
              </a>
              <a href="https://some-typing-game.web.app" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-amber-400 transition-colors w-fit">
                Some Typing Game <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground/60 group-hover:text-amber-400" />
              </a>
            </div>
          </div>

          {/* Connect & Social */}
          <div className="flex flex-col">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isLight ? "text-orange-600" : "text-indigo-400"} mb-4 flex items-center gap-2`}>
              <Link2 className="w-4 h-4" /> Connect
            </span>
            <div className="flex flex-col gap-2.5">
              <a href="https://github.com/michiruri" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-white transition-colors w-fit">
                <GithubIcon className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-white transition-colors" /> GitHub <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground/60 group-hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/in/michiruri" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-[#0A66C2] dark:hover:text-[#38bdf8] transition-colors w-fit">
                <LinkedinIcon className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-[#0A66C2] dark:group-hover:text-[#38bdf8] transition-colors" /> LinkedIn <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground/60 group-hover:text-[#0A66C2] dark:group-hover:text-[#38bdf8]" />
              </a>
              <a href="https://x.com/michiruri_dev" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-sky-400 transition-colors w-fit">
                <XIcon className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-sky-400 transition-colors" /> X (Twitter) <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground/60 group-hover:text-sky-400" />
              </a>
              <a href="https://ko-fi.com/michiruri" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-amber-400 transition-colors w-fit">
                <KofiIcon className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-amber-400 transition-colors" /> Ko-fi (Fuel the grind) <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground/60 group-hover:text-amber-400" />
              </a>
            </div>
          </div>

          {/* Status & Focus */}
          <div className="flex flex-col">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isLight ? "text-orange-600" : "text-emerald-400"} mb-4 flex items-center gap-2`}>
              <Activity className="w-4 h-4" /> Status &amp; Focus
            </span>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 leading-none mb-1">
                    Availability
                  </span>
                  <p className="text-[12px] font-semibold text-emerald-500/90 leading-snug">
                    Open for remote roles &amp; contracts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 leading-none mb-1">
                    Current Focus
                  </span>
                  <p className="text-[12px] font-semibold text-purple-400/90 leading-snug">
                    Wrapping up Futari pre-launch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-border/40 max-w-[1400px] mx-auto">
          <p className="text-[11px] font-medium text-muted-foreground/70 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-extrabold text-white">
              Railey Mitchell Q. Capitis
            </span>
            {" · All Rai-ghts Reserved"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-6 text-[11px] font-semibold tracking-wider text-muted-foreground/70">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-primary transition-colors cursor-pointer">Home</button>
            <button onClick={() => scrollTo("products")} className="hover:text-primary transition-colors cursor-pointer">Products</button>
            <button onClick={() => scrollTo("projects")} className="hover:text-primary transition-colors cursor-pointer">Work</button>
            <button onClick={() => scrollTo("skills")} className="hover:text-primary transition-colors cursor-pointer">Skills</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors cursor-pointer">Contact</button>
            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Side Quests
            </button>
            <a href="/404" className="font-mono text-[11px] text-muted-foreground/50 hover:text-purple-400 active:text-purple-300 transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] px-1 py-0.5" title="Secret">???</a>
          </div>
        </div>
      </footer>

      {/* Side Quests Modal */}
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
    </>
  )
}
