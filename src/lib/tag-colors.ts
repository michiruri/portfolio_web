export const TAG_COLORS: Record<string, string> = {
  // Svelte & related
  "Svelte 5": "bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-orange-600/20",
  "Svelte": "bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-orange-600/20",

  // TypeScript & JavaScript
  "TypeScript": "bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-600/20",
  "Vanilla JS": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 ring-yellow-600/20",
  "JavaScript": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 ring-yellow-600/20",
  "Node.js": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-600/20",

  // React & Next.js
  "React & Next.js": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-indigo-600/20",
  "Next.js": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-indigo-600/20",
  "React": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 ring-cyan-600/20",

  // Mobile & CSS
  "Capacitor 8": "bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-sky-600/20",
  "Capacitor": "bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-sky-600/20",
  "Tailwind CSS v4": "bg-teal-500/10 text-teal-600 dark:text-teal-400 ring-teal-600/20",
  "Tailwind CSS": "bg-teal-500/10 text-teal-600 dark:text-teal-400 ring-teal-600/20",

  // Cloud & BaaS
  "Firebase": "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-600/20",
  "Firebase & GCP": "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-600/20",
  "Google Cloud": "bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-600/20",

  // AI & Services
  "Gemini Platform": "bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-600/20",
  "Postmark": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 ring-yellow-600/20",
  "Polar": "bg-pink-500/10 text-pink-600 dark:text-pink-400 ring-pink-600/20",

  // Canvas & Game logic
  "HTML5 Canvas": "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-600/20",
  "OOP": "bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-violet-600/20",
}

export function getTagColor(tag: string): string {
  return TAG_COLORS[tag] || "bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-600/20"
}
