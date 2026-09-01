import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Autenticación del panel /admin con contraseña única (ADMIN_PASSWORD).
 * Sesión: cookie httpOnly con HMAC (no almacenamos usuarios).
 */

export const SESSION_COOKIE = "nexo_admin";
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 días en segundos

function getSecret(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`nexo::${password}`).digest("hex");
}

/** Comparación en tiempo constante de la contraseña (vía hash de longitud fija). */
export function verifyPassword(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (typeof password !== "string" || !expected || !password) return false;
  const a = createHash("sha256").update(password).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Token de sesión: `<expira_ms>.<hmac(expira)>`. */
export function createSessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = String(expires);
  const signature = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

/** Valida token y expiración. */
export function verifySessionToken(token: unknown): boolean {
  if (typeof token !== "string") return false;
  const secret = getSecret();
  if (!secret) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** ¿La petición actual trae sesión de admin válida? (server components y routes) */
export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** ¿Está ADMIN_PASSWORD configurada? (para avisar en el login) */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}
