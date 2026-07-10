"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-line p-0.5",
        className,
      )}
      role="group"
      aria-label="Colour theme"
    >
      {options.map(({ value, label, Icon }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={`${label} theme`}
            aria-pressed={active}
            onClick={() => setTheme(value)}
            className={cn(
              "grid size-8 place-items-center rounded-full transition-colors",
              active
                ? "bg-accent text-accent-ink"
                : "text-muted hover:text-ink",
            )}
          >
            <Icon className="size-4" strokeWidth={1.8} />
          </button>
        );
      })}
    </div>
  );
}
