"use client"

import * as React from "react"
import { X, ExternalLink, Layers, Cpu, ShieldCheck, Globe, Terminal, Orbit } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import type { StudioProduct } from "@/lib/studio-products"
import { getTagColor } from "@/lib/tag-colors"

interface ProductDossierModalProps {
  product: StudioProduct | null
  isOpen: boolean
  onClose: () => void
}

export function ProductDossierModal({ product, isOpen, onClose }: ProductDossierModalProps) {
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && resolvedTheme === "light"

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      const timer = setTimeout(() => setIsAnimating(true), 20)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

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

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!shouldRender || !product) return null

  const accentColor = "#E29B9B"
  const accentGlow = "rgba(226, 155, 155, 0.25)"

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ${
        isAnimating ? "bg-black/80 backdrop-blur-md opacity-100" : "bg-black/0 backdrop-blur-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border/80 bg-card dark:bg-[#090812] shadow-2xl transition-all duration-300 flex flex-col ${
          isAnimating ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
        style={{
          boxShadow: `0 0 50px ${accentGlow}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border/60 bg-card/90 dark:bg-[#090812]/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4">
          <div className="flex items-center gap-3">
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
              style={{
                borderColor: `${accentColor}40`,
                backgroundColor: `${accentColor}15`,
                color: accentColor,
              }}
            >
              {product.orbitBadge}
            </span>
            <span className="text-xs text-muted-foreground font-semibold hidden sm:inline">
              Architecture &amp; System Specifications
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
            aria-label="Close dossier modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {/* Identity & Status Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/50">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {product.name}
                </h2>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border"
                  style={{
                    borderColor: `${accentColor}40`,
                    backgroundColor: `${accentColor}10`,
                    color: accentColor,
                  }}
                >
                  {product.status}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                  {product.segment}
                </span>
              </div>
              <p className="text-sm font-semibold text-muted-foreground">
                {product.tagline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 shrink-0">
              {product.primaryCta.href && (
                <Button
                  size="sm"
                  className="font-bold text-xs gap-1.5 cursor-pointer text-white"
                  style={{
                    backgroundColor: accentColor,
                  }}
                  render={
                    <a href={product.primaryCta.href} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {product.primaryCta.label}
                </Button>
              )}
              {product.secondaryCta && (
                <Button
                  size="sm"
                  variant="outline"
                  className="font-bold text-xs gap-1.5 cursor-pointer border-border/70"
                  render={
                    <a href={product.secondaryCta.href} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                >
                  <Globe className="h-3.5 w-3.5" />
                  {product.secondaryCta.label}
                </Button>
              )}
            </div>
          </div>

          {/* Overview & Architecture Blueprint */}
          <div className="space-y-3 pb-2">
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
              {product.dossier.headline}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
              {product.dossier.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${getTagColor(
                    tag
                  )}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Architectural Pillars */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4" style={{ color: accentColor }} />
              <h4 className="text-xs font-black uppercase tracking-widest text-foreground">
                How It&apos;s Built · Architectural Pillars &amp; Engineering
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {product.dossier.pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-border/60 bg-muted/20 dark:bg-white/[0.02] space-y-1.5 transition-all hover:border-border"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span>{pillar.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Handlers, Security & Engines */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" style={{ color: accentColor }} />
              <h4 className="text-xs font-black uppercase tracking-widest text-foreground">
                Key Handlers, Security Rules &amp; Real-Time Subsystems
              </h4>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/15 dark:bg-[#0c0a18] p-4 sm:p-5">
              <ul className="space-y-2.5">
                {product.dossier.handlersAndEngines.map((handler, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 font-medium">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span>{handler}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Domain & Deployment Footer */}
          <div className="pt-4 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground">Target Domain:</span> {product.dossier.domain}
            </div>
            <div>
              <span className="font-semibold text-foreground">Status:</span> {product.dossier.domainStatus}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
