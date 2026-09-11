import {
  BAREMO,
  MOTIVOS_VISITA,
  SINONIMOS_ESTANCIA,
  RANGOS_ESTANCIA,
} from "./baremo";
import type {
  Estancia,
  Extraccion,
  Extractor,
  MedicionEstancia,
  PartidaDetectada,
} from "./tipos";

/** Partidas que se miden sobre pared, no sobre suelo. */
const PARTIDAS_EN_PARED = new Set(["alicatado", "demolicion_alicatado"]);

/** Altura libre típica de vivienda española, para derivar superficie de paredes. */
const ALTURA_LIBRE = 2.5;
/** Descuento por huecos de puerta y ventana al estimar paredes. */
const FACTOR_HUECOS = 0.85;

const NUMEROS_PALABRA: Record<string, number> = {
  un: 1, una: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6,
  siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12, trece: 13,
  catorce: 14, quince: 15, dieciseis: 16, diecisiete: 17, dieciocho: 18,
  diecinueve: 19, veinte: 20, treinta: 30, cuarenta: 40, cincuenta: 50,
  sesenta: 60, setenta: 70, ochenta: 80, noventa: 90, cien: 100,
};

/**
 * Trabajos que se reconocen como obra pero no están en el baremo. Detectarlos
 * evita el peor fallo posible: presupuestar un baño ignorando en silencio que
 * el cliente también pedía aire acondicionado.
 */
const FUERA_DE_CATALOGO: { termino: string; sinonimos: string[] }[] = [
  { termino: "aire acondicionado", sinonimos: ["aire acondicionado", "climatizacion", "split"] },
  { termino: "calefacción", sinonimos: ["calefaccion", "radiadores", "suelo radiante"] },
  { termino: "parquet o tarima", sinonimos: ["parquet", "tarima", "suelo de madera", "laminado"] },
  { termino: "armarios empotrados", sinonimos: ["armario empotrado", "armarios empotrados", "vestidor"] },
  { termino: "domótica", sinonimos: ["domotica", "persianas motorizadas", "casa inteligente"] },
  { termino: "piscina", sinonimos: ["piscina", "jacuzzi", "spa"] },
];

/** Minúsculas, sin tildes y con espacios colapsados. */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Convierte "6", "6,5" o "seis" en número. Devuelve null si no lo es. */
function aNumero(bruto: string): number | null {
  const limpio = bruto.trim().replace(",", ".");
  const directo = Number.parseFloat(limpio);
  if (Number.isFinite(directo)) return directo;
  return NUMEROS_PALABRA[limpio] ?? null;
}

type Medida = { valor: number; unidad: "m2" | "ml" | "ud"; indice: number };

/**
 * Localiza todas las medidas del texto con su posición, para poder asociarlas
 * después a la estancia o a la partida que tienen más cerca.
 */
function extraerMedidas(texto: string): Medida[] {
  const medidas: Medida[] = [];
  const numero = "(\\d+(?:[.,]\\d+)?|" + Object.keys(NUMEROS_PALABRA).join("|") + ")";

  const patrones: { regex: RegExp; unidad: Medida["unidad"] }[] = [
    { regex: new RegExp(`${numero}\\s*(?:m2|m²|metros? cuadrados?|metros²)`, "g"), unidad: "m2" },
    { regex: new RegExp(`${numero}\\s*(?:ml|metros? lineales?)`, "g"), unidad: "ml" },
    { regex: new RegExp(`${numero}\\s*(?:uds?|unidades?|puertas?|ventanas?)`, "g"), unidad: "ud" },
  ];

  // Dimensiones en vez de superficie: "2 por 3 metros", "250x300 cm".
  // Es como mide la gente una estancia cuando no sabe los metros cuadrados.
  const dimension = /(\d+(?:[.,]\d+)?)\s*(?:x|por)\s*(\d+(?:[.,]\d+)?)\s*(cm|centimetros|m|metros)?/g;
  let d: RegExpExecArray | null;
  while ((d = dimension.exec(texto)) !== null) {
    const a = aNumero(d[1]);
    const b = aNumero(d[2]);
    if (a === null || b === null) continue;
    const enCm = d[3] === "cm" || d[3] === "centimetros";
    const area = enCm ? (a / 100) * (b / 100) : a * b;
    if (area > 0) {
      medidas.push({ valor: Math.round(area * 10) / 10, unidad: "m2", indice: d.index });
    }
  }

  for (const { regex, unidad } of patrones) {
    let m: RegExpExecArray | null;
    while ((m = regex.exec(texto)) !== null) {
      const valor = aNumero(m[1]);
      if (valor !== null && valor > 0) {
        medidas.push({ valor, unidad, indice: m.index });
      }
    }
  }
  return medidas.sort((a, b) => a.indice - b.indice);
}

