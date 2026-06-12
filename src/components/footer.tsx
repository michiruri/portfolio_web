"use client"

import * as React from "react"
import { ArrowUpRight, User, MapPin, Link2, Activity, Mail, EyeOff } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { GalleryModal } from "@/components/gallery-modal"

export function Footer() {
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <footer className="relative bg-background/50 text-white border-t border-purple-500/10 pt-16 pb-8 backdrop-blur-md">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Top Info Grid */}
        <div className="relative z-10 w-full px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-[1600px] mx-auto">
          
          {/* Bio Node */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2">
              <User className="w-4 h-4" /> Profile
            </span>
            <p className="text-[14px] font-medium text-white/70 leading-relaxed max-w-xs">
              Full-stack by nature, custom-built by choice — efficient, personalized, and straight to the point.
            </p>
          </div>

          {/* Location Node */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Location
            </span>
            <p className="text-[14px] font-medium text-white/70 leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-white/40 shrink-0" />
              <span>
                Urdaneta City<br/>
                Pangasinan, Philippines
              </span>
            </p>
          </div>

          {/* Socials Node */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
              <Link2 className="w-4 h-4" /> Connect
            </span>
            <div className="flex flex-col gap-3">
              <a href="https://github.com/michiruri" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[14px] font-medium text-white/70 hover:text-cyan-300 transition-colors w-fit">
                <GithubIcon className="w-4 h-4 text-white/40 group-hover:text-cyan-300 transition-colors" /> GitHub <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white/50" />
              </a>
              <a href="https://www.linkedin.com/in/michiruri" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[14px] font-medium text-white/70 hover:text-purple-300 transition-colors w-fit">
                <LinkedinIcon className="w-4 h-4 text-white/40 group-hover:text-purple-300 transition-colors" /> LinkedIn <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white/50" />
              </a>
              <a href="mailto:raileymitchellcapitis@gmail.com" className="group flex items-center gap-2 text-[14px] font-medium text-white/70 hover:text-pink-300 transition-colors w-fit">
                <Mail className="w-4 h-4 text-white/40 group-hover:text-pink-300 transition-colors" /> Email <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white/50" />
              </a>
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
                Open to remote roles<br/>& opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 mt-16 max-w-[1600px] mx-auto">
          <p className="text-[11px] font-medium tracking-wide text-white/40">
            © {new Date().getFullYear()} RAILEY MITCHELL Q. CAPITIS
          </p>
          <div className="flex items-center gap-8 text-[10px] font-black tracking-[0.2em] uppercase text-white/40">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-purple-300 transition-colors cursor-pointer">Home</button>
            <button onClick={() => scrollTo("projects")} className="hover:text-purple-300 transition-colors cursor-pointer">Projects</button>
            <button onClick={() => setIsGalleryOpen(true)} className="hover:text-pink-400 transition-colors flex items-center gap-1 group cursor-pointer">
              <EyeOff className="w-3 h-3 group-hover:animate-pulse" /> ???
            </button>
          </div>
        </div>
      </footer>

      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
    </>
  )
}
