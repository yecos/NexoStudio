import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { articles, getArticleBySlug } from "@/data/articles";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artículo no encontrado — Nexo Studio" };

  return {
    title: `${article.title} | Nexo Journal`,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function JournalArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: `${siteConfig.url}${article.image}`,
    author: {
      "@type": "Organization",
      name: "Nexo Studio",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Nexo Studio",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/brand/logo-nexo-symbol.png`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/journal/${article.slug}`,
  };

  return (
    <main className="min-h-screen bg-dark-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      <article>
        <header className="pt-32 sm:pt-40 pb-10 sm:pb-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-white/48 hover:text-warm mb-8">
              <ArrowLeft className="w-4 h-4" />
              Nexo Journal
            </Link>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em]">
              <span className="text-warm">{article.category}</span>
              <span className="text-white/25">·</span>
              <span className="text-white/42">{article.readingTime}</span>
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.04]">
              {article.title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/62 leading-relaxed">{article.excerpt}</p>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
            <Image src={article.image} alt={article.imageAlt} fill priority quality={92} className="object-cover" sizes="100vw" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          {article.sections.map((section) => (
            <section key={section.heading} className="mb-14">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">{section.heading}</h2>
              <div className="mt-5 space-y-5">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-base sm:text-lg text-white/65 leading-[1.8]">{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-16 border-t border-white/10 pt-10">
            <p className="text-xs uppercase tracking-[0.2em] text-warm mb-4">Siguiente paso</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">¿Estás pensando en un proyecto?</h2>
            <Link href="/#contacto" className="mt-6 inline-flex items-center gap-2 text-warm font-medium">
              Iniciar una conversación
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