/** Busca un término y devuelve su posición, saltando zonas ya consumidas. */
function buscarTermino(
  texto: string,
  termino: string,
  consumido: boolean[],
): number | null {
  let desde = 0;
  while (desde <= texto.length - termino.length) {
    const idx = texto.indexOf(termino, desde);
    if (idx === -1) return null;
    // Solo vale si ningún carácter del tramo se usó ya en otra coincidencia
    let libre = true;
    for (let i = idx; i < idx + termino.length; i++) {
      if (consumido[i]) { libre = false; break; }
    }
    // Y si respeta límites de palabra, para que "ducha" no case dentro de otra
    const antes = idx === 0 || /[^a-z0-9]/.test(texto[idx - 1]);
    const despues =
      idx + termino.length >= texto.length ||
      /[^a-z0-9]/.test(texto[idx + termino.length]);

    if (libre && antes && despues) return idx;
    desde = idx + 1;
  }
  return null;
}

/**
 * Marcas de negación. Presupuestar algo que el cliente ha excluido a mano es
 * peor error que no detectarlo: le llega un importe por trabajo que no pidió.
 */
/** Tras uno de estos, la negación anterior deja de aplicar. */
const CONTRASTES = ["solo", "unicamente", "pero", "si "];

const NEGACIONES = [
  "no quiero", "no queremos", "no hay que", "no es necesario", "no hace falta",
  "sin tocar", "no tocar", "excepto", "salvo", "menos", "nada de", "no cambiar",
];

/**
 * ¿Está el término negado? Se mira solo dentro de su misma oración: una
 * negación de la frase anterior no debe contaminar a la siguiente.
 */
function estaNegado(texto: string, indice: number): boolean {
  let inicio = Math.max(
    texto.lastIndexOf(".", indice),
    texto.lastIndexOf(";", indice),
    texto.lastIndexOf("\n", indice),
  );

  // Una coma seguida de contraste cierra el alcance de la negación:
  // en "no quiero muebles, solo la encimera", la encimera SÍ se pide.
  const coma = texto.lastIndexOf(",", indice);
  if (coma > inicio) {
    const tras = texto.slice(coma + 1, indice).trimStart();
    if (CONTRASTES.some((c) => tras.startsWith(c))) inicio = coma;
  }

  return NEGACIONES.some((n) => texto.slice(inicio + 1, indice).includes(n));
}

function marcarConsumido(consumido: boolean[], desde: number, largo: number) {
  for (let i = desde; i < desde + largo; i++) consumido[i] = true;
}

/** La medida más cercana a una posición, dentro de una ventana de caracteres. */
function medidaCercana(
  medidas: Medida[],
  indice: number,
  unidad: Medida["unidad"],
  ventana = 60,
): Medida | null {
  let mejor: Medida | null = null;
  let mejorDistancia = Infinity;
  for (const m of medidas) {
    if (m.unidad !== unidad) continue;
    const d = Math.abs(m.indice - indice);
    if (d < mejorDistancia && d <= ventana) {
      mejor = m;
      mejorDistancia = d;
    }
  }
  return mejor;
}

/**
 * Superficie de paredes a partir de la de suelo. Un cliente dice "el baño
 * tiene 6 m²" refiriéndose al suelo, pero alicatar se mide en pared. Asumir
 * planta cuadrada y descontar huecos da una estimación defendible, que se
 * marca con menor confianza precisamente por ser derivada.
 */
function superficieParedes(superficieSuelo: number): number {
  const lado = Math.sqrt(superficieSuelo);
  return Math.round(4 * lado * ALTURA_LIBRE * FACTOR_HUECOS * 10) / 10;
}

/**
 * Extractor de reglas. Implementa el mismo contrato que implementaría un
 * modelo de lenguaje, de modo que el resto del motor no sabe ni le importa
 * cuál de los dos está detrás.
 */
export class ExtractorReglas implements Extractor {
  readonly nombre = "analizador de reglas v1";

