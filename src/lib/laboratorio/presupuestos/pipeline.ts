import { ExtractorReglas } from "./extractor";
import { validar } from "./validador";
import { calcular } from "./motor";
import { NOMBRE_ESTANCIA } from "./baremo";
import type {
  Escalado,
  Extractor,
  PasoTraza,
  ResultadoPipeline,
} from "./tipos";

const extractorPorDefecto = new ExtractorReglas();

/** Reloj monótono; en el servidor y en el navegador se llama igual. */
function ahora(): number {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

function ms(desde: number): number {
  return Math.round((ahora() - desde) * 100) / 100;
}

/**
 * Ejecuta el flujo completo y devuelve, además del resultado, la traza de lo
 * que pasó en cada etapa. La traza no es telemetría interna: es producto. Un
 * cliente que ve por qué el sistema decidió algo confía en el sistema.
 */
export function ejecutar(
  texto: string,
  extractor: Extractor = extractorPorDefecto,
): ResultadoPipeline {
  const inicio = ahora();
  const traza: PasoTraza[] = [];

  // --- Etapa 1: entrada ----------------------------------------------------
  const t0 = ahora();
  const limpio = texto.trim();
  traza.push({
    etapa: "entrada",
    titulo: "Mensaje recibido",
    duracionMs: ms(t0),
    detalle: { caracteres: limpio.length, palabras: limpio.split(/\s+/).filter(Boolean).length },
  });

  // --- Etapa 2: extracción -------------------------------------------------
  const t1 = ahora();
  const extraccion = extractor.extraer(limpio);
  traza.push({
    etapa: "extraccion",
    titulo: `Extracción (${extractor.nombre})`,
    duracionMs: ms(t1),
    detalle: extraccion,
  });

  // --- Etapa 3: validación -------------------------------------------------
  const t2 = ahora();
  const validacion = validar(extraccion);
  traza.push({
    etapa: "validacion",
    titulo: "Validación contra baremo",
    duracionMs: ms(t2),
    detalle: validacion,
  });

  // --- Etapa 4: decisión ---------------------------------------------------
  const t3 = ahora();
  let presupuesto: ResultadoPipeline["presupuesto"] = null;
  let escalado: Escalado | null = null;

  if (validacion.puedeCalcular) {
    presupuesto = calcular(extraccion);
  } else {
    const bloqueantes = validacion.incidencias.filter((i) => i.gravedad === "bloqueante");
    const preguntas = Array.from(
      new Set(bloqueantes.map((i) => i.necesita).filter((n): n is string => Boolean(n))),
    );
    escalado = {
      motivo: bloqueantes[0]?.mensaje ?? "El mensaje no permite cerrar un presupuesto.",
      incidencias: validacion.incidencias,
      preguntas,
    };
  }

  traza.push({
    etapa: "decision",
    titulo: presupuesto ? "Presupuesto calculado" : "Escalado a persona",
    duracionMs: ms(t3),
    detalle: presupuesto
      ? { lineas: presupuesto.lineas.length, total: presupuesto.total }
      : { motivo: escalado?.motivo, preguntas: escalado?.preguntas.length ?? 0 },
  });

  // --- Payload que se entregaría al CRM ------------------------------------
  // Se muestra, no se envía: no hay ningún CRM conectado a esta demostración.
  const payloadCrm = {
    origen: "formulario_web",
    estado: presupuesto ? "presupuesto_enviado" : "pendiente_revision",
    estancias: extraccion.estancias.map((e) => ({
      estancia: NOMBRE_ESTANCIA[e.estancia],
      superficie_m2: e.superficie,
    })),
    partidas: extraccion.partidas.length,
    confianza_lectura: extraccion.confianzaGlobal,
    importe_total: presupuesto?.total ?? null,
    motivo_revision: escalado?.motivo ?? null,
    requiere_visita: extraccion.requiereVisita.length > 0,
  };

  return {
    traza,
    extraccion,
    validacion,
    presupuesto,
    escalado,
    payloadCrm,
    duracionTotalMs: ms(inicio),
  };
}
