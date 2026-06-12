"use client"

import * as React from "react"
import { X, Image as ImageIcon, Camera } from "lucide-react"

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
  // Prevent body scrolling when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity duration-500 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-105 transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content Container */}
      <div className="relative z-[105] w-full max-w-6xl h-full max-h-[100dvh] overflow-y-auto px-6 py-20 sm:px-12 scrollbar-hide animate-in slide-in-from-bottom-8 duration-700 ease-out">
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-widest uppercase mb-4 opacity-80 flex items-center justify-center gap-4">
              <span className="text-white/40">HIDDEN</span> COLLECTION
            </h2>
            <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto font-medium">
              A private glimpse into my traditional arts, digital illustrations, and photography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
            {/* Artworks */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <ImageIcon className="w-4 h-4 text-white" />
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
                    className={`bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group relative overflow-hidden transition-all hover:border-white/30 ${item.aspect}`}
                  >
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/30 group-hover:text-white/80 transition-colors z-10">Artwork {item.id}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Photography */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Photography</h3>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { id: 1, aspect: "aspect-[16/9]" },
                  { id: 2, aspect: "aspect-[3/2]" },
                  { id: 3, aspect: "aspect-[21/9]" },
                ].map((item) => (
                  <div 
                    key={item.id} 
                    className={`bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group relative overflow-hidden transition-all hover:border-white/30 ${item.aspect}`}
                  >
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/30 group-hover:text-white/80 transition-colors z-10">Photo {item.id}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
