"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Database, Globe, Terminal, Sparkles } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { useTheme } from "next-themes"

// ── Tech Icons SVG Map ───────────────────────────────────────────────────
const icons: Record<string, { svg?: string; img?: string; color: string; label: string; isMulticolor?: boolean; viewBox?: string }> = {
  html5: {
    label: "HTML5",
    color: "#E34F26",
    svg: `<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>`,
  },
  css3: {
    label: "CSS3",
    color: "#1572B6",
    svg: `<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>`,
  },
  javascript: {
    label: "JavaScript",
    color: "#F7DF1E",
    svg: `<path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>`,
  },
  typescript: {
    label: "TypeScript",
    color: "#3178C6",
    svg: `<path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.255a1.119 1.119 0 0 0 .552-.926.908.908 0 0 0-.20-.595 1.853 1.853 0 0 0-.55-.439 5.574 5.574 0 0 0-.833-.395 12.325 12.325 0 0 1-1.023-.455 6.277 6.277 0 0 1-.97-.607 2.997 2.997 0 0 1-.723-.81 2.1 2.1 0 0 1-.278-1.078c0-.617.118-1.145.356-1.58.237-.436.57-.804.998-1.105a4.316 4.316 0 0 1 1.483-.616 7.44 7.44 0 0 1 1.771-.206zm-5.366 0H7.5v2.358h3.362v9.387h2.527V12.108h.732V9.75z"/>`,
  },
  react: {
    label: "React",
    color: "#61DAFB",
    svg: `<path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>`,
  },
  nextjs: {
    label: "Next.js",
    color: "#ffffff",
    img: "/logos/Next.js-logo.svg",
  },
  tailwind: {
    label: "Tailwind CSS",
    color: "#06B6D4",
    svg: `<path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>`,
  },
  reactnative: {
    label: "React Native",
    color: "#61DAFB",
    svg: `<path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z"/>`,
  },
  firebase: {
    label: "Firebase",
    color: "#FFCA28",
    img: "/logos/firebase-logo.png",
  },
  nodejs: {
    label: "Node.js",
    color: "#339933",
    img: "/logos/node-js-logo.png",
  },
  mysql: {
    label: "MySQL",
    color: "#4479A1",
    img: "/logos/mysql-logo.webp",
  },
  git: {
    label: "Git",
    color: "#F05032",
    svg: `<path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>`,
  },
  github: {
    label: "GitHub",
    color: "#ffffff",
    svg: `<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>`,
  },
  postgresql: {
    label: "PostgreSQL",
    color: "#4169E1",
    img: "/logos/postgresql-logo.png",
  },
  sqlite: {
    label: "SQLite",
    color: "#003B57",
    img: "/logos/sqlite-logo.webp",
  },
  flutter: {
    label: "Flutter",
    color: "#02569B",
    svg: `<path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.006 12.299L9.03 17.587 12.727 21.27 21.68 12.299h-7.36zm-.006 3.394l-3.693 3.693L14.314 24h7.37l-7.37-7.37z"/>`,
  },
  mongodb: {
    label: "MongoDB",
    color: "#47A248",
    img: "/logos/mongodb-logo.svg",
  },
  figma: {
    label: "Figma",
    color: "#A259FF",
    img: "/logos/figma-logo.webp",
  },
  expo: {
    label: "Expo CLI",
    color: "#ffffff",
    svg: `<path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-22C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.586 11.586L12 17.172l-3.586-3.586a1 1 0 0 1 0-1.414l3.586-3.586 3.586 3.586a1 1 0 0 1 0 1.414z"/>`
  },
  agenticai: {
    label: "Agentic AI",
    color: "#a855f7",
    svg: `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5A2.5 2.5 0 0 1 9.5 7A2.5 2.5 0 0 1 7 4.5A2.5 2.5 0 0 1 9.5 2M14.5 17A2.5 2.5 0 0 1 17 19.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 12 19.5a2.5 2.5 0 0 1 14.5-2.5M4.5 9.5A2.5 2.5 0 0 1 7 12a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 2 12a2.5 2.5 0 0 1 4.5-2.5m15 0a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5M12 10.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M9.5 5.5l-5 6.5m10 7.5l-5-6.5m.5-.5L18.5 11m-14 1l9 7m-9-7.5l5.5-2m5 1.5l1.5-3"/>`
  },
  mcp: {
    label: "MCP",
    color: "#3b82f6",
    viewBox: "0 0 200 200",
    svg: `<path d="M25 97.8528L92.8823 29.9706C102.255 20.598 117.451 20.598 126.823 29.9706V29.9706C136.196 39.3431 136.196 54.5391 126.823 63.9117L75.5581 115.177" stroke="currentColor" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M76.2653 114.47L126.823 63.9117C136.196 54.5391 151.392 54.5391 160.765 63.9117L161.118 64.2652C170.491 73.6378 170.491 88.8338 161.118 98.2063L99.7248 159.6C96.6006 162.724 96.6006 167.789 99.7248 170.913L112.331 183.52" stroke="currentColor" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M109.853 46.9411L59.6482 97.1457C50.2757 106.518 50.2757 121.714 59.6482 131.087V131.087C69.0208 140.459 84.2168 140.459 93.5894 131.087L143.794 80.8822" stroke="currentColor" stroke-width="12" stroke-linecap="round" fill="none"/>`
  },
  prompteng: {
    label: "Prompt Engineering",
    color: "#f59e0b",
    svg: `<path d="M2 17l10-10 4 4L6 21H2v-4zm18.5-11.5a2.12 2.12 0 0 0-3-3l-2.5 2.5l3 3l2.5-2.5zM19 13.5l1.5.5l-1.5.5l-.5 1.5l-.5-1.5l-1.5-.5l1.5-.5l.5-1.5l.5 1.5zM7 3.5l1 .5l-1 .5l-.5 1l-.5-1-1-.5l1-.5l.5-1l.5 1z"/>`
  },
  multiagent: {
    label: "Multi-Agent Systems",
    color: "#ec4899",
    svg: `<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10zm-6-10a6 6 0 1 1 12 0a6 6 0 0 1-12 0zm3-3a3 3 0 1 1 6 0a3 3 0 0 1-6 0z" fill="none" stroke="currentColor" stroke-width="2"/>`
  },
  claude: {
    label: "Claude",
    color: "#d97706",
    img: "/logos/claude-logo.jpg",
  },
  gemini: {
    label: "Gemini",
    color: "#60a5fa",
    img: "/logos/gemini-logo.png",
  },
  chatgpt: {
    label: "ChatGPT",
    color: "#10b981",
    svg: `<path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>`,
  },
  higgsfield: {
    label: "Higgsfield",
    color: "#ec4899",
    img: "/logos/higgsfieldai-logo.png",
  },
  cursor: {
    label: "Cursor",
    color: "#38bdf8",
    img: "/logos/cursor-logo.webp",
  },
  whatnot: {
    label: "Other Agents",
    color: "#f59e0b",
    svg: `<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`
  }
}

