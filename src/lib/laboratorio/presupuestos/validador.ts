import {
  BAREMO,
  MOTIVOS_VISITA,
  NOMBRE_ESTANCIA,
  PARAMETROS,
  RANGOS_ESTANCIA,
  buscarPartida,
} from "./baremo";
import type { Extraccion, Incidencia, Validacion } from "./tipos";

/**
 * Puerta de entrada al cálculo. Si algo aquí sale bloqueante, el motor de
 * precios no llega a ejecutarse: no existe ninguna ruta en el código que
 * produzca un importe sin pasar por esta función. Eso es lo que sostiene la
 * afirmación "0 envíos sin validar" — no es una estadística, es estructura.
 */
export function validar(extraccion: Extraccion): Validacion {
  const incidencias: Incidencia[] = [];

  // --- Trabajos que exigen ver la obra ------------------------------------
  for (const { motivoId, evidencia } of extraccion.requiereVisita) {
    const motivo = MOTIVOS_VISITA.find((m) => m.id === motivoId);
    if (!motivo) continue;
    incidencias.push({
      codigo: "requiere_visita",
      gravedad: "bloqueante",
      mensaje: `${motivo.nombre}: ${motivo.razon}`,
      necesita: `Visita técnica para valorar "${evidencia}".`,
    });
  }

  // --- Nada que presupuestar ----------------------------------------------
  if (extraccion.partidas.length === 0 && extraccion.requiereVisita.length === 0) {
    incidencias.push({
      codigo: "sin_partidas",
      gravedad: "bloqueante",
      mensaje:
        "No se ha identificado ningún trabajo concreto del baremo en el mensaje.",
      necesita:
        "Detalle de qué se quiere hacer: por ejemplo alicatado, suelo, sustitución de sanitarios o pintura.",
    });
  }

  // --- Superficies que no cuadran con la estancia --------------------------
  for (const { estancia, superficie } of extraccion.estancias) {
    if (superficie === null) continue;
    const rango = RANGOS_ESTANCIA[estancia];
    if (superficie < rango.min || superficie > rango.max) {
      incidencias.push({
        codigo: "medicion_fuera_de_rango",
        gravedad: "bloqueante",
        mensaje:
          `La superficie indicada para ${NOMBRE_ESTANCIA[estancia]} (${superficie} m²) ` +
          `queda fuera del rango habitual (${rango.min}-${rango.max} m²).`,
        necesita: `Confirmar los metros cuadrados de ${NOMBRE_ESTANCIA[estancia]}.`,
      });
    }
  }

  // --- Mediciones de partida ----------------------------------------------
  for (const detectada of extraccion.partidas) {
    const partida = buscarPartida(detectada.partidaId);
    if (!partida) continue;

    if (detectada.medicion === null) {
      incidencias.push({
        codigo: "medicion_ausente",
        gravedad: "bloqueante",
        mensaje: `Falta la medición de "${partida.nombre}".`,
        necesita:
          partida.unidad === "m2"
            ? "Metros cuadrados, o la superficie de la estancia para poder deducirlos."
            : partida.unidad === "ml"
              ? "Metros lineales."
              : "Número de unidades.",
      });
      continue;
    }

    if (detectada.medicion < partida.rango.min || detectada.medicion > partida.rango.max) {
      incidencias.push({
        codigo: "medicion_fuera_de_rango",
        gravedad: "bloqueante",
        mensaje:
          `La medición de "${partida.nombre}" (${detectada.medicion} ${partida.unidad}) ` +
          `está fuera del rango presupuestable (${partida.rango.min}-${partida.rango.max}).`,
        necesita: "Confirmar la medición correcta.",
      });
    }
  }

  // --- Obra reconocida que no está en el baremo ---------------------------
  if (extraccion.fueraDeCatalogo.length > 0) {
    incidencias.push({
      codigo: "fuera_de_catalogo",
      gravedad: "aviso",
      mensaje:
        `El mensaje menciona trabajos fuera del baremo: ${extraccion.fueraDeCatalogo.join(", ")}. ` +
        "No se incluyen en el importe y se presupuestan aparte.",
      necesita: "Confirmar si se quieren incluir para valorarlos por separado.",
    });
  }

  // --- Confianza global ----------------------------------------------------
  if (
    extraccion.partidas.length > 0 &&
    extraccion.confianzaGlobal < PARAMETROS.umbralConfianza
  ) {
    incidencias.push({
      codigo: "confianza_baja",
      gravedad: "aviso",
      mensaje:
        `La confianza de la lectura es baja (${Math.round(extraccion.confianzaGlobal * 100)}%). ` +
        "El presupuesto se marca para revisión antes de enviarse.",
    });
  }

  return {
    incidencias,
    puedeCalcular: !incidencias.some((i) => i.gravedad === "bloqueante"),
  };
}

/** Baremo público, para que la interfaz pueda enseñar la tarifa al visitante. */
export { BAREMO };
