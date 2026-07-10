"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[95]">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass glass-dense absolute inset-y-0 right-0 flex w-full max-w-md flex-col rounded-l-hero"
          >
            <div className="flex items-center justify-between border-b border-line p-5">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="text-faint hover:text-ink">
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
