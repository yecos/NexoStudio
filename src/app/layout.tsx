
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/config/site";
import { structuredData } from "@/data/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
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
    url: siteConfig.url,
    siteName: "Nexo Studio",
    type: "website",
    locale: "es_CO",
    // og:image la genera src/app/opengraph-image.tsx (1200x630 exacto)
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexo Studio — Arquitectura, Remodelaciones e Interiores",
    description:
      "Arquitectura, remodelaciones, interiores, visualización 3D y gerencia de proyectos en Medellín.",
    // twitter:image la genera src/app/opengraph-image.tsx
  },
};

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
