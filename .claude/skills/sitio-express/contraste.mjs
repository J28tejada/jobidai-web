/**
 * Mide el contraste de un par --marca / --marca-oscuro contra los fondos
 * fijos de plantilla.html. Uso:
 *
 *   node .claude/skills/sitio-express/contraste.mjs '#0063b1' '#004e8c'
 *
 * Sin argumentos, imprime la tabla de paletas de SKILL.md para verificarla.
 */

const FONDO = "#ffffff";
const FONDO_ALT = "#f6f7f9";
const MINIMO = 4.5;

const canal = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

const rgb = (hex) => {
  const h = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`Color inválido: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

const luminancia = (hex) => {
  const [r, g, b] = rgb(hex);
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
};

const ratio = (a, b) => {
  const [alta, baja] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (alta + 0.05) / (baja + 0.05);
};

/** Replica color-mix(in srgb, marca 12%, white) del eyebrow. */
const tinte12 = (hex) =>
  "#" +
  rgb(hex)
    .map((c) => Math.round(c * 0.12 + 255 * 0.88).toString(16).padStart(2, "0"))
    .join("");

const marca = (n) => (n >= MINIMO ? "PASA" : "FALLA");

function medir(colorMarca, colorOscuro) {
  const pruebas = [
    ["blanco sobre --marca (botones, cierre)", ratio(FONDO, colorMarca)],
    ["--marca-oscuro sobre blanco", ratio(colorOscuro, FONDO)],
    ["--marca-oscuro sobre #f6f7f9 (sección alt)", ratio(colorOscuro, FONDO_ALT)],
    [`--marca-oscuro sobre tinte ${tinte12(colorMarca)} (eyebrow)`, ratio(colorOscuro, tinte12(colorMarca))],
  ];
  console.log(`\n${colorMarca} / ${colorOscuro}`);
  for (const [nombre, valor] of pruebas) {
    console.log(`  ${marca(valor).padEnd(6)}${valor.toFixed(2)}:1  ${nombre}`);
  }
  return pruebas.every(([, v]) => v >= MINIMO);
}

const PALETAS = [
  ["Retail general, tecnología", "#0063b1", "#004e8c"],
  ["Servicios creativos, belleza", "#6b4bb8", "#553a94"],
  ["Agro, ferretería, vivero", "#12735a", "#0d5b47"],
  ["Salud, dental, óptica", "#0f6e7d", "#0b5663"],
  ["Comida, panadería, colmado", "#b5321f", "#8f2718"],
  ["Taller, repuestos, industrial", "#3a4552", "#2a323c"],
  ["Abogados, contabilidad, seguros", "#1d3f73", "#152f57"],
];

const [colorMarca, colorOscuro] = process.argv.slice(2);

if (colorMarca && colorOscuro) {
  process.exitCode = medir(colorMarca, colorOscuro) ? 0 : 1;
} else if (colorMarca) {
  console.error("Faltan dos colores: --marca y --marca-oscuro");
  process.exitCode = 2;
} else {
  let todoBien = true;
  for (const [rubro, m, o] of PALETAS) {
    console.log(`\n── ${rubro}`);
    todoBien = medir(m, o) && todoBien;
  }
  console.log(`\nTokens fijos de la plantilla:`);
  for (const [nombre, a, b] of [
    ["--texto sobre blanco", "#16181d", FONDO],
    ["--texto-suave sobre blanco", "#5b6170", FONDO],
    ["--texto-suave sobre #f6f7f9", "#5b6170", FONDO_ALT],
    ["texto del botón de WhatsApp", "#05240f", "#25d366"],
    ["banner de vista previa", "#ffffff", "#1d2129"],
  ]) {
    const v = ratio(a, b);
    console.log(`  ${marca(v).padEnd(6)}${v.toFixed(2)}:1  ${nombre}`);
    todoBien = v >= MINIMO && todoBien;
  }
  process.exitCode = todoBien ? 0 : 1;
}
