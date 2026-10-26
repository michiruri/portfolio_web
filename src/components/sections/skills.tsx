"use client"

import * as React from "react"
import { useInView } from "@/hooks/use-in-view"
import { Sparkles, ArrowRight } from "lucide-react"

// Tech Icons SVG / Image Map
const icons: Record<
  string,
  {
    svg?: string
    img?: string
    color: string
    label: string
    isMulticolor?: boolean
    viewBox?: string
  }
> = {
  agenticai: {
    label: "Agentic AI (Antigravity & Cursor)",
    color: "#a855f7",
    svg: `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5A2.5 2.5 0 0 1 9.5 7A2.5 2.5 0 0 1 7 4.5A2.5 2.5 0 0 1 9.5 2M14.5 17A2.5 2.5 0 0 1 17 19.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 12 19.5a2.5 2.5 0 0 1 14.5-2.5M4.5 9.5A2.5 2.5 0 0 1 7 12a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 2 12a2.5 2.5 0 0 1 4.5-2.5m15 0a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5M12 10.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M9.5 5.5l-5 6.5m10 7.5l-5-6.5m.5-.5L18.5 11m-14 1l9 7m-9-7.5l5.5-2m5 1.5l1.5-3"/>`,
  },
  gcp: {
    label: "Google Cloud Platform",
    color: "#4285F4",
    viewBox: "0 -25 256 256",
    isMulticolor: true,
    svg: `<path d="M170.2517,56.8186 L192.5047,34.5656 L193.9877,25.1956 C153.4367,-11.6774 88.9757,-7.4964 52.4207,33.9196 C42.2667,45.4226 34.7337,59.7636 30.7167,74.5726 L38.6867,73.4496 L83.1917,66.1106 L86.6277,62.5966 C106.4247,40.8546 139.8977,37.9296 162.7557,56.4286 L170.2517,56.8186 Z" fill="#EA4335" /><path d="M224.2048,73.9182 C219.0898,55.0822 208.5888,38.1492 193.9878,25.1962 L162.7558,56.4282 C175.9438,67.2042 183.4568,83.4382 183.1348,100.4652 L183.1348,106.0092 C198.4858,106.0092 210.9318,118.4542 210.9318,133.8052 C210.9318,149.1572 198.4858,161.2902 183.1348,161.2902 L127.4638,161.2902 L121.9978,167.2242 L121.9978,200.5642 L127.4638,205.7952 L183.1348,205.7952 C223.0648,206.1062 255.6868,174.3012 255.9978,134.3712 C256.1858,110.1682 244.2528,87.4782 224.2048,73.9182" fill="#4285F4" /><path d="M71.8704,205.7957 L127.4634,205.7957 L127.4634,161.2897 L71.8704,161.2897 C67.9094,161.2887 64.0734,160.4377 60.4714,158.7917 L52.5844,161.2117 L30.1754,183.4647 L28.2234,191.0387 C40.7904,200.5277 56.1234,205.8637 71.8704,205.7957" fill="#34A853" /><path d="M71.8704,61.4255 C31.9394,61.6635 -0.2366,94.2275 0.0014,134.1575 C0.1344,156.4555 10.5484,177.4455 28.2234,191.0385 L60.4714,158.7915 C46.4804,152.4705 40.2634,136.0055 46.5844,122.0155 C52.9044,108.0255 69.3704,101.8085 83.3594,108.1285 C89.5244,110.9135 94.4614,115.8515 97.2464,122.0155 L129.4944,89.7685 C115.7734,71.8315 94.4534,61.3445 71.8704,61.4255" fill="#FBBC05" />`,
  },
  firebase: {
    label: "Firebase",
    color: "#FFCA28",
    img: "/logos/firebase-logo.png",
  },
  flutter: {
    label: "Flutter",
    color: "#02569B",
    svg: `<path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.006 12.299L9.03 17.587 12.727 21.27 21.68 12.299h-7.36zm-.006 3.394l-3.693 3.693L14.314 24h7.37l-7.37-7.37z"/>`,
  },
  typescript: {
    label: "TypeScript",
    color: "#3178C6",
    svg: `<path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.255a1.119 1.119 0 0 0 .552-.926.908.908 0 0 0-.20-.595 1.853 1.853 0 0 0-.55-.439 5.574 5.574 0 0 0-.833-.395 12.325 12.325 0 0 1-1.023-.455 6.277 6.277 0 0 1-.97-.607 2.997 2.997 0 0 1-.723-.81 2.1 2.1 0 0 1-.278-1.078c0-.617.118-1.145.356-1.58.237-.436.57-.804.998-1.105a4.316 4.316 0 0 1 1.483-.616 7.44 7.44 0 0 1 1.771-.206zm-5.366 0H7.5v2.358h3.362v9.387h2.527V12.108h.732V9.75z"/>`,
  },
  svelte: {
    label: "Svelte 5",
    color: "#FF3E00",
    svg: `<path d="M21.55 4.582a6.452 6.452 0 0 0-8.995-2.096L6.5 6.07A6.455 6.455 0 0 0 3.328 11.4a6.408 6.408 0 0 0 1.258 4.395l-1.39 2.408a1.291 1.291 0 0 0 .472 1.764l3.118 1.8a1.291 1.291 0 0 0 1.764-.472l1.246-2.158a6.41 6.41 0 0 0 1.954.305 6.455 6.455 0 0 0 5.34-2.825l6.056-10.49a6.407 6.407 0 0 0-.646-1.547zm-1.895 1.094l-6.055 10.49a3.873 3.873 0 0 1-5.3 1.42l-1.52-.877 2.158-3.738a1.291 1.291 0 0 0-.472-1.764l-3.118-1.8a1.291 1.291 0 0 0-1.764.472l-.768 1.33A3.87 3.87 0 0 1 5.91 7.477l6.055-3.585a3.873 3.873 0 0 1 5.3 1.42 3.842 3.842 0 0 1 .49 1.364z"/>`,
  },
  nextjs: {
    label: "Next.js",
    color: "#94a3b8",
    viewBox: "0 0 128 128",
    svg: `<path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"/>`,
  },
  react: {
    label: "React",
    color: "#61DAFB",
    viewBox: "-11.5 -10.23174 23 20.46348",
    isMulticolor: true,
    svg: `<circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g>`,
  },
  tailwind: {
    label: "Tailwind CSS",
    color: "#06B6D4",
    svg: `<path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c-0.913,0.228-1.565,0.89-2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>`,
  },
  canvas: {
    label: "HTML5 Canvas API",
    color: "#F59E0B",
    viewBox: "0 0 24 24",
    svg: `<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>`,
  },
  nodejs: {
    label: "Node.js",
    color: "#68A063",
    viewBox: "0 0 24 24",
    svg: `<path fill="#68A063" d="M12 1.5L2.5 7v10L12 22.5 21.5 17V7L12 1.5zm0 2.5l7 4.04v8.08L12 20.16 5 16.12V8.04L12 4z"/>`,
  },
  postgresql: {
    label: "PostgreSQL",
    color: "#336791",
    img: "/logos/postgresql-logo.png",
  },
}

