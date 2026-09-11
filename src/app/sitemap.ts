import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo";

/** Rutas publicadas, relativas al prefijo de idioma. */
const RUTAS = [
  { ruta: "", prioridad: 1, frecuencia: "monthly" as const },
  {
    ruta: "/laboratorio/motor-de-presupuestos",
    prioridad: 0.8,
    frecuencia: "monthly" as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    RUTAS.map(({ ruta, prioridad, frecuencia }) => ({
      url: `${SITE_URL}/${locale}${ruta}`,
      lastModified: new Date(),
      changeFrequency: frecuencia,
      priority: locale === "es" ? prioridad : prioridad - 0.1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${SITE_URL}/${alt}${ruta}`]),
        ),
      },
    })),
  );
}
