import { ArrowDownRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Descubrimiento",
    text: "Entendemos la propiedad, la forma de habitar, las prioridades, el presupuesto y el momento del proyecto.",
  },
  {
    number: "02",
    title: "Concepto",
    text: "Definimos la dirección espacial, estética y material que guiará todas las decisiones posteriores.",
  },
  {
    number: "03",
    title: "Diseño",
    text: "Desarrollamos arquitectura, interiorismo, iluminación, mobiliario y materialidad como un sistema coherente.",
  },
  {
    number: "04",
    title: "Visualización",
    text: "Validamos decisiones mediante modelos y renders antes de comprometer recursos en obra.",
  },
  {
    number: "05",
    title: "Documentación",
    text: "Traducimos el diseño en información clara para presupuestar, coordinar y ejecutar.",
  },
  {
    number: "06",
    title: "Acompañamiento",
    text: "Apoyamos la coordinación de proveedores, decisiones y obra para proteger la intención del proyecto.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-[#0d0d0d] py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">
              Nuestro proceso
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.04]">
              Del concepto
              <span className="block text-warm">a la obra.</span>
            </h2>
            <p className="mt-6 max-w-md text-base sm:text-lg text-white/62 leading-relaxed">
              Un proceso ordenado reduce incertidumbre y permite que cada decisión llegue a obra con mayor claridad.
            </p>
          </div>

          <div>
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="grid grid-cols-[56px_1fr_auto] sm:grid-cols-[72px_1fr_auto] gap-4 sm:gap-6 border-t border-white/10 py-7 sm:py-9"
              >
                <span className="text-xs tracking-[0.2em] text-warm">{step.number}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-sm sm:text-base text-white/58 leading-relaxed">
                    {step.text}
                  </p>
                </div>
                <ArrowDownRight className="w-5 h-5 text-white/25" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