// Primary Architecture Nodes
interface StarNode {
  key: string
  name: string
  role: string
  powers: string
  highlights: string[]
  application: string
  connectedKeys: string[]
}

const PRIMARY_STARS: Record<string, StarNode> = {
  agenticai: {
    key: "agenticai",
    name: "Agentic AI",
    role: "Autonomous Dev Workflows",
    powers: "High Solo Velocity",
    highlights: ["Google Antigravity Workflows", "Cursor (AI Code Editor)", "Automated Task Execution"],
    application:
      "Accelerated multi-file architecture workflows using Google Antigravity and Cursor (AI Code Editor). Structured prompt engineering and context optimization to build production software faster.",
    connectedKeys: ["typescript", "nodejs"],
  },
  typescript: {
    key: "typescript",
    name: "TypeScript",
    role: "Type-Safe Architecture",
    powers: "All Applications",
    highlights: ["Strict Type Contracts", "Zero Implicit Any", "Type-Safe Client Caches"],
    application:
      "Enforces strict type safety across Next.js and Svelte 5 architectures, Firestore data models, and backend Cloud Functions.",
    connectedKeys: ["agenticai", "svelte"],
  },
  svelte: {
    key: "svelte",
    name: "Svelte 5",
    role: "Reactive Web App Engine",
    powers: "Futari (Flagship SaaS)",
    highlights: ["Native $state & $derived Runes", "Zero Virtual DOM Overhead", "Microsecond Client Sync"],
    application:
      "Core frontend foundation for Futari. Delivers instant UI responsiveness with fine-grained reactivity and minimal JavaScript bundle size.",
    connectedKeys: ["typescript", "tailwind"],
  },
  tailwind: {
    key: "tailwind",
    name: "Tailwind CSS v4",
    role: "Design Systems & Tokens",
    powers: "All Interfaces",
    highlights: ["OKLCH Color Harmonies", "Hardware Motion Transitions", "Dark/Light Theming"],
    application:
      "Custom tokenized styling with OKLCH color palettes, smooth responsive layouts, hardware-accelerated transitions, and polished dark/light themes.",
    connectedKeys: ["svelte", "nextjs"],
  },
  nextjs: {
    key: "nextjs",
    name: "Next.js 16",
    role: "Full-Stack Web & SSR",
    powers: "Full-Stack Web & Portfolio",
    highlights: ["App Router & Server Components", "Streaming SSR", "Dynamic API Routes"],
    application:
      "Production web foundation used for modern web platforms and this portfolio. Features Server Components, fast dynamic API routing, and optimized streaming SSR.",
    connectedKeys: ["tailwind", "react", "canvas"],
  },
  react: {
    key: "react",
    name: "React 19",
    role: "Modern Component Architecture",
    powers: "Next.js Apps & Corporate Portals",
    highlights: ["Declarative UI State", "Custom Hooks Architecture", "High Reusability"],
    application:
      "Underpins all Next.js applications and corporate web portals, managing complex state and modular design systems.",
    connectedKeys: ["nextjs"],
  },
  nodejs: {
    key: "nodejs",
    name: "Node.js",
    role: "Backend Runtime & APIs",
    powers: "Cloud Functions & Endpoints",
    highlights: ["Event-Driven Architecture", "Fast API Routes", "Serverless Execution"],
    application:
      "Powers serverless endpoints, cloud background handlers, automated webhooks, and backend pipeline orchestration.",
    connectedKeys: ["agenticai", "firebase", "postgresql"],
  },
  firebase: {
    key: "firebase",
    name: "Firebase",
    role: "Real-Time Cloud & Auth",
    powers: "Futari & Real-Time Sync",
    highlights: ["Real-Time Firestore Sync", "Hardened Security Rules", "Auth & Cloud Functions"],
    application:
      "Powers real-time reactive sync on Cloud Firestore, custom query caching to minimize quota usage, and hardened security rules for strict multi-tenant isolation.",
    connectedKeys: ["nodejs", "gcp", "postgresql"],
  },
  gcp: {
    key: "gcp",
    name: "Google Cloud",
    role: "Cloud Infrastructure & Gemini",
    powers: "Cloud & Enterprise Backends",
    highlights: ["Serverless Cloud Run", "IAM Boundary Isolation", "Gemini API Pipeline"],
    application:
      "Architected IAM service account boundaries, serverless Cloud Functions, and enterprise integrations with the Gemini API.",
    connectedKeys: ["firebase", "flutter"],
  },
  flutter: {
    key: "flutter",
    name: "Flutter",
    role: "Cross-Platform Mobile",
    powers: "Mobile Systems (Dart)",
    highlights: ["Native Android & iOS", "Declarative Widget Trees", "60fps Smooth Motion"],
    application:
      "Native compiled Android and iOS applications with 60fps performance, custom state management, and unified mobile design systems.",
    connectedKeys: ["gcp", "canvas"],
  },
  canvas: {
    key: "canvas",
    name: "HTML5 Canvas",
    role: "2D Physics & Game Engine",
    powers: "Some Typing Game",
    highlights: ["60fps Physics Simulation", "Custom Particle Engines", "Object-Oriented Loops"],
    application:
      "Powers real-time particle mechanics, projectile collisions, and boss battle state loops built from scratch in pure JavaScript.",
    connectedKeys: ["flutter", "nextjs"],
  },
  postgresql: {
    key: "postgresql",
    name: "PostgreSQL",
    role: "Relational Schemas & SQL",
    powers: "Relational Databases & Data Integrity",
    highlights: ["Strict Relational Modeling", "ACID Compliance & Relations", "SQL Indexing & Optimization"],
    application:
      "Architected relational schemas, structured migrations, and strict ACID transaction models to deliver robust enterprise data integrity alongside reactive NoSQL datastores.",
    connectedKeys: ["nodejs", "firebase"],
  },
}

