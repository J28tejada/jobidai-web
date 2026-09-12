"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Barra de progreso de lectura anclada bajo la barra de navegación. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-gradient-to-r from-azure-500 via-violeta-400 to-azure-500"
    />
  );
}
