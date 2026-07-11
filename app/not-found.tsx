import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1100px] items-center justify-center">
        <section className="paper-panel w-full rounded-[2rem] border border-[var(--ad-border)] p-7 text-center shadow-[var(--shadow-strong)] sm:p-10 lg:p-14">
          <Link href="/" className="inline-flex items-center justify-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] text-xs font-bold tracking-[0.18em] text-[var(--ad-accent-dark)]">
              AD
            </span>
            <span className="font-display text-3xl font-bold tracking-[0.16em]">
              ARCTIC DAZE
            </span>
          </Link>

          <div className="mx-auto mt-10 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ad-accent-soft)] text-[var(--ad-accent-dark)]">
            <Search className="h-7 w-7" />
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
            Page not found
          </p>

          <h1 className="font-display mx-auto mt-4 max-w-3xl text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.88] tracking-[-0.055em]">
            This Arctic Daze page is not available.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)]">
            The product, category, or page may have moved. You can return home,
            browse current products, or send us a product request.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
            >
              Back to Home
            </Link>

            <Link
              href="/collections"
              className="inline-flex items-center justify-center rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text)] hover:border-[var(--ad-accent)]"
            >
              Browse Collections
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
            >
              Request Product
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}