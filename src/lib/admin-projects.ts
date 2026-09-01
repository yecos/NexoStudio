/**
 * Servicio del panel /admin: validación + create/update/delete de proyectos.
 * Toda escritura va al repo vía GitHub API (ver lib/github.ts) para que
 * Vercel redespliegue automáticamente.
 */
import type { Project, ProjectCategory, ProjectStatus } from "@/data/projects";
import type { NewImage, ProjectInput } from "@/types/admin";
import {
  DATA_PATH,
  GitHubError,
  getRemoteJson,
  putBase64Image,
  putTextFile,
} from "./github";

const VALID_CATEGORIES: ProjectCategory[] = [
  "Residencial",
  "Comercial",
  "Remodelación",
  "Obra nueva",
  "Interiorismo",
  "Residencial / Comercial",
];

const VALID_STATUSES: ProjectStatus[] = [
  "Proyecto conceptual",
  "Anteproyecto",
  "En obra",
  "Ejecutado",
];

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const FILENAME_RE = /^[a-z0-9-]+\.jpg$/;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4 MB por imagen tras el resize

export class ValidationError extends GitHubError {
  constructor(message: string) {
    super(message, 422);
  }
}

/** Siguiente id secuencial: p07, p08... */
function nextId(projects: Project[]): string {
  const max = projects.reduce((acc, p) => {
    const n = Number.parseInt(p.id.replace(/^p/, ""), 10);
    return Number.isFinite(n) && n > acc ? n : acc;
  }, 0);
  return `p${String(max + 1).padStart(2, "0")}`;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function requireString(value: unknown, field: string, min = 1): string {
  if (typeof value !== "string" || value.trim().length < min) {
    throw new ValidationError(`El campo "${field}" es obligatorio (mín. ${min} caracteres).`);
  }
  return value.trim();
}

/** Valida el payload completo del formulario. Lanza ValidationError con detalle. */
function validateProjectInput(input: ProjectInput): void {
  requireString(input.name, "Nombre", 2);
  requireString(input.location, "Ubicación (texto)", 2);
  requireString(input.description, "Descripción", 30);
  if (typeof input.slug !== "string" || !SLUG_RE.test(input.slug)) {
    throw new ValidationError(
      "El slug solo puede tener letras minúsculas, números y guiones (ej: casa-nueva).",
    );
  }
  if (typeof input.lat !== "number" || !Number.isFinite(input.lat) || input.lat < -90 || input.lat > 90) {
    throw new ValidationError("La latitud debe ser un número entre -90 y 90.");
  }
  if (typeof input.lng !== "number" || !Number.isFinite(input.lng) || input.lng < -180 || input.lng > 180) {
    throw new ValidationError("La longitud debe ser un número entre -180 y 180.");
  }
  if (!VALID_CATEGORIES.includes(input.category as ProjectCategory)) {
    throw new ValidationError("La categoría no es válida.");
  }
  if (!VALID_STATUSES.includes(input.status as ProjectStatus)) {
    throw new ValidationError("El estado no es válido.");
  }
  if (
    typeof input.year !== "number" ||
    !Number.isInteger(input.year) ||
    input.year < 1990 ||
    input.year > 2100
  ) {
    throw new ValidationError("El año debe estar entre 1990 y 2100.");
  }
  if (!Array.isArray(input.views) || input.views.length < 1) {
    throw new ValidationError("Agrega al menos una imagen con su texto alternativo.");
  }
  for (const [i, view] of input.views.entries()) {
    requireString(view.alt, `Texto alternativo de la imagen ${i + 1}`, 5);
  }
}

interface SaveOptions {
  /** id del proyecto a actualizar; omitir para crear. */
  id?: string;
}

/**
 * Guarda (crea o actualiza) un proyecto:
 * 1. Valida el payload.
 * 2. Sube imágenes nuevas a public/images/projects/<slug>/.
 * 3. Commitea projects.json en el remoto.
 * Devuelve el proyecto guardado.
 */
export async function saveProject(
  input: ProjectInput,
  newImages: NewImage[],
  options: SaveOptions = {},
): Promise<Project> {
  validateProjectInput(input);

  // 1. Subir imágenes nuevas (nombres únicos; idempotente en reintentos)
  const imageDir = `public/images/projects/${input.slug}`;
  const pathByLocalId = new Map<string, string>();
  for (const img of newImages) {
    if (!FILENAME_RE.test(img.fileName)) {
      throw new ValidationError(`Nombre de imagen no válido: ${img.fileName}`);
    }
    if (!/^[A-Za-z0-9+/=]+$/.test(img.dataBase64) || Buffer.byteLength(img.dataBase64, "base64") > MAX_IMAGE_BYTES) {
      throw new ValidationError(
        `La imagen ${img.fileName} supera el límite de 4 MB o está corrupta.`,
      );
    }
    const filePath = `${imageDir}/${img.fileName}`;
    await putBase64Image(
      filePath,
      img.dataBase64,
      `admin: subir imagen ${input.slug}/${img.fileName} [panel]`,
    );
    pathByLocalId.set(img.localId, `/images/projects/${input.slug}/${img.fileName}`);
  }

  const views = input.views.map((view) => {
    if (view.src.startsWith("temp:")) {
      const resolved = pathByLocalId.get(view.src.slice(5));
      if (!resolved) {
        throw new ValidationError("Hay una imagen nueva sin datos de subida.");
      }
      return { src: resolved, alt: view.alt.trim() };
    }
    if (!view.src.startsWith("/images/")) {
      throw new ValidationError(`Ruta de imagen no permitida: ${view.src}`);
    }
    return { src: view.src, alt: view.alt.trim() };
  });

  // 2. Commitear projects.json con reintentos (la API de GitHub tiene
  //    consistencia eventual: el sha puede estar desactualizado un instante)
  const isUpdate = Boolean(options.id);
  const action = isUpdate ? "actualizar" : "crear";

  let lastRemote: Project[] = [];
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const { data: remoteProjects, sha } = await getRemoteJson<Project[]>();
    const current = remoteProjects ?? [];
    lastRemote = current;

    // Slug único (excluyendo el propio proyecto en updates)
    const slugOwner = options.id
      ? current.find((p) => p.slug === input.slug && p.id !== options.id)
      : current.find((p) => p.slug === input.slug);
    if (slugOwner) {
      throw new GitHubError(
        `El slug "${input.slug}" ya lo usa el proyecto "${slugOwner.name}". Cambia el nombre o el slug.`,
        409,
      );
    }

    const existing = isUpdate ? current.find((p) => p.id === options.id) : undefined;
    if (isUpdate && !existing) {
      // Puede ser lectura obsoleta (API de GitHub) → reintentar antes de 404
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        continue;
      }
      throw new GitHubError("El proyecto ya no existe en el repositorio.", 404);
    }

    const saved: Project = {
      id: existing?.id ?? nextId(current),
      slug: input.slug,
      name: input.name.trim(),
      location: input.location.trim(),
      lat: input.lat,
      lng: input.lng,
      category: input.category as ProjectCategory,
      scope: (input.scope ?? "").trim() || "Diseño arquitectónico",
      status: input.status as ProjectStatus,
      year: input.year,
      description: input.description.trim(),
      updatedAt: todayISO(),
      views,
    };

    // Merge sobre la versión REMOTA (evita pisar ediciones concurrentes)
    const merged = isUpdate
      ? current.map((p) => (p.id === saved.id ? saved : p))
      : [...current, saved];

    try {
      await putTextFile(
        DATA_PATH,
        `${JSON.stringify(merged, null, 2)}\n`,
        `admin: ${action} proyecto "${saved.name}" [panel]`,
        sha,
      );
      return saved;
    } catch (error) {
      const isConflict =
        error instanceof GitHubError &&
        (error.upstreamStatus === 409 || error.upstreamStatus === 422);
      if (!isConflict || attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  // Inalcanzable: el bucle siempre retorna o lanza. Solo para el tipo.
  throw new GitHubError(
    `No se pudo guardar (repo en ${lastRemote.length} proyectos). Intenta de nuevo.`,
    502,
  );
}

/** Elimina un proyecto del JSON remoto (las imágenes quedan en /public). */
export async function deleteProject(id: string): Promise<void> {
  // Reintentos por consistencia eventual de la API de GitHub (sha obsoleto).
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const { data: current, sha } = await getRemoteJson<Project[]>();
    const target = (current ?? []).find((p) => p.id === id);
    if (!target) {
      // Puede ser lectura obsoleta (API de GitHub) → reintentar antes de 404
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        continue;
      }
      throw new GitHubError("El proyecto no existe en el repositorio.", 404);
    }
    const merged = (current ?? []).filter((p) => p.id !== id);
    try {
      await putTextFile(
        DATA_PATH,
        `${JSON.stringify(merged, null, 2)}\n`,
        `admin: eliminar proyecto "${target.name}" [panel]`,
        sha,
      );
      return;
    } catch (error) {
      const isConflict =
        error instanceof GitHubError &&
        (error.upstreamStatus === 409 || error.upstreamStatus === 422);
      if (!isConflict || attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }
}
