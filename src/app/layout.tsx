import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/logo-nexo-symbol.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Nexo Studio — Arquitectura, Remodelaciones e Interiores",
    description:
      "Diseño arquitectónico, remodelaciones, interiores, visualización 3D y gerencia de proyectos en Medellín.",
    type: "website",
    locale: "es_CO",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Nexo Studio",
  description:
    "Estudio de arquitectura, remodelaciones, diseño de interiores, visualización 3D y gerencia de proyectos en Medellín.",
  email: "nexostudio.arquitectura@gmail.com",
  telephone: "+57 314 681 1444",
  areaServed: ["Medellín", "Área Metropolitana", "Antioquia", "Colombia"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Medellín",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
