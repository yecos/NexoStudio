import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Proyectos de Arquitectura e Interiorismo | Nexo Studio",
  description:
    "Explora proyectos seleccionados de arquitectura residencial, interiorismo y remodelación desarrollados por Nexo Studio en Medellín y Antioquia.",
  alternates: { canonical: "/proyectos" },
};

const statusOrder = {
  Ejecutado: 0,
  "En obra": 1,
  Anteproyecto: 2,
  "Proyecto conceptual": 3,
} as const;

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status] || b.year - a.year,
  );

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />

      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">
            Selected work
          </p>
          <h1 className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.02]">
            Proyectos que conectan
            <span className="block text-warm">idea, espacio y materia.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg sm:text-xl text-white/68 leading-relaxed">
            Una selección de proyectos construidos, en obra y conceptuales que muestran cómo abordamos arquitectura residencial, interiorismo y diseño integral.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:gap-12">
          {sortedProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/proyectos/${project.slug}`}
              className="group grid lg:grid-cols-[1.5fr_0.7fr] gap-0 overflow-hidden rounded-3xl border border-white/8 bg-dark-800"
            >
              <div className="relative min-h-[360px] sm:min-h-[480px] lg:min-h-[560px] overflow-hidden">
                <Image
                  src={project.views[0].src}
                  alt={project.views[0].alt}
                  fill
                  className="object-cover group-hover:scale-[1.025] transition-transform duration-700"
                  quality={90}
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent lg:hidden" />
              </div>

              <div className="p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="text-xs uppercase tracking-[0.18em] text-warm">
                      {project.status}
                    </span>
                    <span className="text-xs text-white/35">·</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-white/55">
                      {project.year}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                    {project.name}
                  </h2>
                  <p className="mt-3 text-sm uppercase tracking-[0.14em] text-white/50">
                    {project.location}
                  </p>
                  <p className="mt-7 text-base text-white/66 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-white/8">
                  <p className="text-sm text-white/48 mb-4">{project.scope}</p>
                  <div className="inline-flex items-center gap-2 text-warm font-medium">
                    Ver proyecto
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
