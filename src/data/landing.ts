/**
 * Contenido del landing de Nexo Studio.
 * Todo el texto editable vive aquí; los componentes solo presentan.
 */
import {
  Building2,
  Paintbrush,
  Hammer,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  cta: string;
  href: string;
}

export const SERVICES: Service[] = [
  {
    icon: Building2,
    title: "NEXO Architecture",
    description:
      "Arquitectura residencial para viviendas, casas campestres y proyectos de nueva construcción. Del concepto y la distribución a la visualización y documentación del proyecto.",
    image: "/images/projects/p04-penol/view-3.jpg",
    cta: "Explorar arquitectura",
    href: "/arquitectura-residencial",
  },
  {
    icon: Paintbrush,
    title: "NEXO Interiors",
    description:
      "Interiorismo y remodelación integral para apartamentos y viviendas. Diseñamos distribución, materialidad, iluminación, mobiliario y atmósfera como un solo sistema.",
    image: "/images/projects/p03-santa-elena/view-2.jpg",
    cta: "Explorar interiorismo",
    href: "/interiorismo",
  },
  {
    icon: Hammer,
    title: "NEXO Complete",
    description:
      "Una experiencia integral para llevar el proyecto del concepto a la obra con un solo equipo: diseño, visualización, coordinación técnica, proveedores y acompañamiento de ejecución.",
    image: "/images/services/villa-luxury.jpg",
    cta: "Conocer el proceso",
    href: "/proceso",
  },
];

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

export const PROCESS_STEPS: string[] = [
  "Entendemos cómo quieres vivir y qué necesita el proyecto.",
  "Diseñamos y visualizamos cada decisión antes de ejecutar.",
  "Coordinamos documentación, proveedores y acompañamiento de obra.",
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
    description: "en desarrollo y coordinación de proyectos arquitectónicos e inmobiliarios",
  },
  {
    value: "360°",
    label: "visión integral",
    description: "arquitectura, interiorismo, visualización y acompañamiento de ejecución",
  },
  {
    value: "1",
    label: "equipo, de principio a fin",
    description: "menos fragmentación y más coherencia entre diseño, decisiones y obra",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué tipo de proyectos desarrolla Nexo Studio?",
    answer:
      "Nos enfocamos en arquitectura residencial, interiorismo y remodelaciones integrales para viviendas, apartamentos y casas campestres, además de proyectos seleccionados de carácter comercial.",
  },
  {
    question: "¿Trabajan proyectos fuera de Medellín?",
    answer:
      "Sí. Atendemos Medellín, Área Metropolitana, Oriente antioqueño y otros lugares de Colombia cuando el alcance permite coordinar correctamente diseño y acompañamiento técnico.",
  },
  {
    question: "¿Puedo contratar únicamente la etapa de diseño?",
    answer:
      "Sí. El alcance puede incluir solo arquitectura o interiorismo, o ampliarse a visualización, documentación, coordinación técnica y acompañamiento de ejecución.",
  },
  {
    question: "¿Cómo inicia un proyecto con Nexo Studio?",
    answer:
      "Comenzamos con una conversación para entender ubicación, área, objetivos, presupuesto y momento del proyecto. Con esa información definimos el alcance y la ruta de trabajo más adecuada.",
  },
];

export const PROJECT_TYPES: string[] = [
  "Arquitectura residencial",
  "Interiorismo",
  "Remodelación integral",
  "Arquitectura + interiorismo",
  "Acompañamiento de obra",
  "Otro",
];

export const BUDGET_RANGES: string[] = [
  "Aún estoy definiendo la inversión",
  "$50M - $100M COP",
  "$100M - $250M COP",
  "$250M - $500M COP",
  "$500M - $1.000M COP",
  "Más de $1.000M COP",
];

export const TIMELINES: string[] = [
  "Estoy explorando opciones",
  "Quiero iniciar este mes",
  "1 a 3 meses",
  "3 a 6 meses",
  "6 a 12 meses",
  "Ya está en obra",
];
