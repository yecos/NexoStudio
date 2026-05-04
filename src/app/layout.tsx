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
  title: "Nexo Studio — Arquitectura + Diseño | Medellín, Colombia",
  description:
    "Nexo Studio es una empresa de arquitectura y construcción ubicada en Medellín. Nos especializamos en ofrecer soluciones innovadoras para obras nuevas y remodelaciones, con un enfoque en la calidad y el diseño en cada proyecto que emprendemos.",
  keywords: [
    "arquitectura",
    "diseño",
    "Medellín",
    "Colombia",
    "construcción",
    "remodelación",
    "diseño de interiores",
    "gerencia de proyectos",
    "factibilidad inmobiliaria",
    "Nexo Studio",
  ],
  authors: [{ name: "Nexo Studio" }],
  icons: {
    icon: "/logo-nexo.png",
  },
  openGraph: {
    title: "Nexo Studio — Arquitectura + Diseño",
    description:
      "Soluciones innovadoras para obras nuevas y remodelaciones en Medellín",
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
