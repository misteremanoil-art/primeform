import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { SectionHeader } from "@/components/home/section-header";
import { CoachPortrait } from "@/components/home/coach-portrait";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Daniel, the fictional coach behind PRIMEFORM. A demo profile built by Emanoil Studio to show a complete digital coaching system.",
};

const principles = [
  {
    title: "Personal before perfect",
    body: "The best programme is not the most advanced one. It is the one that fits the client and can be followed consistently.",
  },
  {
    title: "Progress must be measurable",
    body: "Training performance, body measurements, habits and recovery provide better decisions than emotion alone.",
  },
  {
    title: "Nutrition should be practical",
    body: "A nutrition plan should support the client's goal without making normal life impossible.",
  },
  {
    title: "Accountability should be constructive",
    body: "The purpose of a check-in is not to judge the client. It is to understand what happened and decide what comes next.",
  },
];

const credentials = [
  "Certified Personal Trainer",
  "Strength and Conditioning Specialist",
  "Nutrition Coaching Certification",
  "Eight years of coaching experience",
  "300+ completed client programmes",
];

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="Meet your coach" title="Fitness becomes easier to follow when the plan makes sense." />

      {/* Intro + portrait */}
      <section className="container-p section pt-4">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="order-last lg:order-first">
            <div className="mx-auto max-w-[420px]">
              {/* PHOTO: cinematic coach portrait, warm side light — see VISUAL_DIRECTION §32 */}
              <CoachPortrait rounded="rounded-hero" className="aspect-[4/5] w-full" />
            </div>
          </Reveal>
          <div>
            <p className="text-lg leading-relaxed text-muted">
              I am Daniel, the fictional coach behind PRIMEFORM. This demo profile
              represents the type of professional Emanoil Studio can build a complete
              digital coaching system for.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              The coaching philosophy is centred on clarity, personalisation and
              measurable progress.
            </p>
            <div className="mt-8 space-y-4 border-t border-line pt-8">
              <p className="leading-relaxed">
                Many people believe they need more discipline. Often, what they
                actually need is a plan designed for their current life rather than an
                ideal routine they cannot maintain.
              </p>
              <p className="leading-relaxed">
                PRIMEFORM was built around that idea. Every client receives clear
                expectations, regular feedback and a programme that can change when
                work, recovery, equipment or priorities change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-bg-2/50">
        <div className="container-p section">
          <SectionHeader eyebrow="Coaching principles" title="What guides every programme." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <GlassCard variant="solid" className="h-full p-6">
                  <span className="tnum font-heading text-3xl font-extrabold text-accent/25">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="container-p section">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Fictional credentials" title="Experience and qualifications." />
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {credentials.map((c) => (
                <div key={c} className="flex items-center gap-3 rounded-md border border-line bg-surface/50 p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/15 text-[color:var(--gold)]">
                    <Award className="size-4" strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-medium">{c}</span>
                </div>
              ))}
            </div>
            <DemoDisclosure className="mt-5">
              Coach identity, qualifications and experience are fictional and shown only
              for demonstration purposes.
            </DemoDisclosure>
            <Link href="/apply" className="btn btn-primary mt-7">
              Apply to Work Together
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
