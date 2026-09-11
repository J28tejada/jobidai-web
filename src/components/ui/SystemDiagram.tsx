"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  label: string;
  sub: string;
  accent?: boolean;
};

/** Coordenadas en el espacio del viewBox (440 x 260). */
const NODES: Node[] = [
  { id: "in", x: 8, y: 104, w: 104, label: "Entrada", sub: "correo · form" },
  { id: "ai", x: 168, y: 104, w: 104, label: "Proceso IA", sub: "extrae · valida", accent: true },
  { id: "out", x: 328, y: 40, w: 104, label: "Entrega", sub: "PDF · email" },
  { id: "crm", x: 328, y: 168, w: 104, label: "Registro", sub: "CRM · panel" },
];

const EDGES = [
  { id: "e1", d: "M 112 128 L 168 128", delay: 0 },
  { id: "e2", d: "M 272 128 C 300 128, 300 64, 328 64", delay: 0.5 },
  { id: "e3", d: "M 272 128 C 300 128, 300 192, 328 192", delay: 1 },
];

const LOG_KEYS = [
  { es: "Solicitud recibida", en: "Request received" },
  { es: "Datos extraídos · 98% confianza", en: "Data extracted · 98% confidence" },
  { es: "Tarifa validada", en: "Pricing validated" },
  { es: "Presupuesto enviado", en: "Quote delivered" },
  { es: "Registrado en CRM", en: "Logged to CRM" },
];

/**
 * Diagrama de un sistema en funcionamiento. Es la traducción visual de
 * "sistemas que trabajan solos": nodos conectados, datos circulando y un
 * registro de eventos que avanza. Todo SVG y CSS — sin WebGL, sin coste
 * de rendimiento y perfectamente nítido en cualquier pantalla.
 */
export function SystemDiagram({ locale }: { locale: "es" | "en" }) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setStep((current) => (current + 1) % LOG_KEYS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const activeLabel = LOG_KEYS[step][locale];

  return (
    <div className="surface-card edge-light grain overflow-hidden">
      {/* Cabecera tipo consola */}
      <div className="flex items-center gap-3 border-b border-hairline px-5 py-3.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ember-500/70" />
        </div>
        <span className="font-mono text-2xs tracking-widest text-faint uppercase">
          {locale === "es" ? "flujo · activo" : "flow · live"}
        </span>
        <span className="relative ml-auto flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full rounded-full bg-ember-500 opacity-70 motion-safe:animate-pulse-ring" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ember-400" />
        </span>
      </div>

      {/* Grafo */}
      <svg
        viewBox="0 0 440 260"
        className="w-full"
        role="img"
        aria-label={
          locale === "es"
            ? "Diagrama de una automatización: una entrada se procesa con IA y se reparte en entrega y registro."
            : "Diagram of an automation: an input is processed with AI and split into delivery and logging."
        }
      >
        <defs>
          <linearGradient id="edge-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--color-ember-600)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--color-ember-400)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-ember-600)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Conexiones: una base tenue y encima el pulso que viaja */}
        {EDGES.map((edge) => (
          <g key={edge.id}>
            <path
              d={edge.d}
              fill="none"
              stroke="var(--color-hairline-strong)"
              strokeWidth="1.5"
            />
            <path
              d={edge.d}
              fill="none"
              stroke="url(#edge-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="14 34"
              className="motion-safe:animate-[flow_1.6s_linear_infinite]"
              style={{ animationDelay: `${edge.delay}s` }}
            />
          </g>
        ))}

        {/* Nodos */}
        {NODES.map((node, index) => (
          <motion.g
            key={node.id}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : 0.15 * index,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: `${node.x + node.w / 2}px ${node.y + 24}px` }}
          >
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={48}
              rx={10}
              fill={node.accent ? "var(--color-ember-500)" : "var(--color-ink-800)"}
              fillOpacity={node.accent ? 0.12 : 0.9}
              stroke={
                node.accent ? "var(--color-ember-500)" : "var(--color-hairline-strong)"
              }
              strokeWidth="1"
            />
            <text
              x={node.x + node.w / 2}
              y={node.y + 21}
              textAnchor="middle"
              className="fill-ink-50 font-sans"
              style={{ fontSize: 12, fontWeight: 500 }}
            >
              {node.label}
            </text>
            <text
              x={node.x + node.w / 2}
              y={node.y + 36}
              textAnchor="middle"
              className="font-mono"
              fill="var(--color-faint)"
              style={{ fontSize: 9, letterSpacing: "0.04em" }}
            >
              {node.sub}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Registro de eventos */}
      <div className="border-t border-hairline px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember-400"
          />
          <motion.p
            key={step}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="truncate font-mono text-xs text-muted"
          >
            {activeLabel}
          </motion.p>
          <span className="ml-auto shrink-0 font-mono text-2xs text-faint tabular-nums">
            {String(step + 1).padStart(2, "0")}/{String(LOG_KEYS.length).padStart(2, "0")}
          </span>
        </div>

        {/* Barra de avance del ciclo */}
        <div className="mt-3 flex gap-1" aria-hidden>
          {LOG_KEYS.map((entry, index) => (
            <span
              key={entry.en}
              className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                index <= step ? "bg-ember-500" : "bg-ink-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
