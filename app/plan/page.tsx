"use client";

import { useState, type FormEvent } from "react";
import InputForm, { type InputMode } from "@/components/InputForm";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ResultsSection from "@/components/ResultsSection";
import PageIntro from "@/components/PageIntro";
import type { GenerateHooksResponse, HookVariant, ScrapeResult } from "@/lib/types";

type Stage = "input" | "scraping" | "generating" | "results" | "error";

const NETWORK_ERROR_MESSAGE = "Couldn't reach the server, try again.";

export default function PlanPage() {
  const [stage, setStage] = useState<Stage>("input");
  const [mode, setMode] = useState<InputMode>("url");
  const [urlValue, setUrlValue] = useState("");
  const [briefValue, setBriefValue] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [variants, setVariants] = useState<HookVariant[] | null>(null);
  const [lastContext, setLastContext] = useState<string | null>(null);

  function handleModeChange(next: InputMode) {
    setMode(next);
    setInputError(null);
    setFallbackNotice(null);
  }

  async function handleGenerate(productContext: string) {
    setLastContext(productContext);
    setStage("generating");
    try {
      const res = await fetch("/api/generate-hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productContext }),
      });
      const data: GenerateHooksResponse = await res.json();
      if (data.success) {
        setVariants(data.variants);
        setStage("results");
      } else {
        setErrorMessage(data.message);
        setStage("error");
      }
    } catch {
      setErrorMessage(NETWORK_ERROR_MESSAGE);
      setStage("error");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInputError(null);
    setFallbackNotice(null);

    if (mode === "url") {
      const url = urlValue.trim();
      if (!url) {
        setInputError("Paste a product URL to get started.");
        return;
      }

      setStage("scraping");
      try {
        const res = await fetch("/api/scrape-product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const data: ScrapeResult = await res.json();
        if (data.success) {
          await handleGenerate(data.context);
        } else {
          setMode("brief");
          setFallbackNotice(data.message);
          setStage("input");
        }
      } catch {
        setMode("brief");
        setFallbackNotice("Couldn't read that page automatically, paste a quick description instead.");
        setStage("input");
      }
      return;
    }

    const brief = briefValue.trim();
    if (brief.length < 10) {
      setInputError("Add a few more details about the product.");
      return;
    }
    await handleGenerate(brief);
  }

  function handleStartOver() {
    setStage("input");
    setVariants(null);
    setErrorMessage(null);
    setFallbackNotice(null);
    setInputError(null);
  }

  function handleRetry() {
    if (lastContext) {
      handleGenerate(lastContext);
    } else {
      setStage("input");
    }
  }

  const busy = stage === "scraping" || stage === "generating";

  return (
    <main className="mx-auto flex max-w-content flex-col px-6 pb-16 pt-10">
      <PageIntro
        title="Plan your hooks"
        description="Paste a product URL or brief and get 8 structured ad hook variants, each built from a different creative-testing angle, ready to paste into a video generator."
      />

      {(stage === "input" || stage === "scraping") && (
        <InputForm
          mode={mode}
          onModeChange={handleModeChange}
          urlValue={urlValue}
          onUrlChange={setUrlValue}
          briefValue={briefValue}
          onBriefChange={setBriefValue}
          inputError={inputError}
          fallbackNotice={fallbackNotice}
          busy={busy}
          busyLabel="Reading page..."
          onSubmit={handleSubmit}
        />
      )}

      {stage === "generating" && <LoadingState />}

      {stage === "error" && <ErrorState message={errorMessage ?? NETWORK_ERROR_MESSAGE} onRetry={handleRetry} />}

      {stage === "results" && variants && (
        <ResultsSection variants={variants} onStartOver={handleStartOver} />
      )}
    </main>
  );
}
