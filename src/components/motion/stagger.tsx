"use client";

import { motion } from "framer-motion";
import { staggerItem } from "./variants";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Contenedor que anima sus hijos en cascada cuando entra al viewport.
 * Los hijos deben ser StaggerItem / StaggerArticle para heredar la animación.
 */
export function Stagger({ children, className = "" }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

/** Ítem animado (div) dentro de un Stagger. */
export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

/** Ítem animado (article) dentro de un Stagger — conserva semántica de artículo. */
export function StaggerArticle({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.article variants={staggerItem} className={className}>
      {children}
    </motion.article>
  );
}
