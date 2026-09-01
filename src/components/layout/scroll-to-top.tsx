"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useScrolled } from "@/hooks/use-scrolled";

/** Botón flotante para volver arriba visible tras hacer scroll. */
export function ScrollToTop() {
  const visible = useScrolled(620);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-5 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-dark-700/84 backdrop-blur-sm border border-white/12 flex items-center justify-center text-white/70 hover:text-warm hover:border-warm/35 transition-all duration-300"
          aria-label="Volver arriba"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
