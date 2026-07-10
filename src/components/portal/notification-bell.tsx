"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";
import { usePrimeStore } from "@/lib/store/store";
import { cn } from "@/lib/utils";

export function NotificationBell({ audience }: { audience: "client" | "coach" }) {
  // Select the stable array; filter during render (a filter inside the
  // selector returns a new array each call and trips Zustand's loop guard).
  const allNotifications = usePrimeStore((s) => s.notifications);
  const notifications = allNotifications.filter((n) => n.audience === audience);
  const markRead = usePrimeStore((s) => s.markNotificationsRead);
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  const toggle = () => {
    setOpen((o) => {
      if (!o && unread > 0) markRead(audience);
      return !o;
    });
  };

  const sorted = [...notifications].sort((a, b) => a.order - b.order);

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="relative grid size-9 place-items-center rounded-full text-muted transition-colors hover:text-ink"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
      >
        <Bell className="size-5" strokeWidth={1.8} />
        {unread > 0 && (
          <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-accent text-[0.55rem] font-bold text-accent-ink">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="glass glass-dense absolute right-0 top-11 z-50 w-72 rounded-card p-2"
            >
              <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted">
                Notifications
              </p>
              {sorted.length === 0 ? (
                <p className="px-3 py-4 text-sm text-muted">You are all caught up.</p>
              ) : (
                <ul className="max-h-80 overflow-y-auto">
                  {sorted.map((n) => (
                    <li
                      key={n.id}
                      className={cn(
                        "flex gap-2.5 rounded-md px-3 py-2.5 text-sm",
                        !n.read && "bg-accent/6",
                      )}
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {n.text}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
