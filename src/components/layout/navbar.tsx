"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { siteConfig, whatsappLink } from "@/config/site";
import { useScrolled } from "@/hooks/use-scrolled";

/** Barra de navegación fija con menú móvil (Sheet). */
export function Navbar() {
  const scrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark-900/92 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/30"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#inicio" className="flex items-center group" aria-label="Nexo Studio inicio">
            <div className="relative w-32 sm:w-40 h-10 sm:h-12 overflow-hidden">
              <Image
                src="/images/brand/logo-nexo.png"
                alt="Nexo Studio"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                priority
                sizes="160px"
              />
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/75 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-warm group-hover:w-6 transition-all duration-300" />
              </a>
            ))}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="ml-4">
              <Button
                variant="outline"
                size="sm"
                className="border-warm/50 text-warm hover:bg-warm hover:text-dark-900 transition-all duration-300 rounded-full px-5"
              >
                Cotizar proyecto
              </Button>
            </a>
          </div>

          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="Abrir menú">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-dark-900/98 backdrop-blur-xl border-white/5 w-[285px]">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col gap-2 mt-12">
                  {siteConfig.nav.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-white/82 hover:text-warm hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      <span className="w-1 h-6 bg-warm/40 rounded-full" />
                      {link.label}
                    </motion.a>
                  ))}
                  <div className="mt-6 px-4">
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                      <Button className="w-full bg-warm text-dark-900 hover:bg-warm-light rounded-full font-semibold">
                        Cotizar por WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
