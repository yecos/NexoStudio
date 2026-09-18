import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Residential Architecture & Interior Design in Medellín | Nexo Studio",
  description:
    "Nexo Studio designs residential architecture, interiors and renovation projects in Medellín and Antioquia for local and international homeowners.",
  alternates: {
    canonical: "/en",
    languages: {
      "es-CO": "/",
      "en": "/en",
    },
  },
};

const featured = projects.filter((project) => project.featured).slice(0, 3);

export default function EnglishPage() {
  return (
    <main lang="en" className="min-h-screen bg-dark-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-dark-900/88 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/en" className="relative w-32 sm:w-40 h-10">
            <Image src="/images/brand/logo-nexo.png" alt="Nexo Studio" fill className="object-contain" sizes="160px" priority />
          </Link>
          <nav className="flex items-center gap-5 sm:gap-7 text-sm text-white/70">
            <Link href="/proyectos" className="hover:text-warm transition-colors">Projects</Link>
            <Link href="/en#services" className="hidden sm:inline hover:text-warm transition-colors">Services</Link>
            <Link href="/#contacto" className="rounded-full border border-warm/40 px-4 py-2 text-warm hover:bg-warm hover:text-dark-900 transition-colors">
              Start a project
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative min-h-screen flex items-end overflow-hidden">
        <Image
          src="/images/hero/hero-arch.jpg"
          alt="Residential architecture by Nexo Studio in Medellín"
          fill
          priority
          quality={92}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-black/42 to-black/42" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 lg:pb-24">
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">
            Medellín · Colombia
          </p>
          <h1 className="max-w-5xl text-5xl sm:text-6xl lg:text-8xl font-semibold text-white tracking-tight leading-[0.96]">
            Residential architecture
            <span className="block text-warm">& interior design.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">
            We design homes, apartments and complete renovations, connecting architecture, interiors, visualization and project coordination through one studio.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/proyectos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-warm px-8 py-3.5 text-sm font-semibold text-dark-900 hover:bg-warm-light transition-colors"
            >
              Explore projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white hover:border-warm/50 hover:text-warm transition-colors"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">For international homeowners</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
              A local design team
              <span className="block text-warm">with a clear process.</span>
            </h2>
          </div>
          <div>
            <p className="text-lg sm:text-xl text-white/62 leading-relaxed">
              Whether you are based in Colombia or abroad, the project needs clear decisions, documentation and communication. We structure the process so design choices can be reviewed visually and coordinated before construction.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {[
                "Residential architecture",
                "Interior design",
                "Full apartment renovations",
                "3D visualization before construction",
                "Technical documentation",
                "Project and vendor coordination",
              ].map((item) => (
                <div key={item} className="flex gap-3 border-t border-white/10 pt-4">
                  <Check className="w-4 h-4 text-warm mt-1 shrink-0" />
                  <p className="text-sm sm:text-base text-white/68">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark-800 py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Selected work</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">Projects.</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {featured.map((project) => (
              <Link
                key={project.id}
                href={`/proyectos/${project.slug}`}
                className="group overflow-hidden rounded-3xl border border-white/8 bg-dark-900"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={project.views[0].src}
                    alt={project.views[0].alt}
                    fill
                    quality={88}
                    className="object-cover group-hover:scale-[1.025] transition-transform duration-700"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-warm">{project.location}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Your project in Colombia</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Let’s understand
            <span className="block text-warm">what you want to create.</span>
          </h2>
          <Link
            href="/#contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-warm px-8 py-3.5 text-sm font-semibold text-dark-900 hover:bg-warm-light transition-colors"
          >
            Start a project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/8 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-xs text-white/45">© Nexo Studio · Medellín, Colombia</p>
          <div className="flex items-center gap-5 text-xs">
            <Link href="/" className="text-white/55 hover:text-warm">Español</Link>
            <Link href="/proyectos" className="text-white/55 hover:text-warm">Projects</Link>
            <Link href="/#contacto" className="text-warm/80 hover:text-warm">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
