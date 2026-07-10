"use client";

import { useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { usePrimeStore } from "@/lib/store/store";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const messages = usePrimeStore((s) => s.messages);
  const sendMessage = usePrimeStore((s) => s.sendMessage);
  const [draft, setDraft] = useState("");

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    sendMessage(t);
    setDraft("");
  };

  return (
    <div className="mx-auto flex h-[calc(100dvh-11rem)] max-w-2xl flex-col lg:h-[calc(100dvh-8rem)]">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <span
          className="grid size-11 place-items-center rounded-full text-sm font-bold text-accent-ink"
          style={{ background: "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--gold) 70%, var(--accent)))" }}
        >
          D
        </span>
        <div>
          <p className="font-bold">Daniel — Your Coach</p>
          <p className="text-xs text-olive">● Online</p>
        </div>
      </div>

      {/* Thread */}
      <GlassCard variant="solid" className="flex min-h-0 flex-1 flex-col p-4">
        {messages.length === 0 ? (
          <div className="grid flex-1 place-items-center text-center">
            <div>
              <MessageSquare className="mx-auto size-8 text-faint" strokeWidth={1.5} />
              <p className="mt-3 font-semibold">No messages yet.</p>
              <p className="text-sm text-muted">Start a conversation with your coach.</p>
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("flex flex-col", m.from === "client" ? "items-end" : "items-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.from === "client"
                      ? "rounded-br-sm bg-accent text-accent-ink"
                      : "rounded-bl-sm border border-line bg-surface",
                  )}
                >
                  {m.text}
                </div>
                <span className="mt-1 px-1 text-[0.65rem] text-faint">{m.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Composer */}
        <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Write a message…"
            className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <button
            onClick={send}
            disabled={!draft.trim()}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-opacity disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="size-4.5" strokeWidth={1.9} />
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
