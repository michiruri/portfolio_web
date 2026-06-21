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
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Railey Mitchell Q. Capitis — Founder, Ri Software Solutions",
  description:
    "Owner of RI SOFTWARE SOLUTIONS. Founder & Lead Engineer building Triage (B2B) and Futari (B2C). Full-stack architect on Firebase, Next.js, and Vertex AI.",
  keywords: [
    "Railey Mitchell Quimson Capitis",
    "Railey Mitchell Q. Capitis",
    "Railey Mitchell Capitis",
    "Ri Software Solutions",
    "Triage",
    "Futari",
    "AI SaaS",
    "Firebase",
    "Next.js",
    "Vertex AI",
    "Pangasinan State University",
    "PSU Urdaneta",
    "Web Developer",
    "Philippines IT Graduate",
  ],
  openGraph: {
    title: "Ri Software Solutions · Railey Mitchell Quimson Capitis",
    description:
      "Owner of RI SOFTWARE SOLUTIONS. Founder & Lead Engineer building Triage (B2B) and Futari (B2C).",
    url: "https://raileymitchellcapitis.web.app",
    siteName: "Ri Software Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ri Software Solutions · Railey Mitchell Quimson Capitis",
    description:
      "Owner of RI SOFTWARE SOLUTIONS. Founder & Lead Engineer building Triage (B2B) and Futari (B2C).",
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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground relative overflow-x-hidden">
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

