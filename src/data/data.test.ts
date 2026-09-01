import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import { projects, getProjectBySlug, type ProjectStatus, type ProjectCategory } from "./projects";
import {
  SERVICES,
  CASE_STUDIES,
  TEAM,
  TOOLS,
  FAQ_ITEMS,
  TRUST_POINTS,
  PROCESS_STEPS,
} from "./landing";
import { siteConfig, whatsappLink, whatsappLinkSecondary } from "@/config/site";

const VALID_STATUSES: ProjectStatus[] = [
  "Proyecto conceptual",
  "Anteproyecto",
  "En obra",
  "Ejecutado",
];

const VALID_CATEGORIES: ProjectCategory[] = [
  "Residencial",
  "Comercial",
  "Remodelación",
  "Obra nueva",
  "Interiorismo",
  "Residencial / Comercial",
];

/** Verifica que una imagen referenciada exista en /public. */
function imageExists(src: string): boolean {
  return existsSync(join(process.cwd(), "public", src));
}

describe("projects", () => {
  test("tiene proyectos definidos", () => {
    expect(projects.length).toBeGreaterThanOrEqual(6);
  });

  test("los slugs e ids son únicos", () => {
    const slugs = projects.map((p) => p.slug);
    const ids = projects.map((p) => p.id);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("cada proyecto tiene datos completos", () => {
    for (const p of projects) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(50);
      expect(p.location.length).toBeGreaterThan(0);
      expect(p.scope.length).toBeGreaterThan(0);
      expect(p.year).toBeGreaterThanOrEqual(2020);
      expect(VALID_STATUSES).toContain(p.status);
      expect(VALID_CATEGORIES).toContain(p.category);
      expect(p.views.length).toBeGreaterThanOrEqual(3);
    }
  });

  test("las coordenadas son válidas para el mapa (Leaflet)", () => {
    for (const p of projects) {
      expect(Number.isFinite(p.lat)).toBe(true);
      expect(Number.isFinite(p.lng)).toBe(true);
      // Rango Colombia (evita pines en el mar o en otro continente)
      expect(p.lat).toBeGreaterThan(0);
      expect(p.lat).toBeLessThan(13);
      expect(p.lng).toBeGreaterThan(-80);
      expect(p.lng).toBeLessThan(-66);
    }
  });

  test("updatedAt es una fecha ISO válida (alimenta sitemap.xml)", () => {
    const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
    for (const p of projects) {
      expect(p.updatedAt).toMatch(ISO_DATE);
      expect(new Date(p.updatedAt).toString()).not.toBe("Invalid Date");
    }
  });

  test("todas las vistas tienen alt descriptivo", () => {
    for (const p of projects) {
      for (const v of p.views) {
        expect(v.alt.length).toBeGreaterThan(10);
      }
    }
  });

  test("todas las imágenes de proyectos existen en /public", () => {
    for (const p of projects) {
      for (const v of p.views) {
        expect(imageExists(v.src)).toBe(true);
      }
    }
  });

  test("getProjectBySlug encuentra y rechaza correctamente", () => {
    expect(getProjectBySlug(projects[0].slug)?.id).toBe(projects[0].id);
    expect(getProjectBySlug("no-existe")).toBeUndefined();
  });
});

describe("landing", () => {
  test("los 6 servicios tienen título, descripción e imagen existente", () => {
    expect(SERVICES.length).toBe(6);
    for (const s of SERVICES) {
      expect(s.title.length).toBeGreaterThan(0);
      expect(s.description.length).toBeGreaterThan(30);
      expect(imageExists(s.image)).toBe(true);
    }
  });

  test("los casos de estudio tienen reto, respuesta y resultado", () => {
    expect(CASE_STUDIES.length).toBe(3);
    for (const c of CASE_STUDIES) {
      expect(c.challenge.length).toBeGreaterThan(20);
      expect(c.response.length).toBeGreaterThan(20);
      expect(c.result.length).toBeGreaterThan(20);
      expect(c.facts.length).toBe(3);
      expect(imageExists(c.image)).toBe(true);
    }
  });

  test("el equipo tiene 2 miembros con foto y al menos 3 skills", () => {
    expect(TEAM.length).toBe(2);
    for (const m of TEAM) {
      expect(m.name.length).toBeGreaterThan(0);
      expect(m.skills.length).toBeGreaterThanOrEqual(3);
      expect(imageExists(m.photo)).toBe(true);
    }
  });

  test("las herramientas y señales de confianza están definidas", () => {
    expect(TOOLS.length).toBe(7);
    expect(TRUST_POINTS.length).toBe(3);
    expect(PROCESS_STEPS.length).toBe(3);
  });

  test("la FAQ tiene al menos 4 preguntas con respuesta", () => {
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(4);
    for (const f of FAQ_ITEMS) {
      expect(f.question.length).toBeGreaterThan(10);
      expect(f.answer.length).toBeGreaterThan(30);
    }
  });
});

describe("siteConfig", () => {
  test("los números de WhatsApp tienen formato internacional válido", () => {
    expect(siteConfig.contact.whatsappMain).toMatch(/^\d{10,15}$/);
    expect(siteConfig.contact.whatsappSecondary).toMatch(/^\d{10,15}$/);
  });

  test("el email es válido", () => {
    expect(siteConfig.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test("los enlaces de WhatsApp codifican el mensaje", () => {
    const link = whatsappLink("Hola con acentos: ñ");
    expect(link).toContain(`wa.me/${siteConfig.contact.whatsappMain}`);
    expect(link).toContain(encodeURIComponent("Hola con acentos: ñ"));

    const secondary = whatsappLinkSecondary();
    expect(secondary).toContain(`wa.me/${siteConfig.contact.whatsappSecondary}`);
  });

  test("la navegación apunta a secciones internas", () => {
    expect(siteConfig.nav.length).toBe(7);
    for (const link of siteConfig.nav) {
      expect(link.href.startsWith("#")).toBe(true);
    }
  });

  test("la URL del sitio es https", () => {
    expect(siteConfig.url.startsWith("https://")).toBe(true);
  });
});