  extraer(textoOriginal: string): Extraccion {
    const texto = normalizar(textoOriginal);
    const consumido = new Array<boolean>(texto.length).fill(false);
    const medidas = extraerMedidas(texto);

    // --- 1. Estancias y su superficie -------------------------------------
    const estancias: MedicionEstancia[] = [];
    const posicionEstancia = new Map<Estancia, number>();

    const entradasEstancia = Object.entries(SINONIMOS_ESTANCIA).flatMap(
      ([est, sins]) => sins.map((s) => ({ estancia: est as Estancia, sinonimo: s })),
    ).sort((a, b) => b.sinonimo.length - a.sinonimo.length);

    for (const { estancia, sinonimo } of entradasEstancia) {
      if (posicionEstancia.has(estancia)) continue;
      const idx = buscarTermino(texto, sinonimo, consumido);
      if (idx === null) continue;
      marcarConsumido(consumido, idx, sinonimo.length);
      posicionEstancia.set(estancia, idx);
      const medida = medidaCercana(medidas, idx, "m2");
      estancias.push({ estancia, superficie: medida?.valor ?? null });
    }

    // --- 2. Trabajos que exigen visita técnica ----------------------------
    const requiereVisita: Extraccion["requiereVisita"] = [];
    const motivosOrdenados = MOTIVOS_VISITA.flatMap((m) =>
      m.sinonimos.map((s) => ({ motivo: m, sinonimo: s })),
    ).sort((a, b) => b.sinonimo.length - a.sinonimo.length);

    for (const { motivo, sinonimo } of motivosOrdenados) {
      if (requiereVisita.some((r) => r.motivoId === motivo.id)) continue;
      const idx = buscarTermino(texto, sinonimo, consumido);
      if (idx === null) continue;
      marcarConsumido(consumido, idx, sinonimo.length);
      requiereVisita.push({ motivoId: motivo.id, evidencia: sinonimo });
    }

    // --- 3. Partidas del baremo -------------------------------------------
    // De sinónimo más largo a más corto: "cambiar banera por ducha" debe ganar
    // a "ducha" y consumir el tramo para que no se cuente dos veces.
    const partidas: PartidaDetectada[] = [];
    const entradasPartida = BAREMO.flatMap((p) =>
      p.sinonimos.map((s) => ({ partida: p, sinonimo: s })),
    ).sort((a, b) => b.sinonimo.length - a.sinonimo.length);

    for (const { partida, sinonimo } of entradasPartida) {
      if (partidas.some((d) => d.partidaId === partida.id)) continue;
      const idx = buscarTermino(texto, sinonimo, consumido);
      if (idx === null) continue;

      // "No quiero cambiar los muebles": el término está, pero pide lo contrario.
      // Se consume el tramo para que otro sinónimo no lo vuelva a capturar.
      if (estaNegado(texto, idx)) {
        marcarConsumido(consumido, idx, sinonimo.length);
        continue;
      }
      marcarConsumido(consumido, idx, sinonimo.length);

      // Una partida solo cuenta si encaja con alguna estancia mencionada.
      // Sin esto, "muebles" en un salón acabaría presupuestado como cocina.
      if (estancias.length > 0) {
        const compatible = estancias.some(
          (e) => e.estancia === "vivienda" || partida.estancias.includes(e.estancia),
        );
        if (!compatible) continue;
      }

      let medicion: number | null = null;
      let origen: PartidaDetectada["origenMedicion"] = "ausente";
      let confianza = 0.9;

      // El alicatado se mide en pared, no en suelo. Si el cliente escribe
      // "cocina de 12 m2" se refiere al suelo, así que una medida lejana no
      // sirve: solo se acepta si está pegada al término ("alicatado 18 m2").
      const esPared = PARTIDAS_EN_PARED.has(partida.id);
      const ventana = esPared ? 22 : 60;
      const propia = medidaCercana(medidas, idx, partida.unidad, ventana);
      if (propia) {
        medicion = propia.valor;
        origen = "texto";
      } else if (partida.unidad === "ud") {
        // Una bañera, un inodoro: si no se dice cantidad, se asume una.
        medicion = 1;
        origen = "unitaria";
        confianza = 0.8;
      } else if (partida.unidad === "m2") {
        // Derivar de la estancia: suelo tal cual, pared estimada.
        const conSuperficie = estancias.find(
          (e) => e.superficie !== null && partida.estancias.includes(e.estancia),
        );
        if (conSuperficie?.superficie) {
          medicion = esPared
            ? superficieParedes(conSuperficie.superficie)
            : conSuperficie.superficie;
          origen = "estancia";
          confianza = esPared ? 0.65 : 0.7;
        }
      }

      if (origen === "ausente") confianza = 0.4;
      partidas.push({
        partidaId: partida.id,
        evidencia: sinonimo,
        confianza,
        medicion,
        origenMedicion: origen,
      });
    }

    // --- 4. Obra reconocida pero fuera del baremo -------------------------
    const fueraDeCatalogo: string[] = [];
    for (const item of FUERA_DE_CATALOGO) {
      for (const sinonimo of item.sinonimos) {
        if (buscarTermino(texto, sinonimo, consumido) !== null) {
          if (!fueraDeCatalogo.includes(item.termino)) fueraDeCatalogo.push(item.termino);
          break;
        }
      }
    }

    const confianzaGlobal =
      partidas.length === 0
        ? 0
        : Math.round(
            (partidas.reduce((s, p) => s + p.confianza, 0) / partidas.length) * 100,
          ) / 100;

    return { estancias, partidas, requiereVisita, fueraDeCatalogo, confianzaGlobal };
  }
}

export { RANGOS_ESTANCIA };
