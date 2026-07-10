import type { Metadata } from "next";
import { CoachShell } from "@/components/coach/coach-shell";

export const metadata: Metadata = {
  title: "Coach Dashboard",
};

export default function CoachLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <CoachShell>{children}</CoachShell>;
}
