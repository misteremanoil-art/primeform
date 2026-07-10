"use client";

import { useState } from "react";
import { SearchX } from "lucide-react";
import { ResultCard } from "@/components/home/result-card";
import { caseStudies, resultFilters } from "@/lib/content/case-studies";
import { cn } from "@/lib/utils";

export function ResultsGrid() {
  const [active, setActive] = useState<string>("All Results");

  const visible =
    active === "All Results"
      ? caseStudies
      : caseStudies.filter((c) => c.filters.includes(active));

  return (
    <div>
      {/* Filters */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {resultFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === f
                ? "border-transparent bg-accent text-accent-ink"
                : "border-line text-muted hover:text-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <ResultCard key={s.slug} study={s} />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid place-items-center rounded-section border border-dashed border-line py-20 text-center">
          <SearchX className="size-8 text-faint" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-semibold">No results match the selected filters.</p>
          <button
            onClick={() => setActive("All Results")}
            className="btn btn-secondary mt-5 h-10 min-h-0 px-4 py-0 text-sm"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
