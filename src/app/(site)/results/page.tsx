import type { Metadata } from "next";
import { ResultsContent } from "./results-content";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Client journeys measured through consistency, performance and habits — not only a single photograph. All results are fictional demo data.",
};

export default function ResultsPage() {
  return <ResultsContent />;
}
