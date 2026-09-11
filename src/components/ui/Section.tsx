import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Envoltorio de sección. Centraliza el ritmo vertical del sitio en un solo
 * sitio y alterna un tinte de superficie para que el recorrido tenga
 * estructura visible en lugar de largos tramos de negro vacío.
 */
export function Section({
  id,
  children,
  tinted = false,
  className,
}: {
  id?: string;
  children: ReactNode;
  tinted?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate py-20 sm:py-28",
        tinted && "border-y border-hairline bg-ink-900/50",
        className,
      )}
    >
      {children}
    </section>
  );
}
