"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AmbientBackdrop } from "@/components/ui/AmbientBackdrop";
import { SystemDiagram } from "@/components/ui/SystemDiagram";
import { Magnetic } from "@/components/ui/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

export function Hero({
  hero,
  locale,
}: {
  hero: Dictionary["hero"];
  locale: Locale;
}) {
  const reduceMotion = useReducedMotion();
  const highlightWords = new Set(hero.highlight.split(" "));

  // Índice global de palabra para escalonar la entrada de todo el titular
  let wordIndex = 0;

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24">
      <AmbientBackdrop variant="hero" />

      <div className="container-page relative">
        {/* Señal de disponibilidad: crea urgencia sin prometer nada falso */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full border border-ember-500/25 bg-ember-500/8 py-1.5 pr-4 pl-2.5"
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full rounded-full bg-ember-400 opacity-70 motion-safe:animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember-400" />
          </span>
          <span className="font-mono text-2xs tracking-widest text-ember-200 uppercase">
            {hero.status}
          </span>
        </motion.p>

        {/* Titular a todo el ancho: el tipo grande necesita aire para funcionar */}
        <h1 className="mt-7 max-w-4xl text-6xl text-ink-50">
          {hero.headline.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.split(" ").map((word, i) => {
                const index = wordIndex++;
                return (
                  <motion.span
                    key={`${lineIndex}-${i}`}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: "0.3em", filter: "blur(8px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.7,
                      delay: reduceMotion ? 0 : 0.15 + index * 0.055,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block ${
                      highlightWords.has(word) ? "text-ember-gradient" : ""
                    }`}
                  >
                    {word}&nbsp;
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Mensaje y sistema, uno al lado del otro */}
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="flex flex-col items-start">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-xl text-lg text-muted"
            >
              {hero.lede}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : 0.68,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <Magnetic>
                <ButtonLink href="#contacto" size="lg" className="w-full sm:w-auto">
                  {hero.ctaPrimary}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </ButtonLink>
              </Magnetic>
              <ButtonLink
                href="#proceso"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                {hero.ctaSecondary}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div
            initial={
              reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: reduceMotion ? 0 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            <div
              aria-hidden
              className="absolute -inset-8 -z-10 rounded-[3rem] bg-ember-500/8 blur-3xl"
            />
            <SystemDiagram locale={locale} />
          </motion.div>
        </div>

        {/* Franja de datos: cierra el hero y ancla la confianza */}
        <motion.dl
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.85 }}
          className="mt-14 grid grid-cols-1 gap-8 border-t border-hairline pt-8 sm:grid-cols-3"
        >
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-2xl text-ink-50 tabular-nums">
                {stat.value}
              </dd>
              <dd className="text-sm leading-snug text-faint">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
