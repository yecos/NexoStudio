"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";

/**
 * Mapa del portafolio: solo cliente (Leaflet necesita window).
 * El esqueleto de carga evita saltos de layout.
 */
const ProjectsMapInner = dynamic(() => import("./projects-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] sm:h-[480px] w-full rounded-2xl bg-dark-800/55 border border-white/6 animate-pulse" />
  ),
});

export function ProjectsMap({ projects }: { projects: Project[] }) {
  return (
    <div className="map-shell h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-white/8 shadow-xl shadow-black/30">
      <ProjectsMapInner projects={projects} />
    </div>
  );
}
