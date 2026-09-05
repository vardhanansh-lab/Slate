import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function isAllowedHost(hostname: string): boolean {
  return (
    hostname.endsWith(".hf.space") ||
    hostname === "huggingface.co" ||
    hostname.endsWith(".huggingface.co")
  );
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");
  if (!raw) {
    return new NextResponse("Missing url", { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  if (target.protocol !== "https:" || !isAllowedHost(target.hostname)) {
    return new NextResponse("Url not allowed", { status: 400 });
  }

  const upstream = await fetch(target.toString()).catch(() => null);
  if (!upstream || !upstream.ok || !upstream.body) {
    return new NextResponse("Failed to fetch image", { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") || "image/png";
  const extension = contentType.includes("jpeg") ? "jpg" : contentType.includes("webp") ? "webp" : "png";

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="slate-enhanced.${extension}"`,
    },
  });
}
