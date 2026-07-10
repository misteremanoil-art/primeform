import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type GlassVariant = "air" | "standard" | "dense" | "solid";

const variantClass: Record<GlassVariant, string> = {
  air: "glass glass-air",
  standard: "glass glass-standard",
  dense: "glass glass-dense",
  solid: "surface-card",
};

type GlassCardProps<T extends ElementType> = {
  as?: T;
  variant?: GlassVariant;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function GlassCard<T extends ElementType = "div">({
  as,
  variant = "standard",
  className,
  ...props
}: GlassCardProps<T>) {
  const Comp = (as ?? "div") as ElementType;
  return <Comp className={cn(variantClass[variant], className)} {...props} />;
}
