import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Iniciar un Proyecto | Nexo Studio",
  description:
    "Cuéntanos sobre tu proyecto de arquitectura, interiorismo o remodelación. Comparte ubicación, área, inversión estimada y momento de inicio.",
  alternates: { canonical: "/iniciar-proyecto" },
};

export default function StartProjectPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="pt-20 sm:pt-24">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
