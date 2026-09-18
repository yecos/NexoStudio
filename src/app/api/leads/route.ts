import { NextResponse } from "next/server";
import { createLead, isCrmConfigured } from "@/lib/crm";
import type { NewLeadInput } from "@/data/crm";

export const runtime = "nodejs";

interface AttributionPayload {
  page?: unknown;
  referrer?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  utmTerm?: unknown;
  gclid?: unknown;
}

interface LeadPayload {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  projectType?: unknown;
  location?: unknown;
  area?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  attribution?: AttributionPayload;
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > 20_000) {
    return NextResponse.json({ error: "Petición demasiado grande." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }

  let raw: LeadPayload;
  try {
    raw = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const lead: NewLeadInput = {
    name: text(raw.name, 100),
    phone: text(raw.phone, 40),
    email: text(raw.email, 160),
    projectType: text(raw.projectType, 100),
    location: text(raw.location, 140),
    area: text(raw.area, 60),
    budget: text(raw.budget, 100),
    timeline: text(raw.timeline, 100),
    message: text(raw.message, 1800),
    attribution: {
      page: text(raw.attribution?.page, 500),
      referrer: text(raw.attribution?.referrer, 500),
      utmSource: text(raw.attribution?.utmSource, 120),
      utmMedium: text(raw.attribution?.utmMedium, 120),
      utmCampaign: text(raw.attribution?.utmCampaign, 160),
      utmContent: text(raw.attribution?.utmContent, 160),
      utmTerm: text(raw.attribution?.utmTerm, 160),
      gclid: text(raw.attribution?.gclid, 220),
    },
  };

  if (
    lead.name.length < 2 ||
    lead.phone.length < 5 ||
    lead.projectType.length < 2 ||
    lead.location.length < 2 ||
    lead.message.length < 5
  ) {
    return NextResponse.json(
      { error: "Faltan datos requeridos del proyecto." },
      { status: 422 },
    );
  }

  let persisted = false;
  if (isCrmConfigured()) {
    try {
      await createLead(lead);
      persisted = true;
    } catch (error) {
      console.error(
        "CRM lead persistence failed:",
        error instanceof Error ? error.message : "unknown error",
      );
    }
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { accepted: true, persisted },
      { status: persisted ? 201 : 202 },
    );
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "NexoStudio-Lead-Webhook/1.0",
    };
    if (process.env.LEAD_WEBHOOK_SECRET) {
      headers["X-Nexo-Webhook-Secret"] = process.env.LEAD_WEBHOOK_SECRET;
    }
    const response = await fetch(webhook, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...lead,
        source: "nexostudioarq.com",
        receivedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });

    return NextResponse.json(
      { accepted: true, persisted, forwarded: response.ok },
      { status: persisted || response.ok ? 201 : 202 },
    );
  } catch {
    return NextResponse.json(
      { accepted: true, persisted, forwarded: false },
      { status: persisted ? 201 : 202 },
    );
  }
}
