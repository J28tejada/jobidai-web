import { Check, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/types";

export function Pricing({ pricing }: { pricing: Dictionary["pricing"] }) {
  return (
    <Section id="precios" tinted>
      <div className="container-page">
        <SectionHeading
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          lede={pricing.lede}
          align="center"
        />

        <RevealGroup
          className="mt-14 grid items-start gap-5 lg:grid-cols-3"
          stagger={0.09}
        >
          {pricing.plans.map((plan) => (
            <RevealItem key={plan.id} className="h-full">
              <div
                className={cn(
                  "relative h-full",
                  plan.featured && "lg:-mt-4 lg:mb-4",
                )}
              >
                {/* Resplandor del plan destacado */}
                {plan.featured ? (
                  <div
                    aria-hidden
                    className="absolute -inset-px -z-10 rounded-[calc(var(--radius-xl)+1px)] bg-gradient-to-b from-ember-500/50 to-ember-500/0"
                  />
                ) : null}

                <SpotlightCard
                  className={cn(
                    "flex h-full flex-col p-7 sm:p-8",
                    plan.featured && "bg-ink-800/90",
                  )}
                >
                  {plan.featured ? (
                    <span className="absolute top-0 right-7 -translate-y-1/2 rounded-full bg-ember-500 px-3 py-1 font-mono text-2xs tracking-widest text-ink-950 uppercase">
                      {pricing.popular}
                    </span>
                  ) : null}

                  <h3 className="text-xl text-ink-50">{plan.name}</h3>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-mono text-2xs tracking-widest text-faint uppercase">
                      {plan.priceNote}
                    </span>
                    <span className="font-display text-4xl leading-none text-ink-50 tabular-nums">
                      {plan.price}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    {plan.description}
                  </p>

                  <ul className="mt-7 flex flex-col gap-3 border-t border-hairline pt-7">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            plan.featured ? "text-ember-400" : "text-ember-500",
                          )}
                          aria-hidden
                        />
                        <span className="text-sm text-ink-200">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <ButtonLink
                      href="#contacto"
                      variant={plan.featured ? "primary" : "secondary"}
                      size="md"
                      className="w-full"
                    >
                      {plan.cta}
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </ButtonLink>
                  </div>
                </SpotlightCard>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-faint">
            {pricing.note}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
