"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve true cuando el scroll vertical supera el umbral indicado.
 * Deduplica la lógica de Navbar, WhatsAppFAB y ScrollToTop.
 */
export function useScrolled(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
