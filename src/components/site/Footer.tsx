import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Logo } from "./Logo";
import { AmbientBackdrop } from "@/components/ui/AmbientBackdrop";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

export function Footer({
  locale,
  footer,
}: {
  locale: Locale;
  footer: Dictionary["footer"];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-hairline bg-ink-950">
      <AmbientBackdrop variant="section" />

      <div className="container-page relative pt-16 pb-10 sm:pt-20 sm:pb-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-5">
            <Link href={`/${locale}`} className="w-fit">
              <Logo />
              <span className="sr-only">Jobid</span>
            </Link>
            <p className="max-w-sm text-sm text-muted">{footer.tagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footer.sections.map((section) => (
              <nav key={section.title} aria-label={section.title}>
                <h3 className="font-mono text-2xs tracking-widest text-faint uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted transition-colors duration-200 hover:text-azure-400"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-2xs text-faint">
            © {year} Jobid. {footer.rights}
          </p>
          <p className="font-mono text-2xs text-faint">{footer.builtWith}</p>
          <a
            href="#contenido"
            className="group inline-flex items-center gap-2 font-mono text-2xs tracking-widest text-faint uppercase transition-colors hover:text-azure-400"
          >
            {footer.backToTop}
            <ArrowUp
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>

      {/* Palabra de marca a sangre: cierre editorial del sitio. El recorte
          se expresa en em para que sea idéntico a cualquier ancho. */}
      <div
        aria-hidden
        className="relative -mt-4 -mb-[0.18em] overflow-hidden select-none"
      >
        <p className="bg-gradient-to-b from-ink-700/60 to-ink-950 bg-clip-text text-center font-display text-[17vw] leading-[0.8] font-semibold tracking-tighter text-transparent">
          Jobid
        </p>
      </div>
    </footer>
  );
}
