// Datos de proyectos del portafolio de Nexo Studio
// Cada proyecto se actualiza cuando el cliente proporciona la información

export interface ProjectView {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: "Residencial" | "Comercial" | "Remodelación" | "Obra nueva" | "Interiorismo" | "Residencial / Comercial";
  scope: string;
  status: "Proyecto conceptual" | "Anteproyecto" | "En obra" | "Ejecutado";
  year: number;
  description: string;
  views: ProjectView[
];
}

export const projects: Project[] = [
  {
    id: "p01",
    slug: "rionegro-residencial-comercial",
    name: "Proyecto Rionegro",
    location: "Rionegro, Antioquia",
    category: "Residencial / Comercial",
    scope: "Diseño arquitectónico",
    status: "Proyecto conceptual",
    year: 2022,
    description: "Edificio multifamiliar de uso mixto con fachada orgánica, balcones ondulantes, vegetación integrada y acentos de madera. Propuesta conceptual que integra espacios residenciales y comerciales en un solo volumen contemporáneo.",
    views: [
      { src: "/images/projects/p01-rionegro/view-1.jpg", alt: "Vista frontal del edificio con balcones curvos y vegetación" },
      { src: "/images/projects/p01-rionegro/view-2.jpg", alt: "Detalle de fachada con paneles oscuros y slats de madera" },
      { src: "/images/projects/p01-rionegro/view-3.jpg", alt: "Vista en contrapicado del edificio multifamiliar" },
    ],
  },
  {
    id: "p02",
    slug: "waves-living",
    name: "Waves Living",
    location: "El Tesoro, Medellín, Antioquia",
    category: "Residencial",
    scope: "Diseño arquitectónico",
    status: "Proyecto conceptual",
    year: 2022,
    description: "Torre residencial con balcones curvos de vidrio, paneles verticales de madera y vegetación integrada. La propuesta explora la fluidez de las formas orgánicas en altura, creando un hito contemporáneo en el sector de El Tesoro con fachadas dinámicas que cambian con la luz del día.",
    views: [
      { src: "/images/projects/p02-waves-living/view-1.jpg", alt: "Fachada con textura orgánica marrón y ventanas de marco negro" },
      { src: "/images/projects/p02-waves-living/view-2.jpg", alt: "Edificio residencial con balcones curvos y vegetación" },
      { src: "/images/projects/p02-waves-living/view-3.jpg", alt: "Vista de la torre con paneles verticales de madera y vegetación" },
      { src: "/images/projects/p02-waves-living/view-4.jpg", alt: "Fachada con panel vertical color óxido y vegetación tropical" },
    ],
  },
  {
    id: "p03",
    slug: "santa-elena-vivienda-unifamiliar",
    name: "Vivienda Santa Elena",
    location: "Santa Elena, Antioquia (Medellín)",
    category: "Residencial",
    scope: "Diseño arquitectónico, diseño de interiores e interventoría en obra",
    status: "En obra",
    year: 2025,
    description: "Vivienda unifamiliar de dos plantas con estética mediterránea moderna: fachada de estuco texturizado, ventanas y vanos arqueados, pérgolas de madera y paisajismo abundante. El proyecto integra diseño arquitectónico, interiores y acompañamiento técnico de obra para garantizar coherencia entre concepto y ejecución.",
    views: [
      { src: "/images/projects/p03-santa-elena/view-1.jpg", alt: "Fachada frontal de la vivienda mediterránea con pérgola de madera" },
      { src: "/images/projects/p03-santa-elena/view-2.jpg", alt: "Vista lateral con vanos arqueados y vegetación" },
      { src: "/images/projects/p03-santa-elena/view-3.jpg", alt: "Acceso principal con camino de piedra y plantas" },
      { src: "/images/projects/p03-santa-elena/view-4.jpg", alt: "Vista posterior con deck de madera y muro decorativo" },
    ],
  },
  {
    id: "p04",
    slug: "penol-vivienda-recreacion",
    name: "Vivienda Recreación El Peñol",
    location: "El Peñol, Antioquia",
    category: "Residencial",
    scope: "Diseño arquitectónico",
    status: "Ejecutado",
    year: 2025,
    description: "Vivienda de recreación de lujo junto al embalse, con estructura de concreto y vidrio, arcos de agua, terrazas abiertas y áreas sociales integradas al paisaje. La propuesta combina volúmenes contemporáneos con elementos escultóricos como el corte circular con cascada, maximizando las visuales hacia el agua y la vegetación natural del entorno.",
    views: [
      { src: "/images/projects/p04-penol/view-1.jpg", alt: "Interior social con techo circular de madera y muros de vidrio" },
      { src: "/images/projects/p04-penol/view-2.jpg", alt: "Fachada con arco de agua y escalera de acceso" },
      { src: "/images/projects/p04-penol/view-3.jpg", alt: "Vivienda de dos niveles con techo negro y deck exterior" },
      { src: "/images/projects/p04-penol/view-4.jpg", alt: "Fachada simétrica con vanos de vidrio y paisajismo" },
      { src: "/images/projects/p04-penol/view-5.jpg", alt: "Vista general con corte circular, cascada y fogata exterior" },
    ],
  },
  {
    id: "p05",
    slug: "casa-bonsai-guarne",
    name: "Casa Bonsái",
    location: "Guarne, Antioquia",
    category: "Residencial",
    scope: "Diseño arquitectónico",
    status: "Proyecto conceptual",
    year: 2025,
    description: "Vivienda unifamiliar de inspiración japonesa que integra arquitectura contemporánea y jardín zen. Volumen de concreto y vidrio con techo negro en voladizo, paneles de madera cálida y grandes ventanales que conectan el interior con un paisajismo cuidado: bonsáis, rocas, farol de piedra y estanque con Buda. El interior complementa con dormitorios minimalistas, madera y luz ambiental suave.",
    views: [
      { src: "/images/projects/p05-casa-bonsai/view-1.jpg", alt: "Fachada con techo negro en voladizo y jardín de bonsái" },
      { src: "/images/projects/p05-casa-bonsai/view-2.jpg", alt: "Casa de dos niveles con ventanales y entrada de adoquín" },
      { src: "/images/projects/p05-casa-bonsai/view-3.jpg", alt: "Patio japonés con Buda, estanque de koi y vegetación" },
      { src: "/images/projects/p05-casa-bonsai/view-4.jpg", alt: "Vivienda con jardín zen, pino escultórico y camino de piedra" },
      { src: "/images/projects/p05-casa-bonsai/view-5.jpg", alt: "Dormitorio minimalista con paneles de madera y obra abstracta" },
    ],
  },
  {
    id: "p06",
    slug: "santa-fe-antioquia-recreacion",
    name: "Residencia Recreación Santa Fe de Antioquia",
    location: "Santa Fe de Antioquia, Antioquia",
    category: "Residencial",
    scope: "Diseño arquitectónico",
    status: "Proyecto conceptual",
    year: 2024,
    description: "Residencia de recreación de estilo moderno industrial en tierra caliente, con estructura de concreto expuesto, muros de vidrio y mobiliario de madera cálida. La casa se desarrolla alrededor de una alberca central integrada al paisaje, con zonas sociales abiertas, comedor de mármol, living semi-abierto y dormitorios que conectan visualmente con la vegetación tropical del entorno.",
    views: [
      { src: "/images/projects/p06-santa-fe/view-1.jpg", alt: "Acceso exterior con muros de concreto y plantas" },
      { src: "/images/projects/p06-santa-fe/view-2.jpg", alt: "Alberca con palmera y tumbonas de mármol" },
      { src: "/images/projects/p06-santa-fe/view-3.jpg", alt: "Alberca integrada con concreto y vegetación" },
      { src: "/images/projects/p06-santa-fe/view-4.jpg", alt: "Living semi-abierto con celosía de madera y TV" },
      { src: "/images/projects/p06-santa-fe/view-5.jpg", alt: "Living abierto con ventanales y muebles neutros" },
      { src: "/images/projects/p06-santa-fe/view-6.jpg", alt: "Comedor con mesa de mármol y sillas beige" },
      { src: "/images/projects/p06-santa-fe/view-7.jpg", alt: "Zona social abierta con vegetación interior" },
      { src: "/images/projects/p06-santa-fe/view-8.jpg", alt: "Dormitorio con muro de concreto y ventanal al jardín" },
    ],
  },
];

// Helper para obtener proyecto por slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
