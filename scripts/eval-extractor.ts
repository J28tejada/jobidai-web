/**
 * Mide la precisión real del extractor sobre el set de evaluación.
 *
 *   npm run eval:extractor
 *
 * El número que imprime es el que se publica en la web. No se redondea hacia
 * arriba ni se elige la métrica más favorable: se publica la exacta, que es
 * la más estricta (el conjunto de partidas detectadas debe coincidir
 * exactamente con el esperado, sin sobras ni faltas).
 */
import { CASOS } from "../src/lib/laboratorio/presupuestos/eval/casos";
import { CASOS_DIFICILES } from "../src/lib/laboratorio/presupuestos/eval/casos-dificiles";
import { ejecutar } from "../src/lib/laboratorio/presupuestos/pipeline";

type Fallo = { id: string; motivo: string };

function evaluar(casos: typeof CASOS, etiqueta: string) {
const fallos: Fallo[] = [];
let exactas = 0;
let decisionesCorrectas = 0;
let tpTotal = 0;
let fpTotal = 0;
let fnTotal = 0;
const duraciones: number[] = [];

for (const caso of casos) {
  const r = ejecutar(caso.texto);
  duraciones.push(r.duracionTotalMs);

  const detectadas = new Set(r.extraccion.partidas.map((p) => p.partidaId));
  const esperadas = new Set(caso.partidasEsperadas);

  const tp = [...esperadas].filter((id) => detectadas.has(id)).length;
  const fp = [...detectadas].filter((id) => !esperadas.has(id)).length;
  const fn = [...esperadas].filter((id) => !detectadas.has(id)).length;
  tpTotal += tp;
  fpTotal += fp;
  fnTotal += fn;

  const exacta = fp === 0 && fn === 0;
  if (exacta) exactas++;
  else {
    const sobran = [...detectadas].filter((id) => !esperadas.has(id));
    const faltan = [...esperadas].filter((id) => !detectadas.has(id));
    fallos.push({
      id: caso.id,
      motivo: [
        faltan.length ? `faltan: ${faltan.join(", ")}` : "",
        sobran.length ? `sobran: ${sobran.join(", ")}` : "",
      ].filter(Boolean).join(" | "),
    });
  }

  const decisionReal = r.presupuesto ? "presupuesto" : "escalado";
  const decisionOk = decisionReal === caso.decision;
  const codigoOk =
    !caso.codigoEscalado ||
    r.validacion.incidencias.some(
      (i) => i.codigo === caso.codigoEscalado && i.gravedad === "bloqueante",
    );

  if (decisionOk && codigoOk) decisionesCorrectas++;
  else {
    fallos.push({
      id: caso.id,
      motivo: !decisionOk
        ? `decisión: esperada ${caso.decision}, obtenida ${decisionReal}`
        : `código de escalado: esperado ${caso.codigoEscalado}`,
    });
  }
}

const n = casos.length;
const precision = tpTotal / (tpTotal + fpTotal || 1);
const exhaustividad = tpTotal / (tpTotal + fnTotal || 1);
const f1 = (2 * precision * exhaustividad) / (precision + exhaustividad || 1);
const pct = (x: number) => `${(x * 100).toFixed(1)}%`;
const media = duraciones.reduce((s, d) => s + d, 0) / duraciones.length;
const p95 = [...duraciones].sort((a, b) => a - b)[Math.floor(duraciones.length * 0.95)];

console.log(`\n══ ${etiqueta} ══ ${n} casos\n`);
console.log(`  Extracción exacta ....... ${pct(exactas / n)}  (${exactas}/${n} casos sin sobras ni faltas)`);
console.log(`  Decisión correcta ....... ${pct(decisionesCorrectas / n)}  (${decisionesCorrectas}/${n})`);
console.log(`  Precisión de partidas ... ${pct(precision)}`);
console.log(`  Exhaustividad ........... ${pct(exhaustividad)}`);
console.log(`  F1 ...................... ${pct(f1)}`);
console.log(`  Latencia media .......... ${media.toFixed(2)} ms   (p95 ${p95?.toFixed(2)} ms)`);

if (fallos.length) {
  console.log(`\n  ── Casos con desviación ──`);
  for (const f of fallos) console.log(`  · ${f.id}: ${f.motivo}`);
}
console.log("");
return {
  casos: n,
  exactas,
  decisiones: decisionesCorrectas,
  f1,
  media,
};
}

const desarrollo = evaluar(CASOS, "SET DE DESARROLLO (escrito junto al extractor)");
const retenido = evaluar(CASOS_DIFICILES, "SET RETENIDO (escrito después, sin ajustar el extractor)");

const totalCasos = desarrollo.casos + retenido.casos;
const totalExactas = desarrollo.exactas + retenido.exactas;
const totalDecisiones = desarrollo.decisiones + retenido.decisiones;
const pctT = (x: number) => `${(x * 100).toFixed(1)}%`;

console.log("══ CIFRA PUBLICABLE ══");
console.log(`  Sobre el set retenido, que es el único que mide generalización:`);
console.log(`    extracción exacta  ${pctT(retenido.exactas / retenido.casos)}  (${retenido.exactas}/${retenido.casos})`);
console.log(`    decisión correcta  ${pctT(retenido.decisiones / retenido.casos)}  (${retenido.decisiones}/${retenido.casos})`);
console.log(`  Sobre los ${totalCasos} casos combinados:`);
console.log(`    extracción exacta  ${pctT(totalExactas / totalCasos)}  (${totalExactas}/${totalCasos})`);
console.log(`    decisión correcta  ${pctT(totalDecisiones / totalCasos)}  (${totalDecisiones}/${totalCasos})`);
console.log("");

console.log("JSON:" + JSON.stringify({
  casosTotales: totalCasos,
  retenido: { casos: retenido.casos, exactas: retenido.exactas },
  combinado: { exactas: totalExactas, decisiones: totalDecisiones },
  extraccionExactaRetenido: Number((retenido.exactas / retenido.casos).toFixed(3)),
  extraccionExactaCombinada: Number((totalExactas / totalCasos).toFixed(3)),
  latenciaMediaMs: Number(((desarrollo.media + retenido.media) / 2).toFixed(2)),
}));
