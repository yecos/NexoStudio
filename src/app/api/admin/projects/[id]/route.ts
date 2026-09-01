import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { deleteProject, saveProject } from "@/lib/admin-projects";
import { errorResponse } from "@/lib/api-helpers";
import type { NewImage, ProjectInput } from "@/types/admin";

type Params = Promise<{ id: string }>;

async function guard(): Promise<NextResponse | null> {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  return null;
}

/** PUT /api/admin/projects/[id] — actualiza un proyecto. */
export async function PUT(
  request: Request,
  { params }: { params: Params },
) {
  const denied = await guard();
  if (denied) return denied;

  const { id } = await params;

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
    const saved = await saveProject(body.project, body.newImages ?? [], { id });
    return NextResponse.json({ project: saved });
  } catch (error) {
    return errorResponse(error);
  }
}

/** DELETE /api/admin/projects/[id] — elimina un proyecto. */
export async function DELETE(
  _request: Request,
  { params }: { params: Params },
) {
  const denied = await guard();
  if (denied) return denied;

  const { id } = await params;
  try {
    await deleteProject(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
