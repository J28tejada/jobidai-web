import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

export function Work({
  work,
  locale,
}: {
  work: Dictionary["work"];
  locale: Locale;
}) {
  return (
    <Section id="trabajo">
      <div className="container-page">
        <SectionHeading
          eyebrow={work.eyebrow}
          title={work.title}
          lede={work.lede}
        />

        <div className="mt-14 flex flex-col gap-5">
          {work.items.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.05} amount={0.15}>
              <SpotlightCard className="p-7 sm:p-9">
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
                  {/* Identidad del caso */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-ember-500/25 bg-ember-500/8 px-3 py-1 font-mono text-2xs tracking-widest text-ember-300 uppercase">
                        {item.kind}
                      </span>
                      <span className="font-mono text-2xs text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-5 text-3xl text-ink-50">{item.name}</h3>
                    <p className="mt-3 text-base text-muted">{item.summary}</p>

                    {/* Métricas */}
                    <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-hairline pt-6">
                      {item.metrics.map((metric) => (
                        <div key={metric.label} className="flex flex-col gap-1">
                          <dt className="sr-only">{metric.label}</dt>
                          <dd className="font-display text-xl leading-none text-ember-400 tabular-nums">
                            {metric.value}
                          </dd>
                          <dd className="text-2xs leading-snug text-faint">
                            {metric.label}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-md border border-hairline bg-ink-900/60 px-2.5 py-1 font-mono text-2xs text-ink-300"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Problema y solución: el razonamiento, que es lo que se vende */}
                  <div className="flex flex-col gap-6 lg:border-l lg:border-hairline lg:pl-12">
                    <div>
                      <h4 className="font-mono text-2xs tracking-widest text-faint uppercase">
                        {locale === "es" ? "El problema" : "The problem"}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-ink-200">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-mono text-2xs tracking-widest text-ember-400 uppercase">
                        {locale === "es" ? "La solución" : "The solution"}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-ink-200">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center gap-2.5 font-mono text-2xs text-faint">
            <span
              aria-hidden
              className="inline-block h-1 w-1 rounded-full bg-faint"
            />
            {work.disclaimer}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
