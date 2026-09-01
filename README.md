# Nexo Studio — Website

Sitio web de Nexo Studio, estudio de arquitectura, remodelaciones, diseño de interiores, visualización 3D y gerencia de proyectos en Medellín, Colombia.

## Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Lenguaje:** TypeScript 5 (strict)
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion (islas de cliente mínimas)
- **UI:** shadcn/ui (6 componentes) + Lucide icons
- **Tests:** Bun test
- **Deploy:** Vercel

## Arquitectura

El sitio sigue el modelo Server-First de Next.js: las secciones estáticas (servicios, casos, nosotros, herramientas, FAQ, footer) renderizan en el servidor y solo hidratan islas de cliente para lo verdaderamente interactivo (navbar, lightbox del portafolio, formulario de contacto, botones flotantes).

```
src/
├── app/
│   ├── layout.tsx              # Layout raíz + metadata + JSON-LD
│   ├── page.tsx                # Landing: compone las secciones
│   ├── not-found.tsx           # 404 custom
│   ├── manifest.ts             # PWA manifest
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml (incluye proyectos)
│   ├── globals.css             # Estilos globales + tokens de tema
│   └── proyectos/[slug]/       # Páginas individuales de proyecto (SSG)
├── components/
│   ├── layout/                 # Navbar, Footer, WhatsAppFAB, ScrollToTop
│   ├── sections/               # 9 secciones del landing
│   ├── motion/                 # Primitivas de animación (client) + SectionHeader
│   └── ui/                     # shadcn/ui (button, input, sheet, textarea, toast…)
├── config/
│   └── site.ts                 # ⭐ Contacto, WhatsApp, nav — única fuente de verdad
├── data/
│   ├── projects.ts             # Portafolio (6 proyectos)
│   ├── landing.ts              # Servicios, casos, equipo, FAQ, herramientas…
│   ├── schema.ts               # JSON-LD (FAQ deduplicada con landing.ts)
│   └── data.test.ts            # Tests de integridad de datos
├── hooks/
│   ├── use-scrolled.ts         # Umbral de scroll (navbar, FABs)
│   └── use-toast.ts
└── lib/
    └── utils.ts                # cn() helper
```

### Convenciones

- **Contenido vs. presentación:** todo texto editable vive en `src/data/` y `src/config/site.ts`; los componentes solo presentan. Cambiar un teléfono o un servicio = editar un solo archivo.
- **Server por defecto:** los componentes son Server Components salvo que necesiten estado/efectos (`"use client"`).
- **Tokens de tema:** usar las clases de Tailwind definidas en `globals.css` (`text-warm`, `bg-dark-900`, etc.), nunca hex crudos.
- **Animaciones:** envolver contenido con `FadeIn` / `Stagger` + `StaggerItem` / `StaggerArticle` desde `components/motion/`.

## Desarrollo

```bash
bun install
bun run dev
```

Abre http://localhost:3000

## Scripts

| Comando | Descripción |
|---------|-------------|
| `bun run dev` | Servidor de desarrollo |
| `bun run build` | Build de producción |
| `bun run start` | Servidor de producción |
| `bun run lint` | ESLint |
| `bun run test` | Tests de integridad de datos (bun test) |
| `bun run typecheck` | Verificación de tipos |

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta según el entorno:

