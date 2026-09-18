import { NextResponse } from "next/server";
import { checkCrmHealth, isCrmConfigured } from "@/lib/crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const configured = isCrmConfigured();

  if (!configured) {
    return NextResponse.json(
      { configured: false, database: "missing" },
      { status: 503 },
    );
  }

  const healthy = await checkCrmHealth();

  return NextResponse.json(
    {
      configured: true,
      database: healthy ? "ok" : "error",
    },
    { status: healthy ? 200 : 503 },
  );
}
