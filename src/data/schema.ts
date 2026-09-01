/**
 * Datos estructurados (JSON-LD) del sitio.
 * La FAQ se importa de data/landing para mantener una única fuente de verdad.
 */
import { siteConfig } from "@/config/site";
import { FAQ_ITEMS } from "@/data/landing";

const SITE_URL = siteConfig.url;
const { contact } = siteConfig;

const faqEntities = FAQ_ITEMS.map((item) => ({
  "@type": "Question",
  name: item.question,
  acceptedAnswer: {
    "@type": "Answer",
    text: item.answer,
  },
}));

export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/logo-nexo-symbol.png`,
    image: `${SITE_URL}/images/hero/hero-arch.jpg`,
    description: siteConfig.description,
    email: contact.email,
    telephone: contact.phonePrimaryE164,
    areaServed: [...contact.areaServed],
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
    },
    knowsAbout: [
      "Arquitectura",
      "Remodelaciones",
      "Diseño de interiores",
      "Visualización 3D",
      "Gerencia de proyectos",
      "Factibilidad inmobiliaria",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: contact.phonePrimaryE164,
      availableLanguage: ["es"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: SITE_URL,
    inLanguage: "es-CO",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntities,
  },
];

/** JSON-LD de breadcrumbs para páginas de proyecto. */
export function breadcrumbJsonLd(projectName: string, projectSlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portafolio",
        item: `${SITE_URL}/#portafolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: projectName,
        item: `${SITE_URL}/proyectos/${projectSlug}`,
      },
    ],
  };
}
