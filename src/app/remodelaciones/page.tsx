import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/service-page";

export const metadata: Metadata = {
  title: "Remodelaciones Integrales en Medellín | Nexo Studio",
  description:
    "Diseño y coordinación de remodelaciones integrales para apartamentos y viviendas en Medellín. Interiorismo, documentación y acompañamiento de obra.",
  alternates: { canonical: "/remodelaciones" },
};

export default function RenovationsPage() {
  return (
    <ServicePage
      eyebrow="NEXO Renovation"
      title="Remodelar es"
      highlight="volver a pensar el espacio."
      intro="Transformamos propiedades existentes desde una lectura completa: distribución, instalaciones, materialidad, mobiliario, presupuesto y secuencia de ejecución."
      heroImage="/images/projects/p03-santa-elena/view-2.jpg"
      heroAlt="Proyecto de remodelación e interiorismo de Nexo Studio"
      capabilities={[
        "Levantamiento y diagnóstico del espacio",
        "Redistribución arquitectónica",
        "Diseño interior integral",
        "Criterios de instalaciones e iluminación",
        "Materialidad y especificaciones",
        "Mobiliario a medida",
        "Visualización antes de ejecutar",
        "Coordinación y acompañamiento de obra",
      ]}
      philosophyTitle="Transformar bien exige decidir antes de demoler."
      philosophy="Una remodelación concentra muchas decisiones en poco tiempo. Diseñar con anticipación permite entender impactos, ordenar prioridades y reducir cambios improvisados durante la ejecución."
      steps={[
        { title: "Diagnóstico", text: "Levantamos el estado actual y definimos alcance, prioridades y restricciones." },
        { title: "Propuesta", text: "Estudiamos distribución, concepto, materiales y decisiones principales." },
        { title: "Preparación", text: "Documentamos y visualizamos para presupuestar y coordinar la intervención." },
        { title: "Obra", text: "Acompañamos decisiones y proveedores para mantener coherencia con el diseño." },
      ]}
    />
  );
}
