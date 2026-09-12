"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { LocaleSwitch } from "./LocaleSwitch";
import { ButtonLink } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function Header({
  locale,
  nav,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Fondo sólido en cuanto se abandona el hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sección visible → enlace resaltado
  useEffect(() => {
    const ids = nav.links.map((link) => link.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [nav.links]);

  // Menú móvil: bloquea el scroll y cierra con Escape
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    // El foco entra en el panel para que el teclado no quede detrás
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-azure-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        {nav.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-b border-hairline bg-ink-950/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          className="container-page flex h-18 items-center justify-between gap-6"
          aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}
        >
          <Link
            href={`/${locale}`}
            className="shrink-0 rounded-md transition-opacity hover:opacity-80"
          >
            <Logo />
            <span className="sr-only">Jobid — inicio</span>
          </Link>

          {/* Navegación de escritorio */}
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.links.map((link) => {
              const isActive = activeId === link.href.replace("#", "");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                      isActive
                        ? "text-ink-50"
                        : "text-muted hover:text-ink-100",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ink-800"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <LocaleSwitch
              current={locale}
              label={nav.langLabel}
              className="hidden sm:flex"
            />
            <ButtonLink
              href="#contacto"
              size="sm"
              className="hidden sm:inline-flex"
            >
              {nav.cta}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? nav.menuClose : nav.menuOpen}
              className="inline-flex size-10 items-center justify-center rounded-full border border-hairline bg-ink-800/50 text-ink-100 transition-colors hover:border-hairline-strong lg:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            ref={panelRef}
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-45 overflow-y-auto bg-ink-950/97 pt-24 pb-12 backdrop-blur-2xl outline-none lg:hidden"
          >
            <div className="container-page flex flex-col gap-8">
              <ul className="flex flex-col">
                {nav.links.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.05 + index * 0.05,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-hairline"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-5 font-display text-2xl text-ink-50"
                    >
                      {link.label}
                      <ArrowUpRight className="size-5 text-faint" aria-hidden />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-5">
                <ButtonLink
                  href="#contacto"
                  size="lg"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  {nav.cta}
                  <ArrowUpRight className="size-4" aria-hidden />
                </ButtonLink>
                <LocaleSwitch
                  current={locale}
                  label={nav.langLabel}
                  className="self-start"
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
