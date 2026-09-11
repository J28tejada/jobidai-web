import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Minus } from "lucide-react";
import { MotorPresupuestos } from "@/components/laboratorio/MotorPresupuestos";
import { AmbientBackdrop } from "@/components/ui/AmbientBackdrop";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/i18n/config";

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).laboratorio.motorPresupuestos;
  const ruta = `/${locale}/laboratorio/motor-de-presupuestos`;

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: ruta,
      languages: {
        ...Object.fromEntries(
          locales.map((alt) => [alt, `/${alt}/laboratorio/motor-de-presupuestos`]),
        ),
        "x-default": "/es/laboratorio/motor-de-presupuestos",
      },
    },
    openGraph: { title: t.meta.title, description: t.meta.description, url: ruta },
  };
}

export default async function Page({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale).laboratorio.motorPresupuestos;

  return (
    <>
      {/* ---------- Cabecera ---------- */}
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-16">
        <AmbientBackdrop variant="hero" />
        <div className="container-page relative">
          <Link
            href={`/${locale}#trabajo`}
            className="group inline-flex items-center gap-2 font-mono text-2xs tracking-widest text-faint uppercase transition-colors hover:text-ember-400"
          >
            <ArrowLeft
              className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden
            />
            {t.volver}
          </Link>

          <p className="eyebrow mt-8 inline-flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ember-500" />
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl text-ink-50">{t.titulo}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t.lede}</p>
        </div>
      </section>

      {/* ---------- La demo ---------- */}
      <section className="relative pb-20 sm:pb-24">
        <div className="container-page">
          <MotorPresupuestos t={t} locale={locale} />
        </div>
      </section>

      {/* ---------- Por qué está construido así ---------- */}
      <Section tinted>
        <div className="container-page">
          <SectionHeading eyebrow={t.eyebrow} title={t.comoFunciona.titulo} />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.08}>
            {t.comoFunciona.items.map((item, i) => (
              <RevealItem key={item.titulo} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-7">
                  <span aria-hidden className="font-mono text-2xs tracking-widest text-ember-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl text-ink-50">{item.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.texto}</p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ---------- Real frente a simulado ---------- */}
      <Section>
        <div className="container-page">
          <SectionHeading eyebrow={t.eyebrow} title={t.honestidad.titulo} />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="surface-card edge-light h-full p-7">
                <h3 className="font-mono text-2xs tracking-widest text-ember-400 uppercase">
                  {t.honestidad.realTitulo}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {t.honestidad.real.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm text-ink-100">
                      <Check className="mt-0.5 size-4 shrink-0 text-ember-500" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="surface-card edge-light h-full p-7">
                <h3 className="font-mono text-2xs tracking-widest text-faint uppercase">
                  {t.honestidad.simuladoTitulo}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {t.honestidad.simulado.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm text-muted">
                      <Minus className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- Evaluación medida ---------- */}
      <Section tinted>
        <div className="container-page">
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.evaluacion.titulo}
            lede={t.evaluacion.lede}
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {t.evaluacion.filas.map((fila) => (
              <RevealItem key={fila.etiqueta} className="h-full">
                <div className="surface-card edge-light flex h-full flex-col p-6">
                  <span className="font-display text-4xl text-ember-400 tabular-nums">
                    {fila.valor}
                  </span>
                  <span className="mt-2 text-sm font-medium text-ink-100">{fila.etiqueta}</span>
                  <span className="mt-3 text-xs leading-relaxed text-muted">{fila.nota}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-8 border-t border-hairline pt-7">
              <h3 className="font-mono text-2xs tracking-widest text-faint uppercase">
                {t.evaluacion.limitacionesTitulo}
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.evaluacion.limitaciones.map((l) => (
                  <li key={l} className="flex items-start gap-2.5 text-sm text-muted">
                    <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-faint" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
