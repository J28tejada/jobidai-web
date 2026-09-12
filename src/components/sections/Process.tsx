"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/types";

export function Process({ process }: { process: Dictionary["process"] }) {
  const containerRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();

  // La línea vertical se rellena conforme avanza el scroll por los pasos:
  // el visitante ve literalmente cómo progresa el proceso.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <Section id="proceso" tinted>
      {/* Franja de separación con retícula tenue */}
      <div
        aria-hidden
        className="grid-blueprint pointer-events-none absolute inset-0 opacity-30"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        }}
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={process.title}
          lede={process.lede}
        />

        <ol ref={containerRef} className="relative mt-16 flex flex-col gap-12">
          {/* Raíl y relleno animado */}
          {/* El raíl se disuelve al final en lugar de cortarse en seco bajo
              el último paso, que leía como un error de maquetación. */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.4375rem] w-px bg-hairline sm:left-[2.1875rem]"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
            }}
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-azure-500 via-azure-500 to-azure-700"
              style={{ scaleY: reduceMotion ? 1 : scaleY }}
            />
          </div>

          {process.steps.map((step, index) => (
            <li key={step.number} className="relative">
              <Reveal delay={index * 0.06} amount={0.4}>
                <div className="flex gap-6 sm:gap-8">
                  {/* Marcador numerado */}
                  <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-hairline-strong bg-ink-900 sm:size-18">
                    <span className="font-mono text-sm text-azure-400 sm:text-lg">
                      {step.number}
                    </span>
                  </div>

                  <div className="flex-1 pt-1 sm:pt-4">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="text-2xl text-ink-50">{step.name}</h3>
                      <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-2xs tracking-wide text-faint">
                        {step.duration}
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
