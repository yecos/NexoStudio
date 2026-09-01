/**
 * Cliente de la API de GitHub (Contents API) para que el panel /admin
 * guarde proyectos e imágenes con commits → Vercel redespliega solo.
 *
 * Variables de entorno:
 * - GITHUB_TOKEN  (requerida): token con permisos de escritura (Contents: RW)
 * - GITHUB_REPO   (opcional): "owner/repo", por defecto "yecos/NexoStudio"
 * - GITHUB_BRANCH (opcional): por defecto "main"
 */

const API_BASE = "https://api.github.com";
export const DATA_PATH = "src/data/projects.json";

export class GitHubError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

function repo(): string {
  return process.env.GITHUB_REPO ?? "yecos/NexoStudio";
}

function branch(): string {
  return process.env.GITHUB_BRANCH ?? "main";
}

function requireToken(): string {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new GitHubError(
      "GITHUB_TOKEN no está configurada en el servidor (ver README del panel).",
      500,
    );
  }
  return token;
}

async function ghFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = requireToken();
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
      cache: "no-store",
    });
  } catch {
    throw new GitHubError("No se pudo conectar con la API de GitHub.", 502);
  }
  if (!res.ok) {
    if (res.status === 409 || res.status === 422) {
      throw new GitHubError(
        "Conflicto al guardar (¿se editó en otro dispositivo?). Recarga e intenta de nuevo.",
        409,
      );
    }
    throw new GitHubError(
      `GitHub respondió ${res.status}. Verifica el token y sus permisos.`,
      res.status === 401 ? 401 : 502,
    );
  }
  return res;
}

/** Lee el projects.json del remoto y devuelve su sha para el commit. */
export async function getRemoteJson<T>(): Promise<{ data: T; sha: string }> {
  const res = await ghFetch(
    `/repos/${repo()}/contents/${DATA_PATH}?ref=${branch()}`,
  );
  const json = (await res.json()) as { content: string; sha: string };
  let data: T;
  try {
    data = JSON.parse(Buffer.from(json.content, "base64").toString("utf8")) as T;
  } catch {
    throw new GitHubError("El projects.json remoto no es JSON válido.", 500);
  }
  return { data, sha: json.sha };
}

/** Escribe un archivo de texto (UTF-8) en el repo vía commit. */
export async function putTextFile(
  path: string,
  content: string,
  message: string,
  sha?: string,
): Promise<void> {
  await ghFetch(`/repos/${repo()}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch: branch(),
      ...(sha ? { sha } : {}),
    }),
  });
}

/**
 * Sube (o sobrescribe) una imagen en base64.
 * Devuelve la ruta pública final (/images/...).
 */
export async function putBase64Image(
  path: string,
  dataBase64: string,
  message: string,
): Promise<void> {
  // Si el archivo ya existe, necesitamos su sha para sobrescribirlo.
  let sha: string | undefined;
  try {
    const res = await ghFetch(
      `/repos/${repo()}/contents/${path}?ref=${branch()}`,
    );
    sha = ((await res.json()) as { sha: string }).sha;
  } catch (error) {
    // 404 → archivo nuevo (sin sha). Cualquier otro error sí se propaga.
    if (!(error instanceof GitHubError) || error.status !== 404) throw error;
  }
  await ghFetch(`/repos/${repo()}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: dataBase64,
      branch: branch(),
      ...(sha ? { sha } : {}),
    }),
  });
}
