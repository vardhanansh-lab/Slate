"use client";

import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp";
const MAX_BYTES = 10 * 1024 * 1024;

export default function UploadZone({
  onFileReady,
}: {
  onFileReady: (file: File, previewUrl: string) => void;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function validateAndRead(file: File) {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That file is too large, please use one under 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onFileReady(file, reader.result);
      } else {
        setError("Couldn't read that file, try again.");
      }
    };
    reader.onerror = () => setError("Couldn't read that file, try again.");
    reader.readAsDataURL(file);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) validateAndRead(file);
  }

  function handleBrowseChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) validateAndRead(file);
    event.target.value = "";
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={handleKeyDown}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          dragActive ? "border-accent bg-tint" : "border-border hover:bg-tint/30"
        }`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-accent">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 15.5V4M12 4 7.5 8.5M12 4l4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 15.5V18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <p className="text-body font-medium text-ink">Drag and drop an image, or click to browse</p>
          <p className="mt-1 text-small text-muted">JPG, PNG, or WEBP, up to 10MB</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={`${ACCEPTED_TYPES.join(",")},${ACCEPTED_EXTENSIONS}`}
          className="hidden"
          onChange={handleBrowseChange}
        />
      </div>
      {error && <p className="text-small text-error">{error}</p>}
    </div>
  );
}
