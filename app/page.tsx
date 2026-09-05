import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-content flex-col px-6 pb-16 pt-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.5fr_1fr] md:items-end md:gap-16">
        <h1 className="font-head text-display font-semibold leading-[1.05] text-ink">
          Write the angle.
          <br />
          Then sharpen the shot.
        </h1>
        <p className="text-body-lg text-muted md:pb-1.5">
          Two small tools that sit between your product and your video generator: one plans the
          hook, the other cleans up the frame.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg md:grid-cols-2 md:divide-x md:divide-y-0">
        <Link
          href="/plan"
          className="group flex flex-col gap-7 p-8 transition-colors hover:bg-tint/40 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent md:p-12"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 19.5V6a2 2 0 0 1 2-2h9.5L20 8.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path d="M14 4v4.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M8 13h8M8 16.5h5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <h2 className="font-head text-h2 font-semibold text-ink">Plan</h2>
            </div>
            <span className="font-head text-h3 text-muted/25">01</span>
          </div>

          <p className="text-body-lg text-muted">
            Paste your product, get 8 structured ad angles ready to generate.
          </p>

          <div className="flex flex-col gap-4 rounded-xl border border-border bg-bg p-5">
            <div className="flex flex-col gap-2">
              <span className="w-fit rounded-full bg-tint px-2.5 py-1 text-micro font-medium text-accent">
                Bold Claim
              </span>
              <p className="text-h3 font-semibold leading-snug text-ink">
                This tool replaces your entire morning routine.
              </p>
            </div>
            <ul className="flex flex-col gap-1.5 border-t border-border pt-4">
              <li className="flex gap-3 text-small">
                <span className="w-10 shrink-0 font-medium text-muted">Hook</span>
                <span className="text-muted">Close-up on the product, then a confident look to camera.</span>
              </li>
              <li className="flex gap-3 text-small">
                <span className="w-10 shrink-0 font-medium text-muted">Demo</span>
                <span className="text-muted">Quick before/after in three seconds flat.</span>
              </li>
              <li className="flex gap-3 text-small">
                <span className="w-10 shrink-0 font-medium text-muted">CTA</span>
                <span className="text-muted">Product held to camera, link on screen.</span>
              </li>
            </ul>
          </div>

          <span className="inline-flex items-center gap-1.5 text-small font-medium text-accent">
            Open plan
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>

        <Link
          href="/polish"
          className="group flex flex-col gap-7 p-8 transition-colors hover:bg-tint/40 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent md:p-12"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 3.5 13.2 7l3.5 1.2-3.5 1.2L12 13l-1.2-3.6L7.3 8.2 10.8 7 12 3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 13.5 18.6 15.4 20.5 16 18.6 16.6 18 18.5 17.4 16.6 15.5 16 17.4 15.4 18 13.5Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path d="M5 20.5 12 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <h2 className="font-head text-h2 font-semibold text-ink">Polish</h2>
            </div>
            <span className="font-head text-h3 text-muted/25">02</span>
          </div>

          <p className="text-body-lg text-muted">
            Upload a generated image and sharpen it into a crisp final asset.
          </p>

          <div className="flex gap-3">
            <div className="flex-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
                <Image
                  src="/images/sample-product.jpg"
                  alt="Before enhancement"
                  fill
                  sizes="(min-width: 768px) 220px, 45vw"
                  className="object-cover opacity-80 blur-[1.5px] saturate-[0.85]"
                />
              </div>
              <span className="mt-2 block text-micro text-muted">Before</span>
            </div>
            <div className="flex-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-accent/30">
                <Image
                  src="/images/sample-product.jpg"
                  alt="After enhancement"
                  fill
                  sizes="(min-width: 768px) 220px, 45vw"
                  className="object-cover"
                />
              </div>
              <span className="mt-2 block text-micro text-muted">After</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-small font-medium text-accent">
            Open polish
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>

      <p className="mt-16 text-small text-muted">Built to sit next to your existing ad tools.</p>
    </main>
  );
}
