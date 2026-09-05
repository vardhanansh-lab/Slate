import Link from "next/link";

export default function SlateHeader() {
  return (
    <div className="border-b border-border bg-bg">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-2.5 px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-sm opacity-100 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <SlateMark />
          <span className="font-head text-h3 font-semibold tracking-tight text-ink">Slate</span>
        </Link>
      </div>
    </div>
  );
}

function SlateMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="4" y="12.5" width="20" height="11.5" rx="1.6" fill="var(--ink)" />
      <path d="M3.4 12.5 24.3 12.5 22.6 6.4 2.6 8.3 Z" fill="var(--ink)" />
      <clipPath id="slate-clap-clip">
        <path d="M3.4 12.5 24.3 12.5 22.6 6.4 2.6 8.3 Z" />
      </clipPath>
      <g clipPath="url(#slate-clap-clip)" stroke="var(--bg)" strokeWidth="2.4">
        <line x1="-2" y1="15" x2="9" y2="2" />
        <line x1="5" y1="15" x2="16" y2="2" />
        <line x1="12" y1="15" x2="23" y2="2" />
        <line x1="19" y1="15" x2="30" y2="2" />
      </g>
    </svg>
  );
}
