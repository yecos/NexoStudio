import { NextResponse } from "next/server";
import type { Project } from "@/data/projects";
import { isAdminRequest } from "@/lib/auth";
import { getRemoteJson } from "@/lib/github";
import { saveProject } from "@/lib/admin-projects";
import { errorResponse } from "@/lib/api-helpers";
import type { NewImage, ProjectInput } from "@/types/admin";

async function guard(): Promise<NextResponse | null> {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  return null;
}

/** GET /api/admin/projects — proyectos actuales del remoto (frescos). */
export async function GET() {
  const denied = await guard();
  if (denied) return denied;

  try {
    const { data } = await getRemoteJson<Project[]>();
    return NextResponse.json({ projects: data ?? [] });
  } catch (error) {
    return errorResponse(error);
  }
}

/** POST /api/admin/projects — crea un proyecto. */
export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  let body: { project?: ProjectInput; newImages?: NewImage[] };
  try {
    body = (await request.json()) as { project?: ProjectInput; newImages?: NewImage[] };
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }
  if (!body.project) {
    return NextResponse.json({ error: "Faltan datos del proyecto." }, { status: 400 });
  }

  try {
    const saved = await saveProject(body.project, body.newImages ?? []);
    return NextResponse.json({ project: saved }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
