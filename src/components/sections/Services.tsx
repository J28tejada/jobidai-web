import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/types";

export function Services({ services }: { services: Dictionary["services"] }) {
  return (
    <Section id="servicios">
      <div className="container-page">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          lede={services.lede}
        />

        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3" stagger={0.1}>
          {services.items.map((service) => (
            <RevealItem key={service.id} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-7 sm:p-8">
                {/* Índice y nombre */}
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-2xs tracking-widest text-ember-500">
                    {service.index}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-gradient-to-r from-hairline-strong to-transparent"
                  />
                </div>

                <h3 className="mt-5 text-2xl text-ink-50 lg:min-h-[2lh]">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-ember-400 lg:min-h-[2lh]">
                  {service.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-ember-500"
                        aria-hidden
                      />
                      <span className="text-sm text-ink-200">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto border-t border-hairline pt-5 font-mono text-2xs tracking-wide text-faint">
                  {service.deliverable}
                </p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
