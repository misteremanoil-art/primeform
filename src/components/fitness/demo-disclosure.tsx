"use client";

import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const defaultText = {
  en: "Demonstration data used for portfolio purposes.",
  ro: "Date demonstrative folosite în scop de portofoliu.",
} as const;

/**
 * Small reusable "fictional data" tag. The brief requires it on stats,
 * results, testimonials, coach credentials and pricing. Parents may pass their
 * own children; otherwise a localized default is shown.
 */
export function DemoDisclosure({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { lang } = useI18n();
  return (
    <p
      className={cn(
        "inline-flex items-center gap-1.5 text-[0.68rem] font-medium leading-tight text-faint",
        className,
      )}
    >
      <Info className="size-3 shrink-0" strokeWidth={1.8} aria-hidden />
      <span>{children ?? defaultText[lang]}</span>
    </p>
  );
}
