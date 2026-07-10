import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { CoachPortrait } from "./coach-portrait";
import { SectionHeader } from "./section-header";

export function CoachSection() {
  return (
    <section className="container-p section">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Visual */}
        <Reveal className="relative order-last lg:order-first">
          <div className="mx-auto max-w-[420px]">
            {/* PHOTO: editorial coach portrait, warm side light — see VISUAL_DIRECTION §32 */}
            <CoachPortrait rounded="rounded-hero" className="aspect-[4/5] w-full" />
          </div>
          <GlassCard
            variant="air"
            className="absolute -left-2 top-10 hidden rounded-md p-4 sm:block"
          >
            <p className="tnum font-heading text-2xl font-bold">8 yrs</p>
            <p className="text-xs text-muted">coaching experience</p>
          </GlassCard>
          <GlassCard
            variant="air"
            className="absolute -right-2 bottom-10 hidden rounded-md p-4 sm:block"
          >
            <p className="tnum font-heading text-2xl font-bold">300+</p>
            <p className="text-xs text-muted">client programmes</p>
          </GlassCard>
        </Reveal>

        {/* Copy */}
        <div>
          <SectionHeader
            eyebrow="Meet your coach"
            title="Coaching should make fitness feel clearer, not more complicated."
          >
            PRIMEFORM was created for people who are tired of jumping between
            programmes, diets and conflicting advice. The goal is simple: understand
            the client, create a realistic plan and use consistent feedback to improve
            it over time.
          </SectionHeader>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Coaching is not about forcing every client into the same routine. It is
              about building the right level of structure for the person in front of
              you.
            </p>
            <Link href="/about" className="btn btn-primary mt-8">
              Meet Daniel
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <DemoDisclosure className="mt-5">
              Coach identity, qualifications and experience are fictional.
            </DemoDisclosure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
