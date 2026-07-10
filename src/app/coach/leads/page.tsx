"use client";

import { useState } from "react";
import { Mail, MessageCircle, CalendarPlus, UserCheck, XCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/fitness/status-pill";
import { Drawer } from "@/components/coach/drawer";
import { SelectInput, TextArea } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import type { Lead, LeadStatus } from "@/lib/store/types";

const statusOptions: LeadStatus[] = ["New", "Contacted", "Qualified", "Booked", "Won", "Lost"];

export default function LeadsPage() {
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
        <h1 className="text-2xl font-bold sm:text-3xl">Leads</h1>
        <p className="mt-1.5 text-muted">{leads.length} leads · manage and convert.</p>
      </div>

      {/* Desktop table */}
      <GlassCard variant="solid" className="hidden overflow-hidden p-0 lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Goal</th>
              <th className="px-4 py-3 font-semibold">Source</th>
              <th className="px-4 py-3 font-semibold">Interest</th>
              <th className="px-4 py-3 font-semibold">Applied</th>
              <th className="px-4 py-3 font-semibold">Consultation</th>
              <th className="px-4 py-3 font-semibold">Status</th>
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
            <p className="mt-1 text-xs text-faint">{l.source} · Applied {l.applied} · {l.consultation}</p>
          </GlassCard>
        ))}
      </div>

      {/* Detail drawer */}
      <Drawer open={!!active} onClose={() => setOpenId(null)} title={active?.name ?? "Lead"}>
        {active && <LeadDetail lead={active} onStatus={updateLeadStatus} onNote={addLeadNote} onConvert={convertLeadToClient} onClose={() => setOpenId(null)} />}
      </Drawer>
    </div>
  );
}

function LeadDetail({
  lead,
  onStatus,
  onNote,
  onConvert,
  onClose,
}: {
  lead: Lead;
  onStatus: (id: string, s: LeadStatus) => void;
  onNote: (id: string, n: string) => void;
  onConvert: (id: string) => void;
  onClose: () => void;
}) {
  const [note, setNote] = useState(lead.note ?? "");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Info label="Goal" value={lead.goal} />
        <Info label="Interest" value={lead.interest} />
        <Info label="Source" value={lead.source} />
        <Info label="Applied" value={lead.applied} />
        <Info label="Consultation" value={lead.consultation} />
        <Info label="Status" value={lead.status} />
      </div>

      <div>
        <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">Change status</p>
        <SelectInput
          className="mt-1.5"
          options={statusOptions}
          value={lead.status}
          onChange={(e) => {
            onStatus(lead.id, e.target.value as LeadStatus);
            toast("Status updated", `${lead.name} is now ${e.target.value}.`);
          }}
        />
      </div>

      <div>
        <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">Private note</p>
        <TextArea className="mt-1.5" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a private note…" />
        <button
          onClick={() => { onNote(lead.id, note); toast("Note saved"); }}
          className="btn btn-secondary mt-2 h-9 min-h-0 px-3.5 py-0 text-sm"
        >
          Save note
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <ActionBtn icon={Mail} label="Send email" onClick={() => toast("Email sent — demo only")} />
        <ActionBtn icon={MessageCircle} label="WhatsApp" onClick={() => toast("WhatsApp opened — demo only")} />
        <ActionBtn icon={CalendarPlus} label="Book consultation" onClick={() => { onStatus(lead.id, "Booked"); toast("Marked as booked"); }} />
        <ActionBtn icon={XCircle} label="Mark as lost" onClick={() => { onStatus(lead.id, "Lost"); toast("Marked as lost"); }} />
      </div>

      <button
        onClick={() => { onConvert(lead.id); toast("Converted to client", `${lead.name} is now an active client.`, "success"); onClose(); }}
        className="btn btn-primary w-full"
      >
        <UserCheck className="size-4" strokeWidth={1.9} />
        Convert to client
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
