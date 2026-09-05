"use client";

import { useState } from "react";
import type { HookVariant } from "@/lib/types";

export default function HookCard({ variant, index }: { variant: HookVariant; index: number }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(variant.generationPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access denied, silently ignore; button state simply won't confirm.
    }
  }

  return (
    <div
      className="animate-fade-up flex flex-col gap-4 rounded-xl border border-border bg-bg p-6"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex w-fit items-center rounded-full bg-tint px-2.5 py-1 text-micro font-medium text-accent">
          {variant.archetype}
        </span>
        <span className="text-micro text-muted">{index + 1}</span>
      </div>

      <p className="font-head text-h3 font-semibold leading-snug text-ink">{variant.hookLine}</p>

      <ul className="flex flex-col gap-2">
        {variant.shots.map((shot) => (
          <li key={shot.label} className="flex gap-3 text-body leading-relaxed">
            <span className="mt-0.5 w-11 shrink-0 text-small font-medium text-muted">{shot.label}</span>
            <span className="text-ink">{shot.description}</span>
          </li>
        ))}
      </ul>

      <p className="text-small text-muted">{variant.castingNote}</p>

      <button
        type="button"
        onClick={handleCopy}
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-body font-medium text-ink transition-colors hover:bg-tint/50 active:bg-tint/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {copied ? "Copied" : "Copy prompt"}
      </button>
    </div>
  );
}
