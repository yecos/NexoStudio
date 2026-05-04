"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Building2,
  ClipboardList,
  TrendingUp,
  Paintbrush,
  Menu,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  ChevronUp,
  ExternalLink,
  Instagram,
  Facebook,
  Linkedin,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ──────────────────────────── DATA ──────────────────────────── */

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const SERVICES = [
  {
    icon: Building2,
    title: "Diseño Arquitectónico",
    description:
      "Diseño arquitectónico para proyectos de obra nueva y remodelaciones, adaptados a las necesidades de cada cliente.",
    image: "/portfolio/page_5.jpg",
  },
  {
    icon: ClipboardList,
    title: "Gerencia de Proyectos",
    description:
      "Coordinación y supervisión integral de cada fase del proyecto, asegurando cumplimiento en tiempos, costos y calidad.",
    image: "/portfolio/page_8.jpg",
  },
  {
    icon: TrendingUp,
    title: "Factibilidad Inmobiliaria",
    description:
      "Asesoramiento y gestión en la promoción de proyectos inmobiliarios para maximizar su valor y visibilidad en el mercado.",
    image: "/villa-luxury.jpg",
  },
  {
    icon: Paintbrush,
    title: "Diseño de Interiores",
    description:
      "Creación de espacios interiores funcionales y estéticamente atractivos, que reflejan la personalidad de nuestros clientes.",
    image: "/restaurant-design.jpg",
  },
];

const PORTFOLIO_ITEMS = [
  { src: "/portfolio/page_1.jpg", category: "Residencial", sub: "Biofílico" },
  { src: "/portfolio/page_2.jpg", category: "Residencial", sub: "Fachada" },
  { src: "/portfolio/page_3.jpg", category: "Comercial", sub: "Restaurante" },
  { src: "/portfolio/page_4.jpg", category: "Residencial", sub: "Remodelación" },
  { src: "/portfolio/page_5.jpg", category: "Residencial", sub: "Obra Nueva" },
  { src: "/portfolio/page_6.jpg", category: "Residencial", sub: "Multi-familiar" },
  { src: "/portfolio/page_7.jpg", category: "Residencial", sub: "Villa" },
  { src: "/portfolio/page_8.jpg", category: "Residencial", sub: "Lujo" },
  { src: "/portfolio/page_9.jpg", category: "Comercial", sub: "Hostelería" },
  { src: "/portfolio/page_10.jpg", category: "Comercial", sub: "Interior" },
  { src: "/portfolio/page_11.jpg", category: "Interior", sub: "Residencial" },
  { src: "/portfolio/page_12.jpg", category: "Interior", sub: "Diseño" },
];

const TOOLS = [
  { name: "SketchUp", desc: "Modelado 3D", color: "#005F9E", initial: "S" },
  { name: "Revit", desc: "BIM / Documentación", color: "#186BDB", initial: "R" },
  { name: "Twinmotion", desc: "Renderizado en tiempo real", color: "#FF6B35", initial: "T" },
  { name: "Unreal Engine", desc: "Visualización inmersiva", color: "#0E84B5", initial: "U" },
  { name: "D5 Render", desc: "Renderizado fotorrealista", color: "#4CAF50", initial: "D" },
  { name: "Photoshop", desc: "Postproducción", color: "#31A8FF", initial: "P" },
  { name: "IA", desc: "Diseño generativo", color: "#C8956C", initial: "IA" },
];

/* ──────────────────── ANIMATION HELPERS ─────────────────────── */

