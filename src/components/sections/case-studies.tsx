import Image from "next/image";
import { Stagger, StaggerArticle } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/motion/section-header";
import { CASE_STUDIES } from "@/data/landing";

/** Casos de estudio: reto → respuesta → resultado. */
export function CaseStudies() {
  return (
    <section id="casos" className="py-14 sm:py-20 lg:py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Casos de estudio"
          title="Más que imágenes:"
          highlight="decisiones claras"
          description="Tres lecturas rápidas de cómo abordamos retos distintos: remodelación, obra nueva e interiorismo comercial."
        />

        <Stagger className="grid lg:grid-cols-3 gap-4 sm:gap-5">
          {CASE_STUDIES.map((item) => (
            <StaggerArticle
              key={item.title}
              className="h-full group rounded-lg border border-white/8 bg-dark-900/62 overflow-hidden hover:border-warm/24 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} - ${item.category} Nexo Studio`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  quality={86}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/82 via-dark-900/18 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-warm/92 px-3 py-1 text-xs font-semibold text-dark-900">
                  {item.category}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-white leading-tight">
                  {item.title}
                </h3>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-warm/80">Reto</div>
                    <p className="mt-1.5 text-sm text-white/70 leading-relaxed">{item.challenge}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-warm/80">Respuesta</div>
                    <p className="mt-1.5 text-sm text-white/70 leading-relaxed">{item.response}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-warm/80">Resultado</div>
                    <p className="mt-1.5 text-sm text-white/70 leading-relaxed">{item.result}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.facts.map((fact) => (
                    <span key={fact} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                      {fact}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerArticle>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
