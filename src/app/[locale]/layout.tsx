import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { getDictionary } from "@/lib/i18n";
import { locales, localeTags, isLocale, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo";
import "../globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

type LayoutParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#080807",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: "%s · Jobid",
    },
    description: dict.meta.description,
    applicationName: "Jobid",
    authors: [{ name: "Josué Tejada" }],
    creator: "Josué Tejada",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((alt) => [alt, `/${alt}`])),
        "x-default": "/es",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Jobid",
      locale: localeTags[locale],
      alternateLocale: locales
        .filter((alt) => alt !== locale)
        .map((alt) => localeTags[alt]),
      url: `/${locale}`,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: dict.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <html
      lang={typedLocale}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        <ScrollProgress />
        <Header locale={typedLocale} nav={dict.nav} />
        <main id="contenido">{children}</main>
        <Footer locale={typedLocale} footer={dict.footer} />
      </body>
    </html>
  );
}