function FadeInWhenVisible({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

/* ──────────────────── SECTION COMPONENTS ─────────────────────── */

/* ── NAVBAR ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark-900/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 overflow-hidden">
              <Image
                src="/logo-nexo.png"
                alt="Nexo Studio Logo"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-wider text-white leading-none">
                NEXO
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.25em] text-warm font-medium leading-none mt-0.5">
                STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-warm group-hover:w-6 transition-all duration-300" />
              </a>
            ))}
            <a href="#contacto" className="ml-4">
              <Button
                variant="outline"
                size="sm"
                className="border-warm/40 text-warm hover:bg-warm hover:text-dark-900 transition-all duration-300 rounded-full px-5"
              >
                Contáctanos
              </Button>
            </a>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-dark-900/98 backdrop-blur-xl border-white/5 w-[280px]"
              >
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col gap-2 mt-12">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-white/80 hover:text-warm hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      <span className="w-1 h-6 bg-warm/40 rounded-full group-hover:bg-warm" />
                      {link.label}
                    </motion.a>
                  ))}
                  <div className="mt-6 px-4">
                    <a href="#contacto" onClick={handleLinkClick}>
                      <Button className="w-full bg-warm text-dark-900 hover:bg-warm-light rounded-full font-semibold">
                        Contáctanos
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-arch.jpg"
          alt="Arquitectura biofílica Nexo Studio"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-dark-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-warm/40 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-warm/40 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm/30 bg-warm/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-warm animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-warm tracking-wider uppercase">
              Medellín, Colombia
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        >
          Arquitectura
          <span className="text-warm"> + </span>
          Diseño
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
        >
          Soluciones innovadoras para obras nuevas y remodelaciones en Medellín
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#portafolio">
            <Button
              size="lg"
              className="bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-full px-8 h-12 text-base transition-all duration-300 shadow-lg shadow-warm/25 hover:shadow-warm/40"
            >
              Ver Portafolio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a href="#contacto">
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-full px-8 h-12 text-base transition-all duration-300"
            >
              Contáctanos
              <MessageCircle className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/40 tracking-widest uppercase">
              Scroll
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 rounded-full bg-warm"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
const TEAM = [
  {
    name: "Catalina Molina Álvarez",
    role: "Arquitecta | Gestión de Proyectos",
    photo: "/team/catalina_0.png",
    bio: "Arquitecta con 8 años de experiencia en desarrollo integral de proyectos arquitectónicos e inmobiliarios. Especialista en Gestión Inmobiliaria de la Universidad Nacional, con capacidad para articular equipos interdisciplinarios y apoyar la toma de decisiones técnicas, normativas y operativas. Manejo de metodología BIM (Revit).",
    skills: ["Gestión de Proyectos", "Coordinación Técnica", "BIM / Revit", "Control de Obra"],
  },
  {
    name: "Juan Mateo Yepes Correa",
    role: "Arquitecto | Diseño Gráfico",
    photo: "/team/mateo_0.png",
    bio: "Arquitecto y diseñador gráfico con amplia experiencia en diseño 3D digital y representación arquitectónica. Dominio en programas de modelado, renderizado y postproducción. Responsable, honesto y comprometido con la excelencia visual y técnica en cada proyecto.",
    skills: ["Diseño 3D", "Visualización", "Renderizado", "Branding"],
  },
];

function About() {
  return (
    <section id="nosotros" className="py-20 sm:py-28 lg:py-36 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInWhenVisible className="text-center mb-14 sm:mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-warm mb-4">
            ¿Quiénes Somos?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            El equipo detrás de{" "}
            <span className="text-warm">Nexo Studio</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Nexo Studio es una empresa de arquitectura y construcción ubicada en
            Medellín. Nos especializamos en ofrecer soluciones innovadoras para
            obras nuevas y remodelaciones, con un enfoque en la calidad y el
            diseño en cada proyecto que emprendemos.
          </p>
        </FadeInWhenVisible>

        {/* Team cards */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerItem}
              className="group relative bg-dark-800/50 border border-white/5 rounded-2xl overflow-hidden hover:border-warm/15 transition-all duration-500"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-dark-900/10" />
              </div>

              {/* Info overlay at bottom of photo */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {member.name}
                </h3>
                <p className="text-warm text-sm font-semibold mt-1">
                  {member.role}
                </p>
                <p className="text-white/70 text-sm leading-relaxed mt-3 line-clamp-4">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-warm/15 border border-warm/25 text-warm text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ── SERVICES ── */
function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-28 lg:py-36 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-14 sm:mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-warm mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Lo que <span className="text-warm">hacemos</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Ofrecemos un servicio integral que abarca desde el diseño
            arquitectónico hasta la gerencia completa de su proyecto.
          </p>
        </FadeInWhenVisible>

        <StaggerContainer className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              className="group relative overflow-hidden bg-dark-900/50 border border-white/5 rounded-2xl hover:border-warm/20 transition-all duration-500 hover:shadow-lg hover:shadow-warm/5"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                  quality={75}
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-warm/0 to-transparent group-hover:via-warm/40 transition-all duration-700" />
              <div className="relative z-10 p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-warm/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-warm/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-warm" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-warm transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {service.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-warm/0 group-hover:text-warm transition-all duration-300">
                  <span className="text-sm font-medium">Conocer más</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ── PORTFOLIO ── */
function Portfolio() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="portafolio" className="py-20 sm:py-28 lg:py-36 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-14 sm:mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-warm mb-4">
            Nuestro Portafolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Proyectos que <span className="text-warm">inspiran</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Cada proyecto es una expresión única de creatividad, funcionalidad y
            compromiso con la excelencia.
          </p>
        </FadeInWhenVisible>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <motion.div
              key={item.src}
              variants={staggerItem}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer ${
                idx === 0 || idx === 7
                  ? "sm:row-span-2 aspect-[3/4] sm:aspect-auto"
                  : "aspect-[4/3]"
              }`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <Image
                src={item.src}
                alt={`${item.category} - ${item.sub} por Nexo Studio`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                quality={85}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Category badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2">
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-warm/90 text-dark-900 text-[10px] sm:text-xs font-semibold">
                  {item.category}
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium border border-white/10">
                  {item.sub}
                </span>
              </div>

              {/* Hover overlay */}
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-warm/10 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    >
                      <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom info */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">
                  {item.sub}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm mt-0.5">
                  {item.category}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ── TOOLS ── */
function Tools() {
  return (
    <section className="py-20 sm:py-28 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-14 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-warm mb-4">
            Tecnología
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Herramientas que{" "}
            <span className="text-warm">utilizamos</span>
          </h2>
        </FadeInWhenVisible>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {TOOLS.map((tool) => (
            <motion.div
              key={tool.name}
              variants={staggerItem}
              className="group flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-dark-900/50 border border-white/5 hover:border-warm/20 transition-all duration-300 cursor-default"
            >
              <div
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${tool.color}20` }}
              >
                <span style={{ color: tool.color }}>{tool.initial}</span>
              </div>
              <span className="text-xs sm:text-sm text-white/60 group-hover:text-white/90 font-medium text-center transition-colors duration-300">
                {tool.name}
              </span>
              <span className="text-[10px] sm:text-xs text-white/30 text-center leading-tight">
                {tool.desc}
              </span>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contacto" className="py-20 sm:py-28 lg:py-36 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-14 sm:mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-warm mb-4">
            Contáctanos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Hablemos de tu <span className="text-warm">proyecto</span>
          </h2>
        </FadeInWhenVisible>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image side */}
          <FadeInWhenVisible direction="left" className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/villa-luxury.jpg"
                alt="Villa de lujo Nexo Studio"
                fill
                className="object-cover"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
            </div>
            {/* Contact info overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-dark-900/80 backdrop-blur-md rounded-xl border border-white/10 p-5 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="https://wa.me/573146811444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-warm transition-colors duration-200 group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-200">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40">WhatsApp</div>
                    <div className="text-sm font-medium">
                      314 681 1444 / 300 254 4368
                    </div>
                  </div>
                </a>
                <a
                  href="mailto:nexostudio.arquitectura@gmail.com"
                  className="flex items-center gap-3 text-white/80 hover:text-warm transition-colors duration-200 group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-warm/10 flex items-center justify-center group-hover:bg-warm/20 transition-colors duration-200">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-warm" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40">Email</div>
                    <div className="text-sm font-medium">
                      nexostudio.arquitectura@gmail.com
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-warm/70" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40">Ubicación</div>
                    <div className="text-sm font-medium">Medellín, Colombia</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Form side */}
          <FadeInWhenVisible direction="right" delay={0.2}>
            <div className="bg-dark-800/50 border border-white/5 rounded-2xl p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                Envíanos un mensaje
              </h3>
              <p className="text-white/40 text-sm mb-6 sm:mb-8">
                Cuéntanos sobre tu proyecto y te contactaremos pronto.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 sm:py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    ¡Mensaje enviado!
                  </h4>
                  <p className="text-white/50 text-sm">
                    Te contactaremos pronto.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white/60 mb-1.5"
                    >
                      Nombre
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      required
                      className="bg-dark-700/50 border-white/10 text-white placeholder:text-white/30 focus:border-warm/50 h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/60 mb-1.5"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      required
                      className="bg-dark-700/50 border-white/10 text-white placeholder:text-white/30 focus:border-warm/50 h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-white/60 mb-1.5"
                    >
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos sobre tu proyecto..."
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      required
                      className="bg-dark-700/50 border-white/10 text-white placeholder:text-white/30 focus:border-warm/50 rounded-xl resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-xl h-12 text-base transition-all duration-300 shadow-lg shadow-warm/20 hover:shadow-warm/30"
                  >
                    Enviar Mensaje
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#inicio" className="flex items-center gap-2.5 group mb-4">
              <div className="relative w-8 h-8 overflow-hidden">
                <Image
                  src="/logo-nexo.png"
                  alt="Nexo Studio Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-wider text-white leading-none">
                  NEXO
                </span>
                <span className="text-[10px] tracking-[0.25em] text-warm font-medium leading-none mt-0.5">
                  STUDIO
                </span>
              </div>
            </a>
            <p className="text-sm text-white/40 leading-relaxed">
              Arquitectura + Diseño
              <br />
              Soluciones innovadoras para obras nuevas y remodelaciones en
              Medellín.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-warm hover:bg-warm/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-warm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a
                    href="#servicios"
                    className="text-sm text-white/40 hover:text-warm transition-colors duration-200"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/573146811444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-warm transition-colors duration-200"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  314 681 1444
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/573002544368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-warm transition-colors duration-200"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  300 254 4368
                </a>
              </li>
              <li>
                <a
                  href="mailto:nexostudio.arquitectura@gmail.com"
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-warm transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  nexostudio.arquitectura@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/40">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                Medellín, Colombia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Nexo Studio. Todos los derechos
            reservados.
          </p>
          <p className="text-xs text-white/20">
            Arquitectura + Diseño — Medellín, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── WHATSAPP FAB ── */
function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/573146811444"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ── SCROLL TO TOP ── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-dark-700/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-warm hover:border-warm/30 transition-all duration-300"
          aria-label="Volver arriba"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────── PAGE ──────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-dark-900">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Tools />
      <Contact />
      <Footer />
      <WhatsAppFAB />
      <ScrollToTop />
    </main>
  );
}
