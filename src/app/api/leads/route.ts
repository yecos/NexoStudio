import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let raw: LeadPayload;
  try {
    raw = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const lead = {
    name: text(raw.name, 100),
    phone: text(raw.phone, 40),
    email: text(raw.email, 160),
    projectType: text(raw.projectType, 100),
    location: text(raw.location, 140),
    area: text(raw.area, 60),
    budget: text(raw.budget, 100),
    timeline: text(raw.timeline, 100),
    message: text(raw.message, 1800),
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

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    // El formulario sigue funcionando por WhatsApp aunque aún no exista CRM.
    return NextResponse.json({ accepted: true, forwarded: false }, { status: 202 });
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

    if (!response.ok) {
      return NextResponse.json({ accepted: true, forwarded: false }, { status: 202 });
    }

    return NextResponse.json({ accepted: true, forwarded: true }, { status: 201 });
  } catch {
    // Nunca bloqueamos la experiencia principal de contacto por una caída del CRM.
    return NextResponse.json({ accepted: true, forwarded: false }, { status: 202 });
  }
}
