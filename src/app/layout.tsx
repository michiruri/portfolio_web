import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CosmicBackground } from "@/components/ui/cosmic-background";
import { ThemeTransitionOverlay } from "@/components/theme-transition-overlay";

// Inter — clean, highly readable humanist sans-serif used across the UI
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Railey Mitchell Q. Capitis — Solo Indie Developer",
  description:
    "Solo indie developer crafting personal, highly customizable web apps. Building and shipping full-stack products with Next.js, TypeScript, and cloud-native architecture — zero corporate bloat.",
  keywords: [
    "Railey Mitchell Quimson Capitis",
    "Railey Mitchell Q. Capitis",
    "Railey Mitchell Capitis",
    "Solo Indie Developer",
    "Indie Hacker",
    "Indie SaaS",
    "Solo SaaS Builder",
    "B2C SaaS",
    "Futari",
    "Svelte 5",
    "Next.js",
    "Firebase",
    "Google Cloud Platform",
    "GCP",
    "Gemini Enterprise Agent Platform",
    "Pangasinan State University",
    "PSU Urdaneta",
    "Web Developer",
    "Philippines IT Graduate",
  ],
  openGraph: {
    title: "Railey Mitchell Q. Capitis · Solo Indie Developer",
    description:
      "Solo indie developer crafting personal, highly customizable web apps. Building and shipping full-stack products with Next.js, TypeScript, and cloud-native architecture — zero corporate bloat.",
    url: "https://raileymitchellcapitis.web.app",
    siteName: "Railey Mitchell Capitis",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Railey Mitchell Q. Capitis · Solo Indie Developer",
    description:
      "Solo indie developer crafting personal, highly customizable web apps. Building and shipping full-stack products with Next.js, TypeScript, and cloud-native architecture — zero corporate bloat.",
    creator: "@michiruri_dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden max-w-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground relative overflow-x-hidden max-w-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CosmicBackground />
          <ThemeTransitionOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

