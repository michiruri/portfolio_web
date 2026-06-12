"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"

export function SectionSeparator() {
  return (
    <div className="w-full flex items-center justify-center my-10 px-4 select-none pointer-events-none">
      <div className="flex items-center justify-center w-full max-w-5xl relative">
        {/* Left Fading Line */}
        <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent dark:via-primary/20" />
        
        {/* Center Jhin-inspired 4-Diamond Motif */}
        <div className="flex items-center gap-2 mx-6 relative">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rotate-45 border border-primary/40 bg-background transition-all duration-700 shadow-[0_0_6px_rgba(139,92,246,0.15)] dark:shadow-[0_0_10px_rgba(139,92,246,0.3)]
                ${i === 1 || i === 4 ? "scale-75 opacity-40 bg-muted-foreground/30" : "scale-100 opacity-90 bg-primary/80 dark:bg-primary"}
              `}
              style={{
                animation: `floatY 3s ease-in-out infinite`,
                animationDelay: `${i * 150}ms`
              }}
            />
          ))}
        </div>

        {/* Right Fading Line */}
        <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent dark:via-primary/20" />
      </div>
    </div>
  )
}
