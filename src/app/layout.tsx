import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/lib/i18n";
import { Atmosphere } from "@/components/site/atmosphere";
import { CookieBanner } from "@/components/site/cookie-banner";
import { Toaster } from "@/components/ui/toaster";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// The demo's home is the studio gallery. It also ships to Vercel from this repo,
// but that copy points here rather than competing as a second original.
const siteUrl = "https://emanoil.studio/demos/coaching";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PRIMEFORM — Personalised Fitness Coaching · Demo by Emanoil Studio",
    template: "%s · PRIMEFORM",
  },
  description:
    "A fictional premium fitness-coaching platform demo: conversion website, client portal and coach dashboard connected end to end. Built by Emanoil Studio.",
  applicationName: "PRIMEFORM",
  authors: [{ name: "Emanoil Studio", url: "https://emanoil.studio" }],
  keywords: [
    "fitness coaching",
    "personal training",
    "online coaching",
    "client portal",
    "coach dashboard",
    "Emanoil Studio",
  ],
  openGraph: {
    title: "PRIMEFORM — Personalised Fitness Coaching",
    description:
      "A connected coaching platform demo — website, client portal and coach dashboard. Designed and developed by Emanoil Studio.",
    url: siteUrl,
    siteName: "PRIMEFORM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRIMEFORM — Personalised Fitness Coaching",
    description:
      "A connected coaching platform demo by Emanoil Studio.",
  },
  // A demo of a fictional business has no reason to be in search results, and
  // the gallery serves every demo under a noindex header anyway.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#333333" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Atmosphere />
          {/* Fluid particle field — one fixed backdrop behind the whole site */}
          <FluidParticlesBackground
            particleCount={600}
            noiseIntensity={0.009}
            speed={4.5}
            flowSpeed={0.0035}
            particleSize={{ min: 0.6, max: 2.4 }}
            className="pointer-events-none fixed inset-0 z-0 bg-transparent"
          />
          <Suspense fallback={null}>
            <LanguageProvider>
              <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
              <CookieBanner />
              <Toaster />
            </LanguageProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
