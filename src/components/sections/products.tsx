"use client"

import * as React from "react"
import Image from "next/image"
import {
  ExternalLink,
  Wrench,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"
import { useTheme } from "next-themes"
import { studioProducts, type StudioProduct, type ProductPreviewTab } from "@/lib/studio-products"
import { getTagColor } from "@/lib/tag-colors"
import { ProductDossierModal } from "@/components/product-dossier-modal"

export function ProductsSection() {
  const { ref, inView } = useInView()
  const { resolvedTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const isLight = mounted && resolvedTheme === "light"

  const [selectedDossierProduct, setSelectedDossierProduct] = React.useState<StudioProduct | null>(null)
  const [activeScreenIndex, setActiveScreenIndex] = React.useState<number>(0)

  const currentProduct = studioProducts[0]
  const previewTabs = currentProduct.previewTabs || []
  const activeTab: ProductPreviewTab = previewTabs[activeScreenIndex] || previewTabs[0]

  const themeAccentColor = "#E29B9B"
  const themeGlow = "rgba(226, 155, 155, 0.3)"

  const handlePrevScreen = () => {
    setActiveScreenIndex((prev) => (prev > 0 ? prev - 1 : previewTabs.length - 1))
  }

  const handleNextScreen = () => {
    setActiveScreenIndex((prev) => (prev < previewTabs.length - 1 ? prev + 1 : 0))
  }

  return (
    <section id="products" ref={ref} className="snap-section py-20 bg-transparent w-full scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full space-y-10">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Solo Founder &amp; Developer
          </div>
          <h2
            className={`font-heading text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground transition-all duration-700 ${
              inView ? "animate-fade-up delay-100" : "opacity-0"
            }`}
          >
            Featured Product
          </h2>
          <p
            className={`mt-3 text-muted-foreground max-w-2xl mx-auto font-medium text-sm sm:text-base leading-relaxed transition-all duration-700 ${
              inView ? "animate-fade-in delay-200" : "opacity-0"
            }`}
          >
            An independent software platform conceived, engineered, and shipped single-handedly. Just a broke solo developer against the world, crafting every layer from scratch.
          </p>
        </div>

        {/* ─── CINEMATIC PRODUCT SHOWCASE STAGE ─── */}
        <div className="relative w-full rounded-3xl border border-border/80 bg-card/40 dark:bg-[#07070d]/60 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Gravitational Glow Backdrop */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: themeAccentColor }}
          />

          {/* Product Header & Overview Bar */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border/60">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-40">
                  <Image
                    src={isLight ? "/projects/futari/wordmark-light.svg" : "/projects/futari/wordmark-dark.svg"}
                    alt="Futari Wordmark"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0"
                  style={{
                    borderColor: `${themeAccentColor}40`,
                    backgroundColor: `${themeAccentColor}15`,
                    color: themeAccentColor,
                  }}
                >
                  {currentProduct.status}
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-foreground/90">
                {currentProduct.tagline}
              </p>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {currentProduct.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentProduct.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getTagColor(
                      tag
                    )}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side: Status Badge & Action Buttons */}
            <div className="shrink-0 flex flex-col items-start lg:items-end justify-between gap-4 lg:self-stretch">
              <div className="flex flex-col items-start lg:items-end gap-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/70 bg-card/60 backdrop-blur-md text-xs font-mono text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{currentProduct.dossier.domain}</span>
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {currentProduct.orbitBadge}
                </span>
              </div>

              {/* Action Buttons Aligned with Tech Chips */}
              <div className="flex flex-wrap items-center gap-2.5">
                {currentProduct.primaryCta.disabled || !currentProduct.primaryCta.href ? (
                  <Button
                    disabled
                    size="sm"
                    className="gap-1.5 font-bold text-xs h-9 px-4 rounded-xl border border-border/50 bg-muted/40 text-muted-foreground opacity-70 cursor-not-allowed"
                  >
                    <Wrench className="h-3.5 w-3.5" />
                    {currentProduct.primaryCta.label}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="gap-1.5 font-bold text-xs h-9 px-5 rounded-xl border text-white shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                    style={{
                      backgroundColor: themeAccentColor,
                      boxShadow: `0 0 16px ${themeGlow}`,
                    }}
                    render={
                      <a
                        href={currentProduct.primaryCta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    nativeButton={false}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {currentProduct.primaryCta.label}
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedDossierProduct(currentProduct)}
                  className="gap-1.5 font-bold text-xs h-9 px-4 rounded-xl border border-border/70 hover:bg-muted/60 text-foreground cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                  System Blueprint &amp; Specs
                </Button>
              </div>
            </div>
          </div>

          {/* ─── MULTI-SCREEN INTERACTIVE GALLERY VIEWPORT ─── */}
          <div className="space-y-4">
            
            {/* Gallery Navigation Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap">
                {previewTabs.map((tab, idx) => {
                  const isActive = activeScreenIndex === idx
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveScreenIndex(idx)}
                      className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer border shrink-0 ${
                        isActive
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground border-transparent hover:bg-muted/40"
                      }`}
                      style={{
                        borderColor: isActive ? themeAccentColor : undefined,
                      }}
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: isActive ? themeAccentColor : "currentColor",
                            opacity: isActive ? 1 : 0.4,
                          }}
                        />
                        {tab.label}
                        {tab.isPlaceholder && (
                          <span className="text-[8px] sm:text-[9px] uppercase px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-mono">
                            Slot
                          </span>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-muted-foreground shrink-0">
                <span className="font-mono text-[11px]">
                  {activeScreenIndex + 1} / {previewTabs.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevScreen}
                    className="p-1.5 rounded-lg border border-border/60 hover:bg-muted/60 text-foreground cursor-pointer transition-colors"
                    aria-label="Previous screen"
                  >
                    <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextScreen}
                    className="p-1.5 rounded-lg border border-border/60 hover:bg-muted/60 text-foreground cursor-pointer transition-colors"
                    aria-label="Next screen"
                  >
                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Display Screen Frame */}
            <div className="relative rounded-xl sm:rounded-2xl border border-border/80 dark:border-white/10 shadow-2xl bg-card dark:bg-[#07070d] overflow-hidden group">
              
              {/* Simulated Browser Bar — Truly centered domain independent of left/right content */}
              <div className="relative flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-border/60 bg-muted/40 dark:bg-white/[0.03] min-h-[38px] sm:min-h-[42px]">
                {/* Left: Window Traffic Dots */}
                <div className="flex items-center gap-1.5 z-10 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>

                {/* Center: Mathematically Absolute Centered Address Capsule */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center max-w-[55%] pointer-events-none">
                  <div className="px-3 sm:px-4 py-0.5 rounded-md bg-background/80 border border-border/60 text-[10px] sm:text-xs font-mono text-muted-foreground truncate shadow-xs">
                    {currentProduct.dossier.domain}
                  </div>
                </div>

                {/* Right: Screen Tab Label */}
                <div className="text-[10px] sm:text-[11px] text-muted-foreground font-medium z-10 text-right truncate max-w-[32%] ml-auto hidden sm:block">
                  {activeTab.label}
                </div>
              </div>

              {/* Screen Image or High-Fidelity UI Placeholder */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/30 flex items-center justify-center">
                
                {/* Real Screenshot Preview */}
                {!activeTab.isPlaceholder && activeTab.image ? (
                  <Image
                    key={activeTab.image}
                    src={activeTab.image}
                    alt={activeTab.alt || `${currentProduct.name} Preview`}
                    fill
                    className="object-cover object-top transition-all duration-500 animate-fade-in group-hover:scale-[1.01]"
                    sizes="(max-width: 1200px) 100vw, 1100px"
                    priority
                  />
                ) : (
                  /* Stylized Cosmic UI Placeholder for Additional Screens */
                  <div className="relative w-full h-full p-6 sm:p-12 flex flex-col items-center justify-center text-center bg-gradient-to-b from-card/80 to-muted/30 dark:from-[#090812] dark:to-[#05040a]">
                    
                    {/* Background Blueprint Grid Lines */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-x-8 top-8 bottom-8 rounded-xl border border-dashed border-border/60 pointer-events-none" />
                    
                    <div className="relative z-10 max-w-md space-y-3">
                      <div
                        className="mx-auto w-12 h-12 rounded-2xl border flex items-center justify-center shadow-lg"
                        style={{
                          borderColor: `${themeAccentColor}40`,
                          backgroundColor: `${themeAccentColor}15`,
                          color: themeAccentColor,
                        }}
                      >
                        <Eye className="h-6 w-6" />
                      </div>

                      <div className="space-y-1">
                        <span
                          className="text-[11px] font-mono font-bold uppercase tracking-widest block"
                          style={{ color: themeAccentColor }}
                        >
                          Asset Placeholder Slot
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-foreground">
                          {activeTab.label}
                        </h4>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {activeTab.description || "Interactive view screenshot slot ready for update."}
                      </p>

                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono text-muted-foreground bg-muted/60 border border-border/50">
                          Target file: {activeTab.image}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Screen Caption Footer */}
              {activeTab.description && !activeTab.isPlaceholder && (
                <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-card/90 dark:bg-black/60 border-t border-border/50 text-[11px] sm:text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                  <span className="leading-relaxed">{activeTab.description}</span>
                  <span className="text-[10px] sm:text-[11px] font-mono shrink-0 hidden sm:inline text-primary/80 font-semibold">
                    System Walkthrough
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Footer Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground pt-4 border-t border-border/50">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              Deployment Status: {currentProduct.status}
            </span>
            <span className="font-medium text-muted-foreground/80">
              Solo Founder &amp; Developer · Built 100% solo by Railey Mitchell Q. Capitis
            </span>
          </div>
        </div>
      </div>

      {/* System Dossier Modal */}
      <ProductDossierModal
        product={selectedDossierProduct}
        isOpen={!!selectedDossierProduct}
        onClose={() => setSelectedDossierProduct(null)}
      />
    </section>
  )
}
