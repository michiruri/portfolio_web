"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as React from "react"

export default function NotFound() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && resolvedTheme === "light"

  return (
    <div className="flex flex-col items-center justify-center min-h-[90dvh] w-full text-center px-4 relative z-10 select-none">
      {/* Glow Effects */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-50 ${isLight ? "bg-orange-500/10" : "bg-primary/20"}`} />

      {/* 404 Title */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-b border-border/40 pb-6 mb-6">
        <span className={`text-7xl sm:text-8xl font-black tracking-tighter ${isLight ? "bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent" : "bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent"}`}>
          404
        </span>
        <div className="hidden sm:block w-px h-16 bg-border/60" />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground/90">
          This page could not be found.
        </h1>
      </div>

      {/* User's custom line of text */}
      <p className="text-sm sm:text-base text-muted-foreground/85 max-w-md leading-relaxed mb-8 font-medium italic">
        &ldquo;and I just want to show you my cool 404 page design&rdquo;
      </p>

      {/* Action Button */}
      <Button
        size="lg"
        className={`group cursor-pointer gap-2 hover:scale-105 transition-all duration-300 ${isLight ? "hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]" : "hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"} relative overflow-hidden`}
        render={<Link href="/" />}
        nativeButton={false}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <span className="relative z-10 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Safety
        </span>
      </Button>
    </div>
  )
}
