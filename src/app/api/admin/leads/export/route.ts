import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { isCrmConfigured, listLeads } from "@/lib/crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(value: unknown): string {
  const text = String(value ?? "").replace(/"/g, '""');
  return `"${text}"`;
}

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  if (!isCrmConfigured()) {
    return NextResponse.json({ error: "CRM no configurado." }, { status: 503 });
  }

  const leads = await listLeads();
  const header = [
    "Nombre",
    "Teléfono",
    "Email",
    "Tipo de proyecto",
    "Ubicación",
    "Área",
    "Presupuesto",
    "Inicio",
    "Estado",
    "Prioridad",
    "Próximo seguimiento",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "GCLID",
    "Página",
    "Mensaje",
    "Notas",
    "Creado",
  ];

  const rows = leads.map((lead) => [
    lead.name,
    lead.phone,
    lead.email,
    lead.projectType,
    lead.location,
    lead.area,
    lead.budget,
    lead.timeline,
    lead.status,
    lead.priority,
    lead.nextFollowUpAt ?? "",
    lead.attribution.utmSource,
    lead.attribution.utmMedium,
    lead.attribution.utmCampaign,
    lead.attribution.gclid,
    lead.attribution.page,
    lead.message,
    lead.notes,
    lead.createdAt,
  ]);

  const csv = [
    header.map(csvCell).join(","),
    ...rows.map((row) => row.map(csvCell).join(",")),
  ].join("\n");

  return new NextResponse("\uFEFF" + csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="nexo-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
