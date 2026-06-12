"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cpu, Database, Globe, Smartphone, Terminal, GitFork, Sparkles } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

// ── Tech Icons SVG Map ───────────────────────────────────────────────────
const icons: Record<string, { svg: string; color: string; label: string; isMulticolor?: boolean }> = {
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
    svg: `<path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.3094L.3598 13.0152c-.0791.1215-.1209.257-.1209.397v3.2963c0 .202.1674.3657.3736.3657h.0164c.0543 0 .1104-.014.1608-.0401l11.2895-5.7786c.1131-.0579.1841-.1735.1841-.3004V.3567C12.0633.159 11.9031 0 11.5725 0zM8.8354 17.1392l-.5468.2804V.3567l.5468.2804v16.5021zm3.0918-3.2017l-1.5455-.7903V3.8508l1.5455-.7903v11.8762zm4.3047 2.2007H16.023V.3567h.2089v15.784zm2.1166-1.0838l-1.5455.7903V3.8508l1.5455.7903v11.2053z"/>`,
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
    svg: `<path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.214 6.204l-1.804-3.37a.542.542 0 0 0-.976 0L3.324 19.232z"/>`,
  },
  nodejs: {
    label: "Node.js",
    color: "#339933",
    svg: `<path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"/>`,
  },
  mysql: {
    label: "MySQL",
    color: "#4479A1",
    svg: `<path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.19.214.29.054.104.1.208.214.313l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.242-.161zm5.258 2.485c-.006-.027-.04-.067-.08-.094-.046-.027-.1-.04-.14-.027l-4.28 1.754c-.067.04-.134.08-.2.14l-2.205 1.74 1.046.906 5.08-2.86c.227-.14.373-.32.373-.52.013-.04.013-.08-.014-.12l-.58-1.07zM.002 3.56c0 .2.04.4.14.52l3.067 5.8c.106.2.266.36.46.48l3.253 1.834c.106.047.2.014.24-.08l.72-1.007c.066-.094.04-.213-.027-.28l-5.4-4.54c-.2-.17-.347-.387-.347-.627V2.7c0-.233.147-.44.347-.613L6.49 1.174c.14-.12.32-.173.5-.16l5.64.814c.16.027.32.107.44.214l3.2 2.86c.174.16.314.387.314.627v.434l-4.04 2.267c-.067.04-.107.107-.107.174v5.027c0 .08.04.16.107.213l.906.72c.08.067.2.04.267-.04l4.36-4.547c.12-.134.193-.293.193-.48V5.36c0-.227-.104-.454-.293-.594l-3.96-3.573c-.133-.12-.32-.2-.506-.227L6.05.08c-.173-.013-.347.04-.493.147L1.13 2.98C.507 3.39.003 4.06.003 4.8V3.56h-.001zm5.76 7.934c.267 0 .507-.084.68-.247L12.11 8.14c.2-.173.3-.413.3-.64V3.16c0-.24-.14-.46-.336-.607L9.116 1.127C8.95 1.007 8.75.96 8.55.96l-4.4.134c-.206.013-.39.08-.52.2L2.003 2.8c-.12.12-.173.28-.173.44v3.12c0 .173.066.333.18.447l3.6 4.827c.13.173.32.28.53.28l.16-.014c.06-.013.12-.027.17-.053.127-.04.24-.107.32-.193z"/>`,
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
    svg: `<path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.824 2.865.305 4.482.415 6.682c.032.607.24 2.049.65 3.235.413 1.192.998 2.183 1.76 2.343.428.09.951-.082 1.335-.746.07.095.141.194.217.3.265.372.566.77.88 1.146.317.376.646.752.95 1.065.314.325.875.898 1.446 1.144-.411 1.018-.506 2.76.938 4.36.88.982 1.97 1.594 3.21 1.73.08.009.156.013.232.013.663 0 1.306-.302 1.918-.813.609-.51 1.04-1.121 1.248-1.57.55.025 1.32-.018 1.942-.394.748-.453 1.213-1.098 1.386-1.92.24-1.14-.08-2.424-.893-3.579a7.044 7.044 0 0 0-.233-.296c.146-.11.292-.234.43-.38.627-.638 1.003-1.398 1.088-2.182.094-.835-.15-1.618-.618-2.116a1.372 1.372 0 0 0-.063-.063c.086-.048.171-.1.254-.157 1.11-.739 1.73-1.847 1.702-3.022C23.95 2.518 23.344 1.558 22.27.95A7.194 7.194 0 0 0 19.7.103 9.716 9.716 0 0 0 17.128 0z"/>`,
  },
  sqlite: {
    label: "SQLite",
    color: "#003B57",
    svg: `<path d="M21.678.521C20.467-.607 19.033-.276 17.666.521L3.532 9.137a3.287 3.287 0 0 0-.92 4.68l.127.128-1.529 2.69a1.09 1.09 0 0 0 .9 1.658h1.146v1.73a1.09 1.09 0 0 0 .109 1.09a1.09 1.09 0 0 0 .718-.27l2.17-1.957a3.29 3.29 0 0 0 1.1.229 3.28 3.28 0 0 0 1.644-.44l14.135-8.616C25.847 9.055 26.201 7.62 25.416 6.41a3.38 3.38 0 0 0-.67-.81L21.678.521z"/>`,
  },
  flutter: {
    label: "Flutter",
    color: "#02569B",
    svg: `<path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.006 12.299L9.03 17.587 12.727 21.27 21.68 12.299h-7.36zm-.006 3.394l-3.693 3.693L14.314 24h7.37l-7.37-7.37z"/>`,
  },
  mongodb: {
    label: "MongoDB",
    color: "#47A248",
    svg: `<path d="M17.193 11.235c-.477-.66-1.127-1.428-1.554-1.92a29.835 29.835 0 00-1.89-1.986c-.574-.536-1.144-1.022-1.536-1.332-.234-.184-.442-.332-.613-.443V0c-.06.012-.132.033-.19.055a40.063 40.063 0 00-2.33 1.055 31.78 31.78 0 00-4.004 2.457A27.18 27.18 0 002.39 6.842a22.11 22.11 0 00-1.92 4.41c-.247 1.05-.34 2.213-.197 3.327.143 1.11.49 2.186 1.006 3.125a12.87 12.87 0 003.565 4.148c.143.11.286.216.435.316l.163-.195v-3.79c0-.495-.03-.984-.105-1.47a11.96 11.96 0 01-.197-2.613c.09-1.08.413-2.126.938-3.056.495-.873 1.158-1.616 1.83-2.228.663-.604 1.345-1.096 1.896-1.417.26-.153.486-.255.67-.323v13.684c.14.072.316.14.484.183.172.046.353.072.533.072a2.38 2.38 0 00.912-.18v-13.76c.183.064.41.163.67.316.55.32 1.233.81 1.896 1.413.672.608 1.335 1.348 1.83 2.22a10.966 10.966 0 01.938 3.057c.075.875.012 1.758-.198 2.614-.075.485-.105.975-.105 1.47v3.79l.162.195a12.87 12.87 0 004-4.464 15.02 15.02 0 001.007-3.126 15.113 15.113 0 00.198-3.327c.14-1.113.047-2.274-.2-3.327a22.11 22.11 0 00-1.92-4.41z"/>`,
  },
  figma: {
    label: "Figma",
    color: "",
    isMulticolor: true,
    svg: `<path d="M12 22a5 5 0 0 1-5-5 5 5 0 0 1 5-5v10z" fill="#0ACF83"/><path d="M12 12a5 5 0 0 1-5-5 5 5 0 0 1 5-5v10z" fill="#F24E1E"/><path d="M12 2h5a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-5V2z" fill="#FF7262"/><path d="M12 12h5a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-5v-10z" fill="#18A0FB"/><path d="M7 17a5 5 0 0 1 5-5H7v5z" fill="#A259FF"/>`,
  },
  expo: {
    label: "Expo CLI",
    color: "#ffffff",
    svg: `<path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-22C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.586 11.586L12 17.172l-3.586-3.586a1 1 0 0 1 0-1.414l3.586-3.586 3.586 3.586a1 1 0 0 1 0 1.414z"/>`
  },
  agenticai: {
    label: "Agentic AI",
    color: "#a855f7",
    svg: `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5A2.5 2.5 0 0 1 9.5 7A2.5 2.5 0 0 1 7 4.5A2.5 2.5 0 0 1 9.5 2M14.5 17A2.5 2.5 0 0 1 17 19.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 12 19.5a2.5 2.5 0 0 1 2.5-2.5M4.5 9.5A2.5 2.5 0 0 1 7 12a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 2 12a2.5 2.5 0 0 1 4.5-2.5m15 0a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5M12 10.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M9.5 5.5l-5 6.5m10 7.5l-5-6.5m.5-.5L18.5 11m-14 1l9 7m-9-7.5l5.5-2m5 1.5l1.5-3"/>`
  },
  mcp: {
    label: "MCP",
    color: "#3b82f6",
    svg: `<path d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4zM8 6h.01M8 12h.01M8 18h.01M16 6h2v0M16 12h2v0M16 18h2v0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`
  },
  prompteng: {
    label: "Prompt Engineering",
    color: "#f59e0b",
    svg: `<path d="M2 17l10-10 4 4L6 21H2v-4zm18.5-11.5a2.12 2.12 0 0 0-3-3l-2.5 2.5l3 3l2.5-2.5zM19 13.5l1.5.5l-1.5.5l-.5 1.5l-.5-1.5l-1.5-.5l1.5-.5l.5-1.5l.5 1.5zM7 3.5l1 .5l-1 .5l-.5 1l-.5-1l-1-.5l1-.5l.5-1l.5 1z"/>`
  },
  multiagent: {
    label: "Multi-Agent Systems",
    color: "#ec4899",
    svg: `<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10zm-6-10a6 6 0 1 1 12 0a6 6 0 0 1-12 0zm3-3a3 3 0 1 1 6 0a3 3 0 0 1-6 0z" fill="none" stroke="currentColor" stroke-width="2"/>`
  },
  claude: {
    label: "Claude",
    color: "#d97706",
    svg: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 15.5V14H9v-2h2V9.5c0-1.38 1.12-2.5 2.5-2.5H15v2h-1.5c-.28 0-.5.22-.5.5V12h2v2h-2v3.5h-2z"/>`
  },
  gemini: {
    label: "Gemini",
    color: "#60a5fa",
    svg: `<path d="M12 2c0 5.523 4.477 10 10 10c-5.523 0-10 4.477-10 10c0-5.523-4.477-10-10-10c5.523 0 10-4.477 10-10zm-6 14c0 2.209 1.791 4 4 4c-2.209 0-4 1.791-4 4c0-2.209-1.791-4-4-4c2.209 0 4-1.791 4-4z"/>`
  },
  chatgpt: {
    label: "ChatGPT",
    color: "#10b981",
    svg: `<path d="M20.1 11.2a5.2 5.2 0 0 0-3-4.7a5.2 5.2 0 0 0-7.3-3.1a5.2 5.2 0 0 0-5.3 4.3a5.2 5.2 0 0 0 .8 5.7a5.2 5.2 0 0 0 3 4.7a5.2 5.2 0 0 0 7.3 3.1a5.2 5.2 0 0 0 5.3-4.3a5.2 5.2 0 0 0-.8-5.7zm-2.8 3.8a3.2 3.2 0 0 1-1.7.5a3.2 3.2 0 0 1-1.1-.2l-3.3-1.9v-2.3l3-1.7a1.2 1.2 0 0 0 .6-1v-2.3a3.2 3.2 0 0 1 1.7.5a3.2 3.2 0 0 1 1.1 1l-1.9 1.1a1.2 1.2 0 0 0-.6 1v3.5a1.2 1.2 0 0 0 .7 1.3zm-7-9.5a3.2 3.2 0 0 1 1.7-.5a3.2 3.2 0 0 1 1.1.2l3.3 1.9v2.3l-3 1.7a1.2 1.2 0 0 0-.6 1v2.3a3.2 3.2 0 0 1-1.7-.5a3.2 3.2 0 0 1-1.1-1l1.9-1.1a1.2 1.2 0 0 0 .6-1V8.5a1.2 1.2 0 0 0-.7-1.3z"/>`
  },
  higgsfield: {
    label: "Higgsfield",
    color: "#ec4899",
    svg: `<path d="M23 7l-7 5 7 5V7zM2 5h12v14H2V5zm6 4v6l4-3l-4-3z"/>`
  },
  cursor: {
    label: "Cursor",
    color: "#38bdf8",
    svg: `<path d="M4 15V2l9 9H7.8l-3.8 4zm5.5-2.5L14 20l2.5-1.5l-4.5-8L9.5 12.5z" fill="currentColor"/>`
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
  cursor: { name: "Cursor AI", desc: "AI-assisted codebase indexing, codebase chat interactions, prompt editing, and cursor composer multi-file refactoring." },
  whatnot: { name: "Agentic Tools", desc: "Automated coding assistants, Windsurf agentic ide workflows, v0 UI prototyping, and AI code generation pipelines." }
}

