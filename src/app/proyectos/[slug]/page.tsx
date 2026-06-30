import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/lib/projects-data";
import { MessageCircle, MapPin, Ruler, Calendar, ArrowLeft, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Proyecto no encontrado — Nexo Studio" };
  }
  return {
    title: `${project.name} — Nexo Studio | ${project.category}`,
    description: project.description,
    openGraph: {
      title: `${project.name} — Nexo Studio`,
      description: project.description,
      images: [{ url: project.views[0].src, width: 1200, height: 630, alt: project.name }],
    },
  };
}

const WHATSAPP_MAIN = "573146811444";

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const whatsappLink = `https://wa.me/${WHATSAPP_MAIN}?text=${encodeURIComponent(
    `Hola Nexo Studio, vi "${project.name}" en el portafolio y quiero algo similar.`
  )}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/#portafolio"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#c8956c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al portafolio
        </Link>
      </div>

      {/* Project header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#c8956c] text-[#0a0a0a] text-xs font-semibold">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/12 text-white text-xs font-medium border border-white/12">
            {project.status}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/8 text-white/80 text-xs font-medium border border-white/10 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {project.year}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          {project.name}
        </h1>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base text-white/70">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#c8956c]" />
            {project.location}
          </span>
          <span className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#c8956c]" />
            {project.scope}
          </span>
        </div>
        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </section>

      {/* Hero image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
          <Image
            src={project.views[0].src}
            alt={project.views[0].alt}
            fill
            className="object-cover"
            quality={90}
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority
          />
        </div>
      </section>

      {/* Gallery */}
      {project.views.length > 1 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Galería del proyecto
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.views.slice(1).map((view, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl ${
                  i === 0 && project.views.length === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={view.src}
                    alt={view.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    quality={85}
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-2xl bg-gradient-to-r from-[#c8956c]/12 to-transparent border border-[#c8956c]/30 p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            ¿Quieres un proyecto como este?
          </h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Cuéntanos tu idea. Te respondemos por WhatsApp para avanzar rápido.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#c8956c] hover:bg-[#b07a52] text-[#0a0a0a] font-semibold rounded-full px-8 py-3.5 text-sm transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Cotizar por WhatsApp
          </a>
        </div>
      </section>

      {/* More projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Otros proyectos</h2>
          <Link
            href="/#portafolio"
            className="text-sm text-[#c8956c] hover:underline flex items-center gap-1"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {projects
            .filter((p) => p.slug !== project.slug)
            .slice(0, 3)
            .map((p) => (
              <Link
                key={p.id}
                href={`/proyectos/${p.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3]"
              >
                <Image
                  src={p.views[0].src}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  quality={75}
                  sizes="(min-width: 640px) 33vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-semibold leading-tight">{p.name}</p>
                  <p className="text-white/60 text-xs mt-1">{p.location}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
