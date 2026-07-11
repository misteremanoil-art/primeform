import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Daniel, the fictional coach behind PRIMEFORM. A demo profile built by Emanoil Studio to show a complete digital coaching system.",
};

export default function AboutPage() {
  return <AboutContent />;
}
