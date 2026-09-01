import { SectionHeader } from "@/components/motion/section-header";
import { FadeIn } from "@/components/motion/fade-in";
import { ProjectsMap } from "@/components/map/projects-map";
import { projects } from "@/data/projects";

/**
 * Mapa interactivo del portafolio: muestra la ubicación de todos los
 * proyectos con pines de foto; clic en un pin abre la ficha del proyecto.
 */
export function MapSection() {
  return (
    <section id="ubicaciones" className="py-14 sm:py-20 bg-dark-900 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Cobertura"
          title="Zonas donde"
          highlight="trabajamos"
          description="Ubicación de nuestros proyectos en Medellín, el Valle de Aburrá y Oriente Antioqueño. Explora el mapa y entra al proyecto que te interese."
        />
        <FadeIn>
          <ProjectsMap projects={projects} />
        </FadeIn>
      </div>
    </section>
  );
}
