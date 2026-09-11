"use client";

import { useCallback, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CircleAlert, Download, FileText, Play, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EtapasFlujo, type EstadoEtapa } from "./EtapasFlujo";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/types";
import type { ResultadoPipeline } from "@/lib/laboratorio/presupuestos/tipos";

type Texto = Dictionary["laboratorio"]["motorPresupuestos"];

const MAX_CARACTERES = 4000;

function eur(n: number, locale: string): string {
  return n.toLocaleString(locale === "en" ? "en-IE" : "es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
}

export function MotorPresupuestos({ t, locale }: { t: Texto; locale: string }) {
  const idCampo = useId();
  const reduceMotion = useReducedMotion();
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState<ResultadoPipeline | null>(null);
  const [cargando, setCargando] = useState(false);
  const [descargando, setDescargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trazaAbierta, setTrazaAbierta] = useState(false);

  const procesar = useCallback(async (entrada: string) => {
    const limpio = entrada.trim();
    if (!limpio) return;
    setCargando(true);
    setError(null);
    try {
      const r = await fetch("/api/laboratorio/presupuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: limpio }),
      });
      const datos = await r.json();
      if (!r.ok || !datos.ok) throw new Error(datos.error ?? "fallo");
      setResultado(datos.resultado as ResultadoPipeline);
    } catch {
      setError(t.resultado.error);
      setResultado(null);
    } finally {
      setCargando(false);
    }
  }, [t.resultado.error]);

  async function descargar() {
    if (!resultado?.presupuesto) return;
    setDescargando(true);
    try {
      const r = await fetch("/api/laboratorio/presupuesto/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: texto.trim() }),
      });
      if (!r.ok) throw new Error("fallo");
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "presupuesto.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError(t.resultado.error);
    } finally {
      setDescargando(false);
    }
  }

  // Estado de cada etapa a partir del resultado real, no de una animación
  const estados: EstadoEtapa[] = !resultado
    ? ["pendiente", "pendiente", "pendiente", "pendiente"]
    : [
        "ok",
        resultado.extraccion.partidas.length > 0 || resultado.extraccion.requiereVisita.length > 0
          ? "ok"
          : "detenido",
        resultado.validacion.puedeCalcular ? "ok" : "detenido",
        resultado.presupuesto ? "ok" : "detenido",
      ];

  const etiquetas = [t.etapas.entrada, t.etapas.extraccion, t.etapas.validacion, t.etapas.decision];
  const avisos = resultado?.validacion.incidencias.filter((i) => i.gravedad === "aviso") ?? [];

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      {/* ---------------- Entrada ---------------- */}
      <div className="surface-card edge-light flex flex-col p-6 sm:p-7">
        <h2 className="font-mono text-2xs tracking-widest text-ember-400 uppercase">
          {t.entrada.titulo}
        </h2>

        <label htmlFor={idCampo} className="mt-5 font-mono text-2xs tracking-widest text-faint uppercase">
          {t.entrada.etiqueta}
        </label>
        <textarea
          id={idCampo}
          value={texto}
          onChange={(e) => setTexto(e.target.value.slice(0, MAX_CARACTERES))}
          rows={7}
          placeholder={t.entrada.placeholder}
          className="mt-2 w-full resize-y rounded-lg border border-hairline bg-ink-900/70 px-4 py-3 text-sm leading-relaxed text-ink-50 transition-colors placeholder:text-faint hover:border-hairline-strong focus:border-ember-500/60 focus:outline-none"
        />
        <p className="mt-2 text-right font-mono text-2xs text-faint tabular-nums">
          {texto.length} / {MAX_CARACTERES} {t.entrada.contador}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            onClick={() => procesar(texto)}
            disabled={cargando || texto.trim().length === 0}
            size="md"
          >
            {cargando ? t.entrada.ejecutando : t.entrada.ejecutar}
            {!cargando && <Play className="size-3.5" aria-hidden />}
          </Button>
          {(texto || resultado) && (
            <Button
              variant="secondary"
              size="md"
              onClick={() => { setTexto(""); setResultado(null); setError(null); }}
            >
              {t.entrada.limpiar}
              <X className="size-3.5" aria-hidden />
            </Button>
          )}
        </div>

        {/* Ejemplos precargados, incluido uno diseñado para fallar */}
        <div className="mt-7 border-t border-hairline pt-6">
          <p className="font-mono text-2xs tracking-widest text-faint uppercase">
            {t.entrada.ejemplos}
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {t.ejemplos.map((ej) => (
              <li key={ej.id}>
                <button
                  type="button"
                  onClick={() => { setTexto(ej.texto); void procesar(ej.texto); }}
                  className="group/ej w-full rounded-lg border border-hairline bg-ink-900/40 px-4 py-3 text-left transition-colors hover:border-ember-500/40 hover:bg-ink-800/60"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink-100">{ej.etiqueta}</span>
                    <ArrowRight
                      className="size-3.5 shrink-0 text-faint transition-transform duration-300 group-hover/ej:translate-x-0.5 group-hover/ej:text-ember-400"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-xs text-muted">{ej.nota}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------------- Salida ---------------- */}
      <div className="flex flex-col gap-5">
        <div className="surface-card edge-light p-6 sm:p-7">
          <EtapasFlujo etiquetas={etiquetas} estados={estados} />

          <div className="mt-6" aria-live="polite">
            {error ? (
              <p className="flex items-start gap-2.5 rounded-lg border border-ember-600/40 bg-ember-900/20 px-4 py-3 text-sm text-ember-200">
                <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
                {error}
              </p>
            ) : !resultado ? (
              <p className="py-10 text-center text-sm text-faint">{t.resultado.vacio}</p>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={resultado.presupuesto ? "presupuesto" : "escalado"}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {resultado.presupuesto ? (
                    <Presupuesto
                      t={t}
                      locale={locale}
                      presupuesto={resultado.presupuesto}
                      onDescargar={descargar}
                      descargando={descargando}
                    />
                  ) : (
                    <Escalado t={t} escalado={resultado.escalado!} />
                  )}

                  {avisos.length > 0 && (
                    <div className="mt-6 border-t border-hairline pt-5">
                      <p className="font-mono text-2xs tracking-widest text-faint uppercase">
                        {t.resultado.avisos}
                      </p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {avisos.map((a, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-200">
                            <CircleAlert className="mt-0.5 size-3.5 shrink-0 text-ember-400" aria-hidden />
                            {a.mensaje}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {resultado && <Traza t={t} resultado={resultado} abierta={trazaAbierta} alternar={() => setTrazaAbierta((v) => !v)} />}
      </div>
    </div>
  );
}

function Presupuesto({
  t, locale, presupuesto, onDescargar, descargando,
}: {
  t: Texto;
  locale: string;
  presupuesto: NonNullable<ResultadoPipeline["presupuesto"]>;
  onDescargar: () => void;
  descargando: boolean;
}) {
  const filas: [string, number, boolean?][] = [
    [t.resultado.subtotal, presupuesto.subtotal],
    [t.resultado.residuos, presupuesto.gestionResiduos],
    [t.resultado.base, presupuesto.baseImponible],
    [t.resultado.iva, presupuesto.iva],
    [t.resultado.total, presupuesto.total, true],
  ];

  return (
    <div>
      <h3 className="text-xl text-ink-50">{t.resultado.presupuestoTitulo}</h3>

      <div className="mt-5 overflow-x-auto" tabIndex={0} role="region" aria-label={t.resultado.presupuestoTitulo}>
        <table className="w-full min-w-[26rem] text-sm">
          <thead>
            <tr className="border-b border-hairline text-left">
              {[t.resultado.concepto, t.resultado.medicion, t.resultado.precio, t.resultado.importe].map((h, i) => (
                <th
                  key={h}
                  className={cn(
                    "pb-2 font-mono text-2xs font-normal tracking-widest text-faint uppercase",
                    i > 0 && "text-right",
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {presupuesto.lineas.map((l) => (
              <tr key={l.partidaId} className="border-b border-hairline/60">
                <td className="py-2.5 pr-4 text-ink-100">{l.concepto}</td>
                <td className="py-2.5 text-right whitespace-nowrap text-muted tabular-nums">
                  {l.medicion} {l.unidad}
                </td>
                <td className="py-2.5 pl-4 text-right whitespace-nowrap text-muted tabular-nums">
                  {eur(l.precioUnitario, locale)}
                </td>
                <td className="py-2.5 pl-4 text-right whitespace-nowrap text-ink-50 tabular-nums">
                  {eur(l.importe, locale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="mt-5 flex flex-col gap-2">
        {filas.map(([etiqueta, valor, destacada]) => (
          <div
            key={etiqueta}
            className={cn(
              "flex items-baseline justify-between gap-4",
              destacada && "mt-2 border-t border-hairline pt-3",
            )}
          >
            <dt className={destacada ? "text-base font-medium text-ink-50" : "text-sm text-muted"}>
              {etiqueta}
            </dt>
            <dd
              className={cn(
                "tabular-nums",
                destacada ? "font-display text-2xl text-ember-400" : "text-sm text-ink-100",
              )}
            >
              {eur(valor, locale)}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-xs leading-relaxed text-faint">
        {t.resultado.orientativo} {t.resultado.validez}: {presupuesto.validezDias} días.
      </p>

      <Button onClick={onDescargar} disabled={descargando} variant="secondary" size="md" className="mt-5">
        {descargando ? t.resultado.descargando : t.resultado.descargar}
        <Download className="size-4" aria-hidden />
      </Button>
    </div>
  );
}

function Escalado({ t, escalado }: { t: Texto; escalado: NonNullable<ResultadoPipeline["escalado"]> }) {
  return (
    <div>
      <h3 className="flex items-center gap-2.5 text-xl text-ink-50">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ember-500/15 text-ember-400">
          <CircleAlert className="size-4" aria-hidden />
        </span>
        {t.resultado.escaladoTitulo}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{t.resultado.escaladoLede}</p>

      <p className="mt-5 rounded-lg border border-ember-600/30 bg-ember-900/15 px-4 py-3 text-sm text-ember-100">
        {escalado.motivo}
      </p>

      {escalado.preguntas.length > 0 && (
        <div className="mt-6">
          <p className="font-mono text-2xs tracking-widest text-faint uppercase">
            {t.resultado.necesita}
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {escalado.preguntas.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-ink-200">
                <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-ember-500" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Traza({
  t, resultado, abierta, alternar,
}: {
  t: Texto;
  resultado: ResultadoPipeline;
  abierta: boolean;
  alternar: () => void;
}) {
  return (
    <div className="surface-card edge-light p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-mono text-2xs tracking-widest text-ember-400 uppercase">
          {t.traza.titulo}
        </h3>
        <span className="font-mono text-2xs text-faint tabular-nums">
          {resultado.duracionTotalMs} ms
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-1.5">
        {resultado.traza.map((paso) => (
          <li
            key={paso.etapa}
            className="flex items-center justify-between gap-4 rounded-md bg-ink-900/50 px-3 py-2"
          >
            <span className="truncate text-sm text-ink-200">{paso.titulo}</span>
            <span className="shrink-0 font-mono text-2xs text-faint tabular-nums">
              {paso.duracionMs} ms
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={alternar}
        aria-expanded={abierta}
        className="mt-4 inline-flex items-center gap-2 font-mono text-2xs tracking-widest text-faint uppercase transition-colors hover:text-ember-400"
      >
        <FileText className="size-3.5" aria-hidden />
        {abierta ? t.traza.ocultar : t.traza.ver}
      </button>

      {abierta && (
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-xs leading-relaxed text-faint">{t.traza.nota}</p>
          <div>
            <p className="font-mono text-2xs tracking-widest text-faint uppercase">
              {t.resultado.crmTitulo}
            </p>
            <pre
              tabIndex={0}
              role="region"
              aria-label={t.resultado.crmTitulo}
              className="mt-2 overflow-x-auto rounded-lg border border-hairline bg-ink-950 p-4 font-mono text-2xs leading-relaxed text-ink-200"
            >
              {JSON.stringify(resultado.payloadCrm, null, 2)}
            </pre>
            <p className="mt-2 text-xs text-faint">{t.resultado.crmNota}</p>
          </div>
          <div>
            <p className="font-mono text-2xs tracking-widest text-faint uppercase">
              {t.etapas.extraccion}
            </p>
            <pre
              tabIndex={0}
              role="region"
              aria-label={t.etapas.extraccion}
              className="mt-2 max-h-80 overflow-auto rounded-lg border border-hairline bg-ink-950 p-4 font-mono text-2xs leading-relaxed text-ink-200"
            >
              {JSON.stringify(resultado.extraccion, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
