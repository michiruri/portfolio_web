"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeTransitionOverlay() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "fading-in" | "opaque" | "fading-out">("idle")
  const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark" | null>(null)
  const [targetTheme, setTargetTheme] = React.useState<"light" | "dark">("dark")

  React.useEffect(() => {
    setMounted(true)

    const handleTransition = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetTheme: "light" | "dark" }>
      const nextTheme = customEvent.detail.targetTheme
      const prevTheme = (resolvedTheme === "light" ? "light" : "dark") as "light" | "dark"

      setCurrentTheme(prevTheme)
      setTargetTheme(nextTheme)
      setStatus("fading-in")

      // Step 1: Fade overlay backdrop in matching currentTheme background (500ms)
      setTimeout(() => {
        setStatus("opaque")

        // Step 2: Swap the actual themes underneath (200ms)
        setTimeout(() => {
          setTheme(nextTheme)

          // Step 3: Let page repaint and resolve elements, then fade out (800ms)
          setTimeout(() => {
            setStatus("fading-out")

            // Step 4: Reset state to idle (500ms)
            setTimeout(() => {
              setStatus("idle")
              setCurrentTheme(null)
            }, 500)
          }, 800)
        }, 200)
      }, 500)
    }

    window.addEventListener("trigger-theme-transition", handleTransition)
    return () => window.removeEventListener("trigger-theme-transition", handleTransition)
  }, [setTheme, resolvedTheme])

  if (!mounted || status === "idle" || !currentTheme) return null

  // Determine which background is active based on state
  // During fading-in: show currentTheme. During opaque/fading-out: show targetTheme
  const isDarkBgVisible = status === "fading-in"
    ? currentTheme === "dark"
    : targetTheme === "dark"

  const isLightBgVisible = status === "fading-in"
    ? currentTheme === "light"
    : targetTheme === "light"

  // Determine active visual layout scales and opacities
  const isSunVisible = status === "fading-in"
    ? currentTheme === "light"
    : targetTheme === "light"

  const isBlackHoleVisible = status === "fading-in"
    ? currentTheme === "dark"
    : targetTheme === "dark"

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        status === "fading-in" || status === "opaque"
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* ── 1. BACKGROUND LAYERS (Smooth gradient cross-fade) ── */}
      
      {/* Dark theme background layer */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          background: "radial-gradient(circle at center, #0a0518 0%, #020105 100%)",
          opacity: isDarkBgVisible ? 1 : 0,
        }}
      />

      {/* Light theme background layer (Warm off-white/cream) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          background: "radial-gradient(circle at center, #fffcf8 0%, #f7ecd8 100%)",
          opacity: isLightBgVisible ? 1 : 0,
        }}
      />

      {/* ── 2. CELESTIAL GRAPHICS LAYER (Morphing scale & opacity cross-fade) ── */}

      {/* Theme Transition Animations Keyframes (Fully Isolated) */}
      <style>{`
        @keyframes overlay-spin-3d-cw {
          0% { transform: rotateX(68deg) rotateY(8deg) rotateZ(360deg); }
          50% { transform: rotateX(72deg) rotateY(16deg) rotateZ(180deg); }
          100% { transform: rotateX(68deg) rotateY(8deg) rotateZ(0deg); }
        }
        @keyframes overlay-spin-3d-ccw {
          0% { transform: rotateX(74deg) rotateY(-8deg) rotateZ(0deg); }
          50% { transform: rotateX(70deg) rotateY(-12deg) rotateZ(180deg); }
          100% { transform: rotateX(74deg) rotateY(-8deg) rotateZ(360deg); }
        }
        @keyframes overlay-sun-corona-cw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes overlay-sun-corona-ccw {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes overlay-sun-pulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.04); opacity: 1; }
        }
      `}</style>

      <div className="relative flex flex-col items-center gap-8 z-10">
        
        {/* Core object canvas container */}
        <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
          
          {/* A. THE SUN VISUAL (Morphing Layer) */}
          <div
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: isSunVisible ? 1 : 0,
              transform: isSunVisible ? "scale(1.02)" : "scale(0.82)",
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 35px rgba(249,115,22,0.25))' }}>
              <defs>
                <radialGradient id="overlaySunGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="30%" stopColor="#ffedd5" stopOpacity="0.9" />
                  <stop offset="65%" stopColor="#f97316" stopOpacity="0.5" />
                  <stop offset="85%" stopColor="#ea580c" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
                </radialGradient>
                
                <radialGradient id="overlaySunCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="55%" stopColor="#fef08a" />
                  <stop offset="78%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </radialGradient>

                <linearGradient id="overlaySunRayLong" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#facc15" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="overlaySunRayShort" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ea580c" stopOpacity="0.65" />
                  <stop offset="60%" stopColor="#f97316" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* 1. Outer Slow Rotating Corona (Clockwise) */}
              <g 
                style={{
                  animation: 'overlay-sun-corona-cw 45s linear infinite',
                  transformOrigin: '100px 100px',
                }}
              >
                {Array.from({ length: 12 }).map((_, idx) => {
                  const angle = idx * 30;
                  return (
                    <path
                      key={`overlay-ray-long-${idx}`}
                      d="M 100 8 Q 108 55 100 80 Q 92 55 100 8"
                      fill="url(#overlaySunRayLong)"
                      transform={`rotate(${angle} 100 100)`}
                    />
                  );
                })}
              </g>

              {/* 2. Inner/Middle Counter-Rotating Corona (Counter-Clockwise) */}
              <g 
                style={{
                  animation: 'overlay-sun-corona-ccw 30s linear infinite',
                  transformOrigin: '100px 100px',
                }}
              >
                {Array.from({ length: 12 }).map((_, idx) => {
                  const angle = idx * 30 + 15;
                  return (
                    <path
                      key={`overlay-ray-short-${idx}`}
                      d="M 100 20 Q 106 58 100 82 Q 94 58 100 20"
                      fill="url(#overlaySunRayShort)"
                      transform={`rotate(${angle} 100 100)`}
                    />
                  );
                })}
              </g>

              {/* 3. Sun core glow */}
              <circle cx="100" cy="100" r="52" fill="url(#overlaySunGlow)" />
              
              {/* 4. Main solar disk */}
              <circle 
                cx="100" 
                cy="100" 
                r="30" 
                fill="url(#overlaySunCore)" 
                style={{
                  animation: 'overlay-sun-pulse 4s ease-in-out infinite',
                  transformOrigin: '100px 100px',
                }}
              />
              <circle cx="100" cy="100" r="30.5" fill="none" stroke="#fef08a" strokeWidth="0.8" opacity="0.6" />
            </svg>
          </div>

          {/* B. THE BLACK HOLE VISUAL (Morphing Layer) */}
          <div
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: isBlackHoleVisible ? 1 : 0,
              transform: isBlackHoleVisible ? "scale(1.02)" : "scale(0.82)",
            }}
          >
            {/* 3D Accretion Rings & Core Environment */}
            <div className="absolute inset-0 [perspective:1000px] [transform-style:preserve-3d]">
              {/* Static 2D Core placed at Z=0 in the 3D space */}
              <div 
                className="absolute inset-0 [transform-style:preserve-3d] z-10"
                style={{
                  transform: 'translateZ(0px)',
                }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <radialGradient id="overlaySingularityGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#000000" />
                      <stop offset="60%" stopColor="#000000" />
                      <stop offset="80%" stopColor="#7c3aed" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="100" cy="100" r="39" fill="url(#overlaySingularityGlow)" />
                  <circle cx="100" cy="100" r="29" fill="#000000" />
                  <circle cx="100" cy="100" r="29.5" fill="none" stroke="#d8b4fe" strokeWidth="0.8" opacity="0.4" />
                </svg>
              </div>

              {/* Clockwise Outer Accretion Layer */}
              <div 
                className="absolute inset-0 [transform-style:preserve-3d]"
                style={{
                  animation: 'overlay-spin-3d-cw 12s linear infinite',
                }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="overlayAccretionDisk" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d946ef" stopOpacity="0.75" />
                      <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.6" />
                      <stop offset="65%" stopColor="#06b6d4" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
                    </linearGradient>
                    
                    <linearGradient id="overlayDustRing" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                      <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>

                  {/* Outer disk dust clouds */}
                  <circle cx="100" cy="100" r="88" fill="url(#overlayAccretionDisk)" opacity="0.25" />
                  <circle cx="100" cy="100" r="76" fill="url(#overlayDustRing)" opacity="0.35" />

                  {/* Outer orbiting dust paths */}
                  <g opacity="0.55" stroke="#f59e0b" strokeWidth="0.5" fill="none">
                    <circle cx="100" cy="100" r="92" strokeDasharray="6,24,10,18" />
                    <circle cx="100" cy="100" r="82" strokeDasharray="4,15,3,12" />
                  </g>

                  {/* Orbiting Debris / Solar Sparks */}
                  <g fill="#1e0b36" stroke="#4c1d95" strokeWidth="0.5" opacity="0.85">
                    <path d="M42 100 l3-1.5 l1 2.5 l-3 1 z" />
                    <path d="M158 100 l2.5-1 l0.5 2 l-2 1.5 z" />
                    <path d="M100 42 l3.5-1 l0.5 3 l-3 1.5 z" />
                    <path d="M100 158 l2-2 l1.5 1.5 l-3 2 z" />
                    <path d="M60 60 l1.5-1.5 l1.5 1.5 l-1.5 2.5 z" />
                    <path d="M140 140 l2.5-1 l1 2 l-3.5 1 z" />
                  </g>
                </svg>
              </div>

              {/* Counter-Clockwise Inner Accretion Layer */}
              <div 
                className="absolute inset-0 [transform-style:preserve-3d]"
                style={{
                  animation: 'overlay-spin-3d-ccw 5s linear infinite',
                }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="overlayAccretionDiskInner" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d946ef" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.75" />
                    </linearGradient>
                  </defs>

                  {/* Inner hot gas ring */}
                  <circle cx="100" cy="100" r="62" fill="none" stroke="url(#overlayAccretionDiskInner)" strokeWidth="4.5" opacity="0.85" />
                  {/* Active core cyan ring */}
                  <circle cx="100" cy="100" r="52" fill="none" stroke="#22d3ee" strokeWidth="2.5" opacity="0.9" strokeDasharray="70,35" />
                </svg>
              </div>
            </div>

            {/* 4-Pointed Celestial Star Flare */}
            <div className="absolute top-[37%] left-[33%] w-10 h-10 pointer-events-none select-none animate-pulse z-20">
              <svg viewBox="0 0 24 24" className="w-full h-full text-cyan-200">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" fill="currentColor" />
              </svg>
            </div>
          </div>

        </div>

        {/* Text transition status updates */}
        <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase opacity-60 animate-pulse select-none">
          {targetTheme === "light"
            ? (status === "fading-in" ? "Capturing Singularity Core..." : "Expanding Solar Corona...")
            : (status === "fading-in" ? "Fading Solar Grid..." : "Opening Void Singularity...")}
        </div>
      </div>
    </div>
  )
}
