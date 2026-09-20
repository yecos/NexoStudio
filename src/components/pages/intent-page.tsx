import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getProjectBySlug } from "@/data/projects";

interface FaqItem {
  question: string;
  answer: string;
}

interface IntentPageProps {
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  contextTitle: string;
  context: string[];
  capabilities: string[];
  projectSlug: string;
  projectIntro: string;
  faq: FaqItem[];
}

export function IntentPage({
  eyebrow,
  title,
  highlight,
  intro,
  heroImage,
  heroAlt,
  contextTitle,
  context,
  capabilities,
  projectSlug,
  projectIntro,
  faq,
}: IntentPageProps) {
  const project = getProjectBySlug(projectSlug);

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />

      <section className="relative min-h-[78svh] overflow-hidden">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          quality={92}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-black/45 to-black/45" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
            <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">{eyebrow}</p>
            <h1 className="max-w-5xl text-5xl sm:text-6xl lg:text-8xl font-semibold text-white tracking-tight leading-[0.96]">
              {title}
              <span className="block text-warm">{highlight}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">{intro}</p>
            <Link
              href="/iniciar-proyecto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-warm px-8 py-3.5 text-sm font-semibold text-dark-900 hover:bg-warm-light transition-colors"
            >
              Iniciar un proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Enfoque</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
              {contextTitle}
            </h2>
          </div>
          <div>
            <div className="space-y-5">
              {context.map((paragraph) => (
                <p key={paragraph} className="text-lg text-white/62 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {capabilities.map((item) => (
                <div key={item} className="flex gap-3 border-t border-white/10 pt-4">
                  <Check className="w-4 h-4 text-warm mt-1 shrink-0" />
                  <p className="text-sm sm:text-base text-white/68">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {project && (
        <section className="bg-dark-800 py-20 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.35fr_0.65fr] gap-6 lg:gap-10 items-stretch">
            <Link href={`/proyectos/${project.slug}`} className="group relative min-h-[460px] lg:min-h-[620px] overflow-hidden rounded-3xl">
              <Image
                src={project.views[0].src}
                alt={project.views[0].alt}
                fill
                quality={92}
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                sizes="(min-width:1024px) 70vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.18em] text-warm">{project.status}</p>
                <h3 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">{project.name}</h3>
                <p className="mt-2 text-sm text-white/55">{project.location}</p>
              </div>
            </Link>

            <div className="rounded-3xl border border-white/8 bg-dark-900 p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-warm mb-4">Proyecto relacionado</p>
                <p className="text-lg text-white/65 leading-relaxed">{projectIntro}</p>
                <p className="mt-5 text-sm text-white/48 leading-relaxed">{project.description}</p>
              </div>
              <Link href={`/proyectos/${project.slug}`} className="mt-8 inline-flex items-center gap-2 text-warm font-medium">
                Explorar proyecto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5 text-center">Preguntas frecuentes</p>
          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight text-center mb-12">
            Antes de empezar.
          </h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {faq.map((item) => (
              <div key={item.question} className="py-7 sm:py-8">
                <h3 className="text-xl font-medium text-white">{item.question}</h3>
                <p className="mt-3 text-base text-white/58 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-warm mb-5">Tu proyecto</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Conversemos antes
            <span className="block text-warm">de tomar decisiones de obra.</span>
          </h2>
          <Link
            href="/iniciar-proyecto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-warm px-8 py-3.5 text-sm font-semibold text-dark-900 hover:bg-warm-light transition-colors"
          >
            Evaluar mi proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
