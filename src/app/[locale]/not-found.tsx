import Link from "next/link";
import { AmbientBackdrop } from "@/components/ui/AmbientBackdrop";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-24">
      <AmbientBackdrop variant="hero" />
      <div className="container-page relative flex flex-col items-start gap-6">
        <span className="eyebrow">Error 404</span>
        <h1 className="max-w-2xl text-5xl text-ink-50">
          Esta página no existe
          <span className="block text-muted">This page does not exist</span>
        </h1>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/es"
            className="rounded-full bg-ember-500 px-6 py-3 text-sm font-medium text-ink-950 transition-colors hover:bg-ember-400"
          >
            Volver al inicio
          </Link>
          <Link
            href="/en"
            className="rounded-full border border-hairline-strong px-6 py-3 text-sm font-medium text-ink-100 transition-colors hover:border-ember-500/50"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
