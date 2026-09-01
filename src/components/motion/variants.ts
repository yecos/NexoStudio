import type { Variants } from "framer-motion";

/** Curva de easing suave compartida por todas las animaciones del sitio. */
export const smoothEase = [0.25, 0.4, 0.25, 1] as const;

/** Variante de ítem para contenedores con stagger. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
};
