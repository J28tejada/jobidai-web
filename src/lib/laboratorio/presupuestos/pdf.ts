import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { NOMBRE_ESTANCIA } from "./baremo";
import type { Extraccion, Presupuesto } from "./tipos";

const TINTA = rgb(0.03, 0.03, 0.03);
const SUAVE = rgb(0.45, 0.43, 0.41);
const ACENTO = rgb(1, 0.35, 0.12);
const LINEA = rgb(0.85, 0.84, 0.82);

const A4 = { ancho: 595.28, alto: 841.89 };
const MARGEN = 56;

/**
 * Importe en formato español. Ojo: en castellano los números de exactamente
 * cuatro dígitos van SIN separador de millares ("1993,60"), y a partir de
 * cinco sí lo llevan ("12.345,67"). Intl ya aplica esa regla; escribir el
 * formateo a mano la rompe. Se instancia una vez y se reutiliza.
 */
const FORMATO_EUR = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function eur(n: number): string {
  return `${FORMATO_EUR.format(n)} EUR`;
}

/**
 * Genera el PDF del presupuesto.
 *
 * Se usa la codificación WinAnsi de las fuentes estándar, que cubre el
 * castellano pero no el símbolo €; por eso los importes se escriben como
 * "EUR". Es preferible a incrustar una fuente de 300 kB en cada descarga.
 */
