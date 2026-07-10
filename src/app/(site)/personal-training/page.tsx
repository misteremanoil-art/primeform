import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageIntro } from "@/components/site/page-intro";
import { SectionHeader } from "@/components/home/section-header";
import { PricingCard } from "@/components/site/pricing-card";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";

export const metadata: Metadata = {
  title: "Personal Training",
  description:
    "Private one-to-one coaching sessions focused on technique, confidence and measurable progression.",
};

const sessionFocus = [
  "strength development",
  "fat-loss focused training",
  "technique improvement",
  "beginner gym confidence",
  "mobility and movement quality",
  "return to structured exercise",
  "performance tracking",
];

const beforeFirst = [
  "goal discussion",
  "training history",
  "injury and limitation review",
  "schedule and availability",
  "basic movement assessment",
  "initial programme direction",
];

export default function PersonalTrainingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Personal Training"
        title="Private coaching built around your movement, confidence and progress."
        cta={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "Check Availability", href: "/book" }}
      >
        One-to-one training sessions for people who want expert guidance, better
        technique and a plan that goes beyond simply completing exercises.
      </PageIntro>

      {/* Session focus + before first session */}
      <section className="container-p section">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <GlassCard variant="solid" className="h-full p-6 sm:p-8">
              <SectionHeader title="Session focus" />
              <p className="mt-2 text-sm text-muted">
                Personal training sessions may include:
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {sessionFocus.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    <span className="capitalize">{s}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard variant="solid" className="h-full p-6 sm:p-8">
              <SectionHeader title="Before the first session" />
              <p className="mt-2 text-sm text-muted">
                What happens before the first session:
              </p>
              <ul className="mt-5 space-y-3">
                {beforeFirst.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 text-sm">
                    <span className="tnum grid size-6 shrink-0 place-items-center rounded-full bg-ink/5 text-xs font-bold text-muted">
                      {i + 1}
                    </span>
                    <span className="capitalize">{s}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-bg-2/50">
        <div className="container-p section">
          <SectionHeader eyebrow="Pricing" title="Sessions and packages." align="center" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
            <PricingCard
              name="Single Session"
              price="€40"
              description="One private training session."
              cta={{ label: "Check Availability", href: "/book" }}
            />
            <PricingCard
              highlighted
              badge="Best value"
              name="8-Session Package"
              price="€280"
              description="Eight personal training sessions with progress tracking."
              cta={{ label: "Check Availability", href: "/book" }}
            />
            <PricingCard
              name="Hybrid Package"
              price="From €249"
              per="per month"
              description="Personal training sessions combined with online programming and weekly check-ins."
              cta={{ label: "Check Availability", href: "/book" }}
            />
          </div>
          <DemoDisclosure className="mx-auto mt-8 w-full justify-center">
            Pricing is fictional and used only to demonstrate service presentation.
          </DemoDisclosure>
        </div>
      </section>

      {/* CTA */}
      <section className="container-p section">
        <GlassCard variant="standard" className="rounded-section p-8 text-center sm:p-12">
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)]">Ready to train with a plan?</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Book a consultation and we will discuss your goal, training history and the
            best way to start.
          </p>
          <Link href="/book" className="btn btn-primary mt-7">
            Book a Consultation
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </GlassCard>
      </section>
    </>
  );
}