// Comprehensive Supporting Technologies & Skills
const supportingTools = [
  { name: "TypeScript", category: "Frontend" },
  { name: "Next.js 16", category: "Frontend" },
  { name: "Svelte 5", category: "Frontend" },
  { name: "React 19", category: "Frontend" },
  { name: "Tailwind CSS v4", category: "Frontend" },
  { name: "JavaScript (ES6+)", category: "Frontend" },
  { name: "HTML5 Canvas API", category: "Frontend" },
  { name: "Leaflet Maps", category: "Frontend" },
  { name: "HTML5 & CSS3", category: "Frontend" },
  { name: "Node.js", category: "Backend & Cloud" },
  { name: "Firebase Auth", category: "Backend & Cloud" },
  { name: "Cloud Firestore", category: "Backend & Cloud" },
  { name: "Cloud Functions", category: "Backend & Cloud" },
  { name: "Firestore Security Rules", category: "Backend & Cloud" },
  { name: "Google Cloud Platform", category: "Backend & Cloud" },
  { name: "REST APIs", category: "Backend & Cloud" },
  { name: "Postmark & Resend", category: "Backend & Cloud" },
  { name: "PostgreSQL", category: "Databases" },
  { name: "MySQL", category: "Databases" },
  { name: "SQLite", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "Google Antigravity", category: "AI & Workflow" },
  { name: "Cursor (AI Code Editor)", category: "AI & Workflow" },
  { name: "Gemini Platform", category: "AI & Workflow" },
  { name: "Prompt Engineering", category: "AI & Workflow" },
  { name: "Higgsfield AI", category: "AI & Workflow" },
  { name: "Flutter", category: "Mobile" },
  { name: "Dart", category: "Mobile" },
  { name: "Capacitor 8", category: "Mobile" },
  { name: "Git & GitHub", category: "Tools & Design" },
  { name: "GitHub Actions", category: "Tools & Design" },
  { name: "Vite & Vitest", category: "Tools & Design" },
  { name: "Figma", category: "Tools & Design" },
  { name: "Svelte Check", category: "Tools & Design" },
  { name: "Active Directory", category: "Tools & Design" },
  { name: "Server Administration", category: "Tools & Design" },
]

