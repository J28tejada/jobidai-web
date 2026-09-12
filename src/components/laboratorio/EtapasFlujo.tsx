import { Check, CircleAlert, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export type EstadoEtapa = "pendiente" | "ok" | "detenido";

/**
 * Indicador de las cuatro etapas. Reutiliza el lenguaje visual del diagrama
 * del inicio para que se lea como el mismo sistema, no como otra página.
 */
export function EtapasFlujo({
  etiquetas,
  estados,
}: {
  etiquetas: string[];
  estados: EstadoEtapa[];
}) {
  return (
    <ol className="flex items-stretch gap-1.5" aria-label="Progreso del flujo">
      {etiquetas.map((etiqueta, i) => {
        const estado = estados[i] ?? "pendiente";
        return (
          <li key={etiqueta} className="flex min-w-0 flex-1 flex-col gap-2">
            <span
              className={cn(
                "h-0.5 w-full rounded-full transition-colors duration-500",
                estado === "ok" && "bg-azure-500",
                estado === "detenido" && "bg-alerta-600",
                estado === "pendiente" && "bg-ink-700",
              )}
            />
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full",
                  estado === "ok" && "bg-azure-600 text-white",
                  estado === "detenido" && "bg-alerta-500 text-ink-950",
                  estado === "pendiente" && "bg-ink-700 text-faint",
                )}
              >
                {estado === "ok" ? (
                  <Check className="size-2.5" strokeWidth={3} />
                ) : estado === "detenido" ? (
                  <CircleAlert className="size-2.5" strokeWidth={3} />
                ) : (
                  <Minus className="size-2.5" strokeWidth={3} />
                )}
              </span>
              <span
                className={cn(
                  "truncate font-mono text-2xs tracking-wide uppercase",
                  estado === "pendiente" ? "text-faint" : "text-ink-200",
                )}
              >
                {etiqueta}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
