import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/motion/section-header";
import { SERVICES } from "@/data/landing";

export function Services() {
  return (
    <section id="servicios" className="py-14 sm:py-20 lg:py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Estudio"
          title="Una mirada"
          highlight="integral"
          description="Arquitectura, interiorismo y ejecución pensados como partes de una misma experiencia."
        />

        <Stagger className="grid lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <Link
                href={service.href}
                className="group relative block h-full min-h-[330px] overflow-hidden bg-dark-900/65 border border-white/6 rounded-2xl hover:border-warm/30 transition-all duration-500 hover:shadow-lg hover:shadow-warm/6"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-20 group-hover:opacity-32 group-hover:scale-105 transition-all duration-700"
                  quality={80}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-900/82 to-dark-900/55" />
                <div className="relative z-10 h-full p-7 sm:p-8 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-warm/12 flex items-center justify-center mb-6 group-hover:bg-warm/20 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-warm" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-warm transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-8 flex items-center gap-2 text-warm">
                    <span className="text-sm font-medium">{service.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
