"use client"

import * as React from "react"
import { ArrowUpRight, User, MapPin, Link2, Activity, Mail, Rocket } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { GalleryModal } from "@/components/gallery-modal"
import { useTheme } from "next-themes"
import { STUDIO, TRIAGE_URL, FUTARI_URL } from "@/lib/studio-products"

export function Footer() {
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
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
        <div className="relative z-10 w-full px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 max-w-[1600px] mx-auto">
          
          {/* Bio Node */}
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? "text-orange-600" : "text-blue-400"} mb-6 flex items-center gap-2`}>
              <User className="w-4 h-4" /> Profile
            </span>
            <p className="text-[14px] font-medium text-muted-foreground leading-relaxed max-w-xs">
              I design, build, and ship multi-tenant SaaS on Firebase, Next.js, and Vertex AI — from B2B support tools to consumer apps, without enterprise bloat.
            </p>
          </div>

          {/* Location Node */}
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? "text-orange-600" : "text-rose-400"} mb-6 flex items-center gap-2`}>
              <MapPin className="w-4 h-4" /> Location
            </span>
            <p className="text-[14px] font-medium text-muted-foreground leading-relaxed flex items-start gap-2">
              <MapPin className={`w-4 h-4 mt-0.5 ${isLight ? "text-muted-foreground/50" : "text-white/40"} shrink-0`} />
              <span>
                Urdaneta City<br/>
                Pangasinan, Philippines
              </span>
            </p>
          </div>

          {/* Connect Node */}
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? "text-orange-600" : "text-indigo-400"} mb-6 flex items-center gap-2`}>
              <Link2 className="w-4 h-4" /> Connect
            </span>
            <div className="flex flex-col gap-3">
              <a href="https://github.com/michiruri" target="_blank" rel="noopener noreferrer" className={`group flex items-center gap-2 text-[14px] font-medium text-muted-foreground ${isLight ? "hover:text-primary" : "hover:text-cyan-300"} transition-colors w-fit`}>
                <GithubIcon className={`w-4 h-4 ${isLight ? "text-muted-foreground/50" : "text-white/40"} ${isLight ? "group-hover:text-primary" : "group-hover:text-cyan-300"} transition-colors`} /> GitHub <ArrowUpRight className={`w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${isLight ? "text-muted-foreground/60 group-hover:text-primary" : "text-white/50 group-hover:text-cyan-300"}`} />
              </a>
              <a href="https://www.linkedin.com/in/michiruri" target="_blank" rel="noopener noreferrer" className={`group flex items-center gap-2 text-[14px] font-medium text-muted-foreground ${isLight ? "hover:text-primary" : "hover:text-purple-300"} transition-colors w-fit`}>
                <LinkedinIcon className={`w-4 h-4 ${isLight ? "text-muted-foreground/50" : "text-white/40"} ${isLight ? "group-hover:text-primary" : "group-hover:text-purple-300"} transition-colors`} /> LinkedIn <ArrowUpRight className={`w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${isLight ? "text-muted-foreground/60 group-hover:text-primary" : "text-white/50 group-hover:text-purple-300"}`} />
              </a>
              <a href="mailto:raileymitchellcapitis@gmail.com" className={`group flex items-center gap-2 text-[14px] font-medium text-muted-foreground ${isLight ? "hover:text-primary" : "hover:text-pink-300"} transition-colors w-fit`}>
                <Mail className={`w-4 h-4 ${isLight ? "text-muted-foreground/50" : "text-white/40"} ${isLight ? "group-hover:text-primary" : "group-hover:text-pink-300"} transition-colors`} /> Email <ArrowUpRight className={`w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${isLight ? "text-muted-foreground/60 group-hover:text-primary" : "text-white/50 group-hover:text-pink-300"}`} />
              </a>
            </div>
          </div>

          {/* Products Node */}
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? "text-orange-600" : "text-purple-400"} mb-6 flex items-center gap-2`}>
              <Rocket className="w-4 h-4" /> Products
            </span>
            <div className="flex flex-col gap-3">
              <a href={TRIAGE_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[14px] font-medium text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-fit">
                Triage <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all text-muted-foreground/60 dark:text-white/50" />
              </a>
              <span className="group flex items-center gap-2 text-[14px] font-medium text-muted-foreground/40 cursor-not-allowed w-fit" title="In Development">
                Futari (In Dev)
              </span>
            </div>
          </div>

          {/* Availability Node */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Status
            </span>
            <div className="flex items-start gap-4">
              <div className="relative mt-1 flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              </div>
              <p className="text-[13px] font-semibold text-emerald-400/90 leading-snug">
                Looking for Triage Co-Dev Partners.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 mt-16 max-w-[1600px] mx-auto">
          <p className="text-[11px] font-medium tracking-wide text-muted-foreground/60">
            © {new Date().getFullYear()}{" "}
            <a
              href={TRIAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors font-bold tracking-wider"
            >
              {STUDIO.displayName}
            </a>
          </p>
          <div className="flex items-center gap-8 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground/60">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`hover:text-primary ${isLight ? "" : "dark:hover:text-purple-300"} transition-colors cursor-pointer`}>Home</button>
            <button onClick={() => scrollTo("products")} className={`hover:text-primary ${isLight ? "" : "dark:hover:text-purple-300"} transition-colors cursor-pointer`}>Products</button>
            <button onClick={() => scrollTo("projects")} className={`hover:text-primary ${isLight ? "" : "dark:hover:text-purple-300"} transition-colors cursor-pointer`}>Work</button>
            <button onClick={() => setIsGalleryOpen(true)} className={`hover:text-primary ${isLight ? "" : "dark:hover:text-pink-400"} transition-colors flex items-center gap-1 group cursor-pointer`}>
              Side Quests
            </button>
            <a href="/404" className={`hover:text-primary ${isLight ? "" : "dark:hover:text-pink-400"} transition-colors flex items-center gap-1 group cursor-pointer`}>
              ???
            </a>
          </div>
        </div>
      </footer>

      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
    </>
  )
}
