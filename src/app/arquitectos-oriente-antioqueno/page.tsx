import type { Metadata } from "next";
import { LocationPage } from "@/components/pages/location-page";

export const metadata: Metadata = {
  title: "Arquitectos en Oriente Antioqueño | Nexo Studio",
  description:
    "Arquitectura residencial y casas campestres en Rionegro, Guarne, El Peñol y Oriente Antioqueño. Diseño, interiorismo y acompañamiento técnico.",
  alternates: { canonical: "/arquitectos-oriente-antioqueno" },
  openGraph: {
    title: "Arquitectos en Oriente Antioqueño | Nexo Studio",
    description:
      "Arquitectura residencial y casas campestres en Rionegro, Guarne, El Peñol y Oriente Antioqueño. Diseño, interiorismo y acompañamiento técnico.",
    url: "/arquitectos-oriente-antioqueno",
    images: [{ url: "/images/projects/p04-penol/view-5.jpg", alt: "Casa de recreación diseñada por Nexo Studio en Oriente Antioqueño" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arquitectos en Oriente Antioqueño | Nexo Studio",
    description:
      "Arquitectura residencial y casas campestres en Rionegro, Guarne, El Peñol y Oriente Antioqueño. Diseño, interiorismo y acompañamiento técnico.",
    images: ["/images/projects/p04-penol/view-5.jpg"],
  },
};

export default function OrientePage() {
  return (
    <LocationPage
      eyebrow="Oriente Antioqueño"
      title="Casas que dialogan"
      highlight="con el paisaje."
      intro="Diseñamos vivienda nueva y casas de recreación buscando una relación consciente entre arquitectura, topografía, visuales, clima y forma de habitar."
      heroImage="/images/projects/p04-penol/view-5.jpg"
      heroAlt="Vivienda de recreación diseñada por Nexo Studio en El Peñol"
      projectSlugs={["penol-vivienda-recreacion", "casa-bonsai-guarne", "rionegro-residencial-comercial"]}
      contextTitle="El entorno también diseña."
      context="En Oriente Antioqueño, paisaje y arquitectura están estrechamente relacionados. Buscamos que las decisiones de implantación, visuales, espacios sociales y materialidad respondan a las condiciones reales del lugar y al uso esperado de la vivienda."
      services={[
        "Diseño de casas campestres",
        "Arquitectura residencial",
        "Interiorismo",
        "Relación interior–exterior",
        "Visualización del proyecto",
        "Acompañamiento técnico",
      ]}
    />
  );
}
