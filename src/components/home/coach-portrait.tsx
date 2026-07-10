import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Coach composition — a black-and-white line-art bodybuilder over a soft neutral
 * gradient. The artwork is blended so its white background drops out in light
 * mode (multiply) and, inverted, in dark mode (screen), so only the figure shows.
 */
export function CoachPortrait({
  className,
  rounded = "rounded-full",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn("relative isolate overflow-hidden", rounded, className)}
      style={{
        background:
          "radial-gradient(120% 90% at 50% 12%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 55%)," +
          "linear-gradient(180deg, var(--surface-2) 0%, var(--bg-2) 100%)",
      }}
    >
      {/* PHOTO: cinematic coach portrait — line-art placeholder, swap for a real photo later */}
      <Image
        src="/coach-bodybuilder.png"
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 768px) 60vw, 30vw"
        className="object-contain object-bottom p-[6%] mix-blend-multiply dark:mix-blend-screen dark:invert"
      />

      <div className="grain absolute inset-0 mix-blend-soft-light" />
    </div>
  );
}
