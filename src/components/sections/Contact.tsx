"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AmbientBackdrop } from "@/components/ui/AmbientBackdrop";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/types";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const fieldClass =
  "w-full rounded-lg border border-hairline bg-ink-900/70 px-4 py-3 text-sm text-ink-50 " +
  "placeholder:text-faint transition-colors duration-200 " +
  "hover:border-hairline-strong focus:border-ember-500/60 focus:outline-none " +
  "aria-[invalid=true]:border-ember-600";

const labelClass = "font-mono text-2xs tracking-widest text-faint uppercase";

export function Contact({ contact }: { contact: Dictionary["contact"] }) {
  const formId = useId();
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const t = contact.form;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      service: String(data.get("service") ?? ""),
      budget: String(data.get("budget") ?? ""),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    };

    // Validación en cliente para responder al instante; el servidor
    // vuelve a validar porque nunca se confía en el navegador.
    const nextErrors: Errors = {};
    if (values.name.length < 2) nextErrors.name = t.errorRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
      nextErrors.email = t.errorEmail;
    }
    if (values.message.length < 10) nextErrors.message = t.errorRequired;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Lleva el foco al primer campo con problema
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`${formId}-${firstKey}`)?.focus();
      return;
    }

    setStatus("submitting");
    setFormError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      const payload = await response.json().catch(() => null);
      if (payload?.fieldErrors) {
        setErrors({
          name: payload.fieldErrors.name ? t.errorRequired : undefined,
          email: payload.fieldErrors.email ? t.errorEmail : undefined,
          message: payload.fieldErrors.message ? t.errorRequired : undefined,
        });
        setStatus("idle");
        return;
      }

      setStatus("error");
      setFormError(t.errorGeneric);
    } catch {
      setStatus("error");
      setFormError(t.errorGeneric);
    }
  }

  return (
    <Section id="contacto" tinted className="overflow-hidden">
      <AmbientBackdrop variant="section" />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col">
            <SectionHeading
              eyebrow={contact.eyebrow}
              title={contact.title}
              lede={contact.lede}
            />

            <Reveal delay={0.15}>
              <dl className="mt-10 flex flex-col gap-4 border-t border-hairline pt-8">
                {contact.direct.map((entry) => (
                  <div
                    key={entry.label}
                    className="flex items-center justify-between gap-4"
                  >
                    <dt className={labelClass}>{entry.label}</dt>
                    <dd>
                      <a
                        href={entry.href}
                        className="group inline-flex items-center gap-2 text-sm text-ink-100 transition-colors hover:text-ember-400"
                      >
                        {entry.value}
                        <ArrowRight
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} direction="left">
            <div className="surface-card edge-light grain p-7 sm:p-9">
              {status === "success" ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-96 flex-col items-center justify-center gap-5 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-ember-500/12 text-ember-400">
                    <Check className="size-7" aria-hidden />
                  </span>
                  <h3 className="text-2xl text-ink-50">{t.successTitle}</h3>
                  <p className="max-w-sm text-sm text-muted">{t.successBody}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Trampa antispam: fuera de pantalla y fuera del orden de tabulación */}
                  <div aria-hidden className="absolute -left-[9999px]">
                    <label htmlFor={`${formId}-website`}>No rellenar</label>
                    <input
                      id={`${formId}-website`}
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id={`${formId}-name`}
                      name="name"
                      label={t.name}
                      placeholder={t.namePlaceholder}
                      autoComplete="name"
                      required
                      error={errors.name}
                    />
                    <Field
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      label={t.email}
                      placeholder={t.emailPlaceholder}
                      autoComplete="email"
                      required
                      error={errors.email}
                    />
                  </div>

                  <Field
                    id={`${formId}-company`}
                    name="company"
                    label={t.company}
                    placeholder={t.companyPlaceholder}
                    autoComplete="organization"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select
                      id={`${formId}-service`}
                      name="service"
                      label={t.service}
                      options={t.serviceOptions}
                    />
                    <Select
                      id={`${formId}-budget`}
                      name="budget"
                      label={t.budget}
                      options={t.budgetOptions}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor={`${formId}-message`} className={labelClass}>
                      {t.message} <span aria-hidden className="text-ember-500">*</span>
                    </label>
                    <textarea
                      id={`${formId}-message`}
                      name="message"
                      rows={5}
                      required
                      placeholder={t.messagePlaceholder}
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={
                        errors.message ? `${formId}-message-error` : undefined
                      }
                      className={cn(fieldClass, "resize-y")}
                    />
                    {errors.message ? (
                      <p
                        id={`${formId}-message-error`}
                        className="text-xs text-ember-400"
                      >
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  {formError ? (
                    <p
                      role="alert"
                      className="flex items-start gap-2.5 rounded-lg border border-ember-600/40 bg-ember-900/20 px-4 py-3 text-sm text-ember-200"
                    >
                      <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                      {formError}
                    </p>
                  ) : null}

                  <div className="mt-2 flex flex-col gap-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "submitting"}
                      className="w-full"
                    >
                      {status === "submitting" ? t.submitting : t.submit}
                      {status === "submitting" ? null : (
                        <ArrowRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden
                        />
                      )}
                    </Button>
                    <p className="text-center text-2xs leading-relaxed text-faint">
                      {t.privacy}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}{" "}
        {required ? (
          <span aria-hidden className="text-ember-500">
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-ember-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  name,
  label,
  options,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className={cn(fieldClass, "appearance-none pr-10")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%236b675f' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          backgroundSize: "1rem 1rem",
        }}
      >
        <option value="" disabled>
          —
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-ink-900">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
