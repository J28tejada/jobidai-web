import { NextResponse } from "next/server";
import { ejecutar } from "@/lib/laboratorio/presupuestos/pipeline";
import { ipDePeticion, superaLimite } from "@/lib/rate-limit";

export const runtime = "nodejs";

/** Tope de entrada: por encima de esto no hay mensaje de cliente, hay abuso. */
const MAX_CARACTERES = 4000;

export async function POST(request: Request) {
  if (superaLimite(`presupuesto:${ipDePeticion(request)}`, { maximo: 20, ventanaMs: 60_000 })) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let cuerpo: { texto?: unknown };
  try {
    cuerpo = (await request.json()) as { texto?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const texto = typeof cuerpo.texto === "string" ? cuerpo.texto.trim() : "";
  if (texto.length === 0) {
    return NextResponse.json({ ok: false, error: "texto_vacio" }, { status: 422 });
  }
  if (texto.length > MAX_CARACTERES) {
    return NextResponse.json(
      { ok: false, error: "texto_demasiado_largo", maximo: MAX_CARACTERES },
      { status: 413 },
    );
  }

  // Todo el flujo es determinista y sin efectos: nada se envía a ningún sitio.
  const resultado = ejecutar(texto);
  return NextResponse.json({ ok: true, resultado });
}
