import Link from "next/link";
import { ProductGrid } from "@/components/products/product-grid";
import {
  formatProductStatus,
  isPublicProductStatus,
  PUBLIC_PRODUCT_STATUSES,
} from "@/lib/products/status";
import { getActiveCategories, getPublicProducts } from "@/lib/products/queries";

type CollectionsPageProps = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    category?: string;
    sort?: string;
  }>;
};

function isValidStatus(value?: string) {
  return isPublicProductStatus(value);
}

function isValidSort(
  value?: string,
): value is "newest" | "price-asc" | "price-desc" {
  return value === "newest" || value === "price-asc" || value === "price-desc";
}

export default async function CollectionsPage({
  searchParams,
}: CollectionsPageProps) {
  const params = (await searchParams) || {};
  const categories = await getActiveCategories();

  const selectedCategory = categories.find(
    (category) => category.slug === params.category,
  );

  const status = isValidStatus(params.status) ? params.status : undefined;
  const sort = isValidSort(params.sort) ? params.sort : "newest";
  const search = params.q || "";

  const products = await getPublicProducts({
    categoryId: selectedCategory?.id,
    search,
    status,
    sort,
  });

  return (
    <main className="min-h-screen overflow-x-hidden px-5 py-8 sm:px-8 lg:px-12">
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

          <Link
            href="/#contact"
            className="rounded-full bg-[var(--ad-black)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
          >
            Request Product
          </Link>
        </header>

        <section className="paper-panel my-8 rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
            Product Browsing
          </p>
          <h1 className="font-display mt-4 max-w-5xl text-[clamp(3rem,7vw,7.6rem)] font-bold leading-[0.88] tracking-[-0.055em]">
            Browse men’s drops selected for Arctic Daze.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)] sm:text-lg">
            Search products, filter by category, compare prices, and open
            product details before sending your pre-order request.
          </p>
        </section>

        <section className="mb-8 rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-5 shadow-[var(--shadow-soft)] sm:p-6">
          <form
            action="/collections"
            className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr_auto]"
          >
            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                Search
              </span>
              <input
                name="q"
                defaultValue={search}
                placeholder="hoodie, polo, sneaker, fragrance"
                className="h-12 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 text-sm outline-none focus:border-[var(--ad-accent)]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                Category
              </span>
              <select
                name="category"
                defaultValue={params.category || ""}
                className="h-12 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 text-sm outline-none focus:border-[var(--ad-accent)]"
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                Status
              </span>
              <select
                name="status"
                defaultValue={status || ""}
                className="h-12 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 text-sm outline-none focus:border-[var(--ad-accent)]"
              >
                <option value="">All statuses</option>

                {PUBLIC_PRODUCT_STATUSES.map((productStatus) => (
                  <option key={productStatus} value={productStatus}>
                    {formatProductStatus(productStatus)}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                Sort
              </span>
              <select
                name="sort"
                defaultValue={sort}
                className="h-12 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 text-sm outline-none focus:border-[var(--ad-accent)]"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price low</option>
                <option value="price-desc">Price high</option>
              </select>
            </label>

            <div className="flex items-end">
              <button
                type="submit"
                className="h-12 w-full rounded-full bg-[var(--ad-black)] px-6 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
              >
                Apply
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--ad-border)] pt-5">
            <p className="text-sm font-semibold text-[var(--ad-text-soft)]">
              Showing {products.length} result{products.length === 1 ? "" : "s"}
            </p>

            <Link
              href="/collections"
              className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-accent-dark)] hover:underline"
            >
              Clear filters
            </Link>
          </div>
        </section>

        <section className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/collections"
            className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
          >
            All
          </Link>
          {categories
            .filter((category) =>
              [
                "men-hoodies-sweatshirts",
                "men-shirts-polos",
                "sneakers",
                "fragrance-cologne",
                "daily-essentials",
              ].includes(category.slug),
            )
            .map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
              >
                {category.name}
              </Link>
            ))}
        </section>

        <ProductGrid
          products={products}
          emptyTitle="No matching products found."
          emptyText="Try a simpler keyword like hoodie, polo, sneaker, fragrance, or clear your filters."
        />
      </div>
    </main>
  );
}