// ── Skills Database ──────────────────────────────────────────────────────
const skillsData = {
  html5: { name: "HTML5", desc: "Semantic markup, search engine structure, and modern web accessibility standard compliance." },
  css3: { name: "CSS3", desc: "Responsive visual styling, layouts flow systems, and custom motion transitions." },
  javascript: { name: "JavaScript", desc: "Dynamic script routines, DOM model workflows, and modern asynchronous behaviors." },
  typescript: { name: "TypeScript", desc: "Statically typed code interfaces, type safety schemas, and scalable components development." },
  react: { name: "React", desc: "Component architecture patterns, interactive state flows, and reactive UI elements." },
  nextjs: { name: "Next.js", desc: "Server-side rendering, search engine optimization layouts, and static application deployment." },
  tailwind: { name: "Tailwind CSS", desc: "Utility-first CSS framework tokens, responsive spacing, and unified theme systems." },
  
  flutter: { name: "Flutter", desc: "Single-codebase mobile compilation, high performance Dart interfaces, native layouts." },
  reactnative: { name: "React Native", desc: "JavaScript bridge to native operating system views, fast mobile interfaces development." },
  expo: { name: "Expo CLI", desc: "Streamlined mobile app development pipeline, rapid prototyping, and wireless device updates." },
  
  nodejs: { name: "Node.js", desc: "Scalable backend JavaScript servers, routing APIs, and web services deployment." },
  mongodb: { name: "MongoDB", desc: "Flexible database documents management, cloud storage nodes, and database queries." },
  firebase: { name: "Firebase", desc: "Realtime data sync, unified authentication tools, and serverless hosting assets." },
  mysql: { name: "MySQL", desc: "Structured relational databases, standard SQL queries, schemas integrity constraints." },
  postgresql: { name: "PostgreSQL", desc: "Advanced relational engine, query safety constraints, robust data records management." },
  sqlite: { name: "SQLite", desc: "Fast offline local application storage, high reliability embedded databases." },
  
  git: { name: "Git", desc: "Local project tracking, repository checkpoints, version rollback history logs." },
  github: { name: "GitHub", desc: "Project collaboration space, codebase sharing portals, actions pipelines." },
  figma: { name: "Figma", desc: "Interface design layouts wireframing, custom vector graphics, high fidelity prototypes." },
  firebasehosting: { name: "Firebase Hosting", desc: "Global asset delivery networks, custom domains configuration, secure SSL hosting." },
  
  agenticai: { name: "Agentic AI", desc: "Autonomous AI agents building, self-correcting logic, workflow loops, and dynamic action planning integrations." },
  mcp: { name: "Model Context Protocol", desc: "Model Context Protocol implementation, linking client host services and local tools context directly to LLM queries." },
  prompteng: { name: "Prompt Engineering", desc: "System instruction crafting, few-shot prompting patterns, XML outputs schemas, and context window optimization." },
  multiagent: { name: "Multi-Agent Systems", desc: "Collaborative multi-agent framework architectures, role-delegation systems, consensus loops, and supervisor controls." },
  claude: { name: "Claude (Anthropic)", desc: "Anthropic Sonnet capabilities utilization, artifact manipulation, prompt tuning, and structured JSON generation." },
  gemini: { name: "Gemini (Google)", desc: "Google Gemini high-token context queries, multimodal reasoning integration, function calling, and structured text inputs." },
  chatgpt: { name: "ChatGPT (OpenAI)", desc: "OpenAI GPT model integration, custom GPT configurations, tool calls execution, and prompt completions API routines." },
  higgsfield: { name: "Higgsfield AI", desc: "AI video generation models, camera motion controls, custom style parameters, and high-fidelity video creations." },
  cursor: { name: "Cursor", desc: "AI-assisted codebase indexing, codebase chat interactions, prompt editing, and cursor composer multi-file refactoring." },
  whatnot: { name: "Agentic Tools", desc: "Automated coding assistants, Windsurf agentic ide workflows, v0 UI prototyping, and AI code generation pipelines." }
}

