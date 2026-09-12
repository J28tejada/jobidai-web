"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Tarjeta con foco de luz que sigue al cursor. El gradiente se mueve vía
 * variables de movimiento, así que no provoca renderizados de React ni
 * toca el layout: solo pinta.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "var(--color-azure-500)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const background = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, ${spotlightColor} 14%, transparent), transparent 72%)`;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-9999);
    mouseY.set(-9999);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "surface-card edge-light group/card relative overflow-hidden transition-colors duration-500 hover:border-hairline-strong",
        className,
      )}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      />
      {/* El envoltorio hereda el layout en columna y la altura completa: sin
          esto, el contexto flex de la tarjeta se perdía aquí y cualquier
          mt-auto de un hijo (el pie de la tarjeta) dejaba de empujar. */}
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}
