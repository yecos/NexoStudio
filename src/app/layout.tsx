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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
