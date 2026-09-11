import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/i18n";
import { isLocale, defaultLocale } from "@/lib/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jobid";

/** Imagen para redes sociales, generada en el servidor con los mismos tokens. */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080807",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Halo ámbar */}
        <div
          style={{
            position: "absolute",
            top: -240,
            left: 300,
            width: 800,
            height: 600,
            background:
              "radial-gradient(circle, rgba(255,90,31,0.30) 0%, rgba(255,90,31,0) 68%)",
            display: "flex",
          }}
        />

        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#ff5a1f",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, color: "#fbfaf9", fontWeight: 600 }}>
            Jobid
          </div>
        </div>

        {/* Mensaje */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.04,
              color: "#fbfaf9",
              letterSpacing: -2.5,
              maxWidth: 950,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>{dict.hero.headline[0]}</div>
            <div style={{ display: "flex", color: "#ff7238" }}>
              {dict.hero.headline.slice(1).join(" ")}
            </div>
          </div>
          <div style={{ fontSize: 27, color: "#9c9790", maxWidth: 820, display: "flex" }}>
            {locale === "en"
              ? "Websites · Web applications · Automation"
              : "Webs · Aplicaciones web · Automatizaciones"}
          </div>
        </div>

        {/* Pie */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(235,233,229,0.12)",
            paddingTop: 26,
            fontSize: 22,
            color: "#6b675f",
          }}
        >
          <div style={{ display: "flex" }}>jobid.ai</div>
          <div style={{ display: "flex" }}>hola@jobid.ai</div>
        </div>
      </div>
    ),
    size,
  );
}
