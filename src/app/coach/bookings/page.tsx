"use client";

import { CalendarX, Bell, Check, X, RefreshCw, UserX, Video, Phone, MessageCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/fitness/status-pill";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import type { BookingStatus } from "@/lib/store/types";

const methodIcon: Record<string, typeof Video> = {
  "Google Meet": Video,
  "Phone call": Phone,
  WhatsApp: MessageCircle,
  "WhatsApp call": MessageCircle,
};

export default function BookingsPage() {
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
        <h1 className="text-2xl font-bold sm:text-3xl">Bookings</h1>
        <p className="mt-1.5 text-muted">Consultations and their status.</p>
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
                  <Act icon={Bell} label="Send reminder" onClick={() => toast("Reminder sent — demo only")} />
                  <Act icon={Check} label="Mark completed" onClick={() => setStatus(b.id, "Completed", "Marked completed")} />
                  <Act icon={RefreshCw} label="Reschedule" onClick={() => setStatus(b.id, "Rescheduled", "Marked rescheduled")} />
                  <Act icon={X} label="Cancel" onClick={() => setStatus(b.id, "Cancelled", "Booking cancelled")} />
                  <Act icon={UserX} label="No-show" onClick={() => setStatus(b.id, "No Show", "Marked as no-show")} />
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <div className="grid place-items-center rounded-section border border-dashed border-line py-16 text-center">
          <CalendarX className="size-8 text-faint" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-semibold">No consultations scheduled.</p>
          <p className="text-sm text-muted">New bookings will appear here automatically.</p>
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
