import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/motion/section-header";
import { SERVICES } from "@/data/landing";
import { whatsappLink } from "@/config/site";

/** Grilla de servicios; cada tarjeta abre WhatsApp con contexto del servicio. */
export function Services() {
  return (
    <section id="servicios" className="py-14 sm:py-20 lg:py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Servicios"
          title="Lo que"
          highlight="hacemos"
          description="Un servicio integral para aterrizar ideas, diseñar con criterio y coordinar proyectos con orden."
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <a
                href={whatsappLink(`Hola Nexo Studio, quiero información sobre ${service.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-full min-h-[260px] overflow-hidden bg-dark-900/65 border border-white/6 rounded-2xl hover:border-warm/30 transition-all duration-500 hover:shadow-lg hover:shadow-warm/6"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-14 group-hover:opacity-28 group-hover:scale-105 transition-all duration-700"
                  quality={75}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-900/82 to-dark-900/55" />
                <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-warm/12 flex items-center justify-center mb-5 group-hover:bg-warm/20 group-hover:scale-105 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-warm" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-warm transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-warm">
                    <span className="text-sm font-medium">Cotizar este servicio</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
