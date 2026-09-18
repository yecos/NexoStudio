import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { projects } from "@/data/projects";

interface LocationPageProps {
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  projectSlugs: string[];
  contextTitle: string;
  context: string;
  services: string[];
}

export function LocationPage({
  eyebrow,
  title,
  highlight,
  intro,
  heroImage,
  heroAlt,
  projectSlugs,
  contextTitle,
  context,
  services,
}: LocationPageProps) {
  const selectedProjects = projectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />

      <section className="relative min-h-[78vh] overflow-hidden">
        <Image src={heroImage} alt={heroAlt} fill priority quality={92} className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-black/40 to-black/42" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
            <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">{eyebrow}</p>
            <h1 className="max-w-5xl text-5xl sm:text-6xl lg:text-8xl font-semibold text-white tracking-tight leading-[0.96]">
              {title}
              <span className="block text-warm">{highlight}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">{intro}</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Contexto</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05]">{contextTitle}</h2>
          </div>
          <div>
            <p className="text-lg sm:text-xl text-white/62 leading-relaxed">{context}</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {services.map((service) => (
                <div key={service} className="flex gap-3 border-t border-white/10 pt-4">
                  <Check className="w-4 h-4 text-warm mt-1 shrink-0" />
                  <p className="text-sm sm:text-base text-white/68">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedProjects.length > 0 && (
        <section className="bg-dark-800 py-20 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Proyectos relacionados</p>
              <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">Trabajo seleccionado.</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {selectedProjects.map((project) => (
                <Link key={project.id} href={`/proyectos/${project.slug}`} className="group overflow-hidden rounded-3xl border border-white/8 bg-dark-900">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={project.views[0].src} alt={project.views[0].alt} fill quality={90} className="object-cover group-hover:scale-[1.025] transition-transform duration-700" sizes="(min-width: 1024px) 50vw, 100vw" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-xs uppercase tracking-[0.18em] text-warm">{project.status}</p>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-semibold text-white">{project.name}</h3>
                    <p className="mt-2 text-sm text-white/50">{project.location}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm text-warm">
                      Ver proyecto
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Tu proyecto</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Empecemos por
            <span className="block text-warm">una buena conversación.</span>
          </h2>
          <Link href="/iniciar-proyecto" className="mt-8 inline-flex items-center gap-2 rounded-full bg-warm px-8 py-3.5 text-sm font-semibold text-dark-900 hover:bg-warm-light transition-colors">
            Iniciar un proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
