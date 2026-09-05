# Slate

Slate is a two-layer companion tool for making AI video ads. The two layers are independent, you
can use either one on its own:

- **Plan** (`/plan`), turn a product URL or a short brief into 8 structured ad "hook variants" for
  short-form video (TikTok, Reels, Shorts). Each variant is built from a fixed creative-testing
  archetype (Bold Claim, POV/Relatable, Problem-First, Curiosity Gap, Controversial Take,
  Before/After, Social Proof, Myth-Bust), so the 8 ideas are genuinely different angles on the same
  product, not 8 rephrasings of one idea. Every variant ships with a hook line, a 3-shot breakdown
  (Hook/Demo/CTA), a casting note, and a ready-to-paste video-generation prompt.
- **Polish** (`/polish`), upload an image (a generated ad frame, a product photo) and run it
  through Real-ESRGAN upscaling to sharpen it into a crisp final asset at 2x or 4x, with a
  before/after slider and a direct download.

No login, no database, fully stateless, everything lives in React state for the current session.

## Local setup

```bash
npm install
cp .env.local.example .env.local
```

Fill in `.env.local`:

- `OPENROUTER_API_KEY`, get one at [openrouter.ai/keys](https://openrouter.ai/keys). Powers `/plan`.
- `OPENROUTER_MODEL`, any model id from [openrouter.ai/models](https://openrouter.ai/models). Leave
  blank to fall back to `minimax/minimax-m3:free`. We benchmarked several free models against this
  app's actual prompt; MiniMax M3 returned valid, well-formed JSON on the first try in roughly 30
  seconds, while comparable free reasoning models (Nemotron 3 Ultra/Super) took 90 to 180 seconds
  for the same request. Free-tier models are shared and can get rate-limited upstream at busy
  times; if that happens, `/api/generate-hooks` surfaces a clear error and swapping in a different
  free model id is a one-line env var change.
- `HF_TOKEN` (optional), get a free one at
  [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens). Powers `/polish`. Image
  enhancement runs on a free, public Hugging Face Space
  ([anthienlong/Face-Real-ESRGAN](https://huggingface.co/spaces/anthienlong/Face-Real-ESRGAN)) with
  no cost and no card required. The Space works without a token; a free token just raises your rate
  limit and helps avoid queueing behind anonymous traffic.

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

### Plan

- Paste a product URL and Slate fetches the page server-side (an API route, not a client-side
  fetch, so it works even when the target site blocks browser requests or has no CORS headers) and
  pulls the title, description, image, and price where available. If the page can't be read in time
  (8s timeout) or doesn't yield enough usable text, the tool automatically falls back to a manual
  brief textarea instead of showing an error.
- The extracted (or hand-typed) product context is sent to `/api/generate-hooks`, which calls an
  OpenRouter chat model with a system prompt that locks the model into the 8 fixed archetypes and a
  strict JSON schema. Responses are parsed defensively: markdown fences are stripped, the result is
  validated as an array of exactly 8 well-formed variants, and a malformed response gets one retry
  with a corrective system message before failing with a clear, user-facing error.
- Results render as 8 cards. Each has a "Copy prompt" button for its `generationPrompt`; a "Copy
  all prompts" button at the top copies all 8 as a numbered list.

### Polish

- Drag-and-drop or click-to-browse image upload, validated client-side (JPG/PNG/WEBP, 10MB max).
- The raw file is posted as multipart form data to `/api/enhance` (not base64, the Gradio JS client
  expects a Blob/File natively), which connects to the Face-Real-ESRGAN Space with
  `@gradio/client` and calls its `/predict` endpoint at your chosen scale ("2x" or "4x", converted
  from the UI's toggle). The Space's file-output shape is defensively unwrapped (it can come back
  as a plain URL string or a `{ url, path }` object depending on the Gradio version) rather than
  assumed.
- Because this is a community-hosted free Space, it can have a slow cold start (20 to 40 seconds)
  or occasionally be unavailable, the UI copy sets that expectation up front, and a failed or timed
  out call always surfaces a friendly, actionable error with a "Try again" button, never a raw
  error.
- The result renders as a draggable before/after slider (drag the handle or click anywhere on the
  image) and downloads through a small same-origin proxy route (allowlisted to Hugging Face's file
  domains) so the browser's download attribute works reliably against a cross-origin CDN.

## Deploy to Vercel

Import this repository into [Vercel](https://vercel.com/new), then in the project's Settings →
Environment Variables add `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, and `HF_TOKEN` (same values as
your local `.env.local`), and deploy. No database or other infrastructure is needed since the app
is fully stateless.

## Roadmap

Hook scoring is currently based on general direct-response creative principles; with real usage
data this could evolve into a personalized, per-brand model.
