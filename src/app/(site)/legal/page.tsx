import type { Metadata } from "next";
import { LegalContent } from "./legal-content";

export const metadata: Metadata = {
  title: "Legal & Privacy",
  description:
    "Privacy summary, terms and cookie information for the PRIMEFORM demo by Emanoil Studio.",
};

export default function LegalPage() {
  return <LegalContent />;
}
