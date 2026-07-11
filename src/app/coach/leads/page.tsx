"use client";

import { useState } from "react";
import { Mail, MessageCircle, CalendarPlus, UserCheck, XCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/fitness/status-pill";
import { Drawer } from "@/components/coach/drawer";
import { SelectInput, TextArea } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import type { Lead, LeadStatus } from "@/lib/store/types";

const statusOptions: LeadStatus[] = ["New", "Contacted", "Qualified", "Booked", "Won", "Lost"];

const copy = {
  en: {
    title: "Leads",
    subtitle: "leads · manage and convert.",
    leadFallback: "Lead",
    name: "Name",
    goal: "Goal",
    source: "Source",
    interest: "Interest",
    applied: "Applied",
    consultation: "Consultation",
    status: "Status",
    changeStatus: "Change status",
    statusUpdated: "Status updated",
    isNow: "is now",
    privateNote: "Private note",
    notePlaceholder: "Add a private note…",
    saveNote: "Save note",
    noteSaved: "Note saved",
    sendEmail: "Send email",
    whatsapp: "WhatsApp",
    bookConsultation: "Book consultation",
    markLost: "Mark as lost",
    emailSent: "Email sent — demo only",
    whatsappOpened: "WhatsApp opened — demo only",
    markedBooked: "Marked as booked",
    markedLost: "Marked as lost",
    convert: "Convert to client",
    convertedTitle: "Converted to client",
    convertedBody: "is now an active client.",
  },
  ro: {
    title: "Leaduri",
    subtitle: "leaduri · gestionează și convertește.",
    leadFallback: "Lead",
    name: "Nume",
    goal: "Obiectiv",
    source: "Sursă",
    interest: "Interes",
    applied: "Aplicat",
    consultation: "Consultație",
    status: "Status",
    changeStatus: "Schimbă statusul",
    statusUpdated: "Status actualizat",
    isNow: "este acum",
    privateNote: "Notă privată",
    notePlaceholder: "Adaugă o notă privată…",
    saveNote: "Salvează nota",
    noteSaved: "Notă salvată",
    sendEmail: "Trimite email",
    whatsapp: "WhatsApp",
    bookConsultation: "Programează consultație",
    markLost: "Marchează ca pierdut",
    emailSent: "Email trimis — doar demo",
    whatsappOpened: "WhatsApp deschis — doar demo",
    markedBooked: "Marcat ca programat",
    markedLost: "Marcat ca pierdut",
    convert: "Convertește în client",
    convertedTitle: "Convertit în client",
    convertedBody: "este acum client activ.",
  },
} as const;

export default function LeadsPage() {
  const { lang } = useI18n();
  const t = copy[lang];
  const leads = usePrimeStore((s) => s.leads);
  const updateLeadStatus = usePrimeStore((s) => s.updateLeadStatus);
  const addLeadNote = usePrimeStore((s) => s.addLeadNote);
  const convertLeadToClient = usePrimeStore((s) => s.convertLeadToClient);
  const [openId, setOpenId] = useState<string | null>(null);

  const sorted = [...leads].sort((a, b) => a.appliedOrder - b.appliedOrder);
  const active = leads.find((l) => l.id === openId);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">{t.title}</h1>
        <p className="mt-1.5 text-muted">{leads.length} {t.subtitle}</p>
      </div>

      {/* Desktop table */}
      <GlassCard variant="solid" className="hidden overflow-hidden p-0 lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">{t.name}</th>
              <th className="px-4 py-3 font-semibold">{t.goal}</th>
              <th className="px-4 py-3 font-semibold">{t.source}</th>
              <th className="px-4 py-3 font-semibold">{t.interest}</th>
              <th className="px-4 py-3 font-semibold">{t.applied}</th>
              <th className="px-4 py-3 font-semibold">{t.consultation}</th>
              <th className="px-4 py-3 font-semibold">{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((l) => (
              <tr
                key={l.id}
                onClick={() => setOpenId(l.id)}
                className="cursor-pointer border-b border-line last:border-0 transition-colors hover:bg-ink/[0.03]"
              >
                <td className="px-4 py-3 font-semibold">{l.name}</td>
                <td className="px-4 py-3 text-muted">{l.goal}</td>
                <td className="px-4 py-3 text-muted">{l.source}</td>
                <td className="px-4 py-3 text-muted">{l.interest}</td>
                <td className="px-4 py-3 text-muted">{l.applied}</td>
                <td className="px-4 py-3 text-muted">{l.consultation}</td>
                <td className="px-4 py-3"><StatusPill status={l.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {sorted.map((l) => (
          <GlassCard key={l.id} variant="solid" onClick={() => setOpenId(l.id)} className="cursor-pointer p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{l.name}</p>
              <StatusPill status={l.status} />
            </div>
            <p className="mt-1 text-sm text-muted">{l.goal} · {l.interest}</p>
            <p className="mt-1 text-xs text-faint">{l.source} · {t.applied} {l.applied} · {l.consultation}</p>
          </GlassCard>
        ))}
      </div>

      {/* Detail drawer */}
      <Drawer open={!!active} onClose={() => setOpenId(null)} title={active?.name ?? t.leadFallback}>
        {active && <LeadDetail lead={active} lang={lang} onStatus={updateLeadStatus} onNote={addLeadNote} onConvert={convertLeadToClient} onClose={() => setOpenId(null)} />}
      </Drawer>
    </div>
  );
}

function LeadDetail({
  lead,
  lang,
  onStatus,
  onNote,
  onConvert,
  onClose,
}: {
  lead: Lead;
  lang: Lang;
  onStatus: (id: string, s: LeadStatus) => void;
  onNote: (id: string, n: string) => void;
  onConvert: (id: string) => void;
  onClose: () => void;
}) {
  const t = copy[lang];
  const [note, setNote] = useState(lead.note ?? "");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Info label={t.goal} value={lead.goal} />
        <Info label={t.interest} value={lead.interest} />
        <Info label={t.source} value={lead.source} />
        <Info label={t.applied} value={lead.applied} />
        <Info label={t.consultation} value={lead.consultation} />
        <Info label={t.status} value={lead.status} />
      </div>

      <div>
        <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">{t.changeStatus}</p>
        <SelectInput
          className="mt-1.5"
          options={statusOptions}
          value={lead.status}
          onChange={(e) => {
            onStatus(lead.id, e.target.value as LeadStatus);
            toast(t.statusUpdated, `${lead.name} ${t.isNow} ${e.target.value}.`);
          }}
        />
      </div>

      <div>
        <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">{t.privateNote}</p>
        <TextArea className="mt-1.5" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.notePlaceholder} />
        <button
          onClick={() => { onNote(lead.id, note); toast(t.noteSaved); }}
          className="btn btn-secondary mt-2 h-9 min-h-0 px-3.5 py-0 text-sm"
        >
          {t.saveNote}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <ActionBtn icon={Mail} label={t.sendEmail} onClick={() => toast(t.emailSent)} />
        <ActionBtn icon={MessageCircle} label={t.whatsapp} onClick={() => toast(t.whatsappOpened)} />
        <ActionBtn icon={CalendarPlus} label={t.bookConsultation} onClick={() => { onStatus(lead.id, "Booked"); toast(t.markedBooked); }} />
        <ActionBtn icon={XCircle} label={t.markLost} onClick={() => { onStatus(lead.id, "Lost"); toast(t.markedLost); }} />
      </div>

      <button
        onClick={() => { onConvert(lead.id); toast(t.convertedTitle, `${lead.name} ${t.convertedBody}`, "success"); onClose(); }}
        className="btn btn-primary w-full"
      >
        <UserCheck className="size-4" strokeWidth={1.9} />
        {t.convert}
      </button>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line p-3">
      <p className="text-[0.62rem] font-semibold uppercase tracking-wide text-faint">{label}</p>
      <p className="mt-0.5 font-medium">{value}</p>
    </div>
  );
}

function ActionBtn({ icon: Icon, label, onClick }: { icon: typeof Mail; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 rounded-md border border-line px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:text-ink">
      <Icon className="size-4" strokeWidth={1.8} />
      {label}
    </button>
  );
}
