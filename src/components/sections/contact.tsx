"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeader } from "@/components/motion/section-header";
import { PROJECT_TYPES, BUDGET_RANGES, TIMELINES } from "@/data/landing";
import { whatsappLink, siteConfig } from "@/config/site";

interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  area: string;
  budget: string;
  timeline: string;
  message: string;
}

const INITIAL_FORM_STATE: ContactFormState = {
  name: "",
  phone: "",
  email: "",
  projectType: PROJECT_TYPES[0],
  location: "",
  area: "",
  budget: BUDGET_RANGES[0],
  timeline: TIMELINES[0],
  message: "",
};

/** Construye el mensaje de WhatsApp a partir del estado del formulario. */
function buildWhatsAppMessage(form: ContactFormState): string {
  return [
    "Hola Nexo Studio, quiero cotizar un proyecto.",
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
    `Email: ${form.email}`,
    `Tipo de proyecto: ${form.projectType}`,
    `Ubicación: ${form.location}`,
    `Área aproximada: ${form.area}`,
    `Presupuesto: ${form.budget}`,
    `Tiempo para iniciar: ${form.timeline}`,
    `Contexto: ${form.message}`,
  ].join("\n");
}

/** Formulario de pre-cotización que abre WhatsApp con la información estructurada. */
export function Contact() {
  const [formState, setFormState] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const { contact } = siteConfig;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Intenta abrir WhatsApp — no limpia el formulario si el popup fue bloqueado
    const popup = window.open(whatsappLink(buildWhatsAppMessage(formState)), "_blank", "noopener,noreferrer");

    if (popup) {
      // El popup abrió correctamente — limpia el formulario
      setTimeout(() => setSubmitted(false), 3000);
      setFormState(INITIAL_FORM_STATE);
      setPopupBlocked(false);
    } else {
      // Popup bloqueado — conserva los datos y muestra enlace de respaldo
      setSubmitted(false);
      setPopupBlocked(true);
    }
  };

  const selectClassName =
    "w-full bg-dark-700/55 border border-white/12 text-white focus:border-warm/55 h-11 rounded-xl px-3 text-sm outline-none transition-colors";
  const selectStyle = { colorScheme: "dark" as const };

  return (
    <section id="contacto" className="py-14 sm:py-20 lg:py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contacto"
          title="Hablemos de tu"
          highlight="proyecto"
          description="Cuéntanos qué quieres diseñar, remodelar o visualizar. Te responderemos por WhatsApp para avanzar rápido."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <FadeIn direction="left" className="relative min-h-[420px]">
            <div className="relative h-full min-h-[420px] rounded-2xl overflow-hidden">
              <Image src="/images/services/villa-luxury.jpg" alt="Proyecto residencial Nexo Studio" fill className="object-cover" quality={90} sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/78 via-dark-900/15 to-transparent" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 bg-dark-900/84 backdrop-blur-md rounded-xl border border-white/10 p-5 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/82 hover:text-warm transition-colors duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-green-500/12 flex items-center justify-center group-hover:bg-green-500/22 transition-colors duration-200">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">WhatsApp</div>
                    <div className="text-sm font-medium">{contact.phonePrimaryDisplay} / {contact.phoneSecondaryDisplay}</div>
                  </div>
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/82 hover:text-warm transition-colors duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-warm/12 flex items-center justify-center group-hover:bg-warm/22 transition-colors duration-200">
                    <Mail className="w-5 h-5 text-warm" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Email</div>
                    <div className="text-sm font-medium break-all">{contact.email}</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-white/82">
                  <div className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-warm/75" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Ubicación</div>
                    <div className="text-sm font-medium">{contact.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="h-full bg-dark-900/55 border border-white/6 rounded-2xl p-6 sm:p-8 lg:p-9">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Pre-cotiza por WhatsApp</h3>
              <p className="text-white/60 text-sm mb-6 sm:mb-7">
                Este formulario arma un mensaje completo para entender alcance, ubicación, etapa y presupuesto antes de conversar.
              </p>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/12 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">WhatsApp abierto</h4>
                  <p className="text-white/52 text-sm">Revisa la ventana de WhatsApp para enviar el mensaje.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/65 mb-1.5">Nombre</label>
                      <Input id="name" type="text" placeholder="Tu nombre" value={formState.name} onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))} required className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/50 focus:border-warm/55 h-11 rounded-xl" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/65 mb-1.5">Teléfono</label>
                      <Input id="phone" type="tel" placeholder="Tu WhatsApp" value={formState.phone} onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))} required className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/50 focus:border-warm/55 h-11 rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/65 mb-1.5">Email</label>
                    <Input id="email" type="email" placeholder="tu@email.com" value={formState.email} onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))} className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/50 focus:border-warm/55 h-11 rounded-xl" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-white/65 mb-1.5">Tipo de proyecto</label>
                      <select id="projectType" style={selectStyle} value={formState.projectType} onChange={(e) => setFormState((s) => ({ ...s, projectType: e.target.value }))} className={selectClassName}>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-white/65 mb-1.5">Ubicación</label>
                      <Input id="location" type="text" placeholder="Ciudad o sector" value={formState.location} onChange={(e) => setFormState((s) => ({ ...s, location: e.target.value }))} required className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/50 focus:border-warm/55 h-11 rounded-xl" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-white/65 mb-1.5">Área aprox.</label>
                      <Input id="area" type="text" placeholder="Ej: 80 m²" value={formState.area} onChange={(e) => setFormState((s) => ({ ...s, area: e.target.value }))} className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/50 focus:border-warm/55 h-11 rounded-xl" />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-white/65 mb-1.5">Presupuesto</label>
                      <select id="budget" style={selectStyle} value={formState.budget} onChange={(e) => setFormState((s) => ({ ...s, budget: e.target.value }))} className={selectClassName}>
                        {BUDGET_RANGES.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-white/65 mb-1.5">Etapa</label>
                      <select id="timeline" style={selectStyle} value={formState.timeline} onChange={(e) => setFormState((s) => ({ ...s, timeline: e.target.value }))} className={selectClassName}>
                        {TIMELINES.map((timeline) => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/65 mb-1.5">Contexto</label>
                    <Textarea id="message" placeholder="Cuéntanos qué quieres transformar, diseñar o visualizar..." rows={4} value={formState.message} onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))} required className="bg-dark-700/55 border-white/12 text-white placeholder:text-white/50 focus:border-warm/55 rounded-xl resize-none" />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-xl h-12 text-base transition-all duration-300 shadow-lg shadow-warm/20 hover:shadow-warm/30">
                    Abrir WhatsApp
                    <Send className="w-4 h-4 ml-2" />
                  </Button>

                  {popupBlocked && (
                    <div className="mt-3 p-4 rounded-xl bg-warm/12 border border-warm/30 text-sm">
                      <p className="text-white font-medium mb-2">Tu navegador bloqueó la ventana emergente.</p>
                      <p className="text-white/70 mb-3">Toca para abrir WhatsApp directamente:</p>
                      <a
                        href={whatsappLink(buildWhatsAppMessage(formState))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-warm hover:bg-warm-light text-dark-900 font-semibold rounded-full px-5 py-2.5 text-sm transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Abrir WhatsApp
                      </a>
                    </div>
                  )}
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
