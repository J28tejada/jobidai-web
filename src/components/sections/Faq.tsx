import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/types";

export function Faq({ faq }: { faq: Dictionary["faq"] }) {
  return (
    <Section id="faq">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow={faq.eyebrow}
            title={faq.title}
            lede={faq.lede}
            className="lg:sticky lg:top-28 lg:self-start"
          />

          {/* <details> nativo: accesible por teclado y funcional sin JavaScript.
              La animación de apertura usa ::details-content donde el navegador
              lo soporta y degrada a apertura instantánea donde no. */}
          <div className="flex flex-col">
            {faq.items.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.04} amount={0.3}>
                <details className="faq-item group border-b border-hairline">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left">
                    <h3 className="text-lg leading-snug font-medium text-ink-50 transition-colors duration-200 group-hover:text-azure-300">
                      {item.question}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-hairline text-faint transition-all duration-300 group-hover:border-azure-500/40 group-hover:text-azure-400 group-open:rotate-45 group-open:border-azure-500/40 group-open:text-azure-400"
                    >
                      <Plus className="size-4" />
                    </span>
                  </summary>
                  <div className="pb-6">
                    <p className="max-w-2xl text-base leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
