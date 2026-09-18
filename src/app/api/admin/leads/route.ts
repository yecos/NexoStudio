import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { isCrmConfigured, listLeads } from "@/lib/crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  if (!isCrmConfigured()) {
    return NextResponse.json({ configured: false, leads: [] });
  }

  try {
    return NextResponse.json({ configured: true, leads: await listLeads() });
  } catch (error) {
    console.error("CRM list failed:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "No se pudo consultar el CRM." }, { status: 500 });
  }
}
