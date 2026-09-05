import BeforeAfterSlider from "./BeforeAfterSlider";

export default function PolishResult({
  beforeSrc,
  afterSrc,
  onStartOver,
}: {
  beforeSrc: string;
  afterSrc: string;
  onStartOver: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <BeforeAfterSlider beforeSrc={beforeSrc} afterSrc={afterSrc} />
      <p className="text-small text-muted">Drag the handle to compare, or click anywhere on the image.</p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onStartOver}
          className="rounded-sm text-small text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Start over
        </button>
        <a
          href={`/api/download-proxy?url=${encodeURIComponent(afterSrc)}`}
          download
          className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-body font-medium text-white transition-colors hover:bg-accent/90 active:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Download
        </a>
      </div>
    </div>
  );
}
