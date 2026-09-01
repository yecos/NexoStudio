import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFAB } from "@/components/layout/whatsapp-fab";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { CaseStudies } from "@/components/sections/case-studies";
import { About } from "@/components/sections/about";
import { Tools } from "@/components/sections/tools";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

/**
 * Landing page de Nexo Studio.
 * Server Component: compone secciones estáticas (server) e islas
 * interactivas (client: navbar, portafolio, contacto, FABs).
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-dark-900">
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <Portfolio />
      <CaseStudies />
      <About />
      <Tools />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFAB />
      <ScrollToTop />
    </main>
  );
}
