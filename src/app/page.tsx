import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFAB } from "@/components/layout/whatsapp-fab";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Services } from "@/components/sections/services";
import { ProcessSection } from "@/components/sections/process-section";
import { About } from "@/components/sections/about";
import { Tools } from "@/components/sections/tools";
import { MapSection } from "@/components/sections/map-section";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-dark-900">
      <Navbar />
      <Hero />
      <TrustBar />
      <FeaturedProjects />
      <Services />
      <ProcessSection />
      <About />
      <Tools />
      <MapSection />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFAB />
      <ScrollToTop />
    </main>
  );
}
