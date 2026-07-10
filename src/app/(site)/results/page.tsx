import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { ResultsGrid } from "@/components/results/results-grid";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Client journeys measured through consistency, performance and habits — not only a single photograph. All results are fictional demo data.",
};

export default function ResultsPage() {
  return (
    <>
      <PageIntro eyebrow="Client journeys" title="Every result has context.">
        Progress should be understood through consistency, performance, habits and the
        client&rsquo;s starting point — not only through a single photograph.
      </PageIntro>

      <section className="container-p section pt-4">
        <ResultsGrid />
        <DemoDisclosure className="mt-8">
          Names, images and data shown in this demo are fictional.
        </DemoDisclosure>
      </section>
    </>
  );
}
