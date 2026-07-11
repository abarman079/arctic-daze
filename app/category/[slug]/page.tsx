import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/products/product-grid";
import { getCategoryBySlug, getPublicProducts } from "@/lib/products/queries";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getPublicProducts({
    categoryId: category.id,
  });

  return (
    <main className="min-h-screen overflow-x-hidden px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <header className="flex flex-col justify-between gap-5 border-b border-[var(--ad-border)] pb-8 sm:flex-row sm:items-center">
          <Link href="/" className="font-display text-2xl font-bold tracking-[0.16em]">
            ARCTIC DAZE
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/collections"
              className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
            >
              All Products
            </Link>
            <Link
              href="/#contact"
              className="rounded-full bg-[var(--ad-black)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
            >
              Request Item
            </Link>
          </div>
        </header>

        <section className="paper-panel my-8 rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
            Category
          </p>
          <h1 className="font-display mt-4 break-words text-[clamp(3rem,7vw,7.2rem)] font-bold leading-[0.9] tracking-[-0.055em]">
            {category.name}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)] sm:text-lg">
            {category.description ||
              "Browse selected Arctic Daze products in this category."}
          </p>
        </section>

        <ProductGrid
          products={products}
          emptyTitle="No products in this category yet."
          emptyText="New drops are added from our Facebook page and supported Malaysian store requests."
        />
      </div>
    </main>
  );
}