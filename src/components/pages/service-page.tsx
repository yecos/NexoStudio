import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface ServicePageProps {
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  capabilities: string[];
  philosophyTitle: string;
  philosophy: string;
  steps: { title: string; text: string }[];
}

export function ServicePage({
  eyebrow,
  title,
  highlight,
  intro,
  heroImage,
  heroAlt,
  capabilities,
  philosophyTitle,
  philosophy,
  steps,
}: ServicePageProps) {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />

      <section className="relative min-h-[82vh] overflow-hidden">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          quality={92}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-black/35 to-black/40" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
            <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">{eyebrow}</p>
            <h1 className="max-w-5xl text-5xl sm:text-6xl lg:text-8xl font-semibold text-white tracking-tight leading-[0.96]">
              {title}
              <span className="block text-warm">{highlight}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg sm:text-xl text-white/72 leading-relaxed">{intro}</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Alcance</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
              Un proyecto coherente
              <span className="block text-warm">de principio a fin.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {capabilities.map((item) => (
              <div key={item} className="flex gap-3 border-t border-white/10 pt-5">
                <Check className="w-4 h-4 text-warm mt-1 shrink-0" />
                <p className="text-base text-white/70 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-800 py-20 sm:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Nuestra mirada</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            {philosophyTitle}
          </h2>
          <p className="mt-7 text-lg sm:text-xl text-white/62 leading-relaxed">{philosophy}</p>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Cómo trabajamos</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">Un proceso claro.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-white/8 bg-dark-800 p-6 sm:p-7">
                <span className="text-xs tracking-[0.2em] text-warm">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm sm:text-base text-white/58 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Próximo proyecto</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Empecemos por
            <span className="block text-warm">entender lo que necesitas.</span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/iniciar-proyecto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-warm px-8 py-3.5 text-sm font-semibold text-dark-900 hover:bg-warm-light transition-colors"
            >
              Iniciar un proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/proyectos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-medium text-white hover:border-warm/45 hover:text-warm transition-colors"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
