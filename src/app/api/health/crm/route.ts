import { NextResponse } from "next/server";
import { checkCrmHealth, isCrmConfigured, testCrmWrite } from "@/lib/crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const configured = isCrmConfigured();

  if (!configured) {
    return NextResponse.json(
      { configured: false, database: "missing" },
      { status: 503 },
    );
  }

  const healthy = await checkCrmHealth();
  const url = new URL(request.url);
  const wantsWriteTest = url.searchParams.get("write") === "1";
  const previewOnly =
    process.env.VERCEL_ENV === "preview" &&
    process.env.VERCEL_GIT_COMMIT_REF === "nexo-premium-v2";

  let writeTest: "not_requested" | "blocked" | "ok" | "error" = "not_requested";

  if (wantsWriteTest) {
    if (!previewOnly) {
      writeTest = "blocked";
    } else {
      try {
        writeTest = (await testCrmWrite()) ? "ok" : "error";
      } catch {
        writeTest = "error";
      }
    }
  }

  const status = healthy && writeTest !== "error" ? 200 : 503;

  return NextResponse.json(
    {
      configured: true,
      database: healthy ? "ok" : "error",
      writeTest,
    },
    { status },
  );
}
