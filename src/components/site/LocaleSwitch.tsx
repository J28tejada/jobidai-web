"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Cambio de idioma conservando la ruta actual: solo sustituye el primer
 * segmento. Se renderiza como enlaces reales para que funcione sin
 * JavaScript y para que los buscadores sigan ambas versiones.
 */
export function LocaleSwitch({
  current,
  label,
  className,
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  function pathFor(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-hairline bg-ink-800/50 p-0.5 backdrop-blur-sm",
        className,
      )}
      role="group"
      aria-label={label}
    >
      {locales.map((locale) => {
        const isActive = locale === current;
        return (
          <Link
            key={locale}
            href={pathFor(locale)}
            hrefLang={locale}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 font-mono text-2xs tracking-widest uppercase transition-colors duration-200",
              isActive
                ? "bg-ember-500 text-ink-950"
                : "text-faint hover:text-ink-100",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
