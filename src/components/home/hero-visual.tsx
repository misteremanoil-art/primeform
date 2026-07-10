"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { MessageSquare } from "lucide-react";
import { TrainingHalo } from "@/components/fitness/training-halo";
import { PRBadge } from "@/components/fitness/pr-badge";
import { StatsPanel } from "@/components/fitness/stats-panel";
import { GlassCard } from "@/components/ui/glass-card";
import { CoachPortrait } from "./coach-portrait";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  // Parallax capped at ±4–5px per the visual direction.
  const panelX = useTransform(sx, (v) => v * 8);
  const panelY = useTransform(sy, (v) => v * 8);
  const cardX = useTransform(sx, (v) => v * -10);
  const cardY = useTransform(sy, (v) => v * -10);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto hidden h-[600px] w-full max-w-[560px] lg:block"
    >
      {/* Halo + abstract portrait */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2">
        <TrainingHalo size={480}>
          <CoachPortrait className="size-[280px]" />
        </TrainingHalo>
      </div>

      {/* Floating stats panel */}
      <motion.div
        style={{ x: panelX, y: panelY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-2 right-0 w-[330px]"
      >
        <StatsPanel showDisclosure={false} startHref="/login" />
      </motion.div>

      {/* Floating PR card */}
      <motion.div
        style={{ x: cardX, y: cardY }}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-6 w-[240px]"
      >
        <PRBadge exercise="Incline Press" detail="28 kg × 9" />
      </motion.div>

      {/* Floating coach message */}
      <motion.div
        style={{ x: cardX, y: cardY }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-4 bottom-16 w-[232px]"
      >
        <GlassCard variant="air" className="rounded-md p-3.5">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-accent/15 text-accent">
              <MessageSquare className="size-3.5" strokeWidth={1.9} />
            </span>
            <span className="text-[0.62rem] font-bold uppercase tracking-wider text-muted">
              Coach · Daniel
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink">
            “Keep the same weight for the final set and focus on control.”
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}

/** Simplified stacked visual for mobile — no fragile overlaps. */
export function HeroVisualMobile() {
  return (
    <div className="lg:hidden">
      <div className="mx-auto grid max-w-[360px] place-items-center">
        <TrainingHalo size={300}>
          <CoachPortrait className="size-[172px]" />
        </TrainingHalo>
      </div>
      <div className="mt-6">
        <StatsPanel startHref="/login" />
      </div>
    </div>
  );
}
