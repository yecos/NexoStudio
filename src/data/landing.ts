/**
 * Contenido del landing de Nexo Studio.
 * Todo el texto editable vive aquí; los componentes solo presentan.
 */
import {
  Building2,
  ClipboardList,
  TrendingUp,
  Paintbrush,
  Ruler,
  Hammer,
  type LucideIcon,
} from "lucide-react";

/* ── Servicios ── */

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    icon: Building2,
    title: "Diseño arquitectónico",
    description:
      "Convertimos tu idea en una propuesta clara: concepto, distribución, planos, renders y criterios listos para ejecutar.",
    image: "/images/projects/p04-penol/view-3.jpg",
  },
  {
    icon: Hammer,
    title: "Remodelaciones",
    description:
      "Transformamos espacios existentes con una mirada funcional, estética y realista frente a presupuesto, obra y tiempos.",
    image: "/images/projects/p03-santa-elena/view-2.jpg",
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
    image: "/images/projects/p04-penol/view-5.jpg",
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

/* ── Casos de estudio ── */

export interface CaseStudy {
  title: string;
  category: string;
  image: string;
  challenge: string;
  response: string;
  result: string;
  facts: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Remodelación residencial con decisiones visuales",
    category: "Remodelación integral",
    image: "/images/projects/p03-santa-elena/view-1.jpg",
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
    image: "/images/projects/p04-penol/view-2.jpg",
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
    image: "/images/projects/p06-santa-fe/view-5.jpg",
    challenge:
      "Crear un espacio comercial con identidad, buen recorrido y una experiencia coherente para el usuario.",
    response:
      "Diseñamos atmósfera, mobiliario, iluminación y puntos focales con apoyo de visualización para validar el concepto.",
    result:
      "Una propuesta comercial más fácil de presentar, ajustar y ejecutar con intención desde el primer plano.",
    facts: ["Comercial", "Medellín", "Concepto espacial"],
  },
];

/* ── Equipo ── */

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  intro: string;
  bio: string;
  skills: string[];
}

export const TEAM: TeamMember[] = [
  {
    name: "Catalina Molina Álvarez",
    role: "Arquitecta | Gestión de Proyectos",
    photo: "/images/team/catalina_0.jpg",
    intro: "Gestión técnica, coordinación interdisciplinaria y control de proyecto.",
    bio:
      "Arquitecta con 8 años de experiencia en desarrollo integral de proyectos arquitectónicos e inmobiliarios. Especialista en Gestión Inmobiliaria de la Universidad Nacional, con capacidad para articular equipos interdisciplinarios y apoyar decisiones técnicas, normativas y operativas.",
    skills: ["Gestión de Proyectos", "Coordinación Técnica", "BIM / Revit", "Control de Obra"],
  },
  {
    name: "Juan Mateo Yepes Correa",
    role: "Arquitecto | Diseño Gráfico",
    photo: "/images/team/mateo_0.jpg",
    intro: "Diseño 3D, representación arquitectónica y dirección visual de proyectos.",
    bio:
      "Arquitecto y diseñador gráfico con amplia experiencia en diseño 3D digital, modelado, renderizado y postproducción. Enfocado en claridad visual, desarrollo creativo y excelencia técnica.",
    skills: ["Diseño 3D", "Renderizado", "Optimización de Procesos", "Desarrollo Creativo"],
  },
];

/* ── Herramientas ── */

export interface Tool {
  name: string;
  desc: string;
  color: string;
  initial: string;
}

export const TOOLS: Tool[] = [
  { name: "SketchUp", desc: "Modelado 3D", color: "#005F9E", initial: "S" },
  { name: "Revit", desc: "BIM / Documentación", color: "#186BDB", initial: "R" },
  { name: "Twinmotion", desc: "Tiempo real", color: "#FF6B35", initial: "T" },
  { name: "Unreal Engine", desc: "Visualización inmersiva", color: "#0E84B5", initial: "U" },
  { name: "D5 Render", desc: "Render fotorrealista", color: "#4CAF50", initial: "D" },
  { name: "Photoshop", desc: "Postproducción", color: "#31A8FF", initial: "P" },
  { name: "IA", desc: "Diseño generativo", color: "#C8956C", initial: "IA" },
];

/* ── Proceso y señales de confianza ── */

export const PROCESS_STEPS: string[] = [
  "Entendemos tu idea, alcance y presupuesto.",
  "Diseñamos una propuesta visual y técnica clara.",
  "Coordinamos decisiones, proveedores y ejecución.",
];

export interface TrustPoint {
  value: string;
  label: string;
  description: string;
}

export const TRUST_POINTS: TrustPoint[] = [
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
    description:
      "renders y modelos para evaluar materiales, atmósfera y alcance antes de ejecutar",
  },
];

/* ── FAQ (fuente única: también alimenta el JSON-LD del layout) ── */

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
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

/* ── Opciones del formulario de contacto ── */

export const PROJECT_TYPES: string[] = [
  "Diseño arquitectónico",
  "Remodelación",
  "Diseño de interiores",
  "Visualización 3D / renders",
  "Gerencia de proyecto",
  "Factibilidad inmobiliaria",
];

export const BUDGET_RANGES: string[] = [
  "Aún no tengo presupuesto",
  "Menos de $20M COP",
  "$20M - $60M COP",
  "$60M - $150M COP",
  "Más de $150M COP",
];

export const TIMELINES: string[] = [
  "Estoy explorando opciones",
  "Quiero iniciar este mes",
  "1 a 3 meses",
  "3 a 6 meses",
  "Ya está en obra",
];
