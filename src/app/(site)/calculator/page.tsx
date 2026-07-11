import type { Metadata } from "next";
import { CalculatorContent } from "./calculator-content";

export const metadata: Metadata = {
  title: "Calorie Calculator",
  description:
    "Estimate your daily calorie needs with the Mifflin-St Jeor equation. Educational demo — not medical advice.",
};

export default function CalculatorPage() {
  return <CalculatorContent />;
}
