import type { Locale } from "./i18n/config";
import type { Dictionary } from "./i18n/types";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jobid.ai"
).replace(/\/$/, "");

/**
 * Datos estructurados: le dicen a Google y a los buscadores con IA qué es
 * este negocio, qué servicios ofrece y qué responde cada pregunta frecuente.
 */
export function buildJsonLd(locale: Locale, dict: Dictionary) {
  const id = `${SITE_URL}/#organizacion`;

  const organization = {
    "@type": "ProfessionalService",
    "@id": id,
    name: "Jobid",
    url: `${SITE_URL}/${locale}`,
    description: dict.meta.description,
    email: "hola@jobid.ai",
    priceRange: "€€",
    areaServed: ["ES", "MX", "CO", "AR", "CL", "PE", "US"],
    knowsLanguage: ["es", "en"],
    slogan: dict.hero.headline.join(" "),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.services.title,
      itemListElement: dict.services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/${locale}#faq`,
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#web`,
    url: SITE_URL,
    name: "Jobid",
    inLanguage: locale,
    publisher: { "@id": id },
  };

  return { "@context": "https://schema.org", "@graph": [organization, website, faq] };
}
