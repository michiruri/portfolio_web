"use client"

import * as React from "react"
import { X, Image as ImageIcon, Camera } from "lucide-react"

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(false)

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
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!shouldRender) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-[#020205]/75 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className={`absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-purple-500/5 hover:bg-purple-500/15 border border-purple-500/20 hover:border-purple-500/50 flex items-center justify-center text-purple-300 hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-500 ease-out ${
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
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-600 to-amber-500 bg-clip-text text-transparent tracking-widest uppercase mb-4 flex items-center justify-center gap-4">
              <span className="text-purple-400/40">HIDDEN</span> COLLECTION
            </h2>
            <p className="text-purple-200/50 text-sm sm:text-base max-w-lg mx-auto font-medium">
              A private glimpse into my traditional arts, digital illustrations, and photography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
            {/* Artworks */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]">
                  <ImageIcon className="w-4 h-4 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Artworks</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 1, aspect: "aspect-[3/4]" },
                  { id: 2, aspect: "aspect-square" },
                  { id: 3, aspect: "aspect-square" },
                  { id: 4, aspect: "aspect-[4/3]" },
                ].map((item) => (
                  <div 
                    key={item.id} 
                    className={`bg-[#07070a]/40 border border-purple-500/15 rounded-2xl flex items-center justify-center group relative overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/[0.02] hover:shadow-[0_0_18px_rgba(168,85,247,0.15)] ${item.aspect}`}
                  >
                    <span className="text-[10px] font-bold tracking-widest uppercase text-purple-300/40 group-hover:text-purple-200/90 transition-colors z-10">Artwork {item.id}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-purple-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>

            {/* Photography */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                  <Camera className="w-4 h-4 text-cyan-300" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Photography</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 1, aspect: "aspect-[16/9]" },
                  { id: 2, aspect: "aspect-[3/2]" },
                  { id: 3, aspect: "aspect-[21/9]" },
                ].map((item) => (
                  <div 
                    key={item.id} 
                    className={`bg-[#07070a]/40 border border-cyan-500/15 rounded-2xl flex items-center justify-center group relative overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/[0.02] hover:shadow-[0_0_18px_rgba(6,182,212,0.15)] ${item.aspect}`}
                  >
                    <span className="text-[10px] font-bold tracking-widest uppercase text-purple-300/40 group-hover:text-purple-200/90 transition-colors z-10">Photo {item.id}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-purple-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
