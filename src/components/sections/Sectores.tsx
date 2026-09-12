import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/types";

/**
 * Cada tarjeta contrapone cómo se maneja hoy el negocio con lo que se le
 * construye. Esa tensión es el argumento de venta: el visitante se reconoce
 * en la primera columna y ve la salida en la segunda.
 */
export function Sectores({ sectores }: { sectores: Dictionary["sectores"] }) {
  return (
    <Section id="sectores">
      <div className="container-page">
        <SectionHeading
          eyebrow={sectores.eyebrow}
          title={sectores.title}
          lede={sectores.lede}
        />

        <RevealGroup
          className="mt-14 grid gap-5 lg:grid-cols-2 xl:grid-cols-3"
          stagger={0.06}
          amount={0.1}
        >
          {sectores.items.map((sector) => (
            <RevealItem key={sector.id} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-7">
                {/* Reservar dos líneas iguala el arranque del texto siguiente
                    en toda la fila, aunque los nombres tengan largos distintos. */}
                <h3 className="text-xl leading-snug text-ink-50 sm:min-h-[2lh]">
                  {sector.nombre}
                </h3>

                <div className="mt-5">
                  <p className="font-mono text-2xs tracking-widest text-faint uppercase">
                    {sectores.hoyLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {sector.hoy}
                  </p>
                </div>

                <div className="mt-6 border-t border-hairline pt-5">
                  <p className="font-mono text-2xs tracking-widest text-azure-400 uppercase">
                    {sectores.construyoLabel}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {sector.construyo.map((punto) => (
                      <li key={punto} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-violeta-400"
                          aria-hidden
                        />
                        <span className="text-sm leading-snug text-ink-200">
                          {punto}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-auto flex items-start gap-2.5 pt-6 text-xs leading-relaxed text-faint">
                  <ArrowRight className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  {sector.entrada}
                </p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center gap-2.5 font-mono text-2xs text-faint">
            <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-faint" />
            {sectores.nota}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