const TechIcon = ({ 
  svg, 
  img, 
  label, 
  isMulticolor, 
  viewBox = "0 0 24 24" 
}: { 
  svg?: string; 
  img?: string; 
  label: string; 
  isMulticolor?: boolean; 
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
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme } = useTheme()
  const isLight = mounted && resolvedTheme === "light"

  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  // Interactive States
  const [clientTab, setClientTab] = React.useState<"web" | "mobile">("web")
  const [activeClientTool, setActiveClientTool] = React.useState<string>("react")
  const [activeBackend, setActiveBackend] = React.useState<string>("nodejs")
  const [activeAI, setActiveAI] = React.useState<string>("agenticai")
  const [activeWorkflow, setActiveWorkflow] = React.useState<string>("git")
  const [hoveredSkill, setHoveredSkill] = React.useState<string | null>(null)

  const handleTabChange = (tab: "web" | "mobile") => {
    setClientTab(tab)
    setActiveClientTool(tab === "web" ? "react" : "flutter")
  }

  return (
    <section id="skills" ref={ref} className="snap-section flex items-center py-20 w-full relative overflow-hidden bg-grid-subtle">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Section Header */}
        <div className={`text-center mb-16 ${inView ? "animate-fade-up delay-0" : "opacity-0"}`}>
          <h2 className={`font-heading text-3xl font-extrabold tracking-tight sm:text-4xl bg-clip-text text-transparent ${isLight ? "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" : "bg-gradient-to-r from-primary via-purple-600 to-indigo-500"}`}>
            Tech Stack &amp; Skills
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-semibold">
            An organized layout of the core visual design, programming tools, and databases I work with.
          </p>
        </div>

        {/* Bento Console Dashboard (Symmetrical 2x2 layout) */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto ${inView ? "animate-fade-up delay-100" : "opacity-0"}`}>
          
          {/* Card 1: Client-Side Console */}
          <Card className={`border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-sm rounded-2xl overflow-hidden relative group transition-all duration-300 hover:border-primary/20 dark:hover:border-primary/20 ${isLight ? "hover:shadow-[0_0_35px_rgba(249,115,22,0.08)]" : "hover:shadow-[0_0_35px_rgba(139,92,246,0.06)]"} flex flex-col justify-between min-h-[460px] md:min-h-[420px] p-0 py-0 gap-0`}>
            {/* Header */}
            <div className={`px-5 py-4 border-b border-border/70 dark:border-white/5 flex items-center justify-between transition-colors duration-300 ${isLight ? "bg-orange-500/[0.04]" : "bg-black/10 dark:bg-black/20"}`}>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-bold text-foreground tracking-wide uppercase">Client-Side Engine</span>
              </div>
              <div className="flex gap-1.5 items-center">
                {/* Segment tab control */}
                <div className={`flex p-0.5 rounded-lg border border-border/70 dark:border-white/5 text-[10px] transition-colors duration-300 ${isLight ? "bg-orange-500/10" : "bg-black/35"}`}>
                  <button
                    onClick={() => handleTabChange("web")}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      clientTab === "web"
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Web
                  </button>
                  <button
                    onClick={() => handleTabChange("mobile")}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      clientTab === "mobile"
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Mobile
                  </button>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-5 min-h-0">
              {/* Telemetry Details Left (2 Cols) */}
              <div className={`md:col-span-2 border-b md:border-b-0 md:border-r border-border/70 dark:border-white/5 p-5 transition-colors duration-300 ${isLight ? "bg-orange-500/[0.02]" : "bg-black/5 dark:bg-black/10"} flex flex-col justify-between`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Selected Module</span>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-foreground tracking-tight flex items-center gap-2">
                      <span style={{ color: icons[activeClientTool]?.color }}>
                        <TechIcon svg={icons[activeClientTool]?.svg} img={icons[activeClientTool]?.img} label={icons[activeClientTool]?.label} isMulticolor={icons[activeClientTool]?.isMulticolor} viewBox={icons[activeClientTool]?.viewBox} />
                      </span>
                      {skillsData[activeClientTool as keyof typeof skillsData]?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2 font-medium">
                      {skillsData[activeClientTool as keyof typeof skillsData]?.desc}
                    </p>
                  </div>
                </div>
                <div className={`pt-4 border-t border-border/40 dark:border-white/5 font-mono text-[9px] ${isLight ? "text-muted-foreground/80" : "text-muted-foreground/60"} space-y-1`}>
                  <div>[ENGINE_MODE]: DYNAMIC_SSR</div>
                  <div>[MODULE_REF]: {activeClientTool.toUpperCase()}</div>
                </div>
              </div>

              {/* Chips Grid Right (3 Cols) */}
              <div className="md:col-span-3 p-5 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-2.5">
                  {(clientTab === "web"
                    ? (["react", "nextjs", "typescript", "javascript", "tailwind", "css3", "html5"] as const)
                    : (["flutter", "reactnative", "expo"] as const)
                  ).map((key) => {
                    const icon = icons[key]
                    const isActive = activeClientTool === key
                    const isHovered = hoveredSkill === key
                    const isSpecialColor = key === "nextjs" && !isHovered && !isActive

                    return (
                      <div
                        key={key}
                        onMouseEnter={() => {
                          setActiveClientTool(key)
                          setHoveredSkill(key)
                        }}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                          borderColor: isHovered || isActive ? icon.color : undefined,
                          boxShadow: isHovered || isActive ? `0 0 15px ${icon.color}20` : undefined,
                          backgroundColor: isHovered || isActive ? `${icon.color}0a` : undefined,
                        }}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-default transition-all duration-300 border backdrop-blur-md ${
                          isActive || isHovered
                            ? "text-foreground scale-[1.02] border-opacity-70"
                            : `${isLight ? "bg-orange-500/[0.03]" : "bg-black/5 dark:bg-black/10"} border-border/70 dark:border-white/5 text-muted-foreground hover:text-foreground ${isLight ? "hover:bg-orange-500/[0.06]" : "hover:bg-black/10 dark:hover:bg-black/20"}`
                        }`}
                      >
                        <span
                          className={isSpecialColor ? "text-foreground" : ""}
                          style={isSpecialColor ? undefined : { color: icon.color }}
                        >
                          <TechIcon svg={icon.svg} img={icon.img} label={icon.label} isMulticolor={icon.isMulticolor} viewBox={icon.viewBox} />
                        </span>
                        <span className="text-xs font-bold leading-none">{icon.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Card 2: Backend & Databases */}
          <Card className={`border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-sm rounded-2xl overflow-hidden relative group transition-all duration-300 hover:border-primary/20 dark:hover:border-primary/20 ${isLight ? "hover:shadow-[0_0_35px_rgba(249,115,22,0.08)]" : "hover:shadow-[0_0_35px_rgba(139,92,246,0.06)]"} flex flex-col justify-between min-h-[460px] md:min-h-[420px] p-0 py-0 gap-0`}>
            {/* Header */}
            <div className={`px-5 py-4 border-b border-border/70 dark:border-white/5 flex items-center justify-between transition-colors duration-300 ${isLight ? "bg-orange-500/[0.04]" : "bg-black/10 dark:bg-black/20"}`}>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-bold text-foreground tracking-wide uppercase">Backend &amp; Databases</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-5 min-h-0">
              {/* Telemetry Details Left (2 Cols) */}
              <div className={`md:col-span-2 border-b md:border-b-0 md:border-r border-border/70 dark:border-white/5 p-5 transition-colors duration-300 ${isLight ? "bg-orange-500/[0.02]" : "bg-black/5 dark:bg-black/10"} flex flex-col justify-between`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Telemetry Pane</span>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-foreground tracking-tight flex items-center gap-2">
                      <span style={{ color: icons[activeBackend]?.color }}>
                        <TechIcon svg={icons[activeBackend]?.svg} img={icons[activeBackend]?.img} label={icons[activeBackend]?.label} viewBox={icons[activeBackend]?.viewBox} />
                      </span>
                      {skillsData[activeBackend as keyof typeof skillsData]?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2 font-medium">
                      {skillsData[activeBackend as keyof typeof skillsData]?.desc}
                    </p>
                  </div>
                </div>
                <div className={`pt-4 border-t border-border/40 dark:border-white/5 font-mono text-[9px] ${isLight ? "text-muted-foreground/80" : "text-muted-foreground/60"} space-y-1`}>
                  <div>[SERVICE_STATUS]: OPERATIONAL</div>
                  <div>[ENGINE_REF]: {activeBackend.toUpperCase()}</div>
                </div>
              </div>

              {/* Chips Grid Right (3 Cols) */}
              <div className="md:col-span-3 p-5 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-2.5">
                  {(["nodejs", "mongodb", "firebase", "postgresql", "mysql", "sqlite"] as const).map((key) => {
                    const icon = icons[key]
                    const isActive = activeBackend === key
                    const isHovered = hoveredSkill === key

                    return (
                      <div
                        key={key}
                        onMouseEnter={() => {
                          setActiveBackend(key)
                          setHoveredSkill(key)
                        }}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                          borderColor: isHovered || isActive ? icon.color : undefined,
                          boxShadow: isHovered || isActive ? `0 0 15px ${icon.color}20` : undefined,
                          backgroundColor: isHovered || isActive ? `${icon.color}0a` : undefined,
                        }}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-default transition-all duration-300 border backdrop-blur-md ${
                          isActive || isHovered
                            ? "text-foreground scale-[1.02] border-opacity-70"
                            : `${isLight ? "bg-orange-500/[0.03]" : "bg-black/5 dark:bg-black/10"} border-border/70 dark:border-white/5 text-muted-foreground hover:text-foreground ${isLight ? "hover:bg-orange-500/[0.06]" : "hover:bg-black/10 dark:hover:bg-black/20"}`
                        }`}
                      >
                        <span style={{ color: icon.color }}>
                          <TechIcon svg={icon.svg} img={icon.img} label={icon.label} viewBox={icon.viewBox} />
                        </span>
                        <span className="text-xs font-bold leading-none">{icon.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Card 3: AI & Agentic Core */}
          <Card className={`border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-sm rounded-2xl overflow-hidden relative group transition-all duration-300 hover:border-primary/20 dark:hover:border-primary/20 ${isLight ? "hover:shadow-[0_0_35px_rgba(249,115,22,0.08)]" : "hover:shadow-[0_0_35px_rgba(139,92,246,0.06)]"} flex flex-col justify-between min-h-[400px] p-0 py-0 gap-0`}>
            {/* Header */}
            <div className={`px-5 py-4 border-b border-border/70 dark:border-white/5 flex items-center justify-between transition-colors duration-300 ${isLight ? "bg-orange-500/[0.04]" : "bg-black/10 dark:bg-black/20"}`}>
              <div className="flex items-center gap-2">
                <Sparkles className={`h-4 w-4 ${isLight ? "text-primary" : "text-purple-500"} animate-pulse`} />
                <span className="text-xs font-bold text-foreground tracking-wide uppercase">AI &amp; Agentic Core</span>
              </div>
              <div className={`flex items-center gap-1.5 text-[9px] ${isLight ? "text-primary" : "text-purple-500"} font-bold uppercase tracking-wider`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLight ? "bg-orange-400" : "bg-purple-400"} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isLight ? "bg-primary" : "bg-purple-500"}`}></span>
                </span>
                <span>COGNITIVE LINK</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-5 min-h-0">
              {/* Telemetry Details Left (2 Cols) */}
              <div className={`md:col-span-2 border-b md:border-b-0 md:border-r border-border/70 dark:border-white/5 p-5 transition-colors duration-300 ${isLight ? "bg-orange-500/[0.02]" : "bg-black/5 dark:bg-black/10"} flex flex-col justify-between`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                    <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-primary" : "bg-purple-400"} animate-pulse`} />
                    <span>Agentic State</span>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-foreground tracking-tight flex items-center gap-2">
                      <span style={{ color: icons[activeAI]?.color }}>
                        <TechIcon svg={icons[activeAI]?.svg} img={icons[activeAI]?.img} label={icons[activeAI]?.label} viewBox={icons[activeAI]?.viewBox} />
                      </span>
                      {skillsData[activeAI as keyof typeof skillsData]?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2 font-medium">
                      {skillsData[activeAI as keyof typeof skillsData]?.desc}
                    </p>
                  </div>
                </div>
                <div className={`pt-4 border-t border-border/40 dark:border-white/5 font-mono text-[9px] ${isLight ? "text-muted-foreground/80" : "text-muted-foreground/60"} space-y-1`}>
                  <div>[COGNITIVE_SYNC]: STABLE</div>
                  <div>[MODEL_REF]: {activeAI.toUpperCase()}</div>
                </div>
              </div>

              {/* Chips Grid Right (3 Cols) */}
              <div className="md:col-span-3 p-5 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-2.5">
                  {(["agenticai", "mcp", "prompteng", "multiagent", "claude", "gemini", "chatgpt", "higgsfield", "cursor", "whatnot"] as const).map((key) => {
                    const icon = icons[key]
                    const isActive = activeAI === key
                    const isHovered = hoveredSkill === key
                    const isSpecialColor = (key === "claude" || key === "gemini" || key === "chatgpt" || key === "cursor") && !isHovered && !isActive

                    return (
                      <div
                        key={key}
                        onMouseEnter={() => {
                          setActiveAI(key)
                          setHoveredSkill(key)
                        }}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                          borderColor: isHovered || isActive ? icon.color : undefined,
                          boxShadow: isHovered || isActive ? `0 0 15px ${icon.color}20` : undefined,
                          backgroundColor: isHovered || isActive ? `${icon.color}0a` : undefined,
                        }}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-default transition-all duration-300 border backdrop-blur-md ${
                          isActive || isHovered
                            ? "text-foreground scale-[1.02] border-opacity-70"
                            : `${isLight ? "bg-orange-500/[0.03]" : "bg-black/5 dark:bg-black/10"} border-border/70 dark:border-white/5 text-muted-foreground hover:text-foreground ${isLight ? "hover:bg-orange-500/[0.06]" : "hover:bg-black/10 dark:hover:bg-black/20"}`
                        }`}
                      >
                        <span
                          className={`${isSpecialColor ? "text-foreground" : ""} transition-transform duration-300 ${isActive || isHovered ? "scale-110" : ""}`}
                          style={isSpecialColor ? undefined : { color: icon.color }}
                        >
                          <TechIcon svg={icon.svg} img={icon.img} label={icon.label} viewBox={icon.viewBox} />
                        </span>
                        <span className="text-xs font-bold leading-none select-none">{icon.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Card 4: Developer Systems & Ops */}
          <Card className={`border border-border/70 dark:border-white/5 bg-card/60 dark:bg-[#07070a] backdrop-blur-sm rounded-2xl overflow-hidden relative group transition-all duration-300 hover:border-primary/20 dark:hover:border-primary/20 ${isLight ? "hover:shadow-[0_0_35px_rgba(249,115,22,0.08)]" : "hover:shadow-[0_0_35px_rgba(139,92,246,0.06)]"} flex flex-col justify-between min-h-[400px] p-0 py-0 gap-0`}>
            {/* Header */}
            <div className={`px-5 py-4 border-b border-border/70 dark:border-white/5 flex items-center justify-between transition-colors duration-300 ${isLight ? "bg-orange-500/[0.04]" : "bg-black/10 dark:bg-black/20"}`}>
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-bold text-foreground tracking-wide uppercase">Developer Systems &amp; Ops</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-5 min-h-0">
              {/* Telemetry Details Left (2 Cols) */}
              <div className={`md:col-span-2 border-b md:border-b-0 md:border-r border-border/70 dark:border-white/5 p-5 transition-colors duration-300 ${isLight ? "bg-orange-500/[0.02]" : "bg-black/5 dark:bg-black/10"} flex flex-col justify-between`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>System Module</span>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-foreground tracking-tight flex items-center gap-2">
                      <span style={{ color: activeWorkflow === "firebasehosting" ? icons.firebase?.color : icons[activeWorkflow]?.color }}>
                        <TechIcon
                          svg={activeWorkflow === "firebasehosting" ? icons.firebase?.svg : icons[activeWorkflow]?.svg}
                          img={activeWorkflow === "firebasehosting" ? icons.firebase?.img : icons[activeWorkflow]?.img}
                          label={activeWorkflow === "firebasehosting" ? icons.firebase?.label : icons[activeWorkflow]?.label}
                          isMulticolor={activeWorkflow === "firebasehosting" ? icons.firebase?.isMulticolor : icons[activeWorkflow]?.isMulticolor}
                          viewBox={activeWorkflow === "firebasehosting" ? icons.firebase?.viewBox : icons[activeWorkflow]?.viewBox}
                        />
                      </span>
                      {skillsData[activeWorkflow as keyof typeof skillsData]?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2 font-medium">
                      {skillsData[activeWorkflow as keyof typeof skillsData]?.desc}
                    </p>
                  </div>
                </div>
                <div className={`pt-4 border-t border-border/40 dark:border-white/5 font-mono text-[9px] ${isLight ? "text-muted-foreground/80" : "text-muted-foreground/60"} space-y-1`}>
                  <div>[SYSTEM_STATUS]: OPERATIONAL</div>
                  <div>[MODULE_REF]: {activeWorkflow.toUpperCase()}</div>
                </div>
              </div>

              {/* Chips Grid Right (3 Cols) */}
              <div className="md:col-span-3 p-5 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-2.5">
                  {(["figma", "git", "github", "firebasehosting"] as const).map((key) => {
                    const icon = key === "firebasehosting" ? icons.firebase : icons[key]
                    const isActive = activeWorkflow === key
                    const isHovered = hoveredSkill === key

                    return (
                      <div
                        key={key}
                        onMouseEnter={() => {
                          setActiveWorkflow(key)
                          setHoveredSkill(key)
                        }}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                          borderColor: isHovered || isActive ? icon.color : undefined,
                          boxShadow: isHovered || isActive ? `0 0 15px ${icon.color}20` : undefined,
                          backgroundColor: isHovered || isActive ? `${icon.color}0a` : undefined,
                        }}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-default transition-all duration-300 border backdrop-blur-md ${
                          isActive || isHovered
                            ? "text-foreground scale-[1.02] border-opacity-70"
                            : `${isLight ? "bg-orange-500/[0.03]" : "bg-black/5 dark:bg-black/10"} border-border/70 dark:border-white/5 text-muted-foreground hover:text-foreground ${isLight ? "hover:bg-orange-500/[0.06]" : "hover:bg-black/10 dark:hover:bg-black/20"}`
                        }`}
                      >
                        <span style={{ color: icon.color }}>
                          <TechIcon svg={icon.svg} img={icon.img} label={icon.label} isMulticolor={icon.isMulticolor} viewBox={icon.viewBox} />
                        </span>
                        <span className="text-xs font-bold leading-none">{icon.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  )
}
