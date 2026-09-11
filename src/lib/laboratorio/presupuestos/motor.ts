import { PARAMETROS, buscarPartida } from "./baremo";
import type { Extraccion, LineaPresupuesto, Presupuesto } from "./tipos";

/** Redondeo a dos decimales sin arrastrar error de coma flotante. */
function euros(valor: number): number {
  return Math.round(valor * 100) / 100;
}

/**
 * Motor de precios. Es deliberadamente aburrido: entra una extracción ya
 * validada y sale aritmética. Ninguna entrada de texto libre llega hasta
 * aquí, así que nadie puede alterar un importe escribiendo en el correo.
 *
 * Debe invocarse SOLO si `validar()` devolvió `puedeCalcular: true`.
 */
export function calcular(extraccion: Extraccion): Presupuesto {
  const lineas: LineaPresupuesto[] = [];

  for (const detectada of extraccion.partidas) {
    const partida = buscarPartida(detectada.partidaId);
    if (!partida || detectada.medicion === null) continue;

    lineas.push({
      partidaId: partida.id,
      concepto: partida.nombre,
      unidad: partida.unidad,
      medicion: detectada.medicion,
      precioUnitario: partida.precioUnitario,
      importe: euros(detectada.medicion * partida.precioUnitario),
    });
  }

  const subtotal = euros(lineas.reduce((s, l) => s + l.importe, 0));
  const gestionResiduos = euros(subtotal * PARAMETROS.tasaResiduos);
  const baseImponible = euros(subtotal + gestionResiduos);
  const iva = euros(baseImponible * PARAMETROS.iva);

  return {
    lineas,
    subtotal,
    gestionResiduos,
    baseImponible,
    iva,
    total: euros(baseImponible + iva),
    orientativo: true,
    validezDias: PARAMETROS.validezDias,
  };
}
