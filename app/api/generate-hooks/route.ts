import { NextRequest, NextResponse } from "next/server";
import { ARCHETYPES, ARCHETYPE_DESCRIPTIONS } from "@/lib/archetypes";
import type {
  GenerateHooksRequest,
  GenerateHooksResponse,
  HookVariant,
} from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "minimax/minimax-m3:free";
const GENERIC_FAILURE_MESSAGE = "Model returned an unusable response, try again.";
const SHOT_LABELS = ["Hook", "Demo", "CTA"] as const;
const REQUEST_TIMEOUT_MS = 55000;

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

function buildSystemPrompt(): string {
  const archetypeList = ARCHETYPES.map(
    (name, i) => `${i + 1}. ${name}: ${ARCHETYPE_DESCRIPTIONS[name]}`
  ).join("\n");

  return `You are a senior direct-response ad creative strategist who specializes in short-form video ad hooks (TikTok, Reels, Shorts).

Given a product description, generate exactly 8 distinct ad "hook variants", one for each of the following fixed creative-testing archetypes, in this exact order:

${archetypeList}

Each variant must genuinely reflect its archetype and feel meaningfully different from the other 7, not 8 rephrasings of the same idea.

Return ONLY valid JSON: a single JSON array of exactly 8 objects, one per archetype, in the exact order listed above. No prose, no markdown code fences, no commentary before or after, just the raw JSON array.

Each object must match this schema exactly:
{
  "archetype": string,        // one of the 8 archetype names above, verbatim
  "hookLine": string,         // the actual first-3-seconds line or visual beat, at most 20 words
  "shots": [
    { "label": "Hook", "description": string },   // at most 25 words
    { "label": "Demo", "description": string },   // at most 25 words
    { "label": "CTA", "description": string }      // at most 25 words
  ],
  "castingNote": string,      // e.g. "AI talking actor, casual tone" or "product-only, no actor", at most 15 words
  "generationPrompt": string  // a single, ready-to-paste video-generation prompt combining hookLine + shots + product context, written as an instruction to a video generation model, at most 80 words
}

The "generationPrompt" field is the most important one: it must read like a complete, self-contained shot description someone could paste directly into a "describe the shot you want" box of a video generation tool and get a usable result. It is not a summary of the other fields; write it as an actual generation-ready prompt, in plain instructive language, that stands on its own.`;
}

function stripCodeFences(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced ? fenced[1].trim() : trimmed;
}

function isValidVariant(value: unknown): value is HookVariant {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;

  if (typeof v.archetype !== "string" || !(ARCHETYPES as readonly string[]).includes(v.archetype)) {
    return false;
  }
  if (typeof v.hookLine !== "string" || !v.hookLine.trim()) return false;
  if (typeof v.castingNote !== "string" || !v.castingNote.trim()) return false;
  if (typeof v.generationPrompt !== "string" || !v.generationPrompt.trim()) return false;

  if (!Array.isArray(v.shots) || v.shots.length !== 3) return false;
  for (let i = 0; i < 3; i++) {
    const shot = v.shots[i] as Record<string, unknown>;
    if (!shot || typeof shot !== "object") return false;
    if (shot.label !== SHOT_LABELS[i]) return false;
    if (typeof shot.description !== "string" || !shot.description.trim()) return false;
  }

  return true;
}

function validateAndOrder(parsed: unknown): HookVariant[] | null {
  if (!Array.isArray(parsed) || parsed.length !== 8) return null;
  if (!parsed.every(isValidVariant)) return null;

  const variants = parsed as HookVariant[];
  const byArchetype = new Map(variants.map((v) => [v.archetype, v]));
  if (byArchetype.size !== 8) return null;
  if (ARCHETYPES.some((a) => !byArchetype.has(a))) return null;

  return ARCHETYPES.map((a) => byArchetype.get(a)!);
}

async function callOpenRouter(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(OPENROUTER_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://slate.vercel.app",
        "X-Title": "Slate",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.9,
      }),
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`OPENROUTER_HTTP_${res.status}: ${errText.slice(0, 300)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("EMPTY_RESPONSE");
  }
  return content;
}

export async function POST(req: NextRequest) {
  let body: GenerateHooksRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json<GenerateHooksResponse>(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const productContext =
    typeof body.productContext === "string" ? body.productContext.trim() : "";
  if (!productContext) {
    return NextResponse.json<GenerateHooksResponse>(
      { success: false, message: "Missing product context." },
      { status: 400 }
    );
  }

  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt() },
    { role: "user", content: `Product context:\n${productContext}` },
  ];

  const MAX_ATTEMPTS = 2;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let raw: string;
    try {
      raw = await callOpenRouter(messages);
    } catch (err) {
      if (err instanceof Error && err.message === "MISSING_API_KEY") {
        return NextResponse.json<GenerateHooksResponse>(
          {
            success: false,
            message:
              "Server is missing the OpenRouter API key. Add OPENROUTER_API_KEY to your environment.",
          },
          { status: 500 }
        );
      }
      return NextResponse.json<GenerateHooksResponse>(
        { success: false, message: GENERIC_FAILURE_MESSAGE },
        { status: 500 }
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(stripCodeFences(raw));
    } catch {
      if (attempt < MAX_ATTEMPTS) {
        messages.push({ role: "assistant", content: raw });
        messages.push({
          role: "system",
          content: "Your last response was not valid JSON. Return ONLY the JSON array, nothing else.",
        });
        continue;
      }
      return NextResponse.json<GenerateHooksResponse>(
        { success: false, message: GENERIC_FAILURE_MESSAGE },
        { status: 500 }
      );
    }

    const variants = validateAndOrder(parsed);
    if (!variants) {
      if (attempt < MAX_ATTEMPTS) {
        messages.push({ role: "assistant", content: raw });
        messages.push({
          role: "system",
          content: "Your last response was not valid JSON. Return ONLY the JSON array, nothing else.",
        });
        continue;
      }
      return NextResponse.json<GenerateHooksResponse>(
        { success: false, message: GENERIC_FAILURE_MESSAGE },
        { status: 500 }
      );
    }

    return NextResponse.json<GenerateHooksResponse>({ success: true, variants });
  }

  return NextResponse.json<GenerateHooksResponse>(
    { success: false, message: GENERIC_FAILURE_MESSAGE },
    { status: 500 }
  );
}
