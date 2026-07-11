"use client";

import { CalendarX, Bell, Check, X, RefreshCw, UserX, Video, Phone, MessageCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/fitness/status-pill";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { useI18n } from "@/lib/i18n";
import type { BookingStatus } from "@/lib/store/types";

const methodIcon: Record<string, typeof Video> = {
  "Google Meet": Video,
  "Phone call": Phone,
  WhatsApp: MessageCircle,
  "WhatsApp call": MessageCircle,
};

const copy = {
  en: {
    title: "Bookings",
    subtitle: "Consultations and their status.",
    sendReminder: "Send reminder",
    markCompleted: "Mark completed",
    reschedule: "Reschedule",
    cancel: "Cancel",
    noShow: "No-show",
    reminderSent: "Reminder sent — demo only",
    markedCompleted: "Marked completed",
    markedRescheduled: "Marked rescheduled",
    bookingCancelled: "Booking cancelled",
    markedNoShow: "Marked as no-show",
    emptyTitle: "No consultations scheduled.",
    emptyBody: "New bookings will appear here automatically.",
  },
  ro: {
    title: "Programări",
    subtitle: "Consultațiile și statusul lor.",
    sendReminder: "Trimite reminder",
    markCompleted: "Marchează finalizat",
    reschedule: "Reprogramează",
    cancel: "Anulează",
    noShow: "Neprezentare",
    reminderSent: "Reminder trimis — doar demo",
    markedCompleted: "Marcat ca finalizat",
    markedRescheduled: "Marcat ca reprogramat",
    bookingCancelled: "Programare anulată",
    markedNoShow: "Marcat ca neprezentare",
    emptyTitle: "Nicio consultație programată.",
    emptyBody: "Programările noi vor apărea aici automat.",
  },
} as const;

export default function BookingsPage() {
  const { lang } = useI18n();
  const t = copy[lang];
  const bookings = usePrimeStore((s) => s.bookings);
  const updateBookingStatus = usePrimeStore((s) => s.updateBookingStatus);

  const sorted = [...bookings].sort((a, b) => a.order - b.order);

  const setStatus = (id: string, status: BookingStatus, msg: string) => {
    updateBookingStatus(id, status);
    toast(msg);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">{t.title}</h1>
        <p className="mt-1.5 text-muted">{t.subtitle}</p>
      </div>

      {sorted.length > 0 ? (
        <div className="space-y-3">
          {sorted.map((b) => {
            const Icon = methodIcon[b.method] ?? Video;
            return (
              <GlassCard key={b.id} variant="solid" className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{b.name}</p>
                    <p className="tnum text-sm text-muted">{b.when}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-faint">
                      <Icon className="size-3.5" strokeWidth={1.8} />
                      {b.type} · {b.method}
                    </p>
                  </div>
                  <StatusPill status={b.status} />
                </div>
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto border-t border-line pt-3">
                  <Act icon={Bell} label={t.sendReminder} onClick={() => toast(t.reminderSent)} />
                  <Act icon={Check} label={t.markCompleted} onClick={() => setStatus(b.id, "Completed", t.markedCompleted)} />
                  <Act icon={RefreshCw} label={t.reschedule} onClick={() => setStatus(b.id, "Rescheduled", t.markedRescheduled)} />
                  <Act icon={X} label={t.cancel} onClick={() => setStatus(b.id, "Cancelled", t.bookingCancelled)} />
                  <Act icon={UserX} label={t.noShow} onClick={() => setStatus(b.id, "No Show", t.markedNoShow)} />
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <div className="grid place-items-center rounded-section border border-dashed border-line py-16 text-center">
          <CalendarX className="size-8 text-faint" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-semibold">{t.emptyTitle}</p>
          <p className="text-sm text-muted">{t.emptyBody}</p>
        </div>
      )}
    </div>
  );
}

function Act({ icon: Icon, label, onClick }: { icon: typeof Bell; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-ink">
      <Icon className="size-3.5" strokeWidth={1.8} />
      {label}
    </button>
  );
}
