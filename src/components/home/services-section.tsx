import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "./section-header";
import { services } from "@/lib/content/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section className="bg-bg-2/50">
      <div className="container-p section">
        <SectionHeader eyebrow="Coaching options" title="Choose the level of support that matches your lifestyle." />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-card border p-6 sm:p-7",
                  s.highlighted
                    ? "border-accent/40 bg-surface shadow-[0_24px_60px_-30px_var(--accent)]"
                    : "surface-card",
                )}
              >
                {s.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-accent-ink">
                    Most complete
                  </span>
                )}
                <h3 className="text-2xl font-bold">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.tagline}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {s.includes.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-olive/15 text-olive">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      <span className="capitalize">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  className={cn(
                    "btn mt-6",
                    s.highlighted ? "btn-primary" : "btn-secondary",
                  )}
                >
                  {s.ctaLabel}
                  <ArrowRight className="size-4" strokeWidth={2} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
