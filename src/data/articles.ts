export interface JournalSection {
  heading: string;
  body: string[];
}

export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  image: string;
  imageAlt: string;
  sections: JournalSection[];
}

export const articles: JournalArticle[] = [
  {
    slug: "como-planear-remodelacion-integral",
    title: "Cómo planear una remodelación integral antes de empezar obra",
    excerpt:
      "Una remodelación se vuelve mucho más controlable cuando distribución, materiales, iluminación, presupuesto y documentación se resuelven antes de demoler.",
    publishedAt: "2026-09-18",
    readingTime: "6 min",
    category: "Remodelación",
    image: "/images/projects/p03-santa-elena/view-2.jpg",
    imageAlt: "Proyecto residencial de Nexo Studio como referencia de planeación integral",
    sections: [
      {
        heading: "Empezar por el alcance, no por los acabados",
        body: [
          "Antes de escoger pisos, pinturas o mobiliario conviene definir qué debe cambiar realmente: distribución, instalaciones, iluminación, almacenamiento, circulación o relación entre espacios.",
          "Un alcance claro permite separar decisiones estructurales de decisiones decorativas y evita que la obra avance mientras el diseño todavía está cambiando.",
        ],
      },
      {
        heading: "Diseñar y visualizar antes de construir",
        body: [
          "Planos y visualizaciones ayudan a revisar proporciones, materialidad y encuentros antes de comprometer recursos. El objetivo no es únicamente producir una imagen atractiva, sino reducir decisiones improvisadas durante la ejecución.",
          "Cuando cocina, baños, iluminación, cielos, carpintería y mobiliario se estudian como un conjunto, es más fácil detectar interferencias y coordinar proveedores.",
        ],
      },
      {
        heading: "Presupuesto y diseño deben avanzar juntos",
        body: [
          "El presupuesto no debería aparecer al final del diseño. Conviene validar rangos de inversión y prioridades desde las primeras etapas para decidir dónde concentrar recursos y dónde simplificar.",
          "Una propuesta coherente no depende necesariamente de usar el material más costoso, sino de mantener una dirección clara en distribución, proporción, iluminación y detalle.",
        ],
      },
    ],
  },
  {
    slug: "arquitectura-residencial-oriente-antioqueno",
    title: "Arquitectura residencial en Oriente Antioqueño: diseñar con el paisaje",
    excerpt:
      "En una casa campestre, implantación, visuales, clima y relación interior–exterior son parte del proyecto desde el primer esquema.",
    publishedAt: "2026-09-18",
    readingTime: "5 min",
    category: "Arquitectura",
    image: "/images/projects/p04-penol/view-5.jpg",
    imageAlt: "Vivienda de recreación de Nexo Studio en El Peñol",
    sections: [
      {
        heading: "La vista no es el único dato del lote",
        body: [
          "El paisaje puede orientar el proyecto, pero también importan acceso, topografía, privacidad, recorrido solar, viento, lluvias y forma de uso de la vivienda.",
          "Una buena implantación busca equilibrar visuales y experiencia cotidiana: cómo se llega, cómo se recorre la casa y cómo los espacios sociales se conectan con el exterior.",
        ],
      },
      {
        heading: "Interior y exterior deben diseñarse al mismo tiempo",
        body: [
          "Terrazas, patios, jardines y cubiertas no son elementos añadidos después. En vivienda campestre forman parte de la arquitectura y ayudan a extender las áreas sociales sin convertir todo en espacio cerrado.",
          "La selección de materiales también debe responder a exposición, mantenimiento y envejecimiento, además de la intención estética.",
        ],
      },
      {
        heading: "Visualizar el proyecto ayuda a decidir",
        body: [
          "Modelar el volumen y estudiar imágenes desde distintas posiciones permite revisar la relación entre casa y paisaje antes de desarrollar decisiones más costosas.",
          "Ese proceso es especialmente útil cuando el proyecto depende de visuales largas, cambios de nivel o elementos exteriores como terrazas, piscinas y jardines.",
        ],
      },
    ],
  },
  {
    slug: "que-definir-antes-proyecto-interiorismo",
    title: "Qué definir antes de iniciar un proyecto de interiorismo",
    excerpt:
      "Un buen proyecto de interiores comienza entendiendo cómo se usa el espacio, qué debe permanecer y qué decisiones necesitan coordinarse antes de comprar mobiliario.",
    publishedAt: "2026-09-18",
    readingTime: "5 min",
    category: "Interiorismo",
    image: "/images/projects/p06-santa-fe/view-5.jpg",
    imageAlt: "Interior residencial desarrollado por Nexo Studio",
    sections: [
      {
        heading: "Primero: cómo se vive el espacio",
        body: [
          "El punto de partida no debería ser un estilo visual, sino las rutinas. Cuántas personas usan el espacio, qué actividades suceden, cuánto almacenamiento se necesita y qué elementos existentes deben conservarse.",
          "Esa información determina distribución y jerarquías antes de entrar a una conversación de colores o materiales.",
        ],
      },
      {
        heading: "Materialidad, luz y mobiliario son un sistema",
        body: [
          "Un interior se percibe como una experiencia continua. Por eso iluminación, carpintería, textiles, piedra, madera y mobiliario deben desarrollarse bajo una misma dirección.",
          "Cuando esos elementos se resuelven por separado aparecen contradicciones de proporción, tono y detalle que suelen ser difíciles de corregir al final.",
        ],
      },
      {
        heading: "Definir el nivel de intervención",
        body: [
          "No todos los proyectos requieren una remodelación completa. Algunas propiedades necesitan redistribución e instalaciones nuevas; otras pueden transformarse con iluminación, mobiliario, carpintería y acabados puntuales.",
          "Identificar ese nivel de intervención ayuda a construir un alcance realista y a decidir el orden correcto de las inversiones.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return articles.find((article) => article.slug === slug);
}
