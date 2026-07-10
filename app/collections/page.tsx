import Link from "next/link";
import { ProductGrid } from "@/components/products/product-grid";
import { getPublicProducts } from "@/lib/products/queries";

export default async function CollectionsPage() {
  const products = await getPublicProducts();

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <header className="flex flex-col justify-between gap-5 border-b border-[var(--ad-border)] pb-8 sm:flex-row sm:items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] text-xs font-bold tracking-[0.18em] text-[var(--ad-accent-dark)]">
              AD
            </span>
            <span className="font-display text-2xl font-bold tracking-[0.16em] text-[var(--ad-text)] sm:text-3xl">
              ARCTIC DAZE
            </span>
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/category/men-hoodies-sweatshirts"
              className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
            >
              Hoodies
            </Link>
            <Link
              href="/category/men-shirts-polos"
              className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
            >
              Polos
            </Link>
            <Link
              href="/category/sneakers"
              className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
            >
              Sneakers
            </Link>
            <Link
              href="/category/fragrance-cologne"
              className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
            >
              Fragrance
            </Link>
          </div>
        </header>

        <section className="paper-panel my-8 rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
            Product Browsing
          </p>
          <h1 className="font-display mt-4 max-w-5xl text-[clamp(3rem,7vw,7.6rem)] font-bold leading-[0.88] tracking-[-0.055em]">
            Browse men’s drops selected for Arctic Daze.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)] sm:text-lg">
            Explore public pre-order items, compare categories, open product details,
            and request a quote through the Arctic Daze ordering flow.
          </p>
        </section>

        <section>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--ad-muted)]">
                Available for request
              </p>
              <h2 className="font-display mt-2 text-4xl font-bold tracking-[-0.04em]">
                Latest pre-order picks
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[var(--ad-text-soft)]">
              Prices and availability are confirmed before order approval.
            </p>
          </div>

          <ProductGrid
            products={products}
            emptyTitle="No products in the catalogue yet."
            emptyText="Once Arctic Daze publishes pre-order items, they will appear here."
          />
        </section>
      </div>
    </main>
  );
}