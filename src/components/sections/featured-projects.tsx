import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const FEATURED_SLUGS = [
  "penol-vivienda-recreacion",
  "santa-elena-vivienda-unifamiliar",
  "casa-bonsai-guarne",
];

export function FeaturedProjects() {
  const featured = FEATURED_SLUGS
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <section id="portafolio" className="bg-dark-900 py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">
              Selected work
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.04]">
              Espacios pensados
              <span className="block text-warm">desde la experiencia de habitar.</span>
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-warm transition-colors"
          >
            Ver todos los proyectos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {featured.map((project, index) => (
            <Link
              key={project.id}
              href={`/proyectos/${project.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-white/8"
            >
              <div className={`relative ${index === 0 ? "min-h-[540px] lg:min-h-[720px]" : "min-h-[460px] lg:min-h-[620px]"}`}>
                <Image
                  src={project.views[0].src}
                  alt={project.views[0].alt}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-[900ms]"
                  quality={90}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/15 to-black/5" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
                <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/60 mb-4">
                  <span>{project.status}</span>
                  <span>·</span>
                  <span>{project.location}</span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
                      {project.name}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/68 leading-relaxed">
                      {project.scope}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-warm font-medium">
                    Explorar proyecto
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
