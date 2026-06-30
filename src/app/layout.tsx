
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nexostudioarq.com";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Nexo Studio — Arquitectura, Remodelaciones e Interiores | Medellín",
  description:
    "Nexo Studio diseña, remodela y gestiona espacios residenciales y comerciales en Medellín: arquitectura, interiores, visualización 3D y gerencia de proyectos.",
  keywords: [
    "arquitectura Medellín",
    "remodelaciones Medellín",
    "diseño de interiores",
    "diseño arquitectónico",
    "visualización 3D",
    "renders arquitectónicos",
    "gerencia de proyectos",
    "factibilidad inmobiliaria",
    "Nexo Studio",
  ],
  authors: [{ name: "Nexo Studio" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/images/brand/logo-nexo-symbol.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nexo Studio — Arquitectura, Remodelaciones e Interiores",
    description:
      "Diseño arquitectónico, remodelaciones, interiores, visualización 3D y gerencia de proyectos en Medellín.",
    url: SITE_URL,
    siteName: "Nexo Studio",
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: "/images/hero/hero-arch.jpg",
        width: 1200,
        height: 630,
        alt: "Nexo Studio arquitectura, remodelaciones e interiores en Medellín",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexo Studio — Arquitectura, Remodelaciones e Interiores",
    description:
      "Arquitectura, remodelaciones, interiores, visualización 3D y gerencia de proyectos en Medellín.",
    images: ["/images/hero/hero-arch.jpg"],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nexo Studio",
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/logo-nexo-symbol.png`,
    image: `${SITE_URL}/images/hero/hero-arch.jpg`,
    description:
      "Estudio de arquitectura, remodelaciones, diseño de interiores, visualización 3D y gerencia de proyectos en Medellín.",
    email: "nexostudio.arquitectura@gmail.com",
    telephone: "+57 314 681 1444",
    areaServed: ["Medellín", "Área Metropolitana", "Antioquia", "Colombia"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    knowsAbout: [
      "Arquitectura",
      "Remodelaciones",
      "Diseño de interiores",
      "Visualización 3D",
      "Gerencia de proyectos",
      "Factibilidad inmobiliaria",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+57 314 681 1444",
      availableLanguage: ["es"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nexo Studio",
    url: SITE_URL,
    inLanguage: "es-CO",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto cuesta iniciar un proyecto de arquitectura o remodelación?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Depende del alcance, el área, el estado actual del espacio y el nivel de detalle requerido. Nexo Studio inicia entendiendo ubicación, metros aproximados, presupuesto objetivo y etapa del proyecto.",
        },
      },
      {
        "@type": "Question",
        name: "¿Trabajan proyectos fuera de Medellín?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Nexo Studio atiende Medellín, Área Metropolitana, Oriente antioqueño y otros lugares de Colombia cuando el alcance permite coordinar diseño, visualización o acompañamiento técnico.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo contratar sólo renders o visualización 3D?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. La visualización 3D puede contratarse como servicio independiente para validar diseños, vender una idea, presentar una propuesta o tomar decisiones antes de construir.",
        },
      },
      {
        "@type": "Question",
        name: "¿También acompañan la ejecución de obra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Según el proyecto, Nexo Studio puede apoyar coordinación técnica, proveedores, presupuesto, control de decisiones y seguimiento para que el diseño llegue mejor a obra.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#c8956c] focus:px-4 focus:py-2 focus:text-[#0a0a0a] focus:shadow-lg"
        >
          Saltar al contenido
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
