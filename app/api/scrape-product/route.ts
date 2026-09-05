import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import type { ScrapeResult } from "@/lib/types";

export const runtime = "nodejs";

const FETCH_TIMEOUT_MS = 8000;
const MIN_CONTENT_LENGTH = 50;
const FALLBACK_MESSAGE =
  "Couldn't read that page automatically, paste a quick description instead.";

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function firstMatchingPrice($: cheerio.CheerioAPI): string | undefined {
  const selectors = ["[itemprop=price]", "[data-price]", "[class*=price]"];
  for (const selector of selectors) {
    const el = $(selector).first();
    if (!el || el.length === 0) continue;
    const raw =
      el.attr("content") ?? el.attr("data-price") ?? el.text() ?? "";
    const text = raw.replace(/\s+/g, " ").trim();
    if (text && /\d/.test(text) && text.length < 40) {
      return text;
    }
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json<ScrapeResult>(
      { success: false, message: FALLBACK_MESSAGE },
      { status: 400 }
    );
  }

  const target = typeof body.url === "string" ? normalizeUrl(body.url) : null;
  if (!target) {
    return NextResponse.json<ScrapeResult>(
      { success: false, message: "That doesn't look like a valid URL, paste a quick description instead." },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(target, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!res.ok) {
      return NextResponse.json<ScrapeResult>({ success: false, message: FALLBACK_MESSAGE });
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $("title").first().text().trim();
    const ogTitle = $('meta[property="og:title"]').attr("content")?.trim();
    const ogDescription = $('meta[property="og:description"]').attr("content")?.trim();
    const metaDescription = $('meta[name="description"]').attr("content")?.trim();
    const ogImage = $('meta[property="og:image"]').attr("content")?.trim();
    const price = firstMatchingPrice($);

    const heading = ogTitle || title;
    const description = ogDescription || metaDescription;

    const parts: string[] = [];
    if (heading) parts.push(`Product: ${heading}`);
    if (description) parts.push(`Description: ${description}`);
    if (price) parts.push(`Price: ${price}`);
    parts.push(`Source URL: ${target}`);

    const context = parts.join("\n");
    const usableLength = [heading, description].filter(Boolean).join(" ").length;

    if (usableLength < MIN_CONTENT_LENGTH) {
      return NextResponse.json<ScrapeResult>({ success: false, message: FALLBACK_MESSAGE });
    }

    return NextResponse.json<ScrapeResult>({
      success: true,
      context,
      title: heading,
      image: ogImage,
    });
  } catch {
    return NextResponse.json<ScrapeResult>({ success: false, message: FALLBACK_MESSAGE });
  } finally {
    clearTimeout(timeout);
  }
}
