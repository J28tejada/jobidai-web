import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span className="eyebrow inline-flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-azure-500"
          />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className={cn(
            "max-w-3xl text-4xl text-ink-50",
            align === "center" && "mx-auto",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal delay={0.14}>
          <p
            className={cn(
              "max-w-2xl text-lg text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
