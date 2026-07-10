import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { CoachPortrait } from "@/components/home/coach-portrait";
import { BarbellTimeline } from "@/components/fitness/barbell-timeline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Result" };
  return {
    title: `${study.name} — ${study.focus}`,
    description: `${study.name}'s ${study.duration} journey — ${study.achievement} Fictional demo case study.`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <article className="container-p section">
      <Link
        href="/results"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" strokeWidth={2} />
        All results
      </Link>

      {/* Header */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <Reveal>
          <p className="eyebrow text-accent">{study.focus}</p>
          <h1 className="mt-3 text-[clamp(2.4rem,6vw,4rem)] leading-[1.04]">
            {study.name} · {study.duration}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {study.profile}
          </p>
          <blockquote className="mt-6 border-l-2 border-accent/50 pl-4 text-lg italic leading-relaxed">
            “{study.quote}”
          </blockquote>
        </Reveal>
        <Reveal delay={0.08}>
          {/* PHOTO: transformation composition, warm grading — see VISUAL_DIRECTION §32 */}
          <CoachPortrait rounded="rounded-hero" className="aspect-[4/5] w-full" />
        </Reveal>
      </div>

      {/* Key metrics */}
      <Reveal className="mt-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {study.metrics.map((m) => (
            <GlassCard key={m.label} variant="solid" className="p-6">
              <p className="tnum font-heading text-4xl font-bold">{m.value}</p>
              <p className="mt-1 text-sm text-muted">{m.label}</p>
            </GlassCard>
          ))}
        </div>
      </Reveal>

      {/* Body */}
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-10">
          <Section title="Starting situation">
            <p className="text-muted">{study.startingSituation}</p>
          </Section>
          <Section title="Main obstacles">
            <ul className="space-y-2.5">
              {study.obstacles.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                  {o}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Coaching approach">
            <p className="text-muted">{study.approach}</p>
          </Section>
          <Section title="Programme structure">
            <p className="font-medium">{study.programme}</p>
          </Section>
          <Section title="Lessons from the process">
            <ul className="space-y-2.5">
              {study.lessons.map((l) => (
                <li key={l} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-olive/15 text-olive">
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="space-y-8">
          <Section title="Progress timeline">
            <BarbellTimeline
              items={study.timeline.map((t) => ({
                marker: t.marker,
                title: "",
                detail: t.detail,
              }))}
            />
          </Section>
          <GlassCard variant="solid" className="p-6">
            <p className="eyebrow">Related coaching option</p>
            <p className="mt-2 text-lg font-bold">{study.relatedService}</p>
            <Link
              href={study.relatedHref}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-ink"
            >
              Explore this option
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </GlassCard>
        </div>
      </div>

      <DemoDisclosure className="mt-12">
        {study.name} is a fictional client. Names, images and data are for
        demonstration only.
      </DemoDisclosure>

      <div className="mt-10">
        <Link href="/apply" className="btn btn-primary">
          Apply for Coaching
          <ArrowRight className="size-4" strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-3 leading-relaxed">{children}</div>
    </section>
  );
}
