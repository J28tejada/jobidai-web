/**
 * Auditoría de accesibilidad automatizada (WCAG 2.1 A y AA).
 *
 *   npm run build && npm start        # en otra terminal
 *   npm run audit:a11y
 *
 * Variables opcionales:
 *   AUDIT_URL      origen a auditar (por defecto http://127.0.0.1:3000)
 *   CHROMIUM_PATH  binario de Chromium a usar en lugar del descargado
 *
 * Se ejecuta con prefers-reduced-motion activo a propósito: así las
 * animaciones de entrada no dejan contenido en opacity:0, y axe audita
 * la página entera en lugar de solo lo que ya ha aparecido.
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const BASE = process.env.AUDIT_URL ?? "http://127.0.0.1:3000";
const LOCALES = ["es", "en"];
/** Rutas auditadas, relativas al prefijo de idioma. */
const RUTAS = ["", "/laboratorio/motor-de-presupuestos"];

// En local basta con `npx playwright install`. En entornos con un Chromium ya
// provisto (contenedores de CI), apunta CHROMIUM_PATH a ese binario en lugar
// de descargar otro.
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
let totalViolations = 0;

for (const locale of LOCALES)
  for (const ruta of RUTAS) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/${locale}${ruta}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Abre el acordeón para auditar también las respuestas plegadas
  await page.evaluate(() => {
    document.querySelectorAll("details").forEach((d) => {
      d.open = true;
    });
  });

  // En el laboratorio, ejecuta un caso para auditar también el resultado
  const ejemplo = page.getByRole("button", { name: /Caso normal|Normal case/ });
  if (await ejemplo.count()) {
    await ejemplo.first().click();
    await page.waitForTimeout(1500);
    const detalle = page.getByRole("button", { name: /Ver detalle|Show detail/ });
    if (await detalle.count()) {
      await detalle.first().click();
      await page.waitForTimeout(600);
    }
  }

  await page.addScriptTag({ content: axeSource });
  const results = await page.evaluate(
    async () =>
      await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
      }),
  );

  console.log(`\n===== /${locale}${ruta} =====`);
  console.log(
    `reglas aprobadas: ${results.passes.length}   incumplimientos: ${results.violations.length}`,
  );

  for (const violation of results.violations) {
    totalViolations += 1;
    console.log(`\n  [${violation.impact}] ${violation.id} — ${violation.help}`);
    console.log(`  ${violation.helpUrl}`);
    for (const node of violation.nodes.slice(0, 5)) {
      console.log(`    ${node.html.slice(0, 140)}`);
      if (node.any?.[0]?.message) console.log(`    → ${node.any[0].message}`);
    }
    if (violation.nodes.length > 5) {
      console.log(`    ... y ${violation.nodes.length - 5} elementos más`);
    }
  }

  await context.close();
}

await browser.close();

if (totalViolations > 0) {
  console.error(`\n✗ ${totalViolations} incumplimiento(s) de accesibilidad`);
  process.exit(1);
}
console.log("\n✓ Sin incumplimientos WCAG 2.1 A/AA");
