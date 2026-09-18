import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/service-page";

export const metadata: Metadata = {
  title: "Diseño de Interiores en Medellín | Nexo Studio",
  description:
    "Interiorismo residencial en Medellín: distribución, materialidad, iluminación, mobiliario y visualización para apartamentos y viviendas.",
  alternates: { canonical: "/interiorismo" },
};

export default function InteriorsPage() {
  return (
    <>
      <ServicePage
      eyebrow="NEXO Interiors"
      title="Interiorismo pensado"
      highlight="como arquitectura."
      intro="Diseñamos interiores donde distribución, iluminación, materiales y mobiliario trabajan juntos para construir una experiencia coherente."
      heroImage="/images/projects/p06-santa-fe/view-5.jpg"
      heroAlt="Proyecto de interiorismo residencial de Nexo Studio"
      capabilities={[
        "Redistribución y aprovechamiento del espacio",
        "Concepto interior y dirección estética",
        "Paleta de materiales y acabados",
        "Diseño de iluminación",
        "Diseño de mobiliario fijo y especial",
        "Selección de mobiliario y elementos",
        "Visualización 3D de los ambientes",
        "Planos y detalles para ejecución",
      ]}
      philosophyTitle="Un interior no se decora: se diseña."
      philosophy="Buscamos que cada material, mueble, luz y proporción tenga una razón. El resultado debe sentirse natural para quien vive el espacio, no como una suma de objetos."
      steps={[
        { title: "Lectura", text: "Entendemos el espacio existente, sus problemas y oportunidades." },
        { title: "Dirección", text: "Definimos distribución, atmósfera, referencias y materialidad." },
        { title: "Detalle", text: "Desarrollamos mobiliario, iluminación, acabados y visualización." },
        { title: "Implementación", text: "Coordinamos información y decisiones necesarias para ejecutar." },
      ]}
      />
      <div className="bg-dark-900 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/diseno-interiores-medellin"
            className="inline-flex items-center text-sm text-warm hover:text-warm-light transition-colors"
          >
            Diseño de interiores en Medellín →
          </a>
        </div>
      </div>
    </>
  );
}
