import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeLastModified = projects.reduce(
    (latest, p) => (p.updatedAt > latest ? p.updatedAt : latest),
    projects[0].updatedAt,
  );

  const staticPaths = [
    "/",
    "/proyectos",
    "/arquitectura-residencial",
    "/interiorismo",
    "/remodelaciones",
    "/proceso",
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

  return [...staticRoutes, ...projectRoutes];
}
