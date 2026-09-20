import type { Metadata } from "next";
import { IntentPage } from "@/components/pages/intent-page";

export const metadata: Metadata = {
  title: "Diseño de Interiores en Medellín | Nexo Studio",
  description:
    "Diseño de interiores para apartamentos y viviendas en Medellín: distribución, iluminación, materialidad, mobiliario a medida y visualización antes de ejecutar.",
  alternates: { canonical: "/diseno-interiores-medellin" },
};

export default function InteriorDesignMedellinPage() {
  return (
    <IntentPage
      eyebrow="Interiorismo · Medellín"
      title="Diseño de interiores"
      highlight="pensado para habitar."
      intro="Desarrollamos interiores residenciales como una sola composición: distribución, iluminación, materiales, mobiliario y detalle."
      heroImage="/images/projects/p03-santa-elena/view-4.jpg"
      heroAlt="Proyecto de interiorismo residencial desarrollado por Nexo Studio en Medellín"
      contextTitle="Primero resolvemos el espacio; después definimos su atmósfera."
      context={[
        "Un proyecto de interiorismo no comienza escogiendo un sofá. Comienza entendiendo cómo se usa el lugar, qué debe conservarse, qué necesita cambiar y qué decisiones impactan realmente la experiencia cotidiana.",
        "Trabajamos desde la distribución hasta el detalle para que iluminación, carpintería, materiales y mobiliario se coordinen antes de llegar a obra o compras.",
      ]}
      capabilities={[
        "Redistribución y optimización espacial",
        "Diseño de iluminación",
        "Materialidad y acabados",
        "Mobiliario fijo y especial",
        "Visualización 3D",
        "Planos y detalles de ejecución",
      ]}
      projectSlug="santa-elena-vivienda-unifamiliar"
      projectIntro="Este proyecto integra arquitectura, interiores y acompañamiento de obra, mostrando cómo las decisiones interiores pueden mantenerse coherentes con el lenguaje general de la vivienda."
      faq={[
        {
          question: "¿Puedo contratar solo el diseño de interiores?",
          answer: "Sí. El alcance puede quedarse en diseño, visualización y documentación, o ampliarse con acompañamiento de proveedores y ejecución según las necesidades del proyecto.",
        },
        {
          question: "¿Diseñan mobiliario a medida?",
          answer: "Sí. Cuando el proyecto lo requiere desarrollamos carpinterías, muebles fijos y piezas especiales coordinadas con la distribución, los materiales y la iluminación.",
        },
        {
          question: "¿Trabajan apartamentos nuevos y usados?",
          answer: "Sí. En apartamentos nuevos el foco suele estar en personalización y acabados; en propiedades usadas también evaluamos redistribución, instalaciones y nivel de intervención.",
        },
      ]}
    />
  );
}
