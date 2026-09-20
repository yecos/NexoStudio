import type { Metadata } from "next";
import { IntentPage } from "@/components/pages/intent-page";

export const metadata: Metadata = {
  title: "Remodelación de Apartamentos en El Poblado | Nexo Studio",
  description:
    "Remodelación integral de apartamentos en El Poblado, Medellín. Diseño, interiorismo, visualización, documentación y coordinación antes de ejecutar.",
  alternates: { canonical: "/remodelacion-apartamentos-el-poblado" },
  openGraph: {
    title: "Remodelación de Apartamentos en El Poblado | Nexo Studio",
    description:
      "Remodelación integral de apartamentos en El Poblado, Medellín. Diseño, interiorismo, visualización, documentación y coordinación antes de ejecutar.",
    url: "/remodelacion-apartamentos-el-poblado",
    images: [{ url: "/images/projects/p02-waves-living/view-2.jpg", alt: "Arquitectura residencial de Nexo Studio en El Poblado, Medellín" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remodelación de Apartamentos en El Poblado | Nexo Studio",
    description:
      "Remodelación integral de apartamentos en El Poblado, Medellín. Diseño, interiorismo, visualización, documentación y coordinación antes de ejecutar.",
    images: ["/images/projects/p02-waves-living/view-2.jpg"],
  },
};

export default function RenovationPobladoPage() {
  return (
    <IntentPage
      eyebrow="El Poblado · Medellín"
      title="Remodelación de apartamentos"
      highlight="con decisiones claras."
      intro="Transformamos propiedades existentes desde una lectura completa del espacio, priorizando distribución, iluminación, materialidad y coordinación antes de intervenir."
      heroImage="/images/projects/p02-waves-living/view-2.jpg"
      heroAlt="Arquitectura residencial en El Tesoro, El Poblado, Medellín"
      contextTitle="Una remodelación de alto nivel necesita más diseño antes de obra, no más improvisación durante ella."
      context={[
        "En apartamentos de alta inversión, cada cambio puede afectar instalaciones, carpinterías, iluminación, cielos, pisos y mobiliario. Por eso conviene coordinar el proyecto antes de demoler o comprar acabados.",
        "Nuestro proceso busca que el cliente pueda visualizar las decisiones principales, entender el alcance y llegar a presupuesto y ejecución con una dirección definida.",
      ]}
      capabilities={[
        "Levantamiento y diagnóstico",
        "Redistribución arquitectónica",
        "Interiorismo integral",
        "Iluminación y cielos",
        "Mobiliario a medida",
        "Visualización antes de obra",
      ]}
      projectSlug="waves-living"
      projectIntro="Waves Living está ubicado en El Tesoro y sirve como referencia de nuestra experiencia proyectando arquitectura residencial para uno de los sectores más reconocidos de El Poblado."
      faq={[
        {
          question: "¿Cuándo conviene contratar el diseño?",
          answer: "Idealmente antes de iniciar demoliciones o compras. Eso permite coordinar distribución, instalaciones, iluminación, acabados y mobiliario con menos cambios durante obra.",
        },
        {
          question: "¿Pueden trabajar un apartamento que todavía no ha sido entregado?",
          answer: "Sí. Si existen planos e información suficiente podemos adelantar concepto, distribución y decisiones de interiorismo antes de la entrega, dejando las verificaciones finales para el levantamiento.",
        },
        {
          question: "¿La propuesta incluye presupuesto de obra?",
          answer: "El alcance se define según el proyecto. Podemos desarrollar únicamente diseño y documentación o avanzar a una etapa de presupuesto, coordinación de proveedores y acompañamiento de ejecución.",
        },
      ]}
    />
  );
}
