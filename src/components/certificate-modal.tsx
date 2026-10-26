"use client"

import * as React from "react"
import { X, Download, ExternalLink, ShieldCheck, Trophy, Award, FileText, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface CertificateVariant {
  id: string
  label: string
  sublabel?: string
  date: string
  score?: string
  pdfUrl: string
}

export interface CertificateItem {
  id: string
  title: string
  subtitle: string
  issuer: string
  category: "topcit" | "csc" | "other"
  date: string
  levelBadge?: string
  scoreBadge?: string
  refId: string
  pdfUrl: string
  variants?: CertificateVariant[]
}

interface CertificateModalProps {
  certificate: CertificateItem | null
  initialVariantId?: string
  onClose: () => void
}

export function CertificateModal({ certificate, initialVariantId, onClose }: CertificateModalProps) {
  const [activeVariantId, setActiveVariantId] = React.useState<string>("")
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(false)

  // Reset or initialize variant when certificate changes
  React.useEffect(() => {
    if (certificate) {
      setActiveVariantId(initialVariantId || certificate.variants?.[0]?.id || "default")
      setShouldRender(true)
      const timer = setTimeout(() => setIsAnimating(true), 20)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [certificate, initialVariantId])

  // Prevent background scrolling
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

  // ESC to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (!shouldRender || !certificate) return null

  const activeVariant = certificate.variants?.find((v) => v.id === activeVariantId)
  const currentPdfUrl = activeVariant?.pdfUrl || certificate.pdfUrl
  const currentDate = activeVariant?.date || certificate.date
  const currentScore = activeVariant?.score || certificate.scoreBadge

  const CategoryIcon = certificate.category === "topcit" ? Trophy : certificate.category === "csc" ? ShieldCheck : Award
  const accentColor = certificate.category === "topcit" ? "text-red-500" : certificate.category === "csc" ? "text-blue-500" : "text-primary"
  const accentBorder = certificate.category === "topcit" ? "border-red-500/30" : certificate.category === "csc" ? "border-blue-500/30" : "border-primary/30"

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ${
        isAnimating ? "bg-black/85 backdrop-blur-md opacity-100" : "bg-black/0 backdrop-blur-none opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={`relative flex flex-col w-full max-w-5xl h-[92vh] max-h-[900px] bg-[#090910] border ${accentBorder} rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
          isAnimating ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-[#0e0e1a]/80 border-b border-white/5 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${accentColor}`}>
              <CategoryIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-foreground leading-tight tracking-tight">
                  {certificate.title}
                </h3>
                {certificate.levelBadge && (
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white/90 border border-white/10">
                    {certificate.levelBadge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground font-medium">
                {certificate.issuer} · {currentDate}
                {currentScore && <span className="ml-1 text-foreground/80 font-bold">({currentScore})</span>}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 px-3 text-xs font-semibold rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white cursor-pointer"
              render={
                <a href={currentPdfUrl} download target="_blank" rel="noopener noreferrer" />
              }
              nativeButton={false}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 px-3 text-xs font-semibold rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white cursor-pointer"
              render={
                <a href={currentPdfUrl} target="_blank" rel="noopener noreferrer" />
              }
              nativeButton={false}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Page</span>
            </Button>

            {/* Prominent Header Close Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={onClose}
              className="h-8 gap-1.5 px-3 text-xs font-bold rounded-xl border-white/20 bg-white/10 hover:bg-white/20 text-white cursor-pointer hover:border-white/40 transition-all shadow-sm"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </Button>
          </div>
        </div>

        {/* Variants Tab Bar (if there are multiple attempts/scores, e.g. TOPCIT Progression) */}
        {certificate.variants && certificate.variants.length > 1 && (
          <div className="flex items-center gap-2 px-5 py-2.5 bg-[#0b0b14] border-b border-white/5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mr-1 shrink-0">
              Progression:
            </span>
            {certificate.variants.map((v) => {
              const isActive = v.id === activeVariantId
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveVariantId(v.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/40 shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span>{v.label}</span>
                  {v.score && (
                    <span className="text-[10px] font-mono opacity-80 font-normal">
                      [{v.score}]
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* PDF Viewer Body */}
        <div className="relative flex-grow w-full h-full bg-[#050508] overflow-hidden flex flex-col items-center justify-center">
          <iframe
            src={currentPdfUrl}
            title={`${certificate.title} — ${activeVariant?.label || certificate.title}`}
            className="w-full h-full border-0 absolute inset-0 z-10 bg-transparent"
          />

          {/* Fallback / Verification card (visible underneath while PDF loads or if file is missing) */}
          <div className="flex flex-col items-center text-center max-w-md p-6 z-0 select-none">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-4 shadow-xl">
              <FileText className="w-7 h-7 opacity-80" />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">Official Document Preview</h4>
            <p className="text-xs text-muted-foreground mb-4">
              {certificate.subtitle} · Issued by {certificate.issuer}
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-muted-foreground mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>REF: {certificate.refId}</span>
            </div>
            <p className="text-[11px] text-muted-foreground/60 max-w-xs">
              If the document is not rendering on your mobile browser, tap "Download" or "Full Page" above.
            </p>
          </div>
        </div>

        {/* Bottom verification footer with secondary close button */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#090912] border-t border-white/5 text-[10px] font-mono shrink-0">
          <div className="flex items-center gap-3 text-muted-foreground/60">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              OFFICIAL_CREDENTIAL
            </span>
            <span className="hidden sm:inline">REF: {certificate.refId}</span>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            className="h-7 px-3 text-xs font-semibold rounded-lg border-white/15 bg-white/5 hover:bg-white/15 text-white/90 cursor-pointer"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Close Window
          </Button>
        </div>
      </div>
    </div>
  )
}
