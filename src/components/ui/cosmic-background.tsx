"use client"

import * as React from "react"

export function CosmicBackground() {
  const [mounted, setMounted] = React.useState(false)
  const [stars, setStars] = React.useState<Array<{
    id: number;
    top: string;
    left: string;
    size: number;
    delay: string;
    duration: string;
    driftX: string;
    driftY: string;
  }>>([])
  const [trailStars, setTrailStars] = React.useState<Array<{
    id: string;
    topPx: number;
    rightPx: number;
    size: number;
    glow: boolean;
    color: string;
    glowColor: string;
  }>>([])

  const blackHoleRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setMounted(true)
    
    // Generate 350 background stars
    const generatedStars = Array.from({ length: 350 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.6,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 4 + 3}s`,
      driftX: `${(Math.random() - 0.5) * 15}px`,
      driftY: `${(Math.random() - 0.5) * 15}px`,
    }))
    setStars(generatedStars)

    const getInterpolatedX = (scrollYVal: number, amplitude: number, freshHeight: number) => {
      const sections = ["about", "skills", "experience", "achievements", "projects", "contact"]
      const tops = sections.map((id, idx) => {
        const el = document.getElementById(id)
        return el ? el.offsetTop : idx * freshHeight
      })

      const s = Math.max(0, scrollYVal)
      let k = 0
      for (let i = 0; i < tops.length - 1; i++) {
        if (s >= tops[i] && s < tops[i+1]) {
          k = i
          break
        }
      }
      if (s >= tops[tops.length - 1]) {
        k = tops.length - 2
      }

      const T_k = tops[k]
      const T_kp1 = tops[k+1]
      const diff = T_kp1 - T_k
      const p = diff > 0 ? Math.min(1, Math.max(0, (s - T_k) / diff)) : 0

      // Target position: even index (about, experience, projects) = right (0)
      // Odd index (skills, achievements, contact) = left (-amplitude)
      const targetA = (k % 2 === 0) ? 0 : -amplitude
      const targetB = ((k + 1) % 2 === 0) ? 0 : -amplitude

      const cos_p = (1 - Math.cos(p * Math.PI)) / 2
      return targetA + (targetB - targetA) * cos_p
    }

    const updateDimensions = () => {
      const freshWidth = window.innerWidth
      const freshHeight = window.innerHeight
      const rightOffsetPx = freshWidth > 768 ? freshWidth * 0.06 : freshWidth * 0.02
      const bhWidth = freshWidth > 768 ? 420 : 320
      const amplitude = Math.max(50, freshWidth - rightOffsetPx * 2 - bhWidth)
      const viewportYOffset = freshHeight * 0.15

      // Generate 120 trail stars along the curve down the page
      const totalStars = 120
      const generatedTrail = Array.from({ length: totalStars }).map((_, i) => {
        const verticalPosPx = (i / (totalStars - 1)) * 7500
        const xTranslation = getInterpolatedX(verticalPosPx - viewportYOffset, amplitude, freshHeight)
        const scatterX = (Math.random() - 0.5) * 80
        const scatterY = (Math.random() - 0.5) * 30
        
        return {
          id: `trail-${i}`,
          topPx: verticalPosPx + scatterY,
          rightPx: rightOffsetPx - (xTranslation + scatterX),
          size: Math.random() * 3.5 + 1.2,
          glow: Math.random() > 0.35,
          color: Math.random() > 0.5 
            ? "bg-cyan-400/50 dark:bg-cyan-400/60" 
            : "bg-purple-400/50 dark:bg-purple-400/60",
          glowColor: Math.random() > 0.5 
            ? "rgba(34, 211, 238, 0.6)" 
            : "rgba(168, 85, 247, 0.6)",
        }
      })
      setTrailStars(generatedTrail)
    }

    // Butter-smooth scroll updates using requestAnimationFrame directly on the DOM Ref
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const freshWidth = window.innerWidth
          const freshHeight = window.innerHeight
          const rightOffsetPx = freshWidth > 768 ? freshWidth * 0.06 : freshWidth * 0.02
          const bhWidth = freshWidth > 768 ? 420 : 320
          const amplitude = Math.max(50, freshWidth - rightOffsetPx * 2 - bhWidth)
          
          const x = getInterpolatedX(scrollY, amplitude, freshHeight)

          if (blackHoleRef.current) {
            blackHoleRef.current.style.transform = `translate3d(${x}px, 0px, 0)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    // Initial setup
    updateDimensions()
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateDimensions, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  if (!mounted) return null

  // Server-side / Initial render position (aligns with scrollY = 0)
  const initialWidth = typeof window !== "undefined" ? window.innerWidth : 1200
  const initialAmp = initialWidth > 1024 ? (initialWidth * 0.55) : (initialWidth * 0.3)
  const initialX = 0 // at scrollY = 0, cos(0) = 1, so (1-1)*amp/2 = 0
  const initialY = 15 // cos(0) * 15 = 15

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 w-full min-h-full">
      {/* Dynamic Keyframes for 3D spinning accretion rings */}
      <style>{`
        @keyframes cosmic-spin-3d-cw {
          0% { transform: rotateX(68deg) rotateY(8deg) rotateZ(360deg); }
          50% { transform: rotateX(72deg) rotateY(16deg) rotateZ(180deg); }
          100% { transform: rotateX(68deg) rotateY(8deg) rotateZ(0deg); }
        }
        @keyframes cosmic-spin-3d-ccw {
          0% { transform: rotateX(74deg) rotateY(-8deg) rotateZ(0deg); }
          50% { transform: rotateX(70deg) rotateY(-12deg) rotateZ(180deg); }
          100% { transform: rotateX(74deg) rotateY(-8deg) rotateZ(360deg); }
        }
      `}</style>
      
      {/* ── 1. DENSE TWINKLING & DRIFTING STARS LAYER ── */}
      <div className="absolute inset-0 opacity-50 dark:opacity-85 transition-opacity duration-500">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
              boxShadow: star.size > 2 ? "0 0 6px 1.5px rgba(255, 255, 255, 0.9)" : "none",
              transform: `translate(${star.driftX}, ${star.driftY})`,
            }}
          />
        ))}
      </div>

      {/* ── 2. JHIN THEME NEBULAS ── */}
      <div className="absolute top-[3%] left-[-15%] w-[65vw] h-[65vw] rounded-full bg-purple-600/15 dark:bg-purple-500/20 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '16s' }} />
      <div className="absolute top-[22%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-cyan-500/12 dark:bg-cyan-400/15 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '14s' }} />
      <div className="absolute top-[44%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-pink-500/12 dark:bg-pink-400/15 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '18s' }} />
      <div className="absolute top-[65%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-amber-500/10 dark:bg-purple-500/15 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[80%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-cyan-500/10 dark:bg-indigo-500/15 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '20s' }} />
      <div className="absolute top-[92%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-pink-500/15 dark:bg-purple-500/20 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '15s' }} />

      {/* ── 2.5 DUST TRAIL PATH FOR THE BLACK HOLE (S-Curve Trail) ── */}
      <div className="absolute inset-0 z-0">
        {trailStars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.color} animate-pulse`}
            style={{
              top: `${star.topPx}px`,
              right: `${star.rightPx}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: star.glow ? `0 0 10px 2.5px ${star.glowColor}` : "none",
              animationDuration: `${Math.random() * 3 + 2.5}s`,
            }}
          />
        ))}
      </div>

      {/* ── 3. DETAILED ARTISTIC SVG BLACK HOLE ── */}
      <div 
        ref={blackHoleRef}
        className="fixed top-[15%] right-[2%] md:right-[6%] w-[320px] h-[320px] md:w-[420px] md:h-[420px] pointer-events-none select-none opacity-25 dark:opacity-85 transition-opacity duration-700 z-0"
        style={{
          transform: `translate3d(${initialX}px, ${initialY}px, 0)`,
        }}
      >
        <div className="w-full h-full relative">
          
          {/* 3D Accretion Rings & Core Environment */}
          <div className="absolute inset-0 [perspective:1000px] [transform-style:preserve-3d]">
            
            {/* 3. Static 2D Core placed at Z=0 in the 3D space */}
            <div 
              className="absolute inset-0 [transform-style:preserve-3d] z-10"
              style={{
                transform: 'translateZ(0px)',
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <radialGradient id="singularityGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#000000" />
                    <stop offset="60%" stopColor="#000000" />
                    <stop offset="80%" stopColor="#7c3aed" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </radialGradient>
                </defs>
                
                <circle cx="100" cy="100" r="39" fill="url(#singularityGlow)" />
                <circle cx="100" cy="100" r="29" fill="#000000" />
                <circle cx="100" cy="100" r="29.5" fill="none" stroke="#d8b4fe" strokeWidth="0.8" opacity="0.4" />
              </svg>
            </div>

            {/* Clockwise Outer Accretion Layer */}
            <div 
              className="absolute inset-0 [transform-style:preserve-3d]"
              style={{
                animation: 'cosmic-spin-3d-cw 12s linear infinite',
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="accretionDisk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d946ef" stopOpacity="0.75" />
                    <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    <stop offset="65%" stopColor="#06b6d4" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
                  </linearGradient>
                  
                  <linearGradient id="dustRing" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* Outer disk dust clouds */}
                <circle cx="100" cy="100" r="88" fill="url(#accretionDisk)" opacity="0.25" />
                <circle cx="100" cy="100" r="76" fill="url(#dustRing)" opacity="0.35" />

                {/* Outer orbiting dust paths */}
                <g opacity="0.55" stroke="#f59e0b" strokeWidth="0.5" fill="none">
                  <circle cx="100" cy="100" r="92" strokeDasharray="6,24,10,18" />
                  <circle cx="100" cy="100" r="82" strokeDasharray="4,15,3,12" />
                </g>

                {/* Orbiting Debris / Asteroids from Jhin Splash Art */}
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
                animation: 'cosmic-spin-3d-ccw 5s linear infinite',
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="accretionDiskInner" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d946ef" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.75" />
                  </linearGradient>
                </defs>

                {/* Inner hot gas ring */}
                <circle cx="100" cy="100" r="62" fill="none" stroke="url(#accretionDiskInner)" strokeWidth="4.5" opacity="0.85" />
                {/* Active core cyan ring */}
                <circle cx="100" cy="100" r="52" fill="none" stroke="#22d3ee" strokeWidth="2.5" opacity="0.9" strokeDasharray="70,35" />
              </svg>
            </div>

          </div>

          {/* 4-Pointed Celestial Star Flare (Jhin crown signature highlight) */}
          <div className="absolute top-[37%] left-[33%] w-10 h-10 pointer-events-none select-none animate-pulse z-20">
            <svg viewBox="0 0 24 24" className="w-full h-full text-cyan-200 shadow-cyan-400/50">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" fill="currentColor" />
            </svg>
          </div>

        </div>
      </div>
    </div>
  )
}
