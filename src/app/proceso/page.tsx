import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Nuestro Proceso de Diseño | Nexo Studio",
  description:
    "Conoce cómo Nexo Studio desarrolla proyectos de arquitectura e interiorismo desde el descubrimiento y concepto hasta la documentación y el acompañamiento de obra.",
  alternates: { canonical: "/proceso" },
};

const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    text: "Entendemos la propiedad, quién la habita, objetivos, referencias, inversión estimada y momento del proyecto.",
  },
  {
    number: "02",
    title: "Concepto",
    text: "Traducimos esas necesidades en una dirección espacial, estética y material que guiará el proyecto.",
  },
  {
    number: "03",
    title: "Diseño",
    text: "Desarrollamos arquitectura, interiorismo, iluminación, mobiliario y materialidad con una visión integral.",
  },
  {
    number: "04",
    title: "Visualización",
    text: "Probamos decisiones con modelos y renders para comprender el resultado antes de llevarlo a obra.",
  },
  {
    number: "05",
    title: "Documentación",
    text: "Convertimos el diseño en información útil para presupuestar, coordinar proveedores y ejecutar.",
  },
  {
    number: "06",
    title: "Presupuesto y coordinación",
    text: "Aterrizamos decisiones a recursos, alcances y proveedores para reducir incertidumbre antes de intervenir.",
  },
  {
    number: "07",
    title: "Acompañamiento",
    text: "Durante la obra apoyamos decisiones y coordinación para mantener la intención del diseño.",
  },
  {
    number: "08",
    title: "Entrega",
    text: "Cerramos el proceso verificando decisiones finales y dejando el proyecto listo para ser habitado.",
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">
            NEXO Complete
          </p>
          <h1 className="max-w-5xl text-5xl sm:text-6xl lg:text-8xl font-semibold tracking-tight text-white leading-[0.96]">
            Del concepto
            <span className="block text-warm">a la obra.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-white/65 leading-relaxed">
            Un proyecto de calidad no depende únicamente de una buena idea. Necesita decisiones ordenadas, información clara y continuidad entre diseño y ejecución.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid md:grid-cols-[120px_0.8fr_1.2fr] gap-4 md:gap-10 border-t border-white/10 py-8 sm:py-10"
            >
              <span className="text-xs tracking-[0.22em] text-warm">{step.number}</span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white">{step.title}</h2>
              <p className="text-base sm:text-lg text-white/58 leading-relaxed max-w-2xl">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-dark-800 py-20 sm:py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Trabajemos juntos</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            El primer paso es
            <span className="block text-warm">entender tu proyecto.</span>
          </h2>
          <Link
            href="/#contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-warm px-8 py-3.5 text-sm font-semibold text-dark-900 hover:bg-warm-light transition-colors"
          >
            Iniciar un proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
