"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TrainingHalo } from "@/components/fitness/training-halo";
import { CoachPortrait } from "./coach-portrait";

export function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto hidden h-[560px] w-full max-w-[520px] place-items-center lg:grid">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <TrainingHalo size={480}>
          <CoachPortrait className="size-[280px]" />
        </TrainingHalo>
      </motion.div>
    </div>
  );
}

/** Simplified stacked visual for mobile. */
export function HeroVisualMobile() {
  return (
    <div className="grid place-items-center pt-2 lg:hidden">
      <TrainingHalo size={280}>
        <CoachPortrait className="size-[168px]" />
      </TrainingHalo>
    </div>
  );
}
