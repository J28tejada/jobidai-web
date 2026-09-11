import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { Why } from "@/components/sections/Why";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { buildJsonLd } from "@/lib/seo";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const jsonLd = buildJsonLd(locale, dict);

  return (
    <>
      <script
        type="application/ld+json"
        // Contenido propio y estático: no hay entrada de usuario en el JSON-LD.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero hero={dict.hero} locale={locale} />
      <Services services={dict.services} />
      <Process process={dict.process} />
      <Work work={dict.work} locale={locale} />
      <Stack stack={dict.stack} />
      <Why why={dict.why} />
      <Pricing pricing={dict.pricing} />
      <Faq faq={dict.faq} />
      <Contact contact={dict.contact} />
    </>
  );
}
