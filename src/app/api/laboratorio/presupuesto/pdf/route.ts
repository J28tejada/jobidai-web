import { ejecutar } from "@/lib/laboratorio/presupuestos/pipeline";
import { generarPdf } from "@/lib/laboratorio/presupuestos/pdf";
import { ipDePeticion, superaLimite } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_CARACTERES = 4000;

/**
 * Regenera el presupuesto desde el texto y devuelve el PDF. No hay estado
 * compartido entre las dos rutas porque el flujo es determinista: el mismo
 * texto produce exactamente el mismo documento.
 */
export async function POST(request: Request) {
  if (superaLimite(`pdf:${ipDePeticion(request)}`, { maximo: 10, ventanaMs: 60_000 })) {
    return new Response("Demasiadas peticiones", { status: 429 });
  }

  let texto = "";
  try {
    const cuerpo = (await request.json()) as { texto?: unknown };
    texto = typeof cuerpo.texto === "string" ? cuerpo.texto.trim() : "";
  } catch {
    return new Response("JSON no válido", { status: 400 });
  }

  if (!texto || texto.length > MAX_CARACTERES) {
    return new Response("Texto no válido", { status: 422 });
  }

  const resultado = ejecutar(texto);
  if (!resultado.presupuesto) {
    // Coherente con el resto del motor: sin validación no hay documento.
    return new Response("Este caso no produce presupuesto", { status: 409 });
  }

  const referencia = `JB-${new Date().getFullYear()}-${String(
    Math.abs([...texto].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7)) % 100000,
  ).padStart(5, "0")}`;

  const pdf = await generarPdf(resultado.presupuesto, resultado.extraccion, referencia);

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="presupuesto-${referencia}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
