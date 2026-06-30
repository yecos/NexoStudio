# Nexo Studio — Website

Sitio web de Nexo Studio, estudio de arquitectura, remodelaciones, diseño de interiores, visualización 3D y gerencia de proyectos en Medellín, Colombia.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript 5
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion
- **UI:** shadcn/ui (6 componentes) + Lucide icons
- **Deploy:** Vercel

## Desarrollo

```bash
bun install
bun run dev
```

Abre http://localhost:3000

## Scripts

- `bun run dev` — Servidor de desarrollo
- `bun run build` — Build de producción
- `bun run start` — Servidor de producción
- `bun run lint` — ESLint

## Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | URL canónica del sitio | `https://www.nexostudioarq.com` |

Crea un archivo `.env.local` para desarrollo local:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx          # Layout raíz + metadata + JSON-LD
│   ├── page.tsx            # Landing page (single-page)
│   ├── not-found.tsx       # 404 custom
│   ├── manifest.ts         # PWA manifest
│   ├── robots.ts           # robots.txt
│   ├── sitemap.ts          # sitemap.xml
│   └── globals.css         # Estilos globales + tema
├── components/
│   └── ui/                 # shadcn/ui (button, input, sheet, textarea, toast, toaster)
├── hooks/
│   └── use-toast.ts
└── lib/
    └── utils.ts            # cn() helper
```

## Contenido

Todo el contenido (servicios, portafolio, casos, equipo, FAQ) está en `src/app/page.tsx` como constantes al inicio del archivo.

## Contacto

- **WhatsApp principal:** +57 314 681 1444
- **WhatsApp secundario:** +57 300 254 4368
- **Email:** nexostudio.arquitectura@gmail.com
- **Ubicación:** Medellín, Antioquia, Colombia

## Deploy

El sitio se despliega automáticamente en Vercel al hacer push a `main`.

URL: https://www.nexostudioarq.com
