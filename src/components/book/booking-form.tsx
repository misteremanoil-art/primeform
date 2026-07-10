"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck, Clock, Globe, Phone, Video, MessageCircle, CalendarPlus, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Field, TextInput, TextArea } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

const methods = [
  { label: "Google Meet", icon: Video },
  { label: "Phone call", icon: Phone },
  { label: "WhatsApp call", icon: MessageCircle },
];
const times = ["09:00", "10:30", "12:00", "14:00", "16:30", "18:00"];
const TIMEZONE = "Europe/Bucharest (EET)";

interface Day {
  key: string;
  label: string;
  weekday: string;
  dayNum: string;
  month: string;
  iso: string; // YYYYMMDD
}

export function BookingForm() {
  const createBooking = usePrimeStore((s) => s.createBooking);

  const [days, setDays] = useState<Day[]>([]);
  const [method, setMethod] = useState("Google Meet");
  const [dayKey, setDayKey] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [booked, setBooked] = useState<null | {
    dateLabel: string;
    time: string;
    method: string;
    iso: string;
  }>(null);

  // Compute the next 7 days on the client only (avoids SSR/CSR date drift).
  useEffect(() => {
    const out: Day[] = [];
    const base = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      out.push({
        key: `${yyyy}-${mm}-${dd}`,
        label: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
        weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
        dayNum: String(d.getDate()),
        month: d.toLocaleDateString("en-GB", { month: "short" }),
        iso: `${yyyy}${mm}${dd}`,
      });
    }
    setDays(out);
    setDayKey(out[0].key);
  }, []);

  const selectedDay = days.find((d) => d.key === dayKey);

  const confirm = () => {
    const e: Record<string, string> = {};
    if (!method) e.method = "This field is required.";
    if (!dayKey) e.day = "This field is required.";
    if (!time) e.time = "This time is no longer available.";
    if (!name.trim()) e.name = "This field is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!/^[+()\-\d\s]{7,}$/.test(phone)) e.phone = "Enter a valid phone number.";
    setErrors(e);
    if (Object.keys(e).length > 0 || !selectedDay) return;

    const when = `${selectedDay.label}, ${time}`;
    createBooking({ name, email, phone, method, when, notes });
    toast(
      "Confirmation email sent — demo only",
      "The booking now appears in the coach dashboard.",
      "success",
    );
    setBooked({ dateLabel: selectedDay.label, time, method, iso: selectedDay.iso });
  };

  const downloadIcs = () => {
    if (!booked) return;
    const [h, m] = booked.time.split(":");
    const start = `${booked.iso}T${h}${m}00`;
    const endMin = (parseInt(m) + 30) % 60;
    const endHour = parseInt(h) + (parseInt(m) + 30 >= 60 ? 1 : 0);
    const end = `${booked.iso}T${String(endHour).padStart(2, "0")}${String(endMin).padStart(2, "0")}00`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//PRIMEFORM//Demo//EN",
      "BEGIN:VEVENT",
      `UID:${booked.iso}-${h}${m}@primeform.demo`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      "SUMMARY:PRIMEFORM Coaching Consultation",
      `DESCRIPTION:30-minute consultation via ${booked.method}. Demo booking.`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "primeform-consultation.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (booked) {
    return (
      <GlassCard variant="standard" className="mx-auto max-w-lg rounded-hero p-8 text-center sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-olive/15 text-olive">
          <CalendarCheck className="size-7" strokeWidth={1.7} />
        </span>
        <h2 className="mt-6 text-3xl">Your consultation is booked.</h2>
        <p className="mt-3 text-muted">
          A confirmation has been sent to your email address. You can use the link
          inside the email to reschedule or cancel.
        </p>
        <div className="surface-card mt-7 space-y-3 p-5 text-left text-sm">
          <Row label="Date" value={booked.dateLabel} />
          <Row label="Time" value={booked.time} />
          <Row label="Time zone" value={TIMEZONE} />
          <Row label="Call method" value={booked.method} />
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={downloadIcs} className="btn btn-primary">
            <CalendarPlus className="size-4" strokeWidth={1.9} />
            Add to Calendar
          </button>
          <Link href="/login" className="btn btn-secondary">
            Enter the Demo
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <GlassCard variant="solid" className="p-6 sm:p-8">
        {/* Booking type */}
        <div className="flex items-center gap-4 rounded-md border border-line bg-bg/40 p-4">
          <span className="grid size-11 place-items-center rounded-full bg-accent/12 text-accent">
            <CalendarCheck className="size-5" strokeWidth={1.7} />
          </span>
          <div>
            <p className="font-semibold">Coaching Consultation</p>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <Clock className="size-3.5" strokeWidth={1.8} /> Duration: 30 minutes
            </p>
          </div>
        </div>

        {/* Method */}
        <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-wide text-muted">Call method</p>
        <div className="mt-2 grid grid-cols-3 gap-2.5">
          {methods.map((m) => (
            <button
              key={m.label}
              type="button"
              onClick={() => setMethod(m.label)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-md border px-2 py-3 text-xs font-medium transition-colors",
                method === m.label ? "border-accent bg-accent/8 text-ink" : "border-line text-muted hover:text-ink",
              )}
            >
              <m.icon className="size-4.5" strokeWidth={1.7} />
              {m.label}
            </button>
          ))}
        </div>

        {/* Date */}
        <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-wide text-muted">Select a date</p>
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
          {days.length === 0 ? (
            <div className="h-16 w-full animate-pulse rounded-md bg-ink/5" />
          ) : (
            days.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setDayKey(d.key)}
                className={cn(
                  "flex shrink-0 flex-col items-center rounded-md border px-3.5 py-2.5 transition-colors",
                  dayKey === d.key ? "border-accent bg-accent text-accent-ink" : "border-line text-muted hover:text-ink",
                )}
              >
                <span className="text-[0.62rem] font-semibold uppercase">{d.weekday}</span>
                <span className="tnum text-lg font-bold">{d.dayNum}</span>
                <span className="text-[0.62rem]">{d.month}</span>
              </button>
            ))
          )}
        </div>

        {/* Time */}
        <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-wide text-muted">Select a time</p>
        <div className="mt-2 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {times.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTime(t)}
              className={cn(
                "tnum rounded-md border py-2 text-sm font-medium transition-colors",
                time === t ? "border-accent bg-accent/8 text-ink" : "border-line text-muted hover:text-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.time && <p className="mt-2 text-xs font-medium text-danger">{errors.time}</p>}
      </GlassCard>

      {/* Contact */}
      <GlassCard variant="solid" className="h-fit p-6 sm:p-8">
        <p className="text-lg font-bold">Your details</p>
        <div className="mt-4 space-y-4">
          <Field label="Full name" error={errors.name}>
            <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </Field>
          <Field label="Email address" error={errors.email}>
            <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </Field>
          <Field label="Phone number" error={errors.phone}>
            <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+40 …" />
          </Field>
          <Field label="Additional notes" optional>
            <TextArea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything you'd like your coach to know" />
          </Field>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Globe className="size-3.5" strokeWidth={1.8} />
            {TIMEZONE}
          </div>
          <button onClick={confirm} className="btn btn-primary w-full">
            Confirm Booking
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
