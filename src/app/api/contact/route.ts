import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  /** Campo trampa: invisible para personas, irresistible para bots. */
  website?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Límite por IP. En serverless es por instancia, pero frena el abuso básico. */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  hits.set(ip, recent);

  // Poda perezosa para que el mapa no crezca sin control
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time > RATE_LIMIT_WINDOW_MS)) {
        hits.delete(key);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

function asText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "desconocida";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Trampa antispam: si viene rellena, fingimos éxito y descartamos en silencio.
  if (asText(body.website, 200).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = asText(body.name, 120);
  const email = asText(body.email, 200);
  const company = asText(body.company, 160);
  const service = asText(body.service, 120);
  const budget = asText(body.budget, 120);
  const message = asText(body.message, 4000);

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "required";
  if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "email";
  if (message.length < 10) fieldErrors.message = "required";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "validation", fieldErrors },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Sin proveedor configurado no fingimos un envío: se lo decimos al visitante
  // para que use el correo directo en lugar de creer que el mensaje salió.
  if (!apiKey || !to || !from) {
    console.warn(
      "[contacto] Falta configuración de correo (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL). Mensaje no enviado.",
    );
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Nombre", name],
    ["Correo", email],
    ["Empresa", company || "—"],
    ["Servicio", service || "—"],
    ["Presupuesto", budget || "—"],
  ];

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:640px">
      <h2 style="margin:0 0 16px">Nueva solicitud desde jobid.ai</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap">${label}</td><td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px;color:#666">Mensaje</h3>
      <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Nueva solicitud · ${name}${company ? ` · ${company}` : ""}`,
        html,
      }),
    });

    if (!response.ok) {
      console.error("[contacto] Resend respondió", response.status, await response.text());
      return NextResponse.json({ ok: false, error: "provider" }, { status: 502 });
    }
  } catch (error) {
    console.error("[contacto] Fallo de red al enviar", error);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