// Category-specific Color Accents for the Directory
const categoryStyles: Record<
  string,
  {
    badge: string
    dot: string
    borderHover: string
  }
> = {
  Frontend: {
    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
    dot: "#0284c7",
    borderHover: "hover:border-sky-500/50 hover:shadow-[0_0_12px_rgba(2,132,199,0.15)]",
  },
  "Backend & Cloud": {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    dot: "#f59e0b",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_0_12px_rgba(245,158,11,0.15)]",
  },
  Databases: {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    dot: "#10b981",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]",
  },
  "AI & Workflow": {
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    dot: "#a855f7",
    borderHover: "hover:border-purple-500/50 hover:shadow-[0_0_12px_rgba(168,85,247,0.15)]",
  },
  Mobile: {
    badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    dot: "#6366f1",
    borderHover: "hover:border-indigo-500/50 hover:shadow-[0_0_12px_rgba(99,102,241,0.15)]",
  },
  "Tools & Design": {
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    dot: "#f43f5e",
    borderHover: "hover:border-rose-500/50 hover:shadow-[0_0_12px_rgba(244,63,94,0.15)]",
  },
}

const TechIcon = ({
  svg,
  img,
  label,
  isMulticolor,
  viewBox = "0 0 24 24",
}: {
  svg?: string
  img?: string
  label: string
  isMulticolor?: boolean
  viewBox?: string
}) => {
  if (img) {
    return (
      <span title={label} className="inline-flex shrink-0 items-center justify-center h-5 w-5" aria-label={label}>
        <img src={img} alt={label} className="h-5 w-5 object-contain" />
      </span>
    )
  }
  return (
    <span title={label} className="inline-flex shrink-0" aria-label={label}>
      <svg
        viewBox={viewBox}
        className="h-5 w-5"
        fill={isMulticolor ? undefined : "currentColor"}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: svg || "" }}
      />
    </span>
  )
}

