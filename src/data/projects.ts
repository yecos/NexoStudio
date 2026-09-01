/**
 * Datos de proyectos del portafolio de Nexo Studio.
 *
 * Fuente de verdad: `src/data/projects.json` (editable desde /admin).
 * El panel de administración hace commit del JSON a GitHub vía API y
 * Vercel redespliega automáticamente (~2 min).
 *
 * Al editar un proyecto desde /admin, `updatedAt` se actualiza solo.
 * Si editas el JSON a mano, actualiza también `updatedAt` (alimenta sitemap.xml).
 */
import projectsData from "./projects.json";

export interface ProjectView {
  src: string;
  alt: string;
}

export type ProjectCategory =
  | "Residencial"
  | "Comercial"
  | "Remodelación"
  | "Obra nueva"
  | "Interiorismo"
  | "Residencial / Comercial";

export type ProjectStatus =
  | "Proyecto conceptual"
  | "Anteproyecto"
  | "En obra"
  | "Ejecutado";

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  /** Coordenadas para el mapa (Leaflet/OpenStreetMap). */
  lat: number;
  lng: number;
  category: ProjectCategory;
  scope: string;
  status: ProjectStatus;
  year: number;
  description: string;
  /** Fecha ISO del último cambio de contenido (sitemap.xml). */
  updatedAt: string;
  views: ProjectView[];
}

// El cast es seguro: data.test.ts valida en runtime que category/status
// pertenezcan a los union types y que la estructura esté completa.
export const projects: Project[] = projectsData as Project[];

/** Helper para obtener proyecto por slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
