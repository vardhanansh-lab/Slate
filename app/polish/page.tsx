"use client";

import { useState } from "react";
import PageIntro from "@/components/PageIntro";
import UploadZone from "@/components/UploadZone";
import ErrorState from "@/components/ErrorState";
import PolishResult from "@/components/PolishResult";
import type { EnhanceResponse, UpscaleFactor } from "@/lib/types";

type Stage = "select" | "ready" | "enhancing" | "result" | "error";

const NETWORK_ERROR_MESSAGE = "Couldn't reach the server, try again.";

export default function PolishPage() {
  const [stage, setStage] = useState<Stage>("select");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [scale, setScale] = useState<UpscaleFactor>(2);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFileReady(file: File, previewUrl: string) {
    setSourceFile(file);
    setSourcePreview(previewUrl);
    setOutputUrl(null);
    setStage("ready");
  }

  async function handleEnhance() {
    if (!sourceFile) return;
    setStage("enhancing");
    try {
      const formData = new FormData();
      formData.append("image", sourceFile);
      formData.append("scale", String(scale));
      const res = await fetch("/api/enhance", {
        method: "POST",
        body: formData,
      });
      const data: EnhanceResponse = await res.json();
      if (data.success) {
        setOutputUrl(data.outputUrl);
        setStage("result");
      } else {
        setErrorMessage(data.message);
        setStage("error");
      }
    } catch {
      setErrorMessage(NETWORK_ERROR_MESSAGE);
      setStage("error");
    }
  }

  function handleChooseDifferent() {
    setSourceFile(null);
    setSourcePreview(null);
    setOutputUrl(null);
    setStage("select");
  }

  function handleStartOver() {
    setSourceFile(null);
    setSourcePreview(null);
    setOutputUrl(null);
    setErrorMessage(null);
    setStage("select");
  }

  return (
    <main className="mx-auto flex max-w-content flex-col px-6 pb-16 pt-10">
      <PageIntro
        title="Refine your image"
        description="Upload a generated image and sharpen it into a crisp final asset."
      />

      <div className="max-w-3xl">
        {stage === "select" && <UploadZone onFileReady={handleFileReady} />}

        {stage === "ready" && sourcePreview && (
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-xl border border-border bg-tint/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sourcePreview} alt="Selected upload" className="max-h-[28rem] w-full object-contain" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-body font-medium text-ink">Scale</span>
                <div className="inline-flex rounded-xl border border-border p-1">
                  {([2, 4] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setScale(option)}
                      className={`rounded-lg px-3.5 py-1.5 text-body font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        scale === option ? "bg-accent text-white" : "text-muted hover:text-ink"
                      }`}
                    >
                      {option}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleChooseDifferent}
                  className="rounded-sm text-small text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Choose a different image
                </button>
                <button
                  type="button"
                  onClick={handleEnhance}
                  className="rounded-xl bg-accent px-5 py-2.5 text-body font-medium text-white transition-colors hover:bg-accent/90 active:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Enhance
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === "enhancing" && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border px-6 py-20 text-center">
            <span className="h-5 w-5 animate-spin-slow rounded-full border-2 border-border border-t-accent" />
            <p className="text-body font-medium text-ink">Sharpening image...</p>
            <p className="text-small text-muted">This can take 20 to 40 seconds on a cold start.</p>
          </div>
        )}

        {stage === "error" && (
          <ErrorState message={errorMessage ?? NETWORK_ERROR_MESSAGE} onRetry={handleEnhance} />
        )}

        {stage === "result" && sourcePreview && outputUrl && (
          <PolishResult beforeSrc={sourcePreview} afterSrc={outputUrl} onStartOver={handleStartOver} />
        )}
      </div>
    </main>
  );
}
