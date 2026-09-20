import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";
import { siteConfig } from "@/config/site";

const SITE_LAST_MODIFIED = "2026-09-20";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeLastModified = projects.reduce(
    (latest, p) => (p.updatedAt > latest ? p.updatedAt : latest),
    SITE_LAST_MODIFIED,
  );

  const staticPaths = [
    "/",
    "/proyectos",
    "/arquitectura-residencial",
    "/interiorismo",
    "/remodelaciones",
    "/proceso",
    "/nosotros",
    "/arquitectos-medellin",
    "/arquitectos-el-poblado",
    "/arquitectos-oriente-antioqueno",
    "/en",
    "/journal",
    "/iniciar-proyecto",
    "/diseno-interiores-medellin",
    "/remodelacion-apartamentos-el-poblado",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path, index) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: new Date(homeLastModified),
    changeFrequency: "monthly" as const,
    priority: index === 0 ? 1 : path === "/proyectos" ? 0.9 : 0.85,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteConfig.url}/proyectos/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteConfig.url}/journal/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
