import { createHmac, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export async function gateway(request: NextRequest, kind: "demo" | "contact") {
  const origin = request.headers.get("origin");
  let sameOrigin = false;
  try {
    const url = new URL(origin || "");
    sameOrigin =
      ["http:", "https:"].includes(url.protocol) &&
      url.host === request.headers.get("host");
  } catch {}
  if (!sameOrigin)
    return NextResponse.json(
      { error: "Diese Anfrage ist nicht erlaubt." },
      { status: 403 },
    );
  const secret = process.env.DEMO_GATEWAY_KEY,
    base = process.env.DEMO_API_URL;
  if (!secret || !base)
    return NextResponse.json(
      {
        error:
          "Der Dienst ist gerade nicht verfügbar. Bitte schreiben Sie an info@cod-st.com.",
      },
      { status: 503 },
    );
  if (Number(request.headers.get("content-length") || 0) > 8192)
    return NextResponse.json(
      { error: "Die Anfrage ist zu groß." },
      { status: 413 },
    );
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 8192) throw new Error();
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body))
      throw new Error();
  } catch {
    return NextResponse.json(
      { error: "Bitte prüfen Sie Ihre Anfrage." },
      { status: 400 },
    );
  }
  const previous = request.cookies.get("codst_demo")?.value;
  const visitor =
    previous && /^[a-f0-9]{64}$/.test(previous)
      ? previous
      : randomBytes(32).toString("hex");
  const hash = (value: string) =>
    createHmac("sha256", secret).update(value).digest("hex");
  const ip =
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local";
  const payload =
    kind === "demo"
      ? {
          action: body.action,
          profile: body.profile,
          consent: body.consent,
          client: hash("visitor:" + visitor),
          ip: hash("ip:" + ip),
        }
      : {
          name: body.name,
          practice: body.practice,
          email: body.email,
          phone: body.phone,
          message: body.message,
          website: body.website,
          ip: hash("ip:" + ip),
        };
  try {
    const upstream = await fetch(`${base}/v1/${kind}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    const data = await upstream.json();
    const response = NextResponse.json(
      upstream.ok
        ? data
        : {
            error:
              data.error || data.detail || "Bitte versuchen Sie es erneut.",
          },
      { status: upstream.status, headers: { "Cache-Control": "no-store" } },
    );
    if (kind === "demo")
      response.cookies.set("codst_demo", visitor, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400,
        path: "/",
      });
    return response;
  } catch {
    return NextResponse.json(
      {
        error:
          "Die Verbindung ist gerade nicht möglich. Bitte versuchen Sie es erneut.",
      },
      { status: 503 },
    );
  }
}
