import type { Metadata, Viewport } from "next";
import { Manrope, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Atmosphere } from "@/components/site/atmosphere";
import { CookieBanner } from "@/components/site/cookie-banner";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://primeform-demo.vercel.app";

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
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eee7" },
    { media: "(prefers-color-scheme: dark)", color: "#13110f" },
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
      className={`${manrope.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Atmosphere />
          <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
          <CookieBanner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
