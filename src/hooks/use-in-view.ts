"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Returns a ref and a live `inView` boolean.
 * - true  → element is currently intersecting the viewport (animations play)
 * - false → element has left the viewport (animations hidden, ready to replay)
 *
 * Because we never disconnect the observer, revisiting a section
 * replays all entry animations automatically.
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle live — true on enter, false on leave
        setInView(entry.isIntersecting)
      },
      { threshold: 0.12, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, inView }
}
