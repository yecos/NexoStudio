"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { smoothEase } from "./variants";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

/**
 * Envuelve contenido y lo revela con fade + desplazamiento
 * cuando entra al viewport. El contenido puede renderizarse
 * desde Server Components (se pasa como children).
 */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const directionMap = {
    up: { y: 28 },
    down: { y: -28 },
    left: { x: 28 },
    right: { x: -28 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: smoothEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
