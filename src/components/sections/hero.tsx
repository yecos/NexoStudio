"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/config/site";

/** Sección de apertura con imagen a pantalla completa y llamados a la acción. */
export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-arch.jpg"
          alt="Arquitectura biofílica Nexo Studio"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/48 to-dark-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/40" />
      </div>

      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-warm/45 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-warm/45 to-transparent hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm/35 bg-warm/12 mb-7">
            <span className="w-2 h-2 rounded-full bg-warm animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-warm tracking-wider uppercase">
              Arquitectura + Diseño · Medellín
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.38 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
        >
          Diseñamos espacios
          <span className="block text-warm">con intención</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.58 }}
          className="mt-6 sm:mt-7 text-lg sm:text-xl md:text-2xl text-white/86 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]"
        >
          Diseñamos, remodelamos y gestionamos espacios residenciales y comerciales en Medellín.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.78 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-white/70"
        >
          {["Diseño arquitectónico", "Remodelaciones", "Interiores", "Gerencia de obra"].map((item) => (
            <span key={item} className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 backdrop-blur-sm">
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.95 }}
          className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#portafolio">
            <Button size="lg" className="bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-full px-8 h-12 text-base transition-all duration-300 shadow-lg shadow-warm/25 hover:shadow-warm/40">
              Ver proyectos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="border-white/25 text-white hover:bg-white/12 hover:border-white/45 rounded-full px-8 h-12 text-base transition-all duration-300">
              Cotizar por WhatsApp
              <MessageCircle className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="mt-5 text-sm text-white/60"
        >
          De la idea a la visualización, y de la visualización a la obra.
        </motion.p>
      </div>
    </section>
  );
}
