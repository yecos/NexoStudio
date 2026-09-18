import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/service-page";

export const metadata: Metadata = {
  title: "Arquitectura Residencial en Medellín | Nexo Studio",
  description:
    "Diseño de viviendas, casas campestres y proyectos residenciales en Medellín y Antioquia. Arquitectura, visualización y acompañamiento técnico.",
  alternates: { canonical: "/arquitectura-residencial" },
};

export default function ArchitecturePage() {
  return (
    <ServicePage
      eyebrow="NEXO Architecture"
      title="Arquitectura residencial"
      highlight="con intención."
      intro="Diseñamos viviendas que responden al lugar, a la forma de habitar y a las decisiones reales que harán posible construirlas."
      heroImage="/images/projects/p04-penol/view-3.jpg"
      heroAlt="Arquitectura residencial diseñada por Nexo Studio"
      capabilities={[
        "Concepto y estrategia arquitectónica",
        "Distribución y desarrollo espacial",
        "Diseño de fachadas y relación interior–exterior",
        "Materialidad y criterios de iluminación",
        "Modelación y visualización 3D",
        "Documentación para desarrollo técnico",
        "Coordinación con especialidades",
        "Acompañamiento durante la ejecución",
      ]}
      philosophyTitle="La vivienda debe responder a quien la habita."
      philosophy="Antes de dibujar una forma buscamos entender rutinas, relaciones, paisaje, luz, privacidad y posibilidades de ejecución. La arquitectura aparece como consecuencia de esas decisiones."
      steps={[
        { title: "Descubrimiento", text: "Lugar, necesidades, referencias, presupuesto y objetivos." },
        { title: "Concepto", text: "Definimos organización espacial, lenguaje y relación con el entorno." },
        { title: "Desarrollo", text: "Profundizamos arquitectura, materialidad, visualización y criterios técnicos." },
        { title: "Ejecución", text: "Documentamos y acompañamos decisiones para proteger la intención del diseño." },
      ]}
    />
  );
}
