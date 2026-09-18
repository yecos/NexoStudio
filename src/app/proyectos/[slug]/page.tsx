import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { projects, getProjectBySlug } from "@/data/projects";
import { breadcrumbJsonLd } from "@/data/schema";
import { whatsappLink } from "@/config/site";
import { ProjectLocationMap } from "@/components/map/project-location-map";
import { ProjectViewEvent } from "@/components/analytics/project-view-event";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Proyecto no encontrado — Nexo Studio" };
  }

  return {
    title: `${project.name} — Nexo Studio | ${project.category}`,
    description: project.description,
    alternates: {
      canonical: `/proyectos/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} — Nexo Studio`,
      description: project.description,
      url: `/proyectos/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const otherProjects = projects
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-dark-900">
      <ProjectViewEvent project={project.slug} status={project.status} />
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(project.name, project.slug)),
        }}
      />

      <section className="relative min-h-[78vh] sm:min-h-[84vh] overflow-hidden">
        <Image
          src={project.views[0].src}
          alt={project.views[0].alt}
          fill
          priority
          quality={92}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-black/28 to-black/34" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-16">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 text-sm text-white/62 hover:text-warm transition-colors mb-7"
            >
              <ArrowLeft className="w-4 h-4" />
              Todos los proyectos
            </Link>

            <div className="max-w-5xl">
              <div className="flex flex-wrap gap-3 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/68 mb-5">
                <span className="text-warm">{project.status}</span>
                <span>·</span>
                <span>{project.category}</span>
                <span>·</span>
                <span>{project.year}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-semibold text-white tracking-tight leading-[0.96]">
                {project.name}
              </h1>

              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm sm:text-base text-white/68">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-warm" />
                  {project.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-warm" />
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Proyecto</p>
            <div className="space-y-6 border-t border-white/10 pt-6">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/38 mb-2">Ubicación</p>
                <p className="text-base text-white">{project.location}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/38 mb-2">Alcance</p>
                <p className="text-base text-white">{project.scope}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/38 mb-2">Estado</p>
                <p className="text-base text-white">{project.status}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/38 mb-2">Año</p>
                <p className="text-base text-white">{project.year}</p>
              </div>
              {project.typology && (
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/38 mb-2">Tipología</p>
                  <p className="text-base text-white">{project.typology}</p>
                </div>
              )}
              {project.area && (
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/38 mb-2">Área</p>
                  <p className="text-base text-white">{project.area}</p>
                </div>
              )}
              {project.services && project.services.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/38 mb-2">Servicios</p>
                  <div className="space-y-1">
                    {project.services.map((service) => (
                      <p key={service} className="text-base text-white">{service}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Sobre el proyecto</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl text-white/88 leading-[1.35] tracking-tight">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {(project.challenge || project.concept || (project.materials && project.materials.length > 0)) && (
        <section className="pb-16 sm:pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
            {project.challenge && (
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-[0.22em] text-warm mb-4">El reto</p>
                <p className="text-xl sm:text-2xl text-white/80 leading-relaxed">{project.challenge}</p>
              </div>
            )}
            {project.concept && (
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-[0.22em] text-warm mb-4">Concepto</p>
                <p className="text-xl sm:text-2xl text-white/80 leading-relaxed">{project.concept}</p>
              </div>
            )}
            {project.materials && project.materials.length > 0 && (
              <div className="lg:col-span-2 border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-[0.22em] text-warm mb-4">Materialidad</p>
                <div className="flex flex-wrap gap-2">
                  {project.materials.map((material) => (
                    <span
                      key={material}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {project.views.length > 1 && (
        <section className="pb-12 sm:pb-16">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
            <div className="grid gap-4 sm:gap-6">
              {project.views.slice(1).map((view, index) => (
                <div
                  key={view.src}
                  className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${
                    index % 3 === 0
                      ? "aspect-[16/9]"
                      : "aspect-[4/3] sm:aspect-[16/10]"
                  }`}
                >
                  <Image
                    src={view.src}
                    alt={view.alt}
                    fill
                    quality={90}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-4">Contexto</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              El proyecto en su lugar.
            </h2>
            <p className="mt-4 text-base text-white/60 leading-relaxed">
              Cada proyecto responde a unas condiciones específicas de paisaje, acceso, orientación y forma de habitar. La ubicación hace parte del diseño, no es solo un dato.
            </p>
            <a
              href={`https://www.openstreetmap.org/?mlat=${project.lat}&mlon=${project.lng}#map=15/${project.lat}/${project.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-warm hover:text-warm-light transition-colors"
            >
              Abrir ubicación
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <ProjectLocationMap
            lat={project.lat}
            lng={project.lng}
            name={project.name}
            location={project.location}
          />
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 border-y border-white/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">
            ¿Tienes un proyecto en mente?
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Conversemos antes
            <span className="block text-warm">de empezar a diseñar.</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/60 leading-relaxed">
            Cuéntanos dónde está el proyecto, qué quieres transformar y cuál es el momento en el que te encuentras.
          </p>
          <a
            href={whatsappLink(
              `Hola Nexo Studio, vi "${project.name}" y quiero conversar sobre un proyecto.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-full px-8 py-3.5 text-sm transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Iniciar conversación
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-warm mb-3">Más proyectos</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">Seguir explorando</h2>
            </div>
            <Link
              href="/proyectos"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-warm hover:text-warm-light"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {otherProjects.map((p) => (
              <Link
                key={p.id}
                href={`/proyectos/${p.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
              >
                <Image
                  src={p.views[0].src}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  quality={82}
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-base font-semibold leading-tight">{p.name}</p>
                  <p className="text-white/58 text-xs mt-1">{p.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
