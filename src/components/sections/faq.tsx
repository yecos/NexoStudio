import { ChevronUp } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/motion/section-header";
import { FAQ_ITEMS } from "@/data/landing";

/** Preguntas frecuentes con <details> nativo (accesible por defecto). */
export function FAQ() {
  return (
    <section className="py-14 sm:py-20 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Lo que conviene"
          highlight="aclarar primero"
          description="Respuestas rápidas para entender cómo iniciar un proyecto con Nexo Studio."
        />

        <Stagger className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <StaggerItem key={item.question}>
              <details className="group rounded-lg border border-white/8 bg-dark-800/58 p-5 open:border-warm/24 open:bg-warm/[0.04] transition-all duration-300">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base sm:text-lg font-semibold text-white">
                  {item.question}
                  <ChevronUp className="w-5 h-5 shrink-0 rotate-180 text-warm transition-transform group-open:rotate-0" />
                </summary>
                <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
