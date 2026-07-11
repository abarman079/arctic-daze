import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductImage } from "@/components/products/product-image";
import { getProductBySlug, getPublicProducts } from "@/lib/products/queries";
import { WishlistButton } from "@/components/wishlist/wishlist-button";
type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(value: number | null) {
  if (!value) return "Quote on request";
  return `৳${value.toLocaleString("en-BD")}`;
}

function formatStatus(status: string) {
  if (status === "pre_order") return "Pre-order";
  if (status === "in_stock") return "In stock";
  return status.replaceAll("_", " ");
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const images =
    product.images.length > 0
      ? product.images
      : [
          {
            id: "fallback",
            stored_url: "/editorial/community.png",
            alt: product.title,
            position: 0,
            status: "stored",
          },
        ];

  const similarProducts = product.category?.id
    ? await getPublicProducts({
        categoryId: product.category.id,
        excludeSlug: product.slug,
        limit: 4,
      })
    : [];

  return (
    <main className="min-h-screen overflow-x-hidden px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-8 flex min-w-0 flex-col justify-between gap-5 border-b border-[var(--ad-border)] pb-8 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="min-w-0 break-words font-display text-2xl font-bold tracking-[0.16em]"
          >
            ARCTIC DAZE
          </Link>

          <Link
            href="/collections"
            className="inline-flex w-full items-center justify-center rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)] sm:w-auto"
          >
            Back to Collections
          </Link>
        </header>

        <nav className="mb-6 flex flex-wrap gap-2 text-sm text-[var(--ad-text-soft)]">
          <Link href="/" className="hover:text-[var(--ad-accent-dark)]">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/collections"
            className="hover:text-[var(--ad-accent-dark)]"
          >
            Collections
          </Link>
          {product.category ? (
            <>
              <span>/</span>
              <Link
                href={`/category/${product.category.slug}`}
                className="hover:text-[var(--ad-accent-dark)]"
              >
                {product.category.name}
              </Link>
            </>
          ) : null}
        </nav>

        <section className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
          <div className="grid min-w-0 gap-4">
            <div className="relative aspect-[4/5] min-w-0 overflow-hidden rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card-2)] shadow-[var(--shadow-soft)] lg:aspect-[5/6]">
              <ProductImage
                src={images[0].stored_url}
                alt={images[0].alt || product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {images.slice(0, 4).map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-[4/5] min-w-0 overflow-hidden rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card-2)]"
                >
                  <ProductImage
                    src={image.stored_url}
                    alt={image.alt || product.title}
                    fill
                    sizes="(max-width: 1024px) 25vw, 14vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="paper-panel min-w-0 rounded-[2rem] border border-[var(--ad-border)] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-accent-dark)]">
                  {formatStatus(product.status)}
                </span>
                <span className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-text-soft)]">
                  {product.category?.name || "Men’s Lifestyle"}
                </span>
              </div>

              <h1 className="mt-6 break-words font-display text-[clamp(2.6rem,4.4vw,5rem)] font-bold leading-[0.92] tracking-[-0.055em]">
                {product.title}
              </h1>

              <p className="mt-5 break-words text-base leading-8 text-[var(--ad-text-soft)]">
                {product.description}
              </p>

              <div className="mt-7 rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card)] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-muted)]">
                  Starting from
                </p>
                <p className="mt-2 text-3xl font-bold text-[var(--ad-text)]">
                  {formatPrice(product.price_bdt)}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--ad-text-soft)]">
                  Final price and availability are confirmed before order
                  approval.
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="flex items-start gap-3 rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card)] p-5">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ad-accent)]" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold">Estimated delivery</p>
                    <p className="mt-1 text-sm text-[var(--ad-text-soft)]">
                      {product.preorder_eta || "Confirmed during quote"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card)] p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ad-accent)]" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold">Advance payment</p>
                    <p className="mt-1 text-sm text-[var(--ad-text-soft)]">
                      {product.advance_required
                        ? "Required after quote confirmation."
                        : "Not required for this item."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--ad-black)] px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
                >
                  Request Pre-Order <ArrowRight className="h-4 w-4" />
                </Link>

                <WishlistButton
                  productId={product.id}
                  productTitle={product.title}
                  variant="full"
                />

                {product.facebook_url ? (
                  <a
                    href={product.facebook_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
                  >
                    View Facebook Post <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </div>

              <div className="mt-7 rounded-3xl bg-[var(--ad-accent-soft)] p-5">
                <p className="text-sm font-bold text-[var(--ad-text)]">
                  Pre-order note
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--ad-text-soft)]">
                  This item is imported by pre-order. Final availability depends
                  on supplier stock at purchase time.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-16 border-t border-[var(--ad-border)] pt-10">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--ad-muted)]">
              Similar products
            </p>
            <h2 className="font-display mt-2 text-4xl font-bold tracking-[-0.04em]">
              More from this category
            </h2>
          </div>

          <ProductGrid
            products={similarProducts}
            emptyTitle="No similar products yet."
            emptyText="More products from this category will appear here as the catalogue grows."
          />
        </section>
      </div>
    </main>
  );
}
