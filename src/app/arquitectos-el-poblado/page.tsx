import type { Metadata } from "next";
import { LocationPage } from "@/components/pages/location-page";

export const metadata: Metadata = {
  title: "Arquitectos en El Poblado, Medellín | Nexo Studio",
  description:
    "Arquitectura residencial, interiorismo y remodelaciones para apartamentos y viviendas en El Poblado y sectores cercanos de Medellín.",
  alternates: { canonical: "/arquitectos-el-poblado" },
};

export default function PobladoPage() {
  return (
    <LocationPage
      eyebrow="El Poblado · Medellín"
      title="Arquitectura e interiores"
      highlight="para propiedades singulares."
      intro="Abordamos apartamentos, viviendas y remodelaciones desde una mirada contemporánea que une distribución, materialidad, iluminación y detalle."
      heroImage="/images/projects/p02-waves-living/view-2.jpg"
      heroAlt="Proyecto Waves Living de Nexo Studio en el sector El Tesoro de Medellín"
      projectSlugs={["waves-living"]}
      contextTitle="Cada propiedad pide una respuesta distinta."
      context="En proyectos residenciales de alta inversión, el valor no está en acumular acabados sino en tomar buenas decisiones: distribución, proporciones, iluminación, mobiliario y materialidad deben funcionar como una sola composición."
      services={[
        "Remodelación de apartamentos",
        "Interiorismo residencial",
        "Arquitectura de vivienda",
        "Mobiliario a medida",
        "Iluminación y materialidad",
        "Visualización antes de obra",
      ]}
    />
  );
}
