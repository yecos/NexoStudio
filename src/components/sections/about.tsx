import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerArticle } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/motion/section-header";
import { TEAM, PROCESS_STEPS } from "@/data/landing";

/** Sección "Nosotros": metodología + equipo. */
export function About() {
  return (
    <section id="nosotros" className="py-14 sm:py-20 lg:py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Nosotros"
          title="El equipo detrás de"
          highlight="Nexo Studio"
          description="Unimos diseño, gestión y visualización para que cada proyecto se entienda, se vea bien y pueda ejecutarse con criterio."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
          <FadeIn direction="right" className="bg-dark-900/55 border border-white/6 rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Arquitectura con claridad visual y control técnico.</h3>
            <p className="text-white/70 leading-relaxed">
              Nexo Studio es una empresa de arquitectura y construcción ubicada en Medellín. Trabajamos en obras nuevas, remodelaciones, interiores y visualización 3D con una metodología práctica: entender, diseñar, visualizar y coordinar.
            </p>
            <div className="mt-7 space-y-4">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={step} className="flex gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-full bg-warm/15 text-warm flex items-center justify-center text-sm font-semibold shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-white/72">{step}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <Stagger className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {TEAM.map((member) => (
              <StaggerArticle
                key={member.name}
                className="group relative bg-dark-900/55 border border-white/6 rounded-2xl overflow-hidden hover:border-warm/18 transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    quality={90}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/48 to-dark-900/4" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{member.name}</h3>
                  <p className="text-warm text-sm font-semibold mt-1">{member.role}</p>
                  <p className="text-white/72 text-sm leading-relaxed mt-3">{member.intro}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {member.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-warm/15 border border-warm/25 text-warm text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerArticle>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
