"use client";

import { useState } from "react";
import type { HookVariant } from "@/lib/types";
import HookCard from "./HookCard";

export default function ResultsSection({
  variants,
  onStartOver,
}: {
  variants: HookVariant[];
  onStartOver: () => void;
}) {
  const [copiedAll, setCopiedAll] = useState(false);

  async function handleCopyAll() {
    const text = variants
      .map((v, i) => `${i + 1}. ${v.archetype}\n${v.generationPrompt}`)
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    } catch {
      // Clipboard access denied, silently ignore.
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <button
          type="button"
          onClick={onStartOver}
          className="rounded-sm text-small text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Start over
        </button>
        <button
          type="button"
          onClick={handleCopyAll}
          className="rounded-xl border border-border bg-bg px-4 py-2.5 text-body font-medium text-ink transition-colors hover:bg-tint/50 active:bg-tint/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {copiedAll ? "Copied all" : "Copy all prompts"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {variants.map((variant, i) => (
          <HookCard key={variant.archetype} variant={variant} index={i} />
        ))}
      </div>
    </div>
  );
}
