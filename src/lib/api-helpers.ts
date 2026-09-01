import { NextResponse } from "next/server";
import { GitHubError } from "./github";

/** Mapea errores del servicio a respuestas HTTP claras. */
export function errorResponse(error: unknown): NextResponse {
  if (error instanceof GitHubError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("[admin] error inesperado:", error);
  return NextResponse.json(
    { error: "Error inesperado al guardar. Revisa el log del servidor." },
    { status: 500 },
  );
}
