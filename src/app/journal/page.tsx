import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Nexo Journal | Arquitectura, Interiorismo y Remodelación",
  description:
    "Ideas y criterios sobre arquitectura residencial, diseño de interiores, remodelaciones y proceso de proyecto desde Nexo Studio.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />

      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-warm mb-5">Nexo Journal</p>
          <h1 className="max-w-5xl text-5xl sm:text-6xl lg:text-8xl font-semibold text-white tracking-tight leading-[0.96]">
            Ideas para diseñar
            <span className="block text-warm">con más claridad.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg sm:text-xl text-white/62 leading-relaxed">
            Arquitectura, interiorismo y proceso explicados desde las decisiones que realmente transforman un proyecto.
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group overflow-hidden rounded-3xl border border-white/8 bg-dark-800"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  quality={88}
                  className="object-cover group-hover:scale-[1.025] transition-transform duration-700"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
                  <span className="text-warm">{article.category}</span>
                  <span className="text-white/25">·</span>
                  <span className="text-white/40">{article.readingTime}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-white leading-tight">{article.title}</h2>
                <p className="mt-4 text-sm text-white/58 leading-relaxed">{article.excerpt}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-warm">
                  Leer artículo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
