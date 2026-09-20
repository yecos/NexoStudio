import type { Metadata } from "next";
import { LocationPage } from "@/components/pages/location-page";

export const metadata: Metadata = {
  title: "Arquitectos en Medellín | Nexo Studio",
  description:
    "Estudio de arquitectura residencial e interiorismo en Medellín. Diseño de viviendas, apartamentos y remodelaciones integrales con visualización y acompañamiento técnico.",
  alternates: { canonical: "/arquitectos-medellin" },
};

export default function MedellinPage() {
  return (
    <LocationPage
      eyebrow="Nexo Studio · Medellín"
      title="Arquitectura residencial"
      highlight="en Medellín."
      intro="Diseñamos viviendas, apartamentos e interiores desde Medellín, conectando arquitectura, materialidad, visualización y ejecución."
      heroImage="/images/projects/p02-waves-living/view-3.jpg"
      heroAlt="Proyecto residencial de Nexo Studio en Medellín"
      projectSlugs={["waves-living", "santa-elena-vivienda-unifamiliar"]}
      contextTitle="Diseñar en una ciudad de contrastes."
      context="Trabajamos proyectos nuevos y transformaciones de espacios existentes con una lectura integral: cómo se habita, cómo entra la luz, qué relación existe con el paisaje y cómo cada decisión puede ejecutarse con claridad."
      services={[
        "Arquitectura residencial",
        "Diseño de interiores",
        "Remodelaciones integrales",
        "Visualización arquitectónica",
        "Documentación y coordinación",
        "Acompañamiento de obra",
      ]}
    />
  );
}
