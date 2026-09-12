import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/types";

/**
 * Los dolores van antes que los servicios a propósito: el visitante tiene que
 * reconocerse en un problema antes de que le importe la solución.
 */
export function Dolores({ dolores }: { dolores: Dictionary["dolores"] }) {
  return (
    <Section tinted>
      <div className="container-page">
        <SectionHeading
          eyebrow={dolores.eyebrow}
          title={dolores.title}
          lede={dolores.lede}
        />

        <RevealGroup
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {dolores.items.map((item) => (
            <RevealItem key={item.id} className="h-full">
              <SpotlightCard
                className="flex h-full flex-col p-7"
                spotlightColor="var(--color-violeta-500)"
              >
                <h3 className="text-xl leading-snug text-ink-50 sm:min-h-[2lh]">
                  {item.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.descripcion}
                </p>

                {/* El dato de mercado ancla el dolor en algo verificable */}
                {item.dato ? (
                  <div className="mt-auto flex items-baseline gap-3 border-t border-hairline pt-5">
                    <span className="font-display text-2xl leading-none text-azure-400 tabular-nums">
                      {item.dato}
                    </span>
                    <span className="text-xs leading-snug text-faint">
                      {item.fuente}
                    </span>
                  </div>
                ) : null}
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
