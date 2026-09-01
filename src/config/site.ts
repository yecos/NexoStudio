/**
 * Configuración central del sitio.
 * Única fuente de verdad para datos de contacto, URLs y navegación.
 * Importable tanto desde Server Components como Client Components.
 */

export const siteConfig = {
  name: "Nexo Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nexostudioarq.com",
  title: "Nexo Studio — Arquitectura, Remodelaciones e Interiores | Medellín",
  description:
    "Nexo Studio diseña, remodela y gestiona espacios residenciales y comerciales en Medellín: arquitectura, interiores, visualización 3D y gerencia de proyectos.",
  contact: {
    /** WhatsApp principal (formato internacional sin +) */
    whatsappMain: "573146811444",
    /** WhatsApp secundario (formato internacional sin +) */
    whatsappSecondary: "573002544368",
    phonePrimaryDisplay: "314 681 1444",
    phoneSecondaryDisplay: "300 254 4368",
    phonePrimaryE164: "+57 314 681 1444",
    email: "nexostudio.arquitectura@gmail.com",
    location: "Medellín, Colombia",
    address: {
      locality: "Medellín",
      region: "Antioquia",
      country: "CO",
    },
    areaServed: ["Medellín", "Área Metropolitana", "Antioquia", "Colombia"],
  },
  nav: [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Casos", href: "#casos" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ],
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola Nexo Studio, quiero cotizar un proyecto de arquitectura/diseño.";

/** Construye un enlace de WhatsApp (número principal) con mensaje pre-cargado. */
export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${siteConfig.contact.whatsappMain}?text=${encodeURIComponent(message)}`;
}

/** Construye un enlace de WhatsApp (número secundario) con mensaje pre-cargado. */
export function whatsappLinkSecondary(
  message: string = DEFAULT_WHATSAPP_MESSAGE,
): string {
  return `https://wa.me/${siteConfig.contact.whatsappSecondary}?text=${encodeURIComponent(message)}`;
}
