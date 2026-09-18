/**
 * Configuración central del sitio.
 * Única fuente de verdad para datos de contacto, URLs y navegación.
 * Importable tanto desde Server Components como Client Components.
 */

export const siteConfig = {
  name: "Nexo Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nexostudioarq.com",
  title: "Nexo Studio — Arquitectura Residencial e Interiorismo | Medellín",
  description:
    "Estudio de arquitectura residencial e interiorismo en Medellín. Diseñamos viviendas, apartamentos y remodelaciones integrales desde el concepto hasta la obra.",
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
    areaServed: [
      "Medellín",
      "El Poblado",
      "Envigado",
      "Oriente Antioqueño",
      "Rionegro",
      "Llanogrande",
      "Antioquia",
      "Colombia",
    ],
  },
  nav: [
    { label: "Proyectos", href: "/proyectos" },
    { label: "Servicios", href: "/#servicios" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Journal", href: "/journal" },
  ],
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola Nexo Studio, quiero conversar sobre un proyecto de arquitectura o interiorismo.";

export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${siteConfig.contact.whatsappMain}?text=${encodeURIComponent(message)}`;
}

export function whatsappLinkSecondary(
  message: string = DEFAULT_WHATSAPP_MESSAGE,
): string {
  return `https://wa.me/${siteConfig.contact.whatsappSecondary}?text=${encodeURIComponent(message)}`;
}
