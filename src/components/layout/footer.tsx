import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig, whatsappLink, whatsappLinkSecondary } from "@/config/site";
import { SERVICES } from "@/data/landing";

/** Pie de página con navegación, servicios y contacto. */
export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="bg-dark-900 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#inicio" className="flex items-center group mb-4">
              <div className="relative w-32 h-10 overflow-hidden">
                <Image src="/images/brand/logo-nexo.png" alt="Nexo Studio" fill className="object-contain" sizes="128px" />
              </div>
            </a>
            <p className="text-sm text-white/60 leading-relaxed">
              Arquitectura + Diseño para espacios residenciales, comerciales y remodelaciones en Medellín.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Navegación</h4>
            <ul className="space-y-2.5">
              {siteConfig.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-warm transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Servicios</h4>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <a href="#servicios" className="text-sm text-white/60 hover:text-warm transition-colors duration-200">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-warm transition-colors duration-200">
                  <Phone className="w-3.5 h-3.5 shrink-0" />{contact.phonePrimaryDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLinkSecondary()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-warm transition-colors duration-200">
                  <Phone className="w-3.5 h-3.5 shrink-0" />{contact.phoneSecondaryDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-warm transition-colors duration-200">
                  <Mail className="w-3.5 h-3.5 shrink-0" />{contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-3.5 h-3.5 shrink-0" />{contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-7 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">© {year} Nexo Studio. Todos los derechos reservados.</p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-xs text-warm/80 hover:text-warm transition-colors">
            Cotizar proyecto por WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
