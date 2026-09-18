import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { isCrmConfigured, updateLead } from "@/lib/crm";
import {
  isLeadPriority,
  isLeadStatus,
  type LeadUpdateInput,
} from "@/data/crm";

export const runtime = "nodejs";
type Params = Promise<{ id: string }>;

export async function PATCH(request: Request, { params }: { params: Params }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  if (!isCrmConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL no está configurada." }, { status: 503 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const input: LeadUpdateInput = {};

  if (raw.status !== undefined) {
    if (!isLeadStatus(raw.status)) {
      return NextResponse.json({ error: "Estado inválido." }, { status: 422 });
    }
    input.status = raw.status;
  }

  if (raw.priority !== undefined) {
    if (!isLeadPriority(raw.priority)) {
      return NextResponse.json({ error: "Prioridad inválida." }, { status: 422 });
    }
    input.priority = raw.priority;
  }

  if (raw.notes !== undefined) {
    if (typeof raw.notes !== "string") {
      return NextResponse.json({ error: "Notas inválidas." }, { status: 422 });
    }
    input.notes = raw.notes.trim().slice(0, 5000);
  }

  if (raw.nextFollowUpAt === null || typeof raw.nextFollowUpAt === "string") {
    input.nextFollowUpAt =
      raw.nextFollowUpAt === null || raw.nextFollowUpAt === ""
        ? null
        : raw.nextFollowUpAt.slice(0, 40);
  }

  if (raw.lastContactedAt === null || typeof raw.lastContactedAt === "string") {
    input.lastContactedAt =
      raw.lastContactedAt === null || raw.lastContactedAt === ""
        ? null
        : raw.lastContactedAt.slice(0, 40);
  }

  try {
    const { id } = await params;
    const lead = await updateLead(id, input);
    return lead
      ? NextResponse.json({ lead })
      : NextResponse.json({ error: "Lead no encontrado." }, { status: 404 });
  } catch (error) {
    console.error("CRM update failed:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "No se pudo actualizar el lead." }, { status: 500 });
  }
}
