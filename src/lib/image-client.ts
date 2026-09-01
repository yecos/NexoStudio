"use client";

/**
 * Redimensiona imágenes en el navegador antes de subirlas:
 * - Lado máximo 1920px (suficiente para web y OG)
 * - JPEG calidad 0.85 (típico: foto de 5 MB → 300-800 KB)
 * Así el payload queda muy por debajo del límite de Vercel (4.5 MB).
 */
export async function fileToResizedDataUrl(
  file: File,
  maxEdge = 1920,
  quality = 0.85,
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error(`"${file.name}" no es una imagen.`);
  }
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Tu navegador no soporta el procesamiento de imágenes.");
    ctx.drawImage(bitmap, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    bitmap.close();
  }
}

/** Nombre de archivo único y seguro para el repo. */
export function generateImageName(index: number): string {
  const rand = Math.random().toString(36).slice(2, 6);
  return `view-${Date.now().toString(36)}-${index}-${rand}.jpg`;
}
