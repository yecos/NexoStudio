/**
 * Tipos compartidos entre el panel de administración (cliente) y la API
 * (servidor). Solo tipos: sin imports de código de servidor para que
 * los componentes cliente puedan importarlos con seguridad.
 */

/** Vista editable en el formulario: existente (src en /public) o nueva (temp). */
export interface FormView {
  /** Ruta existente (`/images/...`) o `temp:<localId>` para imágenes nuevas. */
  src: string;
  alt: string;
  /** Solo cliente: preview dataURL de la imagen nueva. */
  dataUrl?: string;
  /** Solo cliente: nombre de archivo propuesto para el commit. */
  fileName?: string;
}

/** Payload que envía el formulario al guardar. */
export interface ProjectInput {
  name: string;
  slug: string;
  location: string;
  lat: number;
  lng: number;
  category: string;
  scope: string;
  status: string;
  year: number;
  description: string;
  views: Array<{ src: string; alt: string }>;
}

/** Imagen nueva para subir (base64 JPEG ya redimensionado en el cliente). */
export interface NewImage {
  localId: string;
  fileName: string;
  /** Base64 puro (sin el prefijo `data:image/jpeg;base64,`). */
  dataBase64: string;
}
