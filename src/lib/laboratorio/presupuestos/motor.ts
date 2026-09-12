import { PARAMETROS, buscarPartida } from "./baremo";
import type { Extraccion, LineaPresupuesto, Presupuesto } from "./tipos";

/** Redondeo a dos decimales sin arrastrar error de coma flotante. */
function dinero(valor: number): number {
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
      importe: dinero(detectada.medicion * partida.precioUnitario),
    });
  }

  const subtotal = dinero(lineas.reduce((s, l) => s + l.importe, 0));
  const gestionResiduos = dinero(subtotal * PARAMETROS.tasaResiduos);
  const baseImponible = dinero(subtotal + gestionResiduos);
  const impuesto = dinero(baseImponible * PARAMETROS.impuesto);

  return {
    lineas,
    subtotal,
    gestionResiduos,
    baseImponible,
    impuesto,
    total: dinero(baseImponible + impuesto),
    orientativo: true,
    validezDias: PARAMETROS.validezDias,
  };
}
