"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  X,
  MapPin,
  Ruler,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/motion/section-header";
import { projects } from "@/data/projects";
import { whatsappLink } from "@/config/site";

/** Portafolio con galería tipo lightbox. */
export function Portfolio() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState(0);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const lastOpenedRef = useRef<number | null>(null);

  const activeProject = selectedProject !== null ? projects[selectedProject] : null;

  const openLightbox = (idx: number) => {
    lastOpenedRef.current = idx;
    setSelectedProject(idx);
    setCurrentView(0);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setCurrentView(0);
    // Devuelve el foco a la tarjeta que abrió el lightbox
    const lastIdx = lastOpenedRef.current;
    if (lastIdx !== null) {
      requestAnimationFrame(() => cardRefs.current[lastIdx]?.focus());
    }
  };

  const nextView = (total: number) => setCurrentView((v) => (v + 1) % total);
  const prevView = (total: number) => setCurrentView((v) => (v - 1 + total) % total);

  // Accesibilidad: Escape cierra, el scroll del body se bloquea y
  // el foco pasa al botón de cerrar al abrir el lightbox.
  useEffect(() => {
    if (selectedProject === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  return (
    <section id="portafolio" className="py-14 sm:py-20 lg:py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portafolio"
          title="Proyectos que"
          highlight="cuentan una historia"
          description="Una selección de proyectos de arquitectura, interiores y visualización 3D en Antioquia. Toca cualquier proyecto para ver la galería completa."
        />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {projects.map((project, idx) => {
            const featured = idx === 0 || idx === 5;
            return (
              <StaggerItem key={project.id} className={featured ? "sm:row-span-2" : ""}>
                <article
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`group relative h-full overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer bg-dark-800 focus:outline-none focus:ring-2 focus:ring-warm focus:ring-offset-2 focus:ring-offset-dark-900 ${
                    featured ? "aspect-[3/4] sm:aspect-auto" : "aspect-[4/3]"
                  }`}
                role="button"
                tabIndex={0}
                aria-label={`${project.name} — ${project.category}. Presiona Enter para ver la galería`}
                onClick={() => openLightbox(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Image
                  src={project.views[0].src}
                  alt={`${project.name} — ${project.scope} por Nexo Studio`}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  quality={85}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/22 to-black/8" />

                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap items-center gap-2 right-3">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-warm/92 text-dark-900 text-[10px] sm:text-xs font-semibold">
                    {project.category}
                  </span>
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/12 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium border border-white/12">
                    {project.year}
                  </span>
                </div>

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-xs">
                  <Sparkles className="w-3 h-3 text-warm" />
                  {project.views.length} vistas
                </div>

                <AnimatePresence>
                  {hoveredIdx === idx && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 bg-warm/10 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/12 backdrop-blur-sm border border-white/25 flex items-center justify-center"
                      >
                        <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <h3 className="text-white font-semibold text-lg sm:text-xl leading-tight">
                    {project.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-white/70">
                    <span>{project.location}</span>
                    <span className="text-warm/70">•</span>
                    <span>{project.status}</span>
                  </div>
                </div>
              </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <motion.a
          href={whatsappLink("Hola Nexo Studio, quiero hablar sobre un proyecto similar al portafolio.")}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-9 block text-center"
        >
          <Button className="bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-full px-7">
            Quiero un proyecto así
            <MessageCircle className="w-4 h-4 ml-2" />
          </Button>
        </motion.a>
      </div>

      {/* Lightbox con galería */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.name} — galería`}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-dark-800 rounded-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                onClick={closeLightbox}
                aria-label="Cerrar"
                className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Imagen principal */}
              <div className="relative aspect-[16/10] bg-dark-900">
                <Image
                  src={activeProject.views[currentView].src}
                  alt={activeProject.views[currentView].alt}
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />

                {activeProject.views.length > 1 && (
                  <>
                    <button
                      onClick={() => prevView(activeProject.views.length)}
                      aria-label="Imagen anterior"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => nextView(activeProject.views.length)}
                      aria-label="Imagen siguiente"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs">
                      {currentView + 1} / {activeProject.views.length}
                    </div>
                  </>
                )}
              </div>

              {/* Miniaturas */}
              {activeProject.views.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-dark-900">
                  {activeProject.views.map((view, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentView(i)}
                      className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                        i === currentView ? "border-warm" : "border-transparent hover:border-white/30"
                      }`}
                      aria-label={`Ver imagen ${i + 1}`}
                      aria-current={i === currentView}
                    >
                      <Image
                        src={view.src}
                        alt={view.alt}
                        fill
                        className="object-cover"
                        quality={60}
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Información del proyecto */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-warm text-dark-900 text-xs font-semibold">
                    {activeProject.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/12 text-white text-xs font-medium border border-white/12">
                    {activeProject.status}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/8 text-white/80 text-xs font-medium border border-white/10 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {activeProject.year}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-2xl sm:text-3xl leading-tight mb-3">
                  {activeProject.name}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/70 mb-4">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-warm" />{activeProject.location}</span>
                  <span className="flex items-center gap-1.5"><Ruler className="w-4 h-4 text-warm" />{activeProject.scope}</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  {activeProject.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={whatsappLink(`Hola Nexo Studio, vi "${activeProject.name}" en el portafolio y quiero algo similar.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-full px-6 py-3 text-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Quiero algo así
                  </a>
                  <a
                    href={`/proyectos/${activeProject.slug}`}
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-warm text-white hover:text-warm font-semibold rounded-full px-6 py-3 text-sm transition-colors"
                  >
                    Ver proyecto completo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
