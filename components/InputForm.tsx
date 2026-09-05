"use client";

import type { FormEvent } from "react";

export type InputMode = "url" | "brief";

interface InputFormProps {
  mode: InputMode;
  onModeChange: (mode: InputMode) => void;
  urlValue: string;
  onUrlChange: (value: string) => void;
  briefValue: string;
  onBriefChange: (value: string) => void;
  inputError: string | null;
  fallbackNotice: string | null;
  busy: boolean;
  busyLabel: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function InputForm({
  mode,
  onModeChange,
  urlValue,
  onUrlChange,
  briefValue,
  onBriefChange,
  inputError,
  fallbackNotice,
  busy,
  busyLabel,
  onSubmit,
}: InputFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {fallbackNotice && (
        <div className="rounded-xl border border-accent/25 bg-tint px-4 py-3 text-body text-ink">
          {fallbackNotice}
        </div>
      )}

      {mode === "url" ? (
        <input
          type="text"
          inputMode="url"
          value={urlValue}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://yourproduct.com/item"
          disabled={busy}
          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-body-lg text-ink placeholder:text-muted/70 outline-none transition-shadow focus:border-accent focus:ring-4 focus:ring-accent/10 disabled:opacity-60"
        />
      ) : (
        <textarea
          value={briefValue}
          onChange={(e) => onBriefChange(e.target.value)}
          placeholder="e.g. Nova Standing Desk: bamboo electric standing desk, $429, quiet dual-motor lift, key selling point is going from sitting to standing in 4 seconds flat."
          rows={5}
          disabled={busy}
          className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-body-lg text-ink placeholder:text-muted/70 outline-none transition-shadow focus:border-accent focus:ring-4 focus:ring-accent/10 disabled:opacity-60"
        />
      )}

      {inputError && <p className="text-small text-error">{inputError}</p>}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onModeChange(mode === "url" ? "brief" : "url")}
          disabled={busy}
          className="rounded-sm text-small text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
        >
          {mode === "url" ? "Paste a brief instead" : "Use a product URL instead"}
        </button>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-body font-medium text-white transition-colors hover:bg-accent/90 active:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy && (
            <span className="h-3.5 w-3.5 animate-spin-slow rounded-full border-2 border-white/30 border-t-white" />
          )}
          {busy ? busyLabel : "Generate hooks"}
        </button>
      </div>
    </form>
  );
}
