export const STUDIO = {
  name: "Ri Software Solutions",
  displayName: "RI SOFTWARE SOLUTIONS",
  tagline: "AI products for modern operations",
  location: "Pangasinan, PH",
  productsIntro:
    "I own and operate RI SOFTWARE SOLUTIONS — a product studio where every SaaS below is designed, built, and shipped in-house.",
} as const

export const TRIAGE_URL = "https://triage-ri.com"
export const TRIAGE_CODEV_URL = "https://triage-ri.web.app/#co-development"
export const FUTARI_URL = "https://futari-ri.web.app"

export type ProductStatus = "Live" | "Alpha" | "In Development" | "Co-Development"

export type ProductSegment = "B2B" | "B2C"

export type StudioProduct = {
  id: string
  name: string
  tagline: string
  description: string
  status: ProductStatus
  segment: ProductSegment
  tags: string[]
  image?: string
  accent: "triage" | "futari"
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export const studioProducts: StudioProduct[] = [
  {
    id: "triage",
    name: "Triage",
    tagline: "Surgical precision for modern customer support",
    description:
      "Multi-tenant AI service desk: ticket triage, agent workflows, digest email policy, routing, analytics, and client portal.",
    status: "Alpha",
    segment: "B2B",
    tags: ["Next.js", "Firebase", "Vertex AI", "Postmark"],
    image: "/projects/triage.png",
    accent: "triage",
    primaryCta: { label: "Visit Triage", href: TRIAGE_URL },
  },
  {
    id: "futari",
    name: "Futari",
    tagline: "Collaborative planning built for couples",
    description:
      "A secure B2C couples app for shared planning, cycle tracking, and daily memories. Engineered with a multi-tenant Svelte 5 stack, custom Firestore cache/guard, and Capacitor mobile bridge.",
    status: "In Development",
    segment: "B2C",
    tags: ["Svelte 5", "Capacitor 8", "Firebase", "Lemon Squeezy"],
    image: "/projects/futari.png",
    accent: "futari",
    primaryCta: { label: "Visit Futari", href: FUTARI_URL },
  },
]
