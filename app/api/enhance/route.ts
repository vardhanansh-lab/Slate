import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";
import type { EnhanceResponse } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const SPACE = "anthienlong/Face-Real-ESRGAN";
const GENERIC_FAILURE_MESSAGE = "Couldn't sharpen that image, try again. This Space is community-hosted and can occasionally be slow or unavailable.";
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function extractOutputUrl(data: unknown): string | null {
  if (typeof data === "string") return data;

  if (Array.isArray(data)) {
    for (const item of data) {
      const found = extractOutputUrl(item);
      if (found) return found;
    }
    return null;
  }

  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (typeof obj.url === "string" && obj.url) return obj.url;
    if (typeof obj.path === "string" && obj.path) return obj.path;
  }

  return null;
}

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json<EnhanceResponse>(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const image = formData.get("image");
  const rawScale = formData.get("scale");

  if (!(image instanceof Blob)) {
    return NextResponse.json<EnhanceResponse>(
      { success: false, message: "No image was uploaded." },
      { status: 400 }
    );
  }

  if (!ACCEPTED_TYPES.includes(image.type)) {
    return NextResponse.json<EnhanceResponse>(
      { success: false, message: "That doesn't look like a supported image (jpg, png, or webp)." },
      { status: 400 }
    );
  }

  if (image.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json<EnhanceResponse>(
      { success: false, message: "That image is too large, please use a file under 10MB." },
      { status: 400 }
    );
  }

  const sizeParam = rawScale === "4" || rawScale === "4x" ? "4x" : rawScale === "2" || rawScale === "2x" ? "2x" : null;
  if (!sizeParam) {
    return NextResponse.json<EnhanceResponse>(
      { success: false, message: "Scale must be 2x or 4x." },
      { status: 400 }
    );
  }

  try {
    const client = await Client.connect(SPACE, {
      hf_token: (process.env.HF_TOKEN as `hf_${string}`) || undefined,
    });

    const result = await client.predict("/predict", {
      image,
      size: sizeParam,
    });

    // The Space's output shape isn't pinned down by its docs, so we log it here to
    // make it easy to diagnose if a Space update ever changes the response shape.
    console.log("[enhance] Face-Real-ESRGAN result.data:", JSON.stringify(result.data));

    const outputUrl = extractOutputUrl(result.data);
    if (!outputUrl) {
      return NextResponse.json<EnhanceResponse>(
        { success: false, message: GENERIC_FAILURE_MESSAGE },
        { status: 500 }
      );
    }

    return NextResponse.json<EnhanceResponse>({ success: true, outputUrl });
  } catch (err) {
    console.error("[enhance] Face-Real-ESRGAN call failed:", err);
    return NextResponse.json<EnhanceResponse>(
      { success: false, message: GENERIC_FAILURE_MESSAGE },
      { status: 500 }
    );
  }
}
