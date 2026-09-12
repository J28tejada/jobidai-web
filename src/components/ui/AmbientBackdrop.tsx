import { cn } from "@/lib/utils";

/**
 * Atmósfera de fondo: retícula técnica desvanecida + dos halos cálidos que
 * derivan lentamente. Puramente decorativo, oculto a lectores de pantalla y
 * sin coste de JavaScript.
 */
export function AmbientBackdrop({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "section";
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Retícula blueprint, desvanecida hacia los bordes */}
      <div
        className="grid-blueprint absolute inset-0 opacity-60"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%)",
        }}
      />

      {/* Halo principal azul */}
      <div
        className={cn(
          "absolute rounded-full blur-[110px] will-change-transform motion-safe:animate-drift",
          variant === "hero"
            ? "-top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 opacity-25"
            : "-top-32 right-0 h-[26rem] w-[26rem] opacity-12",
        )}
        style={{
          background:
            "radial-gradient(circle, var(--color-azure-500) 0%, transparent 68%)",
        }}
      />

      {/* Halo secundario morado: los dos colores de marca se mezclan en el fondo */}
      <div
        className={cn(
          "absolute rounded-full blur-[130px] will-change-transform motion-safe:animate-drift",
          variant === "hero"
            ? "top-24 -left-32 h-[34rem] w-[34rem] opacity-20"
            : "-bottom-40 -left-24 h-[24rem] w-[24rem] opacity-8",
        )}
        style={{
          background:
            "radial-gradient(circle, var(--color-violeta-500) 0%, transparent 70%)",
          animationDelay: "-6s",
        }}
      />
    </div>
  );
}
