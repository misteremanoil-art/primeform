import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { SectionHeader } from "./section-header";
import { ResultCard } from "./result-card";
import { caseStudies } from "@/lib/content/case-studies";

export function ResultsSection() {
  return (
    <section className="container-p section">
      <SectionHeader eyebrow="Client journeys" title="Progress measured beyond a before-and-after photo.">
        Every client starts from a different place. The goal is not to chase the
        fastest possible change. It is to build progress that can be repeated and
        maintained.
      </SectionHeader>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {caseStudies.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.08}>
            <ResultCard study={s} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/results" className="btn btn-secondary">
          View All Demo Results
          <ArrowRight className="size-4" strokeWidth={2} />
        </Link>
        <DemoDisclosure>Names, images and data shown in this demo are fictional.</DemoDisclosure>
      </div>
    </section>
  );
}