export function SkillsSection() {
  const { ref, inView } = useInView()
  const [activeStarKey, setActiveStarKey] = React.useState<string>("typescript")

  const activeStar = PRIMARY_STARS[activeStarKey] || PRIMARY_STARS.typescript
  const activeIcon = icons[activeStarKey] || icons.typescript

  return (
    <section id="skills" ref={ref} className="snap-section py-12 sm:py-20 bg-transparent w-full scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Core Technologies &amp; Architecture
          </div>
          <h2
            className={`font-heading text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground transition-all duration-700 ${
              inView ? "animate-fade-up delay-100" : "opacity-0"
            }`}
          >
            Skills & Tech Stack
          </h2>
          <p
            className={`mt-2 sm:mt-3 text-muted-foreground max-w-2xl mx-auto font-medium text-xs sm:text-base leading-relaxed transition-all duration-700 ${
              inView ? "animate-fade-in delay-200" : "opacity-0"
            }`}
          >
            Production engines, cloud infrastructure, and modern toolchains I rely on to engineer and ship full-scale applications.
          </p>
        </div>

        {/* ─── CORE STACK PANEL ─── */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl border border-border/80 bg-card/50 dark:bg-[#07070d]/70 backdrop-blur-xl shadow-xl overflow-hidden p-3.5 sm:p-6 lg:p-8">
          
          {/* Panel Header */}
          <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border/50">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Core Production Engine
              </span>
              <p className="text-[11px] sm:text-xs text-muted-foreground/80 mt-0.5 hidden sm:block">
                Select a technology to inspect architecture implementation, strengths, and connected toolchains.
              </p>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground/60 shrink-0">
              <span className="sm:hidden">Swipe to explore →</span>
              <span className="hidden sm:inline">12 Core Technologies</span>
            </span>
          </div>

          {/* ─── INTERACTIVE CORE ENGINE: HORIZONTAL SNAP ON MOBILE, GRID ON DESKTOP ─── */}
          <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-2 sm:gap-3.5 pb-2 -mx-1 px-1 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:overflow-visible mb-5 sm:mb-8">
            {Object.values(PRIMARY_STARS).map((star) => {
              const isSelected = activeStarKey === star.key
              const icon = icons[star.key]
              const isNext = star.key === "nextjs"
              return (
                <button
                  key={star.key}
                  type="button"
                  onClick={() => setActiveStarKey(star.key)}
                  className={`group relative text-left p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden shrink-0 w-[145px] sm:w-auto snap-start ${
                    isSelected
                      ? "bg-card shadow-lg ring-1 scale-[1.02]"
                      : "bg-card/40 dark:bg-white/[0.02] border-border/60 hover:bg-card/80 hover:border-border hover:scale-[1.01]"
                  }`}
                  style={{
                    borderColor: isSelected ? icon.color : undefined,
                    boxShadow: isSelected ? `0 0 20px ${icon.color}25` : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2 sm:mb-2.5">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${icon.color}15`,
                        borderColor: `${icon.color}30`,
                        color: isNext ? undefined : icon.color,
                      }}
                    >
                      <span className={isNext ? "text-foreground dark:text-white" : undefined}>
                        <TechIcon
                          svg={icon.svg}
                          img={icon.img}
                          label={icon.label}
                          isMulticolor={icon.isMulticolor}
                          viewBox={icon.viewBox}
                        />
                      </span>
                    </div>
                    {isSelected ? (
                      <span
                        className="w-2 h-2 rounded-full animate-pulse mt-1"
                        style={{ backgroundColor: icon.color }}
                      />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {star.name}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-1 font-medium">
                      {star.role}
                    </p>
                  </div>
                  <div className="mt-2 pt-1.5 sm:mt-2.5 sm:pt-2 border-t border-border/40 flex items-center justify-between text-[9px] sm:text-[10px]">
                    <span className="font-semibold text-muted-foreground/80 truncate">
                      {star.powers}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* ─── ANIMATED DISPLAY OF SELECTED TECHNOLOGY ─── */}
          <div className="pt-4 sm:pt-6 border-t border-border/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
              
              {/* Left: What I Use It For */}
              <div className="lg:col-span-8 space-y-2.5 sm:space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                      style={{ backgroundColor: activeIcon.color }}
                    />
                    <span className="text-[11px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {activeStar.role}
                    </span>
                  </div>
                  <span className="text-muted-foreground/40 hidden sm:inline">·</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
                    Powers: {activeStar.powers}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                  <span
                    style={{ color: activeStarKey === "nextjs" ? undefined : activeIcon.color }}
                    className={activeStarKey === "nextjs" ? "text-foreground dark:text-white" : undefined}
                  >
                    <TechIcon
                      svg={activeIcon.svg}
                      img={activeIcon.img}
                      label={activeIcon.label}
                      isMulticolor={activeIcon.isMulticolor}
                      viewBox={activeIcon.viewBox}
                    />
                  </span>
                  {activeStar.name}
                </h3>

                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                  {activeStar.application}
                </p>

                {/* Key Strengths */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {activeStar.highlights.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-semibold bg-muted/60 dark:bg-white/[0.04] border border-border/60 text-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeIcon.color }} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Connected Technologies in Stack */}
              <div className="lg:col-span-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-border/60 bg-muted/20 dark:bg-white/[0.02] space-y-2">
                <span className="text-[11px] sm:text-xs font-bold text-foreground flex items-center gap-1.5">
                  Connected in Production Stack
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground" />
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {activeStar.connectedKeys.map((key) => {
                    const peer = PRIMARY_STARS[key]
                    const peerIcon = icons[key]
                    if (!peer) return null

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveStarKey(key)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-border/70 bg-card hover:bg-muted text-[11px] sm:text-xs font-bold text-foreground cursor-pointer transition-all hover:scale-105"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: peerIcon.color }} />
                        {peer.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── COMPREHENSIVE SUPPORTING TOOLS & FRAMEWORKS ─── */}
        <div className="mt-8 sm:mt-14 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between gap-3 pb-1 border-b border-border/40">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                Supporting Technologies &amp; Skills Directory
              </h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                Databases, secondary frameworks, development workflows, and APIs.
              </p>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground/70 shrink-0">
              {supportingTools.length} Technologies
            </span>
          </div>

          {/* Color-Coded 2-Column Grid on Mobile, 4-Column on Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5">
            {supportingTools.map((tool, idx) => {
              const catStyle = categoryStyles[tool.category]
              return (
                <div
                  key={idx}
                  className={`px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-lg sm:rounded-xl border border-border/70 bg-card/60 dark:bg-[#07070a]/60 backdrop-blur-sm flex items-center justify-between gap-1.5 sm:gap-2 text-xs transition-all duration-200 group hover:scale-[1.02] ${
                    catStyle?.borderHover || "hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 transition-transform group-hover:scale-125"
                      style={{ backgroundColor: catStyle?.dot || "#a855f7" }}
                    />
                    <span className="font-semibold text-[11px] sm:text-xs text-foreground/90 group-hover:text-foreground transition-colors truncate">
                      {tool.name}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md font-semibold border shrink-0 hidden sm:inline-block ${
                      catStyle?.badge || "bg-muted text-muted-foreground border-border/40"
                    }`}
                  >
                    {tool.category}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
