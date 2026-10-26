"use client"

import * as React from "react"
import { DeveloperGif, discoverDeveloperGifs } from "@/lib/gif-utils"

interface UseDeveloperGifsOptions {
  isFlipped: boolean
}

export function useDeveloperGifs({ isFlipped }: UseDeveloperGifsOptions) {
  const [gifs, setGifs] = React.useState<DeveloperGif[]>([
    {
      url: "/developer-gifs/1.gif",
      duration: 2220,
      index: 1,
    },
  ])
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [cycleKey, setCycleKey] = React.useState(0)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  // Discover all incremental gifs on mount
  React.useEffect(() => {
    let active = true

    discoverDeveloperGifs().then((discovered) => {
      if (active && discovered.length > 0) {
        setGifs(discovered)
      }
    })

    return () => {
      active = false
    }
  }, [])

  // Safely bound current index
  const safeIndex = gifs.length > 0 ? currentIndex % gifs.length : 0
  const currentGif = gifs[safeIndex] || {
    url: "/developer-gifs/1.gif",
    duration: 2220,
    index: 1,
  }

  // Preload upcoming GIF to eliminate any blink or delay on transition
  React.useEffect(() => {
    if (gifs.length <= 1) return
    const nextIdx = (safeIndex + 1) % gifs.length
    const nextUrl = gifs[nextIdx]?.url
    if (nextUrl && typeof window !== "undefined") {
      const img = new Image()
      img.src = nextUrl
    }
  }, [safeIndex, gifs])

  // Timer logic: Advance to next GIF when the current GIF completes its full animation loop
  React.useEffect(() => {
    if (!isFlipped || gifs.length <= 1) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      return
    }

    const duration = currentGif.duration || 3000

    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % gifs.length)
      setCycleKey((prev) => prev + 1)
    }, duration)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isFlipped, safeIndex, currentGif.duration, gifs.length])

  // Reset to first GIF when flipping back in compliance with React 19 pattern
  const [prevFlipped, setPrevFlipped] = React.useState(isFlipped)
  if (prevFlipped !== isFlipped) {
    setPrevFlipped(isFlipped)
    if (!isFlipped) {
      setCurrentIndex(0)
      setCycleKey(0)
    }
  }

  const nextGif = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % gifs.length)
    setCycleKey((prev) => prev + 1)
  }, [gifs.length])

  const prevGif = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + gifs.length) % gifs.length)
    setCycleKey((prev) => prev + 1)
  }, [gifs.length])

  return {
    gifs,
    currentGif,
    currentIndex: safeIndex,
    totalGifs: gifs.length,
    cycleKey,
    nextGif,
    prevGif,
  }
}
