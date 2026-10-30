"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Download, Eye, Sparkles, Check, RefreshCw, Layers, ShieldCheck, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import { XIcon, LinkedinIcon } from "@/components/icons"

type BannerPreset = {
  id: string
  name: string
  platform: string
  width: number
  height: number
  avatarPosition?: { x: number; y: number; r: number } // for Twitter or LinkedIn avatar preview overlay
}

const PRESETS: BannerPreset[] = [
  {
    id: "twitter",
    name: "X / Twitter Header",
    platform: "Twitter",
    width: 1500,
    height: 500,
    // Twitter avatar is ~200px diameter on bottom-left, overlapping bottom banner edge
    avatarPosition: { x: 190, y: 500, r: 125 },
  },
  {
    id: "linkedin",
    name: "LinkedIn Background",
    platform: "LinkedIn",
    width: 1584,
    height: 396,
    avatarPosition: { x: 180, y: 396, r: 110 },
  },
  {
    id: "standard",
    name: "Universal Banner (3:1)",
    platform: "Universal",
    width: 1500,
    height: 500,
  },
]

type BannerTheme = "cosmic-purple" | "cyber-cyan" | "solar-amber"

function drawCanvasIcon(
  ctx: CanvasRenderingContext2D,
  type: "mail" | "x" | "github" | "linkedin" | "kofi",
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.save()
  ctx.translate(x, y)
  const scale = size / 24
  ctx.scale(scale, scale)
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = 2
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  if (type === "mail") {
    ctx.beginPath()
    ctx.roundRect(2, 4, 20, 16, 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(2, 7)
    ctx.lineTo(12, 13.5)
    ctx.lineTo(22, 7)
    ctx.stroke()
  } else if (type === "x") {
    ctx.fill(
      new Path2D(
        "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      )
    )
  } else if (type === "github") {
    ctx.stroke(
      new Path2D(
        "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      )
    )
    ctx.stroke(new Path2D("M9 18c-4.51 2-5-2-7-2"))
  } else if (type === "linkedin") {
    ctx.stroke(
      new Path2D(
        "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      )
    )
    ctx.beginPath()
    ctx.rect(2, 9, 4, 12)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(4, 4, 2, 0, Math.PI * 2)
    ctx.fill()
  } else if (type === "kofi") {
    ctx.stroke(new Path2D("M17 8h1a4 4 0 1 1 0 8h-1"))
    ctx.stroke(new Path2D("M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"))
    ctx.fill(
      new Path2D(
        "M10 12.2a1.2 1.2 0 0 0-1.7-1.7 1.2 1.2 0 0 0 0 1.7L10 13.9l1.7-1.7a1.2 1.2 0 0 0 0-1.7 1.2 1.2 0 0 0-1.7 0Z"
      )
    )
  }

  ctx.restore()
}

export default function HeaderStudioPage() {
  const [selectedPreset, setSelectedPreset] = React.useState<BannerPreset>(PRESETS[0])
  const [theme, setTheme] = React.useState<BannerTheme>("cosmic-purple")
  const [showAvatarGuide, setShowAvatarGuide] = React.useState(true)
  const [showTagline, setShowTagline] = React.useState(true)
  const [showHandles, setShowHandles] = React.useState(true)
  const [showTechPills, setShowTechPills] = React.useState(true)
  const [isExporting, setIsExporting] = React.useState(false)
  const [downloadSuccess, setDownloadSuccess] = React.useState(false)
  const [exportScale, setExportScale] = React.useState<1 | 2>(1)

  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  // Draw the banner to canvas whenever configuration changes
  const renderBanner = React.useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = selectedPreset.width
    const H = selectedPreset.height
    canvas.width = W
    canvas.height = H

    const scaleFactor = Math.min(1, H / 500)
    const s = scaleFactor

    // ── 1. VOID SPACE BACKGROUND & 24PX SUBTLE GRID (EXACT LIVE PORTFOLIO) ──
    // Deep void space violet from :root.dark: oklch(0.06 0.025 282) ≈ #06050b
    ctx.fillStyle = "#06050b"
    ctx.fillRect(0, 0, W, H)

    // 24px subtle grid lines matching .dark .bg-grid-subtle
    ctx.strokeStyle = "rgba(255, 255, 255, 0.025)"
    ctx.lineWidth = 1
    for (let x = 0; x < W; x += 24) {
      ctx.beginPath()
      ctx.moveTo(x + 0.5, 0)
      ctx.lineTo(x + 0.5, H)
      ctx.stroke()
    }
    for (let y = 0; y < H; y += 24) {
      ctx.beginPath()
      ctx.moveTo(0, y + 0.5)
      ctx.lineTo(W, y + 0.5)
      ctx.stroke()
    }

    // ── 2. COSMIC NEBULAS (FROM COSMIC-BACKGROUND.TSX) ──
    // Top-left purple nebula orb
    const bgGlowLeft = ctx.createRadialGradient(W * 0.12, H * 0.35, 20, W * 0.12, H * 0.35, W * 0.35)
    bgGlowLeft.addColorStop(0, "rgba(168, 85, 247, 0.16)")
    bgGlowLeft.addColorStop(0.5, "rgba(124, 58, 237, 0.08)")
    bgGlowLeft.addColorStop(1, "rgba(6, 5, 11, 0)")
    ctx.fillStyle = bgGlowLeft
    ctx.fillRect(0, 0, W, H)

    // Right side cyan/indigo nebula behind Black Hole
    const blackHoleX = Math.round(W * 0.78)
    const blackHoleY = Math.round(H * 0.35)
    const bgGlowRight = ctx.createRadialGradient(blackHoleX, blackHoleY, 20, blackHoleX, blackHoleY, W * 0.35)
    bgGlowRight.addColorStop(0, "rgba(6, 182, 212, 0.14)")
    bgGlowRight.addColorStop(0.45, "rgba(139, 92, 246, 0.12)")
    bgGlowRight.addColorStop(1, "rgba(6, 5, 11, 0)")
    ctx.fillStyle = bgGlowRight
    ctx.fillRect(0, 0, W, H)

    // Lower magenta accent nebula
    const bgGlowLower = ctx.createRadialGradient(W * 0.3, H * 0.9, 10, W * 0.3, H * 0.9, W * 0.3)
    bgGlowLower.addColorStop(0, "rgba(236, 72, 153, 0.08)")
    bgGlowLower.addColorStop(1, "rgba(6, 5, 11, 0)")
    ctx.fillStyle = bgGlowLower
    ctx.fillRect(0, 0, W, H)

    // ── 3. CELESTIAL STARFIELD & CURVING DUST TRAIL (EXACT LIVE PORTFOLIO) ──
    // High-quality deterministic Mulberry32 PRNG eliminates all periodic lattice / vertical column artifacts on any resolution
    const createPRNG = (seed: number) => {
      let st = seed >>> 0
      return () => {
        st = (st + 0x6d2b79f5) | 0
        let t = Math.imul(st ^ (st >>> 15), 1 | st)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
      }
    }

    // 3a. Dense 350 twinkling stars uniformly scattered across the canvas (white, amber, violet, cyan)
    const starRng = createPRNG(1337)
    for (let i = 0; i < 350; i++) {
      const sx = starRng() * W
      const sy = starRng() * H
      const rRand = starRng()
      const radius = (rRand > 0.94 ? 2.3 : rRand > 0.68 ? 1.4 : 0.8) * s
      const alpha = 0.25 + starRng() * 0.7

      ctx.beginPath()
      ctx.arc(sx, sy, radius, 0, Math.PI * 2)
      const colRand = starRng()
      if (colRand > 0.88) {
        ctx.fillStyle = `rgba(253, 230, 138, ${alpha})` // amber-200
      } else if (colRand > 0.72) {
        ctx.fillStyle = `rgba(216, 180, 254, ${alpha})` // purple-300
      } else if (colRand > 0.58) {
        ctx.fillStyle = `rgba(165, 243, 252, ${alpha})` // cyan-200
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      }
      ctx.fill()

      // Soft glow for larger stars
      if (radius > 1.7 * s) {
        ctx.beginPath()
        ctx.arc(sx, sy, radius * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)"
        ctx.fill()
      }
    }

    // 3b. Natural celestial stardust stream drifting near the Black Hole with organic scatter
    const dustRng = createPRNG(4242)
    for (let i = 0; i < 48; i++) {
      const t = i / 47
      const ty = t * H + (dustRng() - 0.5) * 35 * s
      const tx = (blackHoleX - 60 * s) + Math.sin(t * Math.PI * 1.5) * (60 * s) + (dustRng() - 0.5) * (70 * s)
      const sizeVal = dustRng()
      const size = (sizeVal > 0.82 ? 2.4 : sizeVal > 0.45 ? 1.5 : 0.9) * s
      const isCyan = dustRng() > 0.45
      const col = isCyan ? "rgba(34, 211, 238, 0.65)" : "rgba(168, 85, 247, 0.65)"
      const glowCol = isCyan ? "rgba(34, 211, 238, 0.22)" : "rgba(168, 85, 247, 0.22)"

      ctx.beginPath()
      ctx.arc(tx, ty, size, 0, Math.PI * 2)
      ctx.fillStyle = col
      ctx.fill()

      if (size > 1.4 * s) {
        ctx.beginPath()
        ctx.arc(tx, ty, size * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = glowCol
        ctx.fill()
      }
    }

    // ── 4. DETAILED ARTISTIC 3D BLACK HOLE (EXACT PORTFOLIO GEOMETRY) ──
    const bhRadius = Math.round(75 * s) // radius of central event horizon
    const bhScale = bhRadius / 29 // scales the 200x200 viewBox from cosmic-background.tsx
    const diskX = 88 * bhScale
    const diskY = 32 * bhScale // ~0.36 ratio matching rotateX(68deg) rotateY(8deg)
    const tiltAngle = -18 * Math.PI / 180

    // Shared accretion disk gradients matching cosmic-background.tsx
    const gradDisk1 = ctx.createLinearGradient(-diskX, -diskY, diskX, diskY)
    gradDisk1.addColorStop(0, "rgba(217, 70, 239, 0.75)") // #d946ef
    gradDisk1.addColorStop(0.25, "rgba(139, 92, 246, 0.6)") // #8b5cf6
    gradDisk1.addColorStop(0.65, "rgba(6, 182, 212, 0.55)") // #06b6d4
    gradDisk1.addColorStop(1, "rgba(245, 158, 11, 0.7)") // #f59e0b

    const gradDisk2 = ctx.createLinearGradient(diskX, -diskY, -diskX, diskY)
    gradDisk2.addColorStop(0, "rgba(6, 182, 212, 0.5)") // #06b6d4
    gradDisk2.addColorStop(0.5, "rgba(168, 85, 247, 0.4)") // #a855f7
    gradDisk2.addColorStop(1, "rgba(244, 63, 94, 0.5)") // #f43f5e

    const gradInner = ctx.createLinearGradient(-diskX * 0.7, 0, diskX * 0.7, 0)
    gradInner.addColorStop(0, "rgba(217, 70, 239, 0.8)")
    gradInner.addColorStop(0.5, "rgba(139, 92, 246, 0.7)")
    gradInner.addColorStop(1, "rgba(6, 182, 212, 0.75)")

    // ── 4a. BACK HALF OF ACCRETION DISK (BEHIND SINGULARITY) ──
    ctx.save()
    ctx.translate(blackHoleX, blackHoleY)
    ctx.rotate(tiltAngle)

    // Clip to upper half (y <= 0)
    ctx.save()
    ctx.beginPath()
    ctx.rect(-diskX * 2, -diskY * 3, diskX * 4, diskY * 3)
    ctx.clip()

    // Outer disk clouds
    ctx.beginPath()
    ctx.ellipse(0, 0, diskX, diskY, 0, 0, Math.PI * 2)
    ctx.fillStyle = gradDisk1
    ctx.globalAlpha = 0.25
    ctx.fill()

    ctx.beginPath()
    ctx.ellipse(0, 0, 76 * bhScale, 27.5 * bhScale, 0, 0, Math.PI * 2)
    ctx.fillStyle = gradDisk2
    ctx.globalAlpha = 0.35
    ctx.fill()

    // Outer dashed dust paths
    ctx.globalAlpha = 0.55
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 1 * s
    ctx.setLineDash([6 * s, 24 * s, 10 * s, 18 * s])
    ctx.beginPath()
    ctx.ellipse(0, 0, 92 * bhScale, 33.5 * bhScale, 0, 0, Math.PI * 2)
    ctx.stroke()

    ctx.setLineDash([4 * s, 15 * s, 3 * s, 12 * s])
    ctx.beginPath()
    ctx.ellipse(0, 0, 82 * bhScale, 29.8 * bhScale, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Upper inner hot gas ring (strokeWidth = 4.5 in SVG)
    ctx.globalAlpha = 0.85
    ctx.strokeStyle = gradInner
    ctx.lineWidth = 4.5 * bhScale
    ctx.beginPath()
    ctx.ellipse(0, 0, 62 * bhScale, 22.5 * bhScale, 0, 0, Math.PI * 2)
    ctx.stroke()

    // Upper active cyan core ring (strokeWidth = 2.5 in SVG, dashed 70,35)
    ctx.globalAlpha = 0.9
    ctx.strokeStyle = "#22d3ee"
    ctx.lineWidth = 2.5 * bhScale
    ctx.setLineDash([70 * s * 0.4, 35 * s * 0.4])
    ctx.beginPath()
    ctx.ellipse(0, 0, 52 * bhScale, 18.8 * bhScale, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Upper orbiting dark debris
    ctx.globalAlpha = 0.85
    ctx.fillStyle = "#1e0b36"
    ctx.strokeStyle = "#4c1d95"
    ctx.lineWidth = 0.6 * s
    const backDebris = [
      [-65 * bhScale, -14 * bhScale, 5 * s, 2.5 * s],
      [58 * bhScale, -12 * bhScale, 4 * s, 2 * s],
      [0, -28 * bhScale, 6 * s, 2.5 * s],
      [-38 * bhScale, -22 * bhScale, 3.5 * s, 2 * s],
      [36 * bhScale, -21 * bhScale, 4.5 * s, 2.2 * s],
    ]
    backDebris.forEach(([dx, dy, dw, dh]) => {
      ctx.beginPath()
      ctx.ellipse(dx, dy, dw, dh, 0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    })

    ctx.restore() // End upper half clip
    ctx.restore() // End back half rotation

    // ── 4b. CENTRAL EVENT HORIZON & SINGULARITY (EXACT 2D CIRCLE) ──
    ctx.save()
    ctx.translate(blackHoleX, blackHoleY)

    // Singularity atmospheric halo: r=39 in 200x200 viewBox
    const haloRadius = 39 * bhScale
    const singGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, haloRadius)
    singGlow.addColorStop(0, "#000000")
    singGlow.addColorStop(0.6, "#000000")
    singGlow.addColorStop(0.8, "rgba(124, 58, 237, 0.45)") // #7c3aed
    singGlow.addColorStop(1, "rgba(6, 182, 212, 0)") // #06b6d4
    ctx.fillStyle = singGlow
    ctx.beginPath()
    ctx.arc(0, 0, haloRadius, 0, Math.PI * 2)
    ctx.fill()

    // Pure black event horizon core: r=29 in 200x200 viewBox
    ctx.fillStyle = "#000000"
    ctx.beginPath()
    ctx.arc(0, 0, bhRadius, 0, Math.PI * 2)
    ctx.fill()

    // Delicate luminous purple rim stroke: r=29.5, stroke="#d8b4fe" opacity="0.4"
    ctx.strokeStyle = "#d8b4fe"
    ctx.lineWidth = 0.8 * bhScale
    ctx.globalAlpha = 0.4
    ctx.beginPath()
    ctx.arc(0, 0, 29.5 * bhScale, 0, Math.PI * 2)
    ctx.stroke()
    ctx.globalAlpha = 1

    // 4-Pointed Celestial Star Flare (exact path at top:37%, left:33%)
    const flareX = (66 - 100) * bhScale
    const flareY = (74 - 100) * bhScale
    const flareSize = 22 * s

    // Ambient cyan glow behind star
    const flareGlow = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, flareSize * 1.4)
    flareGlow.addColorStop(0, "rgba(207, 250, 254, 0.9)")
    flareGlow.addColorStop(0.4, "rgba(34, 211, 238, 0.4)")
    flareGlow.addColorStop(1, "rgba(34, 211, 238, 0)")
    ctx.fillStyle = flareGlow
    ctx.beginPath()
    ctx.arc(flareX, flareY, flareSize * 1.4, 0, Math.PI * 2)
    ctx.fill()

    // Exact 4-pointed celestial star diamond: M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z
    ctx.save()
    ctx.translate(flareX, flareY)
    const fScale = flareSize / 24
    ctx.scale(fScale, fScale)
    ctx.fillStyle = "#cffafe"
    ctx.beginPath()
    ctx.moveTo(0, -12)
    ctx.lineTo(2.5, -2.5)
    ctx.lineTo(12, 0)
    ctx.lineTo(2.5, 2.5)
    ctx.lineTo(0, 12)
    ctx.lineTo(-2.5, 2.5)
    ctx.lineTo(-12, 0)
    ctx.lineTo(-2.5, -2.5)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    ctx.restore() // End singularity coordinate space

    // ── 4c. FRONT HALF OF ACCRETION DISK (SWEEPS ACROSS THE FRONT OF SPHERE) ──
    ctx.save()
    ctx.translate(blackHoleX, blackHoleY)
    ctx.rotate(tiltAngle)

    // Clip to lower half (y >= 0 in rotated coords)
    ctx.save()
    ctx.beginPath()
    ctx.rect(-diskX * 2, 0, diskX * 4, diskY * 3)
    ctx.clip()

    // Front outer disk clouds
    ctx.beginPath()
    ctx.ellipse(0, 0, diskX, diskY, 0, 0, Math.PI * 2)
    ctx.fillStyle = gradDisk1
    ctx.globalAlpha = 0.28
    ctx.fill()

    ctx.beginPath()
    ctx.ellipse(0, 0, 76 * bhScale, 27.5 * bhScale, 0, 0, Math.PI * 2)
    ctx.fillStyle = gradDisk2
    ctx.globalAlpha = 0.38
    ctx.fill()

    // Front dashed dust paths
    ctx.globalAlpha = 0.6
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 1 * s
    ctx.setLineDash([6 * s, 24 * s, 10 * s, 18 * s])
    ctx.beginPath()
    ctx.ellipse(0, 0, 92 * bhScale, 33.5 * bhScale, 0, 0, Math.PI * 2)
    ctx.stroke()

    ctx.setLineDash([4 * s, 15 * s, 3 * s, 12 * s])
    ctx.beginPath()
    ctx.ellipse(0, 0, 82 * bhScale, 29.8 * bhScale, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Front inner hot gas ring (crosses across lower half of black sphere!)
    ctx.globalAlpha = 0.9
    ctx.strokeStyle = gradInner
    ctx.lineWidth = 4.8 * bhScale
    ctx.beginPath()
    ctx.ellipse(0, 0, 62 * bhScale, 22.5 * bhScale, 0, 0, Math.PI * 2)
    ctx.stroke()

    // Front active cyan core ring
    ctx.globalAlpha = 0.95
    ctx.strokeStyle = "#22d3ee"
    ctx.lineWidth = 2.8 * bhScale
    ctx.setLineDash([70 * s * 0.4, 35 * s * 0.4])
    ctx.beginPath()
    ctx.ellipse(0, 0, 52 * bhScale, 18.8 * bhScale, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Front orbiting dark debris
    ctx.globalAlpha = 0.9
    ctx.fillStyle = "#1e0b36"
    ctx.strokeStyle = "#4c1d95"
    ctx.lineWidth = 0.6 * s
    const frontDebris = [
      [-55 * bhScale, 18 * bhScale, 5 * s, 2.5 * s],
      [48 * bhScale, 16 * bhScale, 4.5 * s, 2.2 * s],
      [0, 26 * bhScale, 6 * s, 2.5 * s],
      [-25 * bhScale, 23 * bhScale, 4 * s, 2 * s],
      [28 * bhScale, 22 * bhScale, 4 * s, 2 * s],
    ]
    frontDebris.forEach(([dx, dy, dw, dh]) => {
      ctx.beginPath()
      ctx.ellipse(dx, dy, dw, dh, -0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    })

    ctx.restore() // End front half clip
    ctx.restore() // End front half rotation

    // ── 5. BRAND TYPOGRAPHY & IDENTITY (MATCHING HERO PORTFOLIO) ──
    const leftMargin = Math.round(W * 0.065)

    // 5a. "HI, I'M" (uppercase, primary purple tracking)
    const hiY = Math.round(58 * s)
    ctx.font = `800 ${Math.round(14 * s)}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
    ctx.fillStyle = theme === "cyber-cyan" ? "#38bdf8" : theme === "solar-amber" ? "#f59e0b" : "#a855f7"
    ctx.fillText("HI, I'M", leftMargin, hiY)

    // 5b. Main Name Line 1: Railey Mitchell (pure white)
    const nameY1 = hiY + Math.round(50 * s)
    ctx.font = `900 ${Math.round(52 * s)}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
    ctx.fillStyle = "#ffffff"
    ctx.fillText("Railey Mitchell", leftMargin, nameY1)

    // 5c. Main Name Line 2: Quimson Capitis (vibrant purple gradient)
    const nameY2 = nameY1 + Math.round(52 * s)
    const nameGrad = ctx.createLinearGradient(leftMargin, nameY2 - 40 * s, leftMargin + 480 * s, nameY2)
    if (theme === "cyber-cyan") {
      nameGrad.addColorStop(0, "#22d3ee")
      nameGrad.addColorStop(0.5, "#38bdf8")
      nameGrad.addColorStop(1, "#818cf8")
    } else if (theme === "solar-amber") {
      nameGrad.addColorStop(0, "#fbbf24")
      nameGrad.addColorStop(0.5, "#f59e0b")
      nameGrad.addColorStop(1, "#f97316")
    } else {
      nameGrad.addColorStop(0, "#a855f7")
      nameGrad.addColorStop(0.5, "#8b5cf6")
      nameGrad.addColorStop(1, "#6366f1")
    }
    ctx.fillStyle = nameGrad
    ctx.fillText("Quimson Capitis", leftMargin, nameY2)

    // 5d. SOLO INDIE DEVELOPER (Clean Static Crisp White with wide tracking)
    const titleY = nameY2 + Math.round(26 * s)
    ctx.font = `800 ${Math.round(13 * s)}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
    ctx.letterSpacing = `${Math.round(2.6 * s)}px`
    ctx.fillStyle = theme === "cyber-cyan" ? "#38bdf8" : theme === "solar-amber" ? "#f59e0b" : "#FFFFFF"
    ctx.fillText("SOLO INDIE DEVELOPER", leftMargin, titleY)
    ctx.letterSpacing = "0px"

    // 5e. Tagline (2-line layout matching portfolio hero)
    if (showTagline) {
      const taglineY1 = titleY + Math.round(27 * s)
      const taglineY2 = taglineY1 + Math.round(20 * s)
      ctx.font = `600 ${Math.round(13.5 * s)}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
      ctx.fillStyle = "rgba(203, 213, 225, 0.85)"
      ctx.fillText("Solo engineer designing, building, and deploying full-stack web platforms from scratch.", leftMargin, taglineY1)
      ctx.fillText("Fueled by coffee, curiosity, and the drive to ship real products.", leftMargin, taglineY2)
    }

    // ── 6. BOTTOM-RIGHT ANCHORED SOCIAL LINKS & SKILL CHIPS ──
    // Moving handles and skill chips to the bottom-right guarantees they NEVER collide with
    // the user's circular profile avatar on Twitter/X or LinkedIn (which always occupies bottom-left).
    const isLinkedIn = selectedPreset.id === "linkedin"
    // Adaptive readability floor: ensure text and pills are bold, distinct, and crisp on 4:1 panoramas (LinkedIn)
    const textScale = isLinkedIn ? 1.16 : Math.max(0.96, s)

    const rightMargin = isLinkedIn ? Math.round(W * 0.045) : Math.round(W * 0.055)
    const rightEdge = W - rightMargin

    // Calculate vertical metrics from bottom upwards
    const bottomMargin = isLinkedIn ? Math.round(20 * s) : Math.round(28 * s)
    const chipHeight = Math.round(24 * textScale)
    const chipGap = Math.round(7.5 * s)
    const pillHeight = Math.round(27 * textScale)
    const pillGap = Math.round(8.5 * s)
    const rowGap = Math.round(7.5 * s)
    const sectionGap = Math.round(11 * s)
    const iconSize = Math.round(14 * textScale)
    const linkFontSize = Math.round(12 * textScale)
    const chipFontSize = Math.round(11 * textScale)

    let bottomCursor = H - bottomMargin

    let totalChipsWidth = 0

    // 6a. Skill Chips (Rendered as the bottom baseline in bottom-right)
    if (showTechPills) {
      const chipRowY = bottomCursor
      const skillChips = [
        { label: "Svelte 5",        text: "#fb923c", border: "rgba(249, 115, 22, 0.65)", bg: "rgba(249, 115, 22, 0.22)" },
        { label: "TypeScript",      text: "#60a5fa", border: "rgba(59, 130, 246, 0.65)", bg: "rgba(59, 130, 246, 0.22)" },
        { label: "React & Next.js", text: "#818cf8", border: "rgba(99, 102, 241, 0.65)", bg: "rgba(99, 102, 241, 0.22)" },
        { label: "Firebase & GCP",  text: "#fbbf24", border: "rgba(245, 158, 11, 0.65)", bg: "rgba(245, 158, 11, 0.22)" },
        { label: "TOPCIT Level 3",  text: "#f87171", border: "rgba(239, 68, 68, 0.65)", bg: "rgba(239, 68, 68, 0.22)" },
        { label: "CS Eligible",     text: "#fb7185", border: "rgba(244, 63, 94, 0.65)", bg: "rgba(244, 63, 94, 0.22)" },
      ]

      ctx.font = `700 ${chipFontSize}px system-ui, -apple-system, sans-serif`
      const measuredChips = skillChips.map((chip) => {
        const textWidth = ctx.measureText(chip.label).width
        const chipWidth = textWidth + Math.round(18 * textScale)
        return { ...chip, chipWidth }
      })
      totalChipsWidth =
        measuredChips.reduce((sum, c) => sum + c.chipWidth, 0) +
        (measuredChips.length - 1) * chipGap

      let curChipX = rightEdge - totalChipsWidth
      measuredChips.forEach((chip) => {
        ctx.fillStyle = chip.bg
        ctx.strokeStyle = chip.border
        ctx.lineWidth = 1.3
        ctx.beginPath()
        ctx.roundRect(curChipX, chipRowY - chipHeight * 0.72, chip.chipWidth, chipHeight, Math.round(chipHeight / 2))
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = chip.text
        ctx.fillText(chip.label, curChipX + Math.round(9 * textScale), chipRowY)

        curChipX += chip.chipWidth + chipGap
      })

      bottomCursor -= (chipHeight + sectionGap)
    }

    // 6b. Social Links & Email (2 on Row 1, 3 on Row 2 — Upright Pyramid Layout in bottom-right)
    if (showHandles) {
      const linkRows = [
        [
          { type: "mail" as const, label: "raileymitchellcapitis@gmail.com", color: "#c084fc" },
          { type: "x" as const, label: "x.com/michiruri_dev", color: "#e2e8f0" },
        ],
        [
          { type: "github" as const, label: "github.com/michiruri", color: "#e2e8f0" },
          { type: "linkedin" as const, label: "linkedin.com/in/michiruri", color: "#38bdf8" },
          { type: "kofi" as const, label: "ko-fi.com/michiruri", color: "#fbbf24" },
        ],
      ]

      ctx.font = `700 ${linkFontSize}px system-ui, -apple-system, sans-serif`

      // Measure items in each row
      const measuredRows = linkRows.map((row) => {
        const itemsWithWidth = row.map((item) => {
          const textWidth = ctx.measureText(item.label).width
          const pillWidth = textWidth + iconSize + Math.round(23 * textScale)
          return { ...item, pillWidth }
        })
        const totalRowWidth =
          itemsWithWidth.reduce((sum, it) => sum + it.pillWidth, 0) +
          (itemsWithWidth.length - 1) * pillGap
        return { items: itemsWithWidth, totalRowWidth }
      })

      // Row 2 (3 items) is closer to the bottom (just above skill chips)
      const row2Y = bottomCursor
      const row1Y = row2Y - pillHeight - rowGap

      // Right-aligned pyramid: all rows align flush with rightEdge, creating a clean left-side slope
      const row1StartX = rightEdge - measuredRows[0].totalRowWidth
      const row2StartX = rightEdge - measuredRows[1].totalRowWidth

      const rowStarts = [row1StartX, row2StartX]
      const rowYs = [row1Y, row2Y]

      measuredRows.forEach((row, rowIdx) => {
        let curX = rowStarts[rowIdx]
        const rowY = rowYs[rowIdx]

        row.items.forEach((item) => {
          // Pill background & border with deep void fill and crisp border to resist JPEG compression
          ctx.fillStyle = "rgba(10, 8, 20, 0.85)"
          ctx.strokeStyle = "rgba(255, 255, 255, 0.22)"
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.roundRect(curX, rowY - pillHeight * 0.72, item.pillWidth, pillHeight, Math.round(7 * s))
          ctx.fill()
          ctx.stroke()

          // Vector Logo Icon
          drawCanvasIcon(
            ctx,
            item.type,
            curX + Math.round(9 * textScale),
            rowY - Math.round(13.5 * textScale),
            iconSize,
            item.color
          )

          // Label
          ctx.font = `700 ${linkFontSize}px system-ui, -apple-system, sans-serif`
          ctx.fillStyle = "#ffffff"
          ctx.fillText(item.label, curX + iconSize + Math.round(15 * textScale), rowY)

          curX += item.pillWidth + pillGap
        })
      })
    }

    // ── 5. OPTIONAL AVATAR SAFE-ZONE GUIDE (OVERLAY FOR PREVIEW) ──
    // Note: only drawn on the live preview canvas if showAvatarGuide is true,
    // but skipped when exporting the clean PNG download!
  }, [selectedPreset, theme, showTagline, showHandles, showTechPills])

  // Re-render when options update
  React.useEffect(() => {
    renderBanner()
  }, [renderBanner])

  // Export high resolution clean PNG
  const handleDownload = () => {
    setIsExporting(true)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setIsExporting(false)
      return
    }

    // Export scale: 1x Native (best to bypass LinkedIn compression) or 2x Retina
    const scale = exportScale
    canvas.width = selectedPreset.width * scale
    canvas.height = selectedPreset.height * scale
    ctx.scale(scale, scale)

    // Temporary swap ref to render into export canvas
    const prevCanvas = canvasRef.current
    ;(canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = canvas
    renderBanner()
    ;(canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = prevCanvas

    // Convert to PNG and trigger download
    try {
      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = `railey-mitchell-capitis-${selectedPreset.id}-${scale}x-header.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 3000)
    } catch (e) {
      console.error("Export failed", e)
    } finally {
      setIsExporting(false)
      renderBanner() // re-sync visible preview
    }
  }

  return (
    <div className="min-h-screen bg-[#07070a] text-foreground flex flex-col font-sans selection:bg-primary/30">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a12]/80 backdrop-blur-md px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-white transition-colors px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-black tracking-tight text-white">Social Media Header Studio</span>
              <span className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Secret Page
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Resolution Selector: 1x Native vs 2x Retina */}
            <div className="flex items-center bg-white/[0.04] p-0.5 rounded-xl border border-white/10 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setExportScale(1)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  exportScale === 1
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
                title="Exact resolution under 1MB. Recommended for LinkedIn to prevent automatic lossy JPEG compression."
              >
                1x Native {selectedPreset.id === "linkedin" && "(Sharp for LinkedIn)"}
              </button>
              <button
                type="button"
                onClick={() => setExportScale(2)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  exportScale === 2
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
                title="Double pixel density (Retina HD). Best for X / Twitter & 4K screens."
              >
                2x Retina
              </button>
            </div>

            <Button
              onClick={handleDownload}
              disabled={isExporting}
              className="gap-2 cursor-pointer font-bold text-xs bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6366F1] hover:brightness-110 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] px-4 py-2 rounded-xl transition-all"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  Downloaded {exportScale}x PNG!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Header ({exportScale}x PNG)
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Preset & Customization Toolbar */}
        <div className="bg-[#0c0c16]/90 border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md shadow-2xl">
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-primary" /> Format:
            </span>
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  selectedPreset.id === preset.id
                    ? "bg-primary/20 text-white border-primary/40 shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                    : "bg-white/[0.02] text-muted-foreground border-white/5 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {preset.platform === "Twitter" && <XIcon className="w-3.5 h-3.5" />}
                {preset.platform === "LinkedIn" && <LinkedinIcon className="w-3.5 h-3.5" />}
                {preset.platform === "Universal" && <Laptop className="w-3.5 h-3.5" />}
                <span>{preset.name}</span>
                <span className="text-[10px] font-normal opacity-60">({preset.width}×{preset.height})</span>
              </button>
            ))}
          </div>

          {/* Theme & Toggles */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Color Accent */}
            <div className="flex items-center gap-1.5 border border-white/5 bg-white/[0.02] p-1 rounded-xl">
              <button
                onClick={() => setTheme("cosmic-purple")}
                title="Cosmic Purple"
                className={`w-6 h-6 rounded-lg transition-all cursor-pointer ${
                  theme === "cosmic-purple" ? "ring-2 ring-purple-400 scale-105" : "opacity-60 hover:opacity-100"
                } bg-gradient-to-tr from-purple-600 to-indigo-500`}
              />
              <button
                onClick={() => setTheme("cyber-cyan")}
                title="Cyber Cyan"
                className={`w-6 h-6 rounded-lg transition-all cursor-pointer ${
                  theme === "cyber-cyan" ? "ring-2 ring-cyan-400 scale-105" : "opacity-60 hover:opacity-100"
                } bg-gradient-to-tr from-cyan-500 to-blue-600`}
              />
              <button
                onClick={() => setTheme("solar-amber")}
                title="Solar Amber"
                className={`w-6 h-6 rounded-lg transition-all cursor-pointer ${
                  theme === "solar-amber" ? "ring-2 ring-amber-400 scale-105" : "opacity-60 hover:opacity-100"
                } bg-gradient-to-tr from-amber-500 to-orange-600`}
              />
            </div>

            {/* Avatar Safe Zone Toggle */}
            {selectedPreset.avatarPosition && (
              <button
                onClick={() => setShowAvatarGuide((prev) => !prev)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  showAvatarGuide
                    ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                    : "bg-white/[0.02] text-muted-foreground border-white/5 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Avatar Guide: {showAvatarGuide ? "ON" : "OFF"}</span>
              </button>
            )}

            {/* Tagline Toggle */}
            <button
              onClick={() => setShowTagline((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                showTagline
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-white/[0.02] text-muted-foreground border-white/5 hover:text-white"
              }`}
            >
              Tagline
            </button>

            {/* Links / Handles Toggle */}
            <button
              onClick={() => setShowHandles((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                showHandles
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-white/[0.02] text-muted-foreground border-white/5 hover:text-white"
              }`}
            >
              Links &amp; Socials
            </button>

            {/* Skill Chips Toggle */}
            <button
              onClick={() => setShowTechPills((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                showTechPills
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-white/[0.02] text-muted-foreground border-white/5 hover:text-white"
              }`}
            >
              Skill Chips
            </button>
          </div>
        </div>

        {/* Live Canvas Preview Card */}
        <div className="relative rounded-2xl border border-white/10 bg-[#090910] p-3 sm:p-5 overflow-hidden shadow-2xl flex flex-col items-center">
          <div className="w-full relative overflow-hidden rounded-xl border border-white/5 shadow-2xl bg-black">
            {/* The Actual Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-auto block select-none pointer-events-none"
              style={{
                aspectRatio: `${selectedPreset.width} / ${selectedPreset.height}`,
              }}
            />

            {/* Avatar Safe-Zone Guide Overlay (Visual helper only) */}
            {showAvatarGuide && selectedPreset.avatarPosition && (
              <div
                className="absolute pointer-events-none select-none transition-all flex items-center justify-center border-2 border-dashed border-amber-400/70 bg-amber-500/10 rounded-full"
                style={{
                  left: `${((selectedPreset.avatarPosition.x - selectedPreset.avatarPosition.r) / selectedPreset.width) * 100}%`,
                  top: `${((selectedPreset.avatarPosition.y - selectedPreset.avatarPosition.r) / selectedPreset.height) * 100}%`,
                  width: `${((selectedPreset.avatarPosition.r * 2) / selectedPreset.width) * 100}%`,
                  height: `${((selectedPreset.avatarPosition.r * 2) / selectedPreset.height) * 100}%`,
                }}
              >
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-amber-500/30">
                  Profile Avatar Zone
                </span>
              </div>
            )}
          </div>

          <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full resolution: <strong>{selectedPreset.width} × {selectedPreset.height} px</strong> (Exports at <strong>{selectedPreset.width * 2} × {selectedPreset.height * 2} px Retina HD</strong>).</span>
            </span>
            <span className="text-muted-foreground/60 text-[11px]">
              Note: The dashed profile circle is an overlay guide to verify that your avatar won't cover text; it is automatically excluded from the exported image.
            </span>
          </div>
        </div>

        {/* Feature Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Authentic Portfolio Aesthetic
            </span>
            <p className="text-[11px] text-muted-foreground">
              Directly integrates your signature deep space starfield, vibrant gradients, and celestial flare aesthetics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" /> Cinematic Black Hole
            </span>
            <p className="text-[11px] text-muted-foreground">
              Includes the complete multi-layer accretion disk, gravitational lens aura, and orbiting debris particles on the right.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-amber-400" /> Ready to Upload
            </span>
            <p className="text-[11px] text-muted-foreground">
              Click the Download button to receive a crystal-clear 2x Retina PNG pre-formatted for Twitter/X and LinkedIn.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
