import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium " +
  "whitespace-nowrap rounded-full transition-all duration-300 ease-[var(--ease-out-expo)] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ember-500 text-ink-950 shadow-[0_0_0_0_var(--color-ember-500)] " +
    "hover:bg-ember-400 hover:shadow-[0_8px_32px_-8px_var(--color-ember-500)] " +
    "hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "border border-hairline-strong bg-ink-800/60 text-ink-50 backdrop-blur-sm " +
    "hover:border-ember-500/50 hover:bg-ink-700/60 hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-muted hover:text-ink-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonBaseProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonBaseProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
