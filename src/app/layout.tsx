import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CosmicBackground } from "@/components/ui/cosmic-background";

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
  title: "Railey Mitchell Q. Capitis | Web & Mobile Developer",
  description: "Portfolio of Railey Mitchell Q. Capitis — BS Information Technology graduate specializing in Web & Mobile Technologies, PSU Urdaneta City Campus.",
  keywords: [
    "Railey Mitchell Q. Capitis",
    "Railey Mitchell Capitis",
    "Web Developer",
    "Mobile Developer",
    "Pangasinan State University",
    "PSU Urdaneta",
    "PANELCO III OJT",
    "Next.js Portfolio",
    "Flutter Developer",
    "React Native Developer",
    "Philippines IT Graduate"
  ],
  openGraph: {
    title: "Railey Mitchell Q. Capitis | Web & Mobile Developer",
    description: "Portfolio of Railey Mitchell Q. Capitis — BS Information Technology graduate specializing in Web & Mobile Technologies.",
    url: "https://michiruri.web.app",
    siteName: "Railey Mitchell Capitis Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Railey Mitchell Q. Capitis | Web & Mobile Developer",
    description: "Portfolio of Railey Mitchell Q. Capitis — BS Information Technology graduate specializing in Web & Mobile Technologies.",
  }
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

