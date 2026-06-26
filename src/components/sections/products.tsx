"use client"

import * as React from "react"
import Image from "next/image"
import { ExternalLink, Headset, Rocket, Users, Wrench } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"
import { useTheme } from "next-themes"
import { studioProducts, STUDIO, type StudioProduct } from "@/lib/studio-products"

const PRODUCT_ICONS = {
  triage: Headset,
  futari: Users,
} as const

function ProductBlock({
  product,
  isLight,
  inView,
  delayClass,
}: {
  product: StudioProduct
  isLight: boolean
  inView: boolean
  delayClass: string
}) {
  const Icon = PRODUCT_ICONS[product.accent]
  const glowColor = product.accent === "triage"
    ? "from-[#8B5CF6]/25 to-[#A855F7]/10"
    : "from-[#E29B9B]/25 to-[#C07D7D]/10"

  const buttonStyle = product.accent === "triage"
    ? "bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] hover:from-[#7C3AED] hover:to-[#9333EA] text-white shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:shadow-[0_0_22px_rgba(139,92,246,0.45)] dark:shadow-[0_0_15px_rgba(139,92,246,0.35)] dark:hover:shadow-[0_0_22px_rgba(139,92,246,0.55)] border-transparent"
    : "bg-gradient-to-r from-[#E29B9B] to-[#C07D7D] hover:from-[#eba2a2] hover:to-[#b56e6e] text-white shadow-[0_0_15px_rgba(226,155,155,0.25)] hover:shadow-[0_0_22px_rgba(226,155,155,0.45)] dark:shadow-[0_0_15px_rgba(192,125,125,0.35)] dark:hover:shadow-[0_0_22px_rgba(192,125,125,0.55)] border-transparent"

  return (
    <div
      id={product.id}
      className={`relative scroll-mt-24 ${inView ? `animate-scale-in ${delayClass}` : "opacity-0"}`}
    >
      <div className={`flex items-center gap-3 mb-6`}>
        {product.id === "futari" ? (
          <div>
            <div className="relative h-12 w-36">
              <Image
                src={isLight ? "/projects/futari-wordmark-light.svg" : "/projects/futari-wordmark-dark.svg"}
                alt="Futari"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <p className="text-xs text-muted-foreground font-semibold mt-1">{product.tagline}</p>
          </div>
        ) : product.id === "triage" ? (
          <div>
            <div className="relative h-12 w-60">
              <Image
                src={isLight ? "/projects/triage-logo-sub-horizontal-dark.svg" : "/projects/triage-logo-sub-horizontal-light.svg"}
                alt="Triage"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <p className="text-xs text-muted-foreground font-semibold mt-1">{product.tagline}</p>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                isLight
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                  : "bg-primary/10 border-primary/20 text-primary shadow-[0_0_10px_rgba(139,92,246,0.15)]"
              }`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight text-foreground leading-none">{product.name}</h3>
              <p className="text-xs text-muted-foreground font-semibold mt-1">{product.tagline}</p>
            </div>
          </div>
        )}
        
        <div className={`flex-1 h-px transition-colors duration-300 ${isLight ? "bg-orange-500/15" : "bg-purple-500/10"}`} />

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center rounded-full text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border bg-muted/80 text-muted-foreground border-border/50 transition-all duration-300">
            {product.segment}
          </span>
          <span
            className={`inline-flex items-center rounded-full text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border transition-all duration-300 ${
              product.accent === "triage"
                ? "bg-primary/10 text-primary border-primary/25"
                : product.accent === "futari"
                ? "bg-[#E29B9B]/10 text-[#E29B9B] border-[#E29B9B]/20"
                : "bg-primary/10 text-primary border-primary/25"
            }`}
          >
            {product.status}
          </span>
        </div>
      </div>

      <div className="relative group/card">
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${glowColor} rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />
        <Card className="relative flex flex-col border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-sm rounded-2xl hover:border-primary/30 transition-all duration-300 group">
          <CardHeader className="pb-2">
            <div
              className={`aspect-[16/9] w-full rounded-xl ${isLight ? "bg-orange-500/5" : "bg-black/40"} border border-border/70 dark:border-white/5 flex items-center justify-center relative overflow-hidden mb-3 group-hover/card:border-primary/35 transition-all`}
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.name} preview`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              ) : (
                <>
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${isLight ? "from-orange-500/10 to-amber-500/10" : "from-primary/5 to-cyan-500/5"} opacity-50 pointer-events-none`}
                  />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground/50 group-hover/card:text-primary/60 transition-colors z-10">
                    {product.name}
                  </span>
                </>
              )}
            </div>

            <CardDescription className="text-xs font-semibold text-muted-foreground leading-relaxed text-justify">
              {product.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2 pb-4">
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>

          <CardFooter className="pt-4 border-t border-border/50 dark:border-white/5 bg-muted/10 rounded-b-2xl">
            {product.primaryCta.disabled ? (
              <Button
                disabled
                className={`w-full gap-1.5 transition-all duration-300 font-bold text-xs py-2 h-9 rounded-xl border opacity-60 cursor-not-allowed ${buttonStyle}`}
              >
                <Wrench className="h-4 w-4" />
                {product.primaryCta.label}
              </Button>
            ) : (
              <Button
                className={`w-full gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer font-bold text-xs py-2 h-9 rounded-xl border ${buttonStyle}`}
                render={
                  <a href={product.primaryCta.href} target="_blank" rel="noopener noreferrer" aria-label={product.primaryCta.label} />
                }
                nativeButton={false}
              >
                <ExternalLink className="h-4 w-4" />
                {product.primaryCta.label}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export function ProductsSection() {
  const { ref, inView } = useInView()
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme } = useTheme()
  const isLight = mounted && resolvedTheme === "light"

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="products" ref={ref} className="snap-section py-20 bg-transparent w-full scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-14">
          <h2
            className={`font-heading text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground ${inView ? "animate-fade-up delay-100" : "opacity-0"}`}
          >
            {STUDIO.displayName}
          </h2>
          <p
            className={`text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mt-3 mb-2 ${inView ? "animate-fade-in delay-150" : "opacity-0"}`}
          >
            Product Studio · Pangasinan, PH
          </p>
          <p
            className={`mt-4 text-muted-foreground max-w-2xl mx-auto font-semibold text-sm leading-relaxed ${inView ? "animate-fade-in delay-200" : "opacity-0"}`}
          >
            {STUDIO.productsIntro}
          </p>
        </div>

        <div className={`flex items-center gap-3 mb-10 ${inView ? "animate-fade-up delay-250" : "opacity-0"}`}>
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                isLight
                  ? "bg-orange-500/10 border-orange-500/20 text-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.15)]"
                  : "bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
              }`}
            >
              <Rocket className="h-4 w-4" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-black tracking-tight text-foreground leading-none">{STUDIO.displayName}</span>
                <span
                  className={`inline-flex items-center rounded-full text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border transition-all duration-300 ${
                    isLight
                      ? "bg-orange-500/10 text-orange-600 border-orange-500/25"
                      : "bg-purple-500/10 text-purple-400 border-purple-500/25"
                  }`}
                >
                  The Products Tier
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-semibold mt-1">In-house SaaS platforms built and operated under my own studio.</p>
            </div>
          </div>
          <div className={`flex-1 h-px transition-colors duration-300 ${isLight ? "bg-orange-500/15" : "bg-purple-500/10"}`} />
        </div>

        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
          {studioProducts.map((product, idx) => (
            <ProductBlock
              key={product.id}
              product={product}
              isLight={isLight}
              inView={inView}
              delayClass={["delay-200", "delay-300"][idx] ?? "delay-300"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
