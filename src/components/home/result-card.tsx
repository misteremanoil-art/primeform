import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { CoachPortrait } from "./coach-portrait";
import type { CaseStudy } from "@/lib/content/case-studies";

/** Mini case-study card — abstract composition, key metrics, quote. Reused on
 *  the homepage and the /results grid. */
export function ResultCard({ study }: { study: CaseStudy }) {
  return (
    <GlassCard variant="solid" className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative">
        <CoachPortrait rounded="" className="h-40 w-full" />
        <div className="absolute left-4 top-4 pill border-transparent bg-bg/70 text-ink backdrop-blur">
          {study.name} · {study.duration}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-accent">{study.focus}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="tnum font-heading text-4xl font-bold">
            {study.headline.value}
          </span>
          <span className="text-sm text-muted">{study.headline.label}</span>
        </div>
        <ul className="mt-4 space-y-1.5">
          {study.metrics.map((m) => (
            <li key={m.label} className="flex items-center justify-between text-sm">
              <span className="text-muted">{m.label}</span>
              <span className="tnum font-semibold">{m.value}</span>
            </li>
          ))}
        </ul>
        <blockquote className="mt-5 border-l-2 border-accent/40 pl-3 text-sm italic leading-relaxed text-muted">
          “{study.quote}”
        </blockquote>
        <Link
          href={`/results/${study.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
        >
          View full journey
          <ArrowRight className="size-4" strokeWidth={2} />
        </Link>
      </div>
    </GlassCard>
  );
}
