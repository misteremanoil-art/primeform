import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const inputCls =
  "w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent";
export const labelCls =
  "text-[0.72rem] font-semibold uppercase tracking-wide text-muted";

export function Field({
  label,
  optional,
  error,
  children,
  className,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className={labelCls}>
        {label}
        {optional && <span className="ml-1 lowercase text-faint">(optional)</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs font-medium text-danger">{error}</p>}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputCls, props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} rows={props.rows ?? 4} className={cn(inputCls, "resize-y", props.className)} />;
}

export function SelectInput({
  options,
  placeholder,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
  placeholder?: string;
}) {
  return (
    <select {...props} className={cn(inputCls, props.className)}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/** Single-select option cards. */
export function RadioCards({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  columns?: number;
}) {
  return (
    <div
      className="grid gap-2.5"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            type="button"
            key={o}
            onClick={() => onChange(o)}
            aria-pressed={active}
            className={cn(
              "flex items-center gap-2.5 rounded-md border px-4 py-3 text-left text-sm transition-colors",
              active
                ? "border-accent bg-accent/8 text-ink"
                : "border-line text-muted hover:border-line-strong hover:text-ink",
            )}
          >
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded-full border",
                active ? "border-accent bg-accent" : "border-line-strong",
              )}
            >
              {active && <span className="size-1.5 rounded-full bg-accent-ink" />}
            </span>
            {o}
          </button>
        );
      })}
    </div>
  );
}

/** Multi-select option cards. */
export function CheckboxCards({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  columns?: number;
}) {
  const toggle = (o: string) =>
    onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  return (
    <div
      className="grid gap-2.5"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const active = value.includes(o);
        return (
          <button
            type="button"
            key={o}
            onClick={() => toggle(o)}
            aria-pressed={active}
            className={cn(
              "flex items-center gap-2.5 rounded-md border px-4 py-3 text-left text-sm transition-colors",
              active
                ? "border-accent bg-accent/8 text-ink"
                : "border-line text-muted hover:border-line-strong hover:text-ink",
            )}
          >
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded border",
                active ? "border-accent bg-accent text-accent-ink" : "border-line-strong",
              )}
            >
              {active && <Check className="size-3" strokeWidth={3} />}
            </span>
            {o}
          </button>
        );
      })}
    </div>
  );
}
