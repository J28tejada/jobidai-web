import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cinta infinita. Duplica el contenido y desplaza un 50%, de modo que el
 * bucle es imperceptible. Se detiene al pasar el cursor y queda estática
 * si el usuario pide menos movimiento.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  duration = "40s",
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  duration?: string;
}) {
  return (
    <div className={cn("mask-fade-x group flex overflow-hidden", className)}>
      <div
        className="flex w-max shrink-0 motion-safe:animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