| Variable | Descripción | Default |
|----------|-------------|------------|
| `NEXT_PUBLIC_SITE_URL` | URL canónica del sitio | `https://www.nexostudioarq.com` |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin` | — (obligatoria) |
| `GITHUB_TOKEN` | Token con `Contents: Read and write` para guardar desde el panel | — (obligatoria) |
| `GITHUB_REPO` | Repo destino | `yecos/NexoStudio` |
| `GITHUB_BRANCH` | Rama destino | `main` |

## Panel de administración (/admin)

Gestiona los proyectos sin tocar código: **crear, editar y eliminar**, con
ubicación en mapa interactivo y subida de imágenes.

### Cómo funciona

1. Entras en `/admin` con la contraseña (`ADMIN_PASSWORD`).
2. Editas el formulario: datos, **ubicación (clic en el mapa)** e imágenes
   (se redimensionan solas a máx. 1920px JPEG).
3. Al guardar, el servidor hace **commit en este repo** vía GitHub API
   (`src/data/projects.json` + imágenes en `public/images/projects/<slug>/`).
4. Vercel detecta el push y **redespliega automáticamente** (~2 min).

### Configuración en Vercel (una sola vez)

1. Genera un token **fine-grained** en
   [github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens):
   - *Repository access* → solo `yecos/NexoStudio`
   - *Permissions* → **Contents: Read and write**
2. En Vercel → tu proyecto → *Settings* → *Environment Variables*, agrega:
   - `ADMIN_PASSWORD` = tu contraseña fuerte
   - `GITHUB_TOKEN` = el token del paso 1
3. Redespliega para aplicar ( Deployments → Redeploy ).

### Notas

- Sesión: cookie firmada (HMAC) válida 7 días.
- `robots.txt` bloquea `/admin` y `/api`.
- Las imágenes eliminadas quedan en el repo sin referenciar (inofensivas);
  límpialas a mano si quieres ahorrar espacio.
- Seguridad: usa un token fine-grained con permisos mínimos y cámbialo si
  sospechas filtración. Nunca commitees `.env.local`.

## Mapa de proyectos

- Home: sección «Zonas donde trabajamos» con todos los proyectos (pines con
  foto, clic → ficha). Tiles oscuros CARTO + OpenStreetMap (gratuitos, con
  atribución).
- Cada proyecto: mini-mapa de ubicación + enlace externo a OpenStreetMap.
- Coordenadas: campos `lat`/`lng` en `src/data/projects.json` (editables desde
  el panel con el selector de mapa).

## Contenido

| Qué editar | Dónde |
|------------|-------|
| Teléfonos, WhatsApp, email, ubicación | `src/config/site.ts` |
| Servicios | `src/data/landing.ts` → `SERVICES` |
| Casos de estudio | `src/data/landing.ts` → `CASE_STUDIES` |
| Equipo | `src/data/landing.ts` → `TEAM` |
| FAQ (sección + JSON-LD) | `src/data/landing.ts` → `FAQ_ITEMS` |
| Proyectos del portafolio | `src/data/projects.json` (o desde `/admin`) |
| Imágenes | `public/images/` (ver `public/images/README.md`) |

## SEO

- Metadata completa (OpenGraph, Twitter Cards, canonical) en `layout.tsx` y por página.
- OG images dinámicas por ruta (`opengraph-image.tsx`, 1200×630 exacto).
- JSON-LD: `ProfessionalService`, `WebSite` y `FAQPage` en `layout.tsx`; `BreadcrumbList` en cada página de proyecto.
- `sitemap.xml` incluye todas las páginas de proyecto con `lastmod` real (campo `updatedAt`); `robots.txt` permite el sitio público y bloquea `/admin` y `/api`.
- Los tests de datos garantizan que toda imagen referenciada exista.

## Accesibilidad

- Lightbox del portafolio: cierra con `Escape`, bloquea el scroll de fondo y devuelve el foco a la tarjeta de origen.
- Navegación por teclado en las tarjetas del portafolio (Enter/Espacio).
- Enlace "Saltar al contenido" y `aria-label` en controles iconográficos.
- FAQ con `<details>/<summary>` nativo.

## CI

GitHub Actions (`.github/workflows/ci.yml`) ejecuta lint, tests, typecheck y build en cada push/PR a `main`.

## Contacto

- **WhatsApp principal:** +57 314 681 1444
- **WhatsApp secundario:** +57 300 254 4368
- **Email:** nexostudio.arquitectura@gmail.com
- **Ubicación:** Medellín, Antioquia, Colombia

## Deploy

El sitio se despliega automáticamente en Vercel al hacer push a `main`.

URL: https://www.nexostudioarq.com
