import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function PageIntro({
  eyebrow,
  title,
  children,
  cta,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="container-p pb-6 pt-6 sm:pt-10">
      <Reveal className="max-w-3xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] leading-[1.04]">{title}</h1>
        {children && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</p>
        )}
        {(cta || secondary) && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {cta && (
              <Link href={cta.href} className="btn btn-primary">
                {cta.label}
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            )}
            {secondary && (
              <Link href={secondary.href} className="btn btn-secondary">
                {secondary.label}
              </Link>
            )}
          </div>
        )}
      </Reveal>
    </section>
  );
}
