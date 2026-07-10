import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Atmosphere } from "@/components/site/atmosphere";
import { CookieBanner } from "@/components/site/cookie-banner";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
          <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
          <CookieBanner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
