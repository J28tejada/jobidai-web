import { cn } from "@/lib/utils";

/** Marca: punto incandescente + palabra. El punto es el "sistema encendido". */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative flex h-2.5 w-2.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full rounded-full bg-violeta-500 opacity-60 motion-safe:animate-pulse-ring" />
        <span className="bg-marca relative inline-flex h-2.5 w-2.5 rounded-full" />
      </span>
      <span className="font-display text-lg leading-none font-semibold tracking-tight text-ink-50">
        Jobid
      </span>
    </span>
  );
}
