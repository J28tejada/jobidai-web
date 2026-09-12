import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/types";

export function Why({ why }: { why: Dictionary["why"] }) {
  return (
    <Section>
      <div className="container-page">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} lede={why.lede} />

        <RevealGroup
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {why.items.map((item, index) => (
            <RevealItem key={item.title} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-7">
                <span
                  aria-hidden
                  className="font-mono text-2xs tracking-widest text-azure-400"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl text-ink-50 sm:min-h-[2lh]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
