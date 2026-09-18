import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig, whatsappLink, whatsappLinkSecondary } from "@/config/site";
import { SERVICES } from "@/data/landing";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="bg-dark-900 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center group mb-4">
              <div className="relative w-32 h-10 overflow-hidden">
                <Image
                  src="/images/brand/logo-nexo.png"
                  alt="Nexo Studio"
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </Link>
            <p className="text-sm text-white/58 leading-relaxed">
              Arquitectura residencial, interiorismo y remodelaciones integrales en Medellín y Antioquia.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Estudio</h4>
            <ul className="space-y-2.5">
              {siteConfig.nav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/58 hover:text-warm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Servicios</h4>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.title}>
                  <Link href={service.href} className="text-sm text-white/58 hover:text-warm transition-colors duration-200">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/remodelaciones" className="text-sm text-white/58 hover:text-warm transition-colors duration-200">
                  Remodelaciones integrales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/58 hover:text-warm transition-colors duration-200">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  {contact.phonePrimaryDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLinkSecondary()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/58 hover:text-warm transition-colors duration-200">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  {contact.phoneSecondaryDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-white/58 hover:text-warm transition-colors duration-200">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/58">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-7 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/42">© {year} Nexo Studio. Todos los derechos reservados.</p>
          <Link href="/#contacto" className="text-xs text-warm/80 hover:text-warm transition-colors">
            Iniciar un proyecto
          </Link>
        </div>
      </div>
    </footer>
  );
}
