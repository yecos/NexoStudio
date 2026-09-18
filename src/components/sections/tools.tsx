import Image from "next/image";
import { Eye, Layers3, DraftingCompass } from "lucide-react";

export function Tools() {
  const points = [
    {
      icon: DraftingCompass,
      title: "Diseño con criterio",
      text: "Definimos distribución, proporciones, materialidad e iluminación antes de tomar decisiones de obra.",
    },
    {
      icon: Eye,
      title: "Visualización previa",
      text: "Renders y modelos permiten evaluar atmósfera, mobiliario y acabados antes de construir.",
    },
    {
      icon: Layers3,
      title: "Información ejecutable",
      text: "El diseño se traduce en documentación y criterios claros para coordinar proveedores y ejecución.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-dark-900 py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[56%] opacity-30 lg:opacity-55">
        <Image
          src="/images/projects/p03-santa-elena/view-4.jpg"
          alt="Visualización arquitectónica desarrollada por Nexo Studio"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 56vw, 100vw"
        />
        <div className="absolute inset-0 bg-dark-900/45 lg:bg-transparent lg:bg-gradient-to-r lg:from-dark-900 lg:via-dark-900/75 lg:to-dark-900/15" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">
            Antes de construir
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.04]">
            Diseñamos para que puedas
            <span className="block text-warm">ver antes de decidir.</span>
          </h2>
          <p className="mt-6 text-lg text-white/65 leading-relaxed max-w-xl">
            La tecnología está al servicio del proyecto: nos permite estudiar alternativas, anticipar decisiones y reducir improvisación cuando llega el momento de ejecutar.
          </p>

          <div className="mt-10 grid gap-5">
            {points.map((point) => (
              <div key={point.title} className="flex gap-4 border-t border-white/10 pt-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-warm/30 bg-warm/10">
                  <point.icon className="h-4.5 w-4.5 text-warm" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{point.title}</h3>
                  <p className="mt-1 text-sm sm:text-base text-white/58 leading-relaxed">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
