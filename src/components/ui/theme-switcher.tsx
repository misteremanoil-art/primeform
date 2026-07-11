"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";
import { useI18n } from "@/lib/i18n";

const options = [
  { value: "system", label: { en: "System theme", ro: "Temă sistem" }, Icon: Monitor },
  { value: "light", label: { en: "Light theme", ro: "Temă luminoasă" }, Icon: Sun },
  { value: "dark", label: { en: "Dark theme", ro: "Temă întunecată" }, Icon: Moon },
] as const;

const groupLabel = { en: "Colour theme", ro: "Temă de culoare" } as const;

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { lang } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-line p-0.5",
        className,
      )}
      role="group"
      aria-label={groupLabel[lang]}
    >
      {options.map(({ value, label, Icon }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label[lang]}
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
