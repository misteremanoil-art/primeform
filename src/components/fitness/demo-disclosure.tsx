import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Small reusable "fictional data" tag. The brief requires it on stats,
 * results, testimonials, coach credentials and pricing.
 */
export function DemoDisclosure({
  children = "Demonstration data used for portfolio purposes.",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-1.5 text-[0.68rem] font-medium leading-tight text-faint",
        className,
      )}
    >
      <Info className="size-3 shrink-0" strokeWidth={1.8} aria-hidden />
      <span>{children}</span>
    </p>
  );
}