const TechIcon = ({ svg, label, isMulticolor }: { svg: string; label: string; isMulticolor?: boolean }) => (
  <span title={label} className="inline-flex shrink-0" aria-label={label}>
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill={isMulticolor ? undefined : "currentColor"}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  </span>
)

export function SkillsSection() {
  const { ref, inView } = useInView()
  
  // Interactive States
  const [activeFrontend, setActiveFrontend] = React.useState<keyof typeof skillsData>("react")
  const [activeMobile, setActiveMobile] = React.useState<"flutter" | "reactnative" | "expo">("flutter")
  const [activeBackend, setActiveBackend] = React.useState<"nodejs" | "mongodb" | "firebase" | "mysql" | "postgresql" | "sqlite">("nodejs")
  const [activeWorkflow, setActiveWorkflow] = React.useState<"figma" | "git" | "github" | "firebasehosting">("git")
  const [activeAI, setActiveAI] = React.useState<"agenticai" | "mcp" | "prompteng" | "multiagent" | "claude" | "gemini" | "chatgpt" | "higgsfield" | "cursor" | "whatnot">("agenticai")

  // Interactive mobile view
  const renderMobileDetails = () => {
    switch (activeMobile) {
      case "flutter":
        return (
          <div className="flex-1 flex flex-col justify-center items-center gap-3 text-center p-3 animate-fade-in">
            <div className="p-3.5 bg-blue-500/10 rounded-2xl text-blue-500 border border-blue-500/20">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-foreground">Fluid Performance</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">High-performance native compilation</p>
            </div>
          </div>
        )
      case "reactnative":
        return (
          <div className="flex-1 flex flex-col justify-center items-center gap-3 text-center p-3 animate-fade-in">
            <div className="p-3.5 bg-cyan-500/10 rounded-2xl text-cyan-500 border border-cyan-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-foreground">Native Integration</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Direct bridge to native components</p>
            </div>
          </div>
        )
      case "expo":
        return (
          <div className="flex-1 flex flex-col justify-center items-center gap-3 text-center p-3 animate-fade-in">
            <div className="p-3.5 bg-purple-500/10 rounded-2xl text-purple-400 border border-purple-500/20">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-foreground">Rapid Prototyping</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Accelerated updates pipeline</p>
            </div>
          </div>
        )
    }
  }

  return (
    <section id="skills" ref={ref} className="snap-section flex items-center py-20 w-full relative overflow-hidden bg-grid-subtle">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Section Header */}
        <div className={`text-center mb-16 ${inView ? "animate-fade-up delay-0" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Tech Stack &amp; Skills
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-semibold">
            An organized layout of the core visual design, programming tools, and databases I work with.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* 1. FRONT-END PANEL (Col Span 2, Row Span 2) */}
          <div className={`lg:col-span-2 flex flex-col ${inView ? "animate-scale-in delay-100" : "opacity-0"}`}>
            <Card className="flex-grow border border-border/60 bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden relative group transition-all duration-300 hover:shadow-lg">
              
              <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">Web Front-End Stack</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-border" />
                  <span className="w-2 h-2 rounded-full bg-border" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 min-h-[280px]">
                {/* Active Showcase Left (2 Cols) */}
                <div className="md:col-span-2 border-r border-border/40 p-5 space-y-4 bg-muted/10 flex flex-col justify-center">
                  <div key={activeFrontend} className="space-y-2 animate-fade-in">
                    <p className="text-xs font-black text-primary uppercase tracking-widest">Selected Tool</p>
                    <h3 className="text-lg font-black text-foreground">{skillsData[activeFrontend].name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                      {skillsData[activeFrontend].desc}
                    </p>
                  </div>
                </div>

                {/* Skill Chips Right (3 Cols) */}
                <div className="md:col-span-3 p-6 flex flex-col justify-center bg-card/30">
                  <div className="grid grid-cols-2 gap-2.5">
                    {(["html5", "css3", "javascript", "typescript", "react", "nextjs", "tailwind"] as const).map((key) => {
                      const icon = icons[key]
                      const isActive = activeFrontend === key
                      const isSpecialColor = key === "nextjs"
                      
                      return (
                        <div
                          key={key}
                          onMouseEnter={() => setActiveFrontend(key)}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl cursor-default transition-all duration-300 border backdrop-blur-md ${
                            isActive
                              ? "bg-primary/20 border-primary/50 text-foreground scale-[1.02] shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                              : "bg-muted/30 border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/60 hover:border-border/80"
                          }`}
                        >
                          <span
                            className={isSpecialColor ? "text-foreground" : ""}
                            style={isSpecialColor ? undefined : { color: icon.color }}
                          >
                            <TechIcon svg={icon.svg} label={icon.label} isMulticolor={icon.isMulticolor} />
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

          {/* 2. MOBILE SHOWCASE (Col Span 1, Row Span 2) */}
          <div className={`flex flex-col ${inView ? "animate-scale-in delay-200" : "opacity-0"}`}>
            <Card className="flex-grow border border-border/60 bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden relative group transition-all duration-300 hover:shadow-lg flex flex-col justify-between">

              <div className="px-5 py-4 border-b border-border/50 flex items-center gap-1.5 bg-muted/30">
                <Smartphone className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold text-foreground">Mobile Frameworks</span>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between gap-6">
                
                {/* Visual Frame */}
                <div className="w-full flex-grow flex flex-col justify-center items-center py-4 px-2 bg-black/10 rounded-2xl border border-border/40 min-h-[140px]">
                  {renderMobileDetails()}
                </div>

                {/* Mobile selector chips */}
                <div className="w-full flex flex-col gap-2">
                  {(["flutter", "reactnative", "expo"] as const).map((key) => {
                    const icon = icons[key]
                    const isActive = activeMobile === key
                    
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveMobile(key)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-300 border text-left backdrop-blur-md ${
                          isActive
                            ? "bg-primary/20 border-primary/50 text-foreground scale-[1.02] shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                            : "bg-muted/20 border-border/30 text-muted-foreground hover:text-foreground hover:bg-muted/40 hover:border-border/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span style={{ color: icon.color }}>
                            <TechIcon svg={icon.svg} label={icon.label} />
                          </span>
                          <span className="text-xs font-bold">{icon.label}</span>
                        </div>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                        }`} />
                      </button>
                    )
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* 3. DATABASE & BACK-END (Col Span 2, Row Span 1) */}
          <div className={`lg:col-span-2 flex flex-col ${inView ? "animate-scale-in delay-300" : "opacity-0"}`}>
            <Card className="flex-grow border border-border/60 bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden relative group transition-all duration-300 hover:shadow-lg flex flex-col justify-between">

              <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-1.5">
                  <Database className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">Back-End &amp; Database Stack</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-status-pulse" />
                  <span>Configured &amp; Active</span>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
                
                {/* Tech list (3 Cols) */}
                <div className="md:col-span-3 flex flex-col gap-2">
                  {(["nodejs", "mongodb", "firebase", "postgresql", "mysql", "sqlite"] as const).map((key) => {
                    const icon = icons[key]
                    const isActive = activeBackend === key
                    
                    return (
                      <div
                        key={key}
                        onMouseEnter={() => setActiveBackend(key)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all border cursor-default backdrop-blur-md ${
                          isActive
                            ? "bg-primary/20 border-primary/45 text-foreground scale-[1.02] shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                            : "bg-muted/15 border-border/30 text-muted-foreground hover:bg-muted/35 hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span style={{ color: icon.color }}>
                            <TechIcon svg={icon.svg} label={icon.label} />
                          </span>
                          <span className="text-xs font-bold">{icon.label}</span>
                        </div>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/35"
                        }`} />
                      </div>
                    )
                  })}
                </div>

                {/* Detail view pane (2 Cols) */}
                <div className="md:col-span-2 bg-black/10 rounded-xl border border-border/40 p-5 flex flex-col justify-center gap-3 min-h-[180px] text-center md:text-left">
                  <div key={activeBackend} className="space-y-1.5 animate-fade-in">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Database/Service</p>
                    <h4 className="text-sm font-extrabold text-foreground">{skillsData[activeBackend].name}</h4>
                    <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                      {skillsData[activeBackend].desc}
                    </p>
                  </div>
                </div>

              </div>
            </Card>
          </div>

          {/* 4. WORKFLOW & TOOLS (Col Span 1, Row Span 1) */}
          <div className={`flex flex-col ${inView ? "animate-scale-in delay-400" : "opacity-0"}`}>
            <Card className="flex-grow border border-border/60 bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden relative group transition-all duration-300 hover:shadow-lg flex flex-col justify-between">

              <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-1.5">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">Tools &amp; Utilities</span>
                </div>
                <GitFork className="h-3.5 w-3.5 text-muted-foreground" />
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between gap-5">
                
                {/* SVG Git Graph visual */}
                <div className="relative flex-grow flex items-center justify-between px-3 bg-black/10 py-5 rounded-xl border border-border/35">
                  
                  {(["figma", "git", "github", "firebasehosting"] as const).map((key) => {
                    const icon = key === "firebasehosting" ? icons.firebase : icons[key]
                    const isActive = activeWorkflow === key
                    const colors = {
                      figma: "border-orange-500 text-orange-500 bg-orange-500/10 shadow-orange-500/10",
                      git: "border-red-500 text-red-500 bg-red-500/10 shadow-red-500/10",
                      github: "border-foreground text-foreground bg-foreground/10 shadow-foreground/10",
                      firebasehosting: "border-amber-500 text-amber-500 bg-amber-500/10 shadow-amber-500/10"
                    }
                    
                    return (
                      <button
                        key={key}
                        onMouseEnter={() => setActiveWorkflow(key)}
                        className={`relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${
                          colors[key]
                        } ${
                          isActive
                            ? "scale-110 ring-2 ring-primary/45"
                            : "scale-100 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <TechIcon svg={icon.svg} label={icon.label} isMulticolor={icon.isMulticolor} />
                      </button>
                    )
                  })}
                </div>

                {/* Minimal description box */}
                <div key={activeWorkflow} className="p-4 bg-black/10 rounded-lg border border-border/40 text-xs text-center md:text-left min-h-[80px] flex flex-col justify-center animate-fade-in font-medium text-muted-foreground leading-relaxed">
                  {activeWorkflow === "figma" && "Figma: Creating responsive user interface wireframes, prototypes, and asset blueprints."}
                  {activeWorkflow === "git" && "Git: Managing versions, branches, tracking revisions, and local file checkpoints."}
                  {activeWorkflow === "github" && "GitHub: Managing shared remote repositories, pulling requests, and automated testing."}
                  {activeWorkflow === "firebasehosting" && "Hosting: Deploying optimized builds on fast edge servers with SSL certificates."}
                </div>

              </div>
            </Card>
          </div>

          {/* 5. AI & AUTOMATION (Col Span 3) */}
          <div className={`lg:col-span-3 flex flex-col ${inView ? "animate-scale-in delay-500" : "opacity-0"}`}>
            <Card className="flex-grow border border-border/60 bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden relative group transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
              
              <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-purple-500 dark:text-purple-400 animate-pulse" />
                  <span className="text-xs font-bold text-foreground">AI &amp; Automation Stack</span>
                </div>
                <div className="flex gap-1.5 items-center">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">Agentic Architectures</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 min-h-[200px]">
                {/* Selected AI Tool Details Left (2 Cols) */}
                <div className="md:col-span-2 border-r border-border/40 p-5 space-y-4 bg-muted/10 flex flex-col justify-center">
                  <div key={activeAI} className="space-y-2 animate-fade-in">
                    <p className="text-[9px] font-black text-purple-500 dark:text-purple-400 uppercase tracking-widest">Selected Skill</p>
                    <h3 className="text-base font-black text-foreground">{skillsData[activeAI].name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                      {skillsData[activeAI].desc}
                    </p>
                  </div>
                </div>

                {/* AI Chips Right (3 Cols) */}
                <div className="md:col-span-3 p-6 flex flex-col justify-center bg-card/30">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {(["agenticai", "mcp", "prompteng", "multiagent", "claude", "gemini", "chatgpt", "higgsfield", "cursor", "whatnot"] as const).map((key) => {
                      const icon = icons[key]
                      const isActive = activeAI === key
                      const isSpecialColor = key === "claude" || key === "gemini" || key === "chatgpt" || key === "cursor"
                      
                      return (
                        <div
                          key={key}
                          onMouseEnter={() => setActiveAI(key)}
                          className={`flex flex-col items-center justify-center gap-2 px-2 py-3.5 rounded-xl cursor-default transition-all duration-300 border text-center backdrop-blur-md ${
                            isActive
                              ? "bg-purple-500/20 border-purple-500/50 text-foreground scale-[1.02] shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                              : "bg-muted/20 border-border/30 text-muted-foreground hover:text-foreground hover:bg-muted/40 hover:border-border/50"
                          }`}
                        >
                          <span
                            style={isSpecialColor ? undefined : { color: icon.color }}
                            className={`${isSpecialColor ? "text-foreground" : ""} transition-transform duration-300 ${isActive ? "scale-110" : ""}`}
                          >
                            <TechIcon svg={icon.svg} label={icon.label} />
                          </span>
                          <span className="text-[9.5px] font-bold leading-tight select-none">{icon.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}
