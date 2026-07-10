import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingProps {
  id?: string;
  name: string;
  price: string;
  per?: string;
  description?: string;
  includes?: string[];
  cta?: { label: string; href: string };
  note?: string;
  highlighted?: boolean;
  badge?: string;
  className?: string;
}

export function PricingCard({
  id,
  name,
  price,
  per,
  description,
  includes,
  cta,
  note,
  highlighted,
  badge,
  className,
}: PricingProps) {
  return (
    <div
      id={id}
      className={cn(
        "relative flex h-full scroll-mt-28 flex-col rounded-card border p-6 sm:p-7",
        highlighted
          ? "border-accent/40 bg-surface shadow-[0_24px_60px_-30px_var(--accent)]"
          : "surface-card",
        className,
      )}
    >
      {badge && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-accent-ink">
          {badge}
        </span>
      )}
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="tnum font-heading text-4xl font-bold">{price}</span>
        {per && <span className="text-sm text-muted">{per}</span>}
      </div>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
      )}
      {includes && includes.length > 0 && (
        <ul className="mt-5 flex-1 space-y-2.5">
          {includes.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-olive/15 text-olive">
                <Check className="size-3" strokeWidth={2.5} />
              </span>
              <span className="capitalize">{f}</span>
            </li>
          ))}
        </ul>
      )}
      {cta && (
        <Link
          href={cta.href}
          className={cn("btn mt-6", highlighted ? "btn-primary" : "btn-secondary")}
        >
          {cta.label}
          <ArrowRight className="size-4" strokeWidth={2} />
        </Link>
      )}
      {note && <p className="mt-3 text-xs text-faint">{note}</p>}
    </div>
  );
}
