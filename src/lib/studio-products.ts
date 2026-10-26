export const STUDIO = {
  name: "Independent SaaS",
  displayName: "INDEPENDENT SAAS",
  tagline: "A broke solo developer building against the world",
  location: "Pangasinan, PH",
  productsIntro:
    "Independent SaaS platforms conceived, built, and shipped solo from end-to-end. Just a broke solo developer against the world, crafting every layer from scratch.",
} as const

export const FUTARI_URL = "https://futari-ri.web.app"

export type ProductStatus =
  | "Live"
  | "Alpha"
  | "In Development"
  | "Co-Development"
  | "Pre-launch"
  | "Architecture Blueprint"

export type ProductSegment = "B2C" | "B2B" | "SaaS"

export type ProductPreviewTab = {
  id: string
  label: string
  image: string
  alt?: string
  isPlaceholder?: boolean
  description?: string
}

export type ProductDossier = {
  headline: string
  summary: string
  pillars: { label: string; detail: string }[]
  handlersAndEngines: string[]
  domain: string
  domainStatus: string
}

export type StudioProduct = {
  id: string
  name: string
  tagline: string
  description: string
  status: ProductStatus
  segment: ProductSegment
  orbitNumber: string
  orbitBadge: string
  tags: string[]
  image?: string
  features: { label: string; detail: string }[]
  previewTabs: ProductPreviewTab[]
  accent: "futari"
  primaryCta: { label: string; href?: string; disabled?: boolean }
  secondaryCta?: { label: string; href: string }
  dossier: ProductDossier
}

export const studioProducts: StudioProduct[] = [
  {
    id: "futari",
    name: "Futari",
    tagline: "Your cozy shared space for couples",
    description:
      "A private, real-time shared space for couples featuring an integrated Ri AI companion, deep theme customization, collaborative planning, and wellness tracking. Built solo from the ground up with Svelte 5 and Firebase for seamless real-time synchronization.",
    status: "Pre-launch",
    segment: "B2C",
    orbitNumber: "Orbit 01",
    orbitBadge: "Solo Founder Flagship",
    tags: ["Svelte 5", "Firebase", "Ri AI", "Tailwind CSS v4", "TypeScript", "Vite"],
    image: "/projects/futari/landing.png",
    features: [
      {
        label: "Ri AI Relationship Companion",
        detail:
          "Context-aware AI copilot integrated into couple chat with custom prompts for date planning, heartfelt advice, and strict PII privacy redaction.",
      },
      {
        label: "Themes & Cozy Customization",
        detail:
          "Deep aesthetic personalization with tailored color palettes, custom room themes, dark mode ambiance, and shared couple keepsakes.",
      },
      {
        label: "Shared Space & Real-Time Sync",
        detail:
          "Instant synchronized couple sanctuary with shared calendars, relationship milestone trackers, daily notes, and photo memories.",
      },
    ],
    previewTabs: [
      {
        id: "landing",
        label: "Landing Experience",
        image: "/projects/futari/landing.png",
        alt: "Futari landing screen preview",
        description: "Public landing experience and instant couple pairing onboarding flow.",
      },
      {
        id: "dashboard",
        label: "Shared Space & Calendar",
        image: "/projects/futari/dashboard-placeholder.png",
        alt: "Futari shared space preview",
        isPlaceholder: true,
        description: "Real-time reactive couple dashboard, shared calendar, and daily notes.",
      },
      {
        id: "ai-ri",
        label: "Ri AI Companion",
        image: "/projects/futari/dashboard-placeholder.png",
        alt: "Ri AI assistant preview",
        isPlaceholder: true,
        description: "Contextual couple copilot for date night ideas, relationship advice, and custom tools.",
      },
      {
        id: "themes",
        label: "Themes & Customization",
        image: "/projects/futari/dashboard-placeholder.png",
        alt: "Futari themes preview",
        isPlaceholder: true,
        description: "Bespoke room color themes, couple keepsakes, and mood check-in palettes.",
      },
    ],
    accent: "futari",
    primaryCta: { label: "Pre-launch Access", href: FUTARI_URL },
    dossier: {
      headline: "Multi-Tenant Reactive Shared Sanctuary for Couples",
      summary:
        "Futari is an independent B2C consumer platform tailored for intimate, privacy-first connection between couples. Built solo from the ground up using modern fine-grained reactivity, it delivers fast real-time state sync with zero unnecessary framework bloat.",
      pillars: [
        {
          label: "Svelte 5 Reactivity",
          detail:
            "Fast, lightweight frontend powered by native Svelte 5 runes ($state, $derived) for instant UI updates with zero framework overhead.",
        },
        {
          label: "Real-Time Cloud Sync",
          detail:
            "Firebase Firestore keeps calendars, notes, and partner updates synchronized instantly between both screens.",
        },
        {
          label: "Ri AI & Privacy Architecture",
          detail:
            "Intelligent contextual couple assistant with strict PII data redaction paired with hardened Firestore security rules.",
        },
        {
          label: "Modern Subscriptions",
          detail:
            "Self-serve couple membership tiers and perks powered cleanly through Polar billing integration.",
        },
      ],
      handlersAndEngines: [
        "Real-time pair-sync listener engine with optimistic rollbacks",
        "Encrypted wish-list secret claim protocol (hidden from partner)",
        "Automated cycle projection algorithms with discreet notifications",
        "Geographical compliance guards (EEA/UK/CH verification gate)",
      ],
      domain: "futari-ri.web.app",
      domainStatus: "Active Deployment · Pre-Launch Rollout",
    },
  },
]


