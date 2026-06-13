"use client"

import * as React from "react"
import { X, Image as ImageIcon, Camera, Gamepad2 } from "lucide-react"
import { useTheme } from "next-themes"

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [zoomedItem, setZoomedItem] = React.useState<{ title: string; category: string; aspect: string } | null>(null)
  const { resolvedTheme } = useTheme()
  const isLight = mounted && resolvedTheme === "light"

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Handle open/close animation states and delays
  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      const timer = setTimeout(() => setIsAnimating(true), 20)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setShouldRender(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Prevent body scrolling when open
  React.useEffect(() => {
    if (shouldRender) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [shouldRender])

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomedItem) {
          setZoomedItem(null)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose, zoomedItem])

  if (!shouldRender) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out backdrop-blur-md ${
          isLight ? "bg-background/85" : "bg-[#020205]/75"
        } ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className={`absolute top-6 right-6 z-[110] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ease-out hover:scale-105 ${
          isLight 
            ? "bg-orange-500/5 hover:bg-orange-500/15 border border-orange-500/20 hover:border-orange-500/50 text-orange-600 hover:text-orange-950 hover:shadow-[0_0_15px_rgba(249,115,22,0.25)]" 
            : "bg-purple-500/5 hover:bg-purple-500/15 border border-purple-500/20 hover:border-purple-500/50 text-purple-300 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
        } ${
          isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content Container */}
      <div 
        className={`relative z-[105] w-full max-w-6xl h-full max-h-[100dvh] overflow-y-auto px-6 py-20 sm:px-12 scrollbar-hide transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${
          isAnimating 
            ? "opacity-100 [transform:perspective(1000px)_rotateX(0deg)_translateY(0)_scale(1)]" 
            : "opacity-0 [transform:perspective(1000px)_rotateX(15deg)_translateY(40px)_scale(0.97)]"
        }`}
      >
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className={`text-4xl sm:text-5xl font-black bg-clip-text text-transparent tracking-widest uppercase mb-4 flex items-center justify-center gap-4 ${
              isLight ? "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" : "bg-gradient-to-r from-cyan-400 via-purple-600 to-amber-500"
            }`}>
              <span className={isLight ? "text-orange-500/40" : "text-purple-400/40"}>SIDE</span> QUESTS
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto font-semibold leading-relaxed ${
              isLight ? "text-muted-foreground" : "text-purple-200/60"
            }`}>
              A snapshot of my creative side quests — traditional sketch art, digital illustrations, photography, and personal interests that keep my mind active outside of code.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {/* Artworks */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isLight 
                    ? "bg-orange-500/10 border-orange-500/20 text-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.15)]" 
                    : "bg-purple-500/10 border-purple-500/20 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                }`}>
                  <ImageIcon className={`w-4 h-4 ${isLight ? "text-orange-600" : "text-purple-300"}`} />
                </div>
                <h3 className={`text-xl font-bold tracking-tight ${isLight ? "text-foreground" : "text-white"}`}>Artworks</h3>
              </div>
              <p className={`text-xs font-semibold leading-relaxed mb-5 text-justify ${
                isLight ? "text-muted-foreground" : "text-purple-200/50"
              }`}>
                Traditional pencil sketching and digital concepts drafted during offline hours as a visual release.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 1, aspect: "aspect-[3/4]" },
                  { id: 2, aspect: "aspect-square" },
                  { id: 3, aspect: "aspect-square" },
                  { id: 4, aspect: "aspect-[4/3]" },
                ].map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setZoomedItem({ title: `Artwork ${item.id}`, category: "Artworks", aspect: item.aspect })}
                    className={`rounded-2xl flex items-center justify-center group relative overflow-hidden transition-all duration-300 border cursor-pointer ${
                      isLight 
                        ? "bg-orange-500/[0.02] border-orange-500/15 hover:border-orange-500/50 hover:bg-orange-500/[0.04] hover:shadow-[0_0_18px_rgba(249,115,22,0.15)]" 
                        : "bg-[#07070a]/40 border border-purple-500/15 hover:border-purple-500/50 hover:bg-purple-500/[0.02] hover:shadow-[0_0_18px_rgba(168,85,247,0.15)]"
                    } ${item.aspect}`}
                  >
                    <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors z-10 ${
                      isLight ? "text-orange-600/40 group-hover:text-orange-700" : "text-purple-300/40 group-hover:text-purple-200/90"
                    }`}>Artwork {item.id}</span>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      isLight ? "bg-gradient-to-t from-orange-500/10 via-transparent to-transparent" : "bg-gradient-to-t from-purple-950/80 via-purple-950/20 to-transparent"
                    }`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Photography */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isLight 
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.15)]" 
                    : "bg-cyan-500/10 border-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                }`}>
                  <Camera className={`w-4 h-4 ${isLight ? "text-amber-600" : "text-cyan-300"}`} />
                </div>
                <h3 className={`text-xl font-bold tracking-tight ${isLight ? "text-foreground" : "text-white"}`}>Photography</h3>
              </div>
              <p className={`text-xs font-semibold leading-relaxed mb-5 text-justify ${
                isLight ? "text-muted-foreground" : "text-purple-200/50"
              }`}>
                Street snapshots and geometric framing capturing local angles, lines, and lighting.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 1, aspect: "aspect-[16/9]" },
                  { id: 2, aspect: "aspect-[3/2]" },
                  { id: 3, aspect: "aspect-[21/9]" },
                ].map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setZoomedItem({ title: `Photo ${item.id}`, category: "Photography", aspect: item.aspect })}
                    className={`rounded-2xl flex items-center justify-center group relative overflow-hidden transition-all duration-300 border cursor-pointer ${
                      isLight 
                        ? "bg-amber-500/[0.02] border-amber-500/15 hover:border-amber-500/50 hover:bg-amber-500/[0.04] hover:shadow-[0_0_18px_rgba(245,158,11,0.15)]" 
                        : "bg-[#07070a]/40 border border-cyan-500/15 hover:border-cyan-500/50 hover:bg-cyan-500/[0.02] hover:shadow-[0_0_18px_rgba(6,182,212,0.15)]"
                    } ${item.aspect}`}
                  >
                    <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors z-10 ${
                      isLight ? "text-amber-600/40 group-hover:text-amber-700" : "text-purple-300/40 group-hover:text-purple-200/90"
                    }`}>Photo {item.id}</span>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      isLight ? "bg-gradient-to-t from-amber-500/10 via-transparent to-transparent" : "bg-gradient-to-t from-purple-950/80 via-purple-950/20 to-transparent"
                    }`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Gaming & Playgrounds */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isLight 
                    ? "bg-red-500/10 border-red-500/20 text-red-600 shadow-[0_0_10px_rgba(239,68,68,0.15)]" 
                    : "bg-rose-500/10 border-rose-500/20 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.15)]"
                }`}>
                  <Gamepad2 className={`w-4 h-4 ${isLight ? "text-red-600" : "text-rose-300"}`} />
                </div>
                <h3 className={`text-xl font-bold tracking-tight ${isLight ? "text-foreground" : "text-white"}`}>Gaming</h3>
              </div>
              <p className={`text-xs font-semibold leading-relaxed mb-5 text-justify ${
                isLight ? "text-muted-foreground" : "text-purple-200/50"
              }`}>
                A playground for fast decision-making, strategic coordination, reflex execution, and cognitive splits.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 1, name: "Valorant / Competitive FPS", aspect: "aspect-[16/9]" },
                  { id: 2, name: "League of Legends / MOBA Strategy", aspect: "aspect-[16/9]" },
                  { id: 3, name: "Teamfight Tactics / Auto Battler Strategy", aspect: "aspect-[16/9]" },
                ].map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setZoomedItem({ title: item.name, category: "Gaming", aspect: item.aspect })}
                    className={`rounded-2xl flex items-center justify-center group relative overflow-hidden transition-all duration-300 border cursor-pointer ${
                      isLight 
                        ? "bg-red-500/[0.02] border-red-500/15 hover:border-red-500/50 hover:bg-red-500/[0.04] hover:shadow-[0_0_18px_rgba(239,68,68,0.15)]" 
                        : "bg-[#07070a]/40 border border-rose-500/15 hover:border-rose-500/50 hover:bg-rose-500/[0.02] hover:shadow-[0_0_18px_rgba(244,63,94,0.15)]"
                    } ${item.aspect}`}
                  >
                    <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors z-10 text-center px-4 ${
                      isLight ? "text-red-600/40 group-hover:text-red-700" : "text-rose-300/40 group-hover:text-rose-200/90"
                    }`}>{item.name}</span>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      isLight ? "bg-gradient-to-t from-red-500/10 via-transparent to-transparent" : "bg-gradient-to-t from-purple-950/80 via-purple-950/20 to-transparent"
                    }`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Overlay */}
      {zoomedItem && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Zoom Backdrop */}
          <div 
            className="absolute inset-0 bg-[#020205]/95 backdrop-blur-lg transition-opacity duration-300 cursor-pointer"
            onClick={() => setZoomedItem(null)}
          />
          
          {/* Zoom Close Button */}
          <button 
            onClick={() => setZoomedItem(null)}
            className="absolute top-6 right-6 z-[130] w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Zoom Content */}
          <div 
            className="relative z-[125] w-full max-w-4xl max-h-[85vh] flex flex-col items-center justify-center animate-scale-in"
          >
            <div 
              className={`w-full ${zoomedItem.aspect} max-w-3xl rounded-3xl border border-white/10 bg-[#07070a] flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)]`}
            >
              {/* Radial gradient backing matching category */}
              <div className={`absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-tr ${
                zoomedItem.category === "Artworks"
                  ? "from-orange-500/20 to-purple-500/20"
                  : zoomedItem.category === "Photography"
                  ? "from-amber-500/20 to-cyan-500/20"
                  : "from-red-500/20 to-rose-500/20"
              }`} />
              
              <span className={`text-xs sm:text-sm font-bold tracking-widest uppercase text-center px-6 ${
                zoomedItem.category === "Artworks"
                  ? "text-orange-400"
                  : zoomedItem.category === "Photography"
                  ? "text-cyan-400"
                  : "text-rose-400"
              }`}>
                [ {zoomedItem.title} Zoomed Placeholder ]
              </span>
            </div>

            <div className="mt-6 text-center space-y-2">
              <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-white/50">
                {zoomedItem.category}
              </span>
              <h4 className="text-lg font-extrabold text-white">{zoomedItem.title}</h4>
              <p className="text-xs text-white/60 max-w-md font-semibold leading-relaxed text-justify px-4">
                {zoomedItem.category === "Gaming" 
                  ? "Interactive visual simulation of your strategic tactical gameplay environment."
                  : zoomedItem.category === "Photography"
                  ? "High-fidelity resolution exposure capturing spatial lines and depth."
                  : "Draft render conceptualized to explore shapes, character postures, and tone."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