export async function generarPdf(
  presupuesto: Presupuesto,
  extraccion: Extraccion,
  referencia: string,
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Presupuesto orientativo ${referencia}`);
  doc.setProducer("Jobid — motor de presupuestos");

  const pagina = doc.addPage([A4.ancho, A4.alto]);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const negrita = await doc.embedFont(StandardFonts.HelveticaBold);

  let y = A4.alto - MARGEN;

  const texto = (
    s: string,
    opts: { x?: number; size?: number; font?: typeof regular; color?: typeof TINTA } = {},
  ) => {
    pagina.drawText(s, {
      x: opts.x ?? MARGEN,
      y,
      size: opts.size ?? 10,
      font: opts.font ?? regular,
      color: opts.color ?? TINTA,
    });
  };

  const derecha = (
    s: string,
    borde: number,
    opts: { size?: number; font?: typeof regular; color?: typeof TINTA } = {},
  ) => {
    const font = opts.font ?? regular;
    const size = opts.size ?? 10;
    pagina.drawText(s, {
      x: borde - font.widthOfTextAtSize(s, size),
      y,
      size,
      font,
      color: opts.color ?? TINTA,
    });
  };

  const regla = (grosor = 0.7, color = LINEA) => {
    pagina.drawLine({
      start: { x: MARGEN, y },
      end: { x: A4.ancho - MARGEN, y },
      thickness: grosor,
      color,
    });
  };

  // --- Cabecera -------------------------------------------------------------
  pagina.drawCircle({ x: MARGEN + 4, y: y + 4, size: 4, color: ACENTO });
  texto("Jobid", { x: MARGEN + 16, size: 16, font: negrita });
  derecha("PRESUPUESTO ORIENTATIVO", A4.ancho - MARGEN, { size: 9, font: negrita, color: SUAVE });
  y -= 16;
  derecha(`Ref. ${referencia}`, A4.ancho - MARGEN, { size: 9, color: SUAVE });
  y -= 8;
  regla(1.2, TINTA);

  // --- Alcance --------------------------------------------------------------
  y -= 26;
  texto("ALCANCE", { size: 8, font: negrita, color: SUAVE });
  y -= 14;
  const estancias = extraccion.estancias
    .map((e) =>
      e.superficie ? `${NOMBRE_ESTANCIA[e.estancia]} (${e.superficie} m2)` : NOMBRE_ESTANCIA[e.estancia],
    )
    .join(", ");
  texto(estancias || "No especificado", { size: 10 });
  y -= 12;
  texto(
    `Emitido el ${new Date().toLocaleDateString("es-ES")} · Validez ${presupuesto.validezDias} dias`,
    { size: 9, color: SUAVE },
  );

  // --- Tabla de partidas ----------------------------------------------------
  y -= 30;
  // Bordes derechos de cada columna. Se reparten los 483 pt útiles dejando
  // ~105 pt por columna numérica: suficiente para "1.993,60 EUR" en negrita
  // sin que una columna invada la siguiente.
  const bordeMedicion = MARGEN + 270;
  const bordePrecio = MARGEN + 374;
  const bordeImporte = A4.ancho - MARGEN;
  /** Ancho máximo del concepto antes de recortarlo. */
  const anchoConcepto = 210;

  texto("CONCEPTO", { size: 8, font: negrita, color: SUAVE });
  derecha("MEDICION", bordeMedicion, { size: 8, font: negrita, color: SUAVE });
  derecha("PRECIO", bordePrecio, { size: 8, font: negrita, color: SUAVE });
  derecha("IMPORTE", bordeImporte, { size: 8, font: negrita, color: SUAVE });
  y -= 8;
  regla();

  for (const linea of presupuesto.lineas) {
    y -= 20;
    // El concepto se recorta si no cabe, para no pisar la columna de medición
    let concepto = linea.concepto;
    while (regular.widthOfTextAtSize(concepto, 10) > anchoConcepto && concepto.length > 4) {
      concepto = concepto.slice(0, -2);
    }
    if (concepto !== linea.concepto) concepto += "...";

    texto(concepto, { size: 10 });
    derecha(`${linea.medicion} ${linea.unidad}`, bordeMedicion, { size: 10, color: SUAVE });
    derecha(eur(linea.precioUnitario), bordePrecio, { size: 10, color: SUAVE });
    derecha(eur(linea.importe), bordeImporte, { size: 10, font: negrita });
    y -= 7;
    regla(0.4);
  }

  // --- Totales --------------------------------------------------------------
  const fila = (etiqueta: string, valor: number, destacada = false) => {
    y -= destacada ? 22 : 17;
    derecha(etiqueta, bordePrecio, {
      size: destacada ? 11 : 10,
      font: destacada ? negrita : regular,
      color: destacada ? TINTA : SUAVE,
    });
    derecha(eur(valor), bordeImporte, {
      size: destacada ? 13 : 10,
      font: destacada ? negrita : regular,
      color: destacada ? ACENTO : TINTA,
    });
  };

  y -= 6;
  fila("Subtotal", presupuesto.subtotal);
  fila("Gestion de residuos", presupuesto.gestionResiduos);
  fila("Base imponible", presupuesto.baseImponible);
  fila("IVA 10%", presupuesto.iva);
  y -= 10;
  regla();
  fila("TOTAL", presupuesto.total, true);

  // --- Advertencia ----------------------------------------------------------
  y = MARGEN + 92;
  regla();
  y -= 18;
  texto("CONDICIONES", { size: 8, font: negrita, color: SUAVE });
  y -= 14;
  const condiciones = [
    "Presupuesto ORIENTATIVO calculado a partir de la descripcion facilitada por el cliente.",
    "No sustituye a una visita tecnica: las mediciones reales pueden variar el importe final.",
    "Precios de baremo vigentes en la fecha de emision. IVA reducido de reforma de vivienda.",
    "No incluye licencias, tasas municipales ni trabajos no detallados en este documento.",
  ];
  for (const c of condiciones) {
    texto(c, { size: 8, color: SUAVE });
    y -= 11;
  }

  // --- Pie ------------------------------------------------------------------
  y = MARGEN - 10;
  texto("Generado automaticamente por el motor de presupuestos de Jobid", {
    size: 7,
    color: SUAVE,
  });
  derecha("jobid.ai", A4.ancho - MARGEN, { size: 7, color: SUAVE });

  return doc.save();
}
