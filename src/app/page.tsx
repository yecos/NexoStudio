"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
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
  Send,
  CheckCircle2,
  Ruler,
  Hammer,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ──────────────────────────── DATA ──────────────────────────── */

const WHATSAPP_MAIN = "573146811444";
const WHATSAPP_SECONDARY = "573002544368";
const DEFAULT_WHATSAPP_MESSAGE =
  "Hola Nexo Studio, quiero cotizar un proyecto de arquitectura/diseño.";

function whatsappLink(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_MAIN}?text=${encodeURIComponent(message)}`;
}

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Casos", href: "#casos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const SERVICES = [
  {
    icon: Building2,
    title: "Diseño arquitectónico",
    description:
      "Convertimos tu idea en una propuesta clara: concepto, distribución, planos, renders y criterios listos para ejecutar.",
    image: "/images/projects/page_5.jpg",
  },
  {
    icon: Hammer,
    title: "Remodelaciones",
    description:
      "Transformamos espacios existentes con una mirada funcional, estética y realista frente a presupuesto, obra y tiempos.",
    image: "/images/projects/page_4.jpg",
  },
  {
    icon: Paintbrush,
    title: "Diseño de interiores",
    description:
      "Diseñamos atmósferas cálidas, funcionales y coherentes con tu estilo: materialidad, mobiliario, iluminación y detalle.",
    image: "/images/services/restaurant-design.jpg",
  },
  {
    icon: ClipboardList,
    title: "Gerencia de proyectos",
    description:
      "Coordinamos etapas, proveedores, costos y calidad para que la obra avance con orden y menos improvisación.",
    image: "/images/projects/page_8.jpg",
  },
  {
    icon: TrendingUp,
    title: "Factibilidad inmobiliaria",
    description:
      "Evaluamos potencial, alcance y estrategia para proyectos con visión comercial, normativa y de valorización.",
    image: "/images/services/villa-luxury.jpg",
  },
  {
    icon: Ruler,
    title: "Visualización 3D",
    description:
      "Creamos renders, modelos y recorridos que ayudan a tomar decisiones antes de construir o invertir.",
    image: "/images/services/interior-design.jpg",
  },
];

const PORTFOLIO_ITEMS = [
  {
    src: "/images/projects/page_1.jpg",
    category: "Residencial",
    title: "Vivienda biofílica",
    location: "Antioquia",
    scope: "Diseño + visualización",
    status: "Proyecto conceptual",
  },
  {
    src: "/images/projects/page_2.jpg",
    category: "Residencial",
    title: "Fachada residencial",
    location: "Medellín",
    scope: "Diseño arquitectónico",
    status: "Anteproyecto",
  },
  {
    src: "/images/projects/page_3.jpg",
    category: "Comercial",
    title: "Restaurante",
    location: "Medellín",
    scope: "Interiorismo comercial",
    status: "Diseño conceptual",
  },
  {
    src: "/images/projects/page_4.jpg",
    category: "Remodelación",
    title: "Transformación residencial",
    location: "Área metropolitana",
    scope: "Remodelación integral",
    status: "Diseño + obra",
  },
  {
    src: "/images/projects/page_5.jpg",
    category: "Obra nueva",
    title: "Casa contemporánea",
    location: "Antioquia",
    scope: "Arquitectura",
    status: "Anteproyecto",
  },
  {
    src: "/images/projects/page_6.jpg",
    category: "Residencial",
    title: "Multifamiliar",
    location: "Medellín",
    scope: "Factibilidad + diseño",
    status: "Proyecto inmobiliario",
  },
  {
    src: "/images/projects/page_7.jpg",
    category: "Residencial",
    title: "Villa campestre",
    location: "Oriente antioqueño",
    scope: "Diseño + renders",
    status: "Proyecto conceptual",
  },
  {
    src: "/images/projects/page_8.jpg",
    category: "Residencial",
    title: "Vivienda premium",
    location: "Colombia",
    scope: "Arquitectura + interiores",
    status: "Diseño integral",
  },
  {
    src: "/images/projects/page_9.jpg",
    category: "Comercial",
    title: "Hospitalidad",
    location: "Colombia",
    scope: "Concepto espacial",
    status: "Visualización",
  },
  {
    src: "/images/projects/page_10.jpg",
    category: "Comercial",
    title: "Interior comercial",
    location: "Medellín",
    scope: "Diseño interior",
    status: "Propuesta visual",
  },
  {
    src: "/images/projects/page_11.jpg",
    category: "Interiorismo",
    title: "Apartamento residencial",
    location: "Medellín",
    scope: "Interiores + mobiliario",
    status: "Diseño interior",
  },
  {
    src: "/images/projects/page_12.jpg",
    category: "Interiorismo",
    title: "Detalle y atmósfera",
    location: "Colombia",
    scope: "Materialidad + render",
    status: "Visualización",
  },
];

const CASE_STUDIES = [
  {
    title: "Remodelación residencial con decisiones visuales",
    category: "Remodelación integral",
    image: "/images/projects/page_4.jpg",
    challenge:
      "Actualizar un espacio existente sin perder control sobre presupuesto, acabados y tiempos de ejecución.",
    response:
      "Definimos alcance, propuesta de distribución, materialidad y visualizaciones 3D antes de pasar a obra.",
    result:
      "Un proyecto más claro para cotizar, coordinar proveedores y reducir cambios improvisados durante la ejecución.",
    facts: ["Diseño + obra", "Área metropolitana", "Materialidad definida"],
  },
  {
    title: "Vivienda contemporánea desde concepto a anteproyecto",
    category: "Diseño arquitectónico",
    image: "/images/projects/page_5.jpg",
    challenge:
      "Transformar una idea inicial en una propuesta arquitectónica entendible para tomar decisiones de inversión.",
    response:
      "Trabajamos concepto, distribución, imagen exterior, criterios técnicos y renders para evaluar la propuesta completa.",
    result:
      "Una base sólida para avanzar a presupuesto, ajustes técnicos y coordinación del desarrollo del proyecto.",
    facts: ["Obra nueva", "Antioquia", "Renders de apoyo"],
  },
  {
    title: "Interior comercial con atmósfera reconocible",
    category: "Interiorismo comercial",
    image: "/images/projects/page_3.jpg",
    challenge:
      "Crear un espacio comercial con identidad, buen recorrido y una experiencia coherente para el usuario.",
    response:
      "Diseñamos atmósfera, mobiliario, iluminación y puntos focales con apoyo de visualización para validar el concepto.",
    result:
      "Una propuesta comercial más fácil de presentar, ajustar y ejecutar con intención desde el primer plano.",
    facts: ["Comercial", "Medellín", "Concepto espacial"],
  },
];

const TEAM = [
  {
    name: "Catalina Molina Álvarez",
    role: "Arquitecta | Gestión de Proyectos",
    photo: "/images/team/catalina_0.png",
    intro:
      "Gestión técnica, coordinación interdisciplinaria y control de proyecto.",
    bio: "Arquitecta con 8 años de experiencia en desarrollo integral de proyectos arquitectónicos e inmobiliarios. Especialista en Gestión Inmobiliaria de la Universidad Nacional, con capacidad para articular equipos interdisciplinarios y apoyar decisiones técnicas, normativas y operativas.",
    skills: ["Gestión de Proyectos", "Coordinación Técnica", "BIM / Revit", "Control de Obra"],
  },
  {
    name: "Juan Mateo Yepes Correa",
    role: "Arquitecto | Diseño Gráfico",
    photo: "/images/team/mateo_0.png",
    intro:
      "Diseño 3D, representación arquitectónica y dirección visual de proyectos.",
    bio: "Arquitecto y diseñador gráfico con amplia experiencia en diseño 3D digital, modelado, renderizado y postproducción. Enfocado en claridad visual, desarrollo creativo y excelencia técnica.",
    skills: ["Diseño 3D", "Renderizado", "Optimización de Procesos", "Desarrollo Creativo"],
  },
];

const TOOLS = [
  { name: "SketchUp", desc: "Modelado 3D", color: "#005F9E", initial: "S" },
  { name: "Revit", desc: "BIM / Documentación", color: "#186BDB", initial: "R" },
  { name: "Twinmotion", desc: "Tiempo real", color: "#FF6B35", initial: "T" },
  { name: "Unreal Engine", desc: "Visualización inmersiva", color: "#0E84B5", initial: "U" },
  { name: "D5 Render", desc: "Render fotorrealista", color: "#4CAF50", initial: "D" },
  { name: "Photoshop", desc: "Postproducción", color: "#31A8FF", initial: "P" },
  { name: "IA", desc: "Diseño generativo", color: "#C8956C", initial: "IA" },
];

const PROCESS = [
  "Entendemos tu idea, alcance y presupuesto.",
  "Diseñamos una propuesta visual y técnica clara.",
  "Coordinamos decisiones, proveedores y ejecución.",
];

const TRUST_POINTS = [
  {
    value: "8+",
    label: "años de experiencia",
    description: "en desarrollo de proyectos arquitectónicos e inmobiliarios",
  },
  {
    value: "360°",
    label: "visión integral",
    description: "diseño, visualización, gestión técnica y acompañamiento de obra",
  },
  {
    value: "3D",
    label: "decisiones visibles",
    description: "renders y modelos para evaluar materiales, atmósfera y alcance antes de ejecutar",
  },
];

const FAQ_ITEMS = [
  {
    question: "¿Cuánto cuesta iniciar un proyecto de arquitectura o remodelación?",
    answer:
      "Depende del alcance, el área, el estado actual del espacio y el nivel de detalle requerido. Por eso empezamos entendiendo ubicación, metros aproximados, presupuesto objetivo y etapa del proyecto.",
  },
  {
    question: "¿Trabajan proyectos fuera de Medellín?",
    answer:
      "Sí. Atendemos Medellín, Área Metropolitana, Oriente antioqueño y otros lugares de Colombia cuando el alcance permite coordinar diseño, visualización o acompañamiento técnico.",
  },
  {
    question: "¿Puedo contratar sólo renders o visualización 3D?",
    answer:
      "Sí. La visualización 3D puede contratarse como servicio independiente para validar diseños, vender una idea, presentar una propuesta o tomar decisiones antes de construir.",
  },
  {
    question: "¿También acompañan la ejecución de obra?",
    answer:
      "Sí. Según el proyecto, podemos apoyar coordinación técnica, proveedores, presupuesto, control de decisiones y seguimiento para que el diseño llegue mejor a obra.",
  },
];

const PROJECT_TYPES = [
  "Diseño arquitectónico",
  "Remodelación",
  "Diseño de interiores",
  "Visualización 3D / renders",
  "Gerencia de proyecto",
  "Factibilidad inmobiliaria",
];

const BUDGET_RANGES = [
  "Aún no tengo presupuesto",
  "Menos de $20M COP",
  "$20M - $60M COP",
  "$60M - $150M COP",
  "Más de $150M COP",
];

const TIMELINES = [
  "Estoy explorando opciones",
  "Quiero iniciar este mes",
  "1 a 3 meses",
  "3 a 6 meses",
  "Ya está en obra",
];

/* ──────────────────── ANIMATION HELPERS ─────────────────────── */

const smoothEase = [0.25, 0.4, 0.25, 1] as const;

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
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const directionMap = {
    up: { y: 28 },
    down: { y: -28 },
    left: { x: 28 },
    right: { x: -28 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: smoothEase }}
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
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
};

/* ──────────────────── SECTION COMPONENTS ─────────────────────── */

function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  className = "",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
}) {
  return (
    <FadeInWhenVisible className={`text-center mb-10 sm:mb-12 ${className}`}>
      <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-warm mb-4">
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
        {title} {highlight && <span className="text-warm">{highlight}</span>}
      </h2>
      {description && (
        <p className="mt-4 text-white/58 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </FadeInWhenVisible>
  );
}

/* ── NAVBAR ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark-900/92 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/30"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#inicio" className="flex items-center group" aria-label="Nexo Studio inicio">
            <div className="relative w-32 sm:w-40 h-10 sm:h-12 overflow-hidden">
              <Image
                src="/images/brand/logo-nexo.png"
                alt="Nexo Studio"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                priority
                sizes="160px"
              />
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/75 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-warm group-hover:w-6 transition-all duration-300" />
              </a>
            ))}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="ml-4">
              <Button
                variant="outline"
                size="sm"
                className="border-warm/50 text-warm hover:bg-warm hover:text-dark-900 transition-all duration-300 rounded-full px-5"
              >
                Cotizar proyecto
              </Button>
            </a>
          </div>

          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="Abrir menú">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-dark-900/98 backdrop-blur-xl border-white/5 w-[285px]">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col gap-2 mt-12">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-white/82 hover:text-warm hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      <span className="w-1 h-6 bg-warm/40 rounded-full" />
                      {link.label}
                    </motion.a>
                  ))}
                  <div className="mt-6 px-4">
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                      <Button className="w-full bg-warm text-dark-900 hover:bg-warm-light rounded-full font-semibold">
                        Cotizar por WhatsApp
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
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-arch.jpg"
          alt="Arquitectura biofílica Nexo Studio"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/48 to-dark-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/40" />
      </div>

      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-warm/45 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-warm/45 to-transparent hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm/35 bg-warm/12 mb-7">
            <span className="w-2 h-2 rounded-full bg-warm animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-warm tracking-wider uppercase">
              Arquitectura + Diseño · Medellín
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.38 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
        >
          Diseñamos espacios
          <span className="block text-warm">con intención</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.58 }}
          className="mt-6 sm:mt-7 text-lg sm:text-xl md:text-2xl text-white/86 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]"
        >
          Diseñamos, remodelamos y gestionamos espacios residenciales y comerciales en Medellín.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.78 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-white/70"
        >
          {["Diseño arquitectónico", "Remodelaciones", "Interiores", "Gerencia de obra"].map((item) => (
            <span key={item} className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 backdrop-blur-sm">
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.95 }}
          className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#portafolio">
            <Button size="lg" className="bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-full px-8 h-12 text-base transition-all duration-300 shadow-lg shadow-warm/25 hover:shadow-warm/40">
              Ver proyectos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="border-white/25 text-white hover:bg-white/12 hover:border-white/45 rounded-full px-8 h-12 text-base transition-all duration-300">
              Cotizar por WhatsApp
              <MessageCircle className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="mt-5 text-sm text-white/45"
        >
          De la idea a la visualización, y de la visualización a la obra.
        </motion.p>
      </div>
    </section>
  );
}

/* ── TRUST BAR ── */
function TrustBar() {
  return (
    <section aria-label="Razones para trabajar con Nexo Studio" className="relative z-10 -mt-16 sm:-mt-20 pb-14 sm:pb-18 bg-gradient-to-b from-transparent via-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            {TRUST_POINTS.map((point) => (
              <div key={point.label} className="group rounded-lg border border-white/8 bg-dark-900/82 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/24 hover:border-warm/24 hover:bg-warm/[0.06] transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md bg-warm/12 text-warm flex items-center justify-center group-hover:bg-warm/20 transition-colors">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white leading-none">{point.value}</div>
                    <div className="text-sm font-semibold text-warm mt-1">{point.label}</div>
                  </div>
                </div>
                <p className="text-sm text-white/58 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

/* ── SERVICES ── */
function Services() {
  return (
    <section id="servicios" className="py-14 sm:py-20 lg:py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Servicios"
          title="Lo que"
          highlight="hacemos"
          description="Un servicio integral para aterrizar ideas, diseñar con criterio y coordinar proyectos con orden."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((service) => (
            <motion.a
              key={service.title}
              variants={staggerItem}
              href={whatsappLink(`Hola Nexo Studio, quiero información sobre ${service.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative min-h-[260px] overflow-hidden bg-dark-900/65 border border-white/6 rounded-2xl hover:border-warm/30 transition-all duration-500 hover:shadow-lg hover:shadow-warm/6"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-14 group-hover:opacity-28 group-hover:scale-105 transition-all duration-700"
                quality={75}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-900/82 to-dark-900/55" />
              <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-warm/12 flex items-center justify-center mb-5 group-hover:bg-warm/20 group-hover:scale-105 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-warm" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-warm transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-white/62 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-2 text-warm">
                  <span className="text-sm font-medium">Cotizar este servicio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
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
    <section id="portafolio" className="py-14 sm:py-20 lg:py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portafolio"
          title="Proyectos que"
          highlight="cuentan una historia"
          description="Una selección de proyectos y visualizaciones de arquitectura, interiores, remodelación y espacios comerciales."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <motion.article
              key={`${item.title}-${item.src}`}
              variants={staggerItem}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer bg-dark-800 ${
                idx === 0 || idx === 7 ? "sm:row-span-2 aspect-[3/4] sm:aspect-auto" : "aspect-[4/3]"
              }`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <Image
                src={item.src}
                alt={`${item.title} — ${item.scope} por Nexo Studio`}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                quality={85}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/22 to-black/8" />

              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap items-center gap-2 right-3">
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-warm/92 text-dark-900 text-[10px] sm:text-xs font-semibold">
                  {item.category}
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/12 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium border border-white/12">
                  {item.status}
                </span>
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
                  {item.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-white/62">
                  <span>{item.location}</span>
                  <span className="text-warm/70">•</span>
                  <span>{item.scope}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </StaggerContainer>

        <FadeInWhenVisible className="mt-9 text-center">
          <a href={whatsappLink("Hola Nexo Studio, quiero hablar sobre un proyecto similar al portafolio.")} target="_blank" rel="noopener noreferrer">
            <Button className="bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-full px-7">
              Quiero un proyecto así
              <MessageCircle className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

/* ── CASE STUDIES ── */
function CaseStudies() {
  return (
    <section id="casos" className="py-14 sm:py-20 lg:py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Casos de estudio"
          title="Más que imágenes:"
          highlight="decisiones claras"
          description="Tres lecturas rápidas de cómo abordamos retos distintos: remodelación, obra nueva e interiorismo comercial."
        />

        <StaggerContainer className="grid lg:grid-cols-3 gap-4 sm:gap-5">
          {CASE_STUDIES.map((item) => (
            <motion.article
              key={item.title}
              variants={staggerItem}
              className="group rounded-lg border border-white/8 bg-dark-900/62 overflow-hidden hover:border-warm/24 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} - ${item.category} Nexo Studio`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  quality={86}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/82 via-dark-900/18 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-warm/92 px-3 py-1 text-xs font-semibold text-dark-900">
                  {item.category}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-white leading-tight">
                  {item.title}
                </h3>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-warm/80">Reto</div>
                    <p className="mt-1.5 text-sm text-white/58 leading-relaxed">{item.challenge}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-warm/80">Respuesta</div>
                    <p className="mt-1.5 text-sm text-white/58 leading-relaxed">{item.response}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-warm/80">Resultado</div>
                    <p className="mt-1.5 text-sm text-white/58 leading-relaxed">{item.result}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.facts.map((fact) => (
                    <span key={fact} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/58">
                      {fact}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  return (
    <section id="nosotros" className="py-14 sm:py-20 lg:py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Nosotros"
          title="El equipo detrás de"
          highlight="Nexo Studio"
          description="Unimos diseño, gestión y visualización para que cada proyecto se entienda, se vea bien y pueda ejecutarse con criterio."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
          <FadeInWhenVisible direction="right" className="bg-dark-900/55 border border-white/6 rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Arquitectura con claridad visual y control técnico.</h3>
            <p className="text-white/62 leading-relaxed">
              Nexo Studio es una empresa de arquitectura y construcción ubicada en Medellín. Trabajamos en obras nuevas, remodelaciones, interiores y visualización 3D con una metodología práctica: entender, diseñar, visualizar y coordinar.
            </p>
            <div className="mt-7 space-y-4">
              {PROCESS.map((step, idx) => (
                <div key={step} className="flex gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-full bg-warm/15 text-warm flex items-center justify-center text-sm font-semibold shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-white/72">{step}</p>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>

          <StaggerContainer className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {TEAM.map((member) => (
              <motion.article
                key={member.name}
                variants={staggerItem}
                className="group relative bg-dark-900/55 border border-white/6 rounded-2xl overflow-hidden hover:border-warm/18 transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    quality={90}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/48 to-dark-900/4" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{member.name}</h3>
                  <p className="text-warm text-sm font-semibold mt-1">{member.role}</p>
                  <p className="text-white/72 text-sm leading-relaxed mt-3">{member.intro}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {member.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-warm/15 border border-warm/25 text-warm text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ── TOOLS ── */
function Tools() {
  return (
    <section className="py-14 sm:py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Tecnología" title="Herramientas que" highlight="utilizamos" />

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {TOOLS.map((tool) => (
            <motion.div key={tool.name} variants={staggerItem} className="group flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-dark-800/55 border border-white/6 hover:border-warm/22 transition-all duration-300 cursor-default">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${tool.color}20` }}>
                <span style={{ color: tool.color }}>{tool.initial}</span>
              </div>
              <span className="text-xs sm:text-sm text-white/68 group-hover:text-white/92 font-medium text-center transition-colors duration-300">{tool.name}</span>
              <span className="text-[10px] sm:text-xs text-white/38 text-center leading-tight">{tool.desc}</span>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  return (
    <section className="py-14 sm:py-20 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Lo que conviene"
          highlight="aclarar primero"
          description="Respuestas rápidas para entender cómo iniciar un proyecto con Nexo Studio."
        />

        <StaggerContainer className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <motion.details
              key={item.question}
              variants={staggerItem}
              className="group rounded-lg border border-white/8 bg-dark-800/58 p-5 open:border-warm/24 open:bg-warm/[0.04] transition-all duration-300"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base sm:text-lg font-semibold text-white">
                {item.question}
                <ChevronUp className="w-5 h-5 shrink-0 rotate-180 text-warm transition-transform group-open:rotate-0" />
              </summary>
              <p className="mt-3 text-sm sm:text-base text-white/58 leading-relaxed">
                {item.answer}
              </p>
            </motion.details>
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
    phone: "",
    email: "",
    projectType: PROJECT_TYPES[0],
    location: "",
    area: "",
    budget: BUDGET_RANGES[0],
    timeline: TIMELINES[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      "Hola Nexo Studio, quiero cotizar un proyecto.",
      `Nombre: ${formState.name}`,
      `Teléfono: ${formState.phone}`,
      `Email: ${formState.email}`,
      `Tipo de proyecto: ${formState.projectType}`,
      `Ubicación: ${formState.location}`,
      `Área aproximada: ${formState.area}`,
      `Presupuesto: ${formState.budget}`,
      `Tiempo para iniciar: ${formState.timeline}`,
      `Contexto: ${formState.message}`,
    ].join("\n");

    setSubmitted(true);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({
      name: "",
      phone: "",
      email: "",
      projectType: PROJECT_TYPES[0],
      location: "",
      area: "",
      budget: BUDGET_RANGES[0],
      timeline: TIMELINES[0],
      message: "",
    });
  };

  const selectClassName =
    "w-full bg-dark-700/55 border border-white/12 text-white focus:border-warm/55 h-11 rounded-xl px-3 text-sm outline-none transition-colors";

  return (
    <section id="contacto" className="py-14 sm:py-20 lg:py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contacto"
          title="Hablemos de tu"
          highlight="proyecto"
          description="Cuéntanos qué quieres diseñar, remodelar o visualizar. Te responderemos por WhatsApp para avanzar rápido."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <FadeInWhenVisible direction="left" className="relative min-h-[420px]">
            <div className="relative h-full min-h-[420px] rounded-2xl overflow-hidden">
              <Image src="/images/services/villa-luxury.jpg" alt="Proyecto residencial Nexo Studio" fill className="object-cover" quality={90} sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/78 via-dark-900/15 to-transparent" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 bg-dark-900/84 backdrop-blur-md rounded-xl border border-white/10 p-5 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/82 hover:text-warm transition-colors duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-green-500/12 flex items-center justify-center group-hover:bg-green-500/22 transition-colors duration-200">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/42">WhatsApp</div>
                    <div className="text-sm font-medium">314 681 1444 / 300 254 4368</div>
                  </div>
                </a>
                <a href="mailto:nexostudio.arquitectura@gmail.com" className="flex items-center gap-3 text-white/82 hover:text-warm transition-colors duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-warm/12 flex items-center justify-center group-hover:bg-warm/22 transition-colors duration-200">
                    <Mail className="w-5 h-5 text-warm" />
                  </div>
                  <div>
                    <div className="text-xs text-white/42">Email</div>
                    <div className="text-sm font-medium break-all">nexostudio.arquitectura@gmail.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-white/82">
                  <div className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-warm/75" />
                  </div>
                  <div>
                    <div className="text-xs text-white/42">Ubicación</div>
                    <div className="text-sm font-medium">Medellín, Colombia</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="right" delay={0.15}>
            <div className="h-full bg-dark-900/55 border border-white/6 rounded-2xl p-6 sm:p-8 lg:p-9">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Pre-cotiza por WhatsApp</h3>
              <p className="text-white/48 text-sm mb-6 sm:mb-7">
                Este formulario arma un mensaje completo para entender alcance, ubicación, etapa y presupuesto antes de conversar.
              </p>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/12 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">WhatsApp abierto</h4>
                  <p className="text-white/52 text-sm">Revisa la ventana de WhatsApp para enviar el mensaje.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/65 mb-1.5">Nombre</label>
                      <Input id="name" type="text" placeholder="Tu nombre" value={formState.name} onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))} required className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/32 focus:border-warm/55 h-11 rounded-xl" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/65 mb-1.5">Teléfono</label>
                      <Input id="phone" type="tel" placeholder="Tu WhatsApp" value={formState.phone} onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))} required className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/32 focus:border-warm/55 h-11 rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/65 mb-1.5">Email</label>
                    <Input id="email" type="email" placeholder="tu@email.com" value={formState.email} onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))} className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/32 focus:border-warm/55 h-11 rounded-xl" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-white/65 mb-1.5">Tipo de proyecto</label>
                      <select id="projectType" value={formState.projectType} onChange={(e) => setFormState((s) => ({ ...s, projectType: e.target.value }))} className={selectClassName}>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-white/65 mb-1.5">Ubicación</label>
                      <Input id="location" type="text" placeholder="Ciudad o sector" value={formState.location} onChange={(e) => setFormState((s) => ({ ...s, location: e.target.value }))} required className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/32 focus:border-warm/55 h-11 rounded-xl" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-white/65 mb-1.5">Área aprox.</label>
                      <Input id="area" type="text" placeholder="Ej: 80 m²" value={formState.area} onChange={(e) => setFormState((s) => ({ ...s, area: e.target.value }))} className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/32 focus:border-warm/55 h-11 rounded-xl" />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-white/65 mb-1.5">Presupuesto</label>
                      <select id="budget" value={formState.budget} onChange={(e) => setFormState((s) => ({ ...s, budget: e.target.value }))} className={selectClassName}>
                        {BUDGET_RANGES.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-white/65 mb-1.5">Etapa</label>
                      <select id="timeline" value={formState.timeline} onChange={(e) => setFormState((s) => ({ ...s, timeline: e.target.value }))} className={selectClassName}>
                        {TIMELINES.map((timeline) => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/65 mb-1.5">Contexto</label>
                    <Textarea id="message" placeholder="Cuéntanos qué quieres transformar, diseñar o visualizar..." rows={4} value={formState.message} onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))} required className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/32 focus:border-warm/55 rounded-xl resize-none" />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-xl h-12 text-base transition-all duration-300 shadow-lg shadow-warm/20 hover:shadow-warm/30">
                    Abrir WhatsApp
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
    <footer className="bg-dark-900 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#inicio" className="flex items-center group mb-4">
              <div className="relative w-32 h-10 overflow-hidden">
                <Image src="/images/brand/logo-nexo.png" alt="Nexo Studio" fill className="object-contain" sizes="128px" />
              </div>
            </a>
            <p className="text-sm text-white/45 leading-relaxed">
              Arquitectura + Diseño para espacios residenciales, comerciales y remodelaciones en Medellín.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Navegación</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/45 hover:text-warm transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Servicios</h4>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <a href="#servicios" className="text-sm text-white/45 hover:text-warm transition-colors duration-200">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/45 hover:text-warm transition-colors duration-200">
                  <Phone className="w-3.5 h-3.5 shrink-0" />314 681 1444
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP_SECONDARY}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/45 hover:text-warm transition-colors duration-200">
                  <Phone className="w-3.5 h-3.5 shrink-0" />300 254 4368
                </a>
              </li>
              <li>
                <a href="mailto:nexostudio.arquitectura@gmail.com" className="flex items-center gap-2 text-sm text-white/45 hover:text-warm transition-colors duration-200">
                  <Mail className="w-3.5 h-3.5 shrink-0" />nexostudio.arquitectura@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/45">
                <MapPin className="w-3.5 h-3.5 shrink-0" />Medellín, Colombia
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-7 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/32">© {new Date().getFullYear()} Nexo Studio. Todos los derechos reservados.</p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-xs text-warm/80 hover:text-warm transition-colors">
            Cotizar proyecto por WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ── WHATSAPP FAB ── */
function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 260);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ── SCROLL TO TOP ── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
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
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-5 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-dark-700/84 backdrop-blur-sm border border-white/12 flex items-center justify-center text-white/62 hover:text-warm hover:border-warm/35 transition-all duration-300"
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
      <TrustBar />
      <Services />
      <Portfolio />
      <CaseStudies />
      <About />
      <Tools />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFAB />
      <ScrollToTop />
    </main>
  );
}
