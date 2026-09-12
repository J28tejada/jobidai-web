import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/types";

export function Stack({ stack }: { stack: Dictionary["stack"] }) {
  const allTech = stack.groups.flatMap((group) => group.items);

  return (
    <Section tinted className="overflow-hidden">
      <div className="container-page">
        <SectionHeading
          eyebrow={stack.eyebrow}
          title={stack.title}
          lede={stack.lede}
          align="center"
        />
      </div>

      {/* Cinta de tecnologías: movimiento continuo, se detiene al pasar el cursor */}
      <div className="mt-14">
        <Marquee duration="45s">
          {allTech.map((tech) => (
            <span
              key={tech}
              className="mx-3 inline-flex items-center rounded-full border border-hairline bg-ink-900/60 px-5 py-2.5 font-mono text-sm whitespace-nowrap text-ink-200"
            >
              {tech}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-page mt-14">
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stack.groups.map((group) => (
            <RevealItem key={group.name}>
              <div className="surface-card edge-light h-full p-6">
                <h3 className="font-mono text-2xs tracking-widest text-azure-400 uppercase">
                  {group.name}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-ink-200"
                    >
                      <span
                        aria-hidden
                        className="inline-block h-1 w-1 shrink-0 rounded-full bg-azure-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
