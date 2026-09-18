import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TEAM } from "@/data/landing";

export const metadata: Metadata = {
  title: "Sobre Nexo Studio | Arquitectura e Interiorismo en Medellín",
  description:
    "Conoce el equipo, enfoque y forma de trabajo de Nexo Studio, estudio de arquitectura residencial e interiorismo en Medellín.",
  alternates: { canonical: "/nosotros" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-end">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">
              Nexo Studio
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-semibold tracking-tight text-white leading-[0.96]">
              Diseñamos con
              <span className="block text-warm">criterio y continuidad.</span>
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-white/64 leading-relaxed max-w-2xl">
            Somos un estudio de arquitectura en Medellín que integra diseño, interiorismo, visualización y gestión para llevar cada proyecto desde una idea hasta una realidad construida con mayor claridad.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="relative aspect-[16/8] min-h-[420px] overflow-hidden rounded-3xl">
            <Image
              src="/images/projects/p03-santa-elena/view-1.jpg"
              alt="Proyecto residencial de Nexo Studio"
              fill
              priority
              quality={92}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Enfoque</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
              El diseño no termina
              <span className="block text-warm">en una imagen.</span>
            </h2>
          </div>
          <div className="space-y-6 text-lg text-white/62 leading-relaxed">
            <p>
              Nos interesa que las decisiones de diseño puedan entenderse, visualizarse y llevarse a obra con coherencia. Por eso trabajamos arquitectura, interiorismo y representación como partes conectadas del mismo proceso.
            </p>
            <p>
              Cada proyecto comienza entendiendo cómo se quiere habitar el espacio, qué condiciones existen y qué recursos están disponibles. A partir de ahí construimos una dirección clara y la desarrollamos hasta el nivel que el proyecto necesita.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Equipo</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
              Las personas detrás de NEXO.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {TEAM.map((member) => (
              <article key={member.name} className="overflow-hidden rounded-3xl border border-white/8 bg-dark-800">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    quality={92}
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="p-7 sm:p-9">
                  <p className="text-xs uppercase tracking-[0.18em] text-warm">{member.role}</p>
                  <h3 className="mt-3 text-2xl sm:text-3xl font-semibold text-white">{member.name}</h3>
                  <p className="mt-5 text-base text-white/62 leading-relaxed">{member.bio}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Hablemos</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Tu proyecto puede ser
            <span className="block text-warm">el próximo capítulo.</span>
          </h2>
          <Link
            href="/iniciar-proyecto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-warm px-8 py-3.5 text-sm font-semibold text-dark-900 hover:bg-warm-light transition-colors"
          >
            Iniciar un proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
