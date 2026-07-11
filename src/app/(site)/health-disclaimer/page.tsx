import type { Metadata } from "next";
import { HealthDisclaimerContent } from "./health-disclaimer-content";

export const metadata: Metadata = {
  title: "Health Disclaimer",
  description:
    "General educational and demonstration health information for the PRIMEFORM demo. Not a substitute for medical advice.",
};

export default function HealthDisclaimerPage() {
  return <HealthDisclaimerContent />;
}
