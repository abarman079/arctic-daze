import { ArrowRight, Clock, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import type { ProductListItem } from "@/lib/products/types";
import { ProductImage } from "@/components/products/product-image";

type ProductCardProps = {
  product: ProductListItem;
};

function formatPrice(value: number | null) {
  if (!value) return "Quote on request";
  return `৳${value.toLocaleString("en-BD")}`;
}

function formatStatus(status: string) {
  if (status === "pre_order") return "Pre-order";
  if (status === "in_stock") return "In stock";
  if (status === "sold_out") return "Sold out";
  return status.replaceAll("_", " ");
}

export function ProductCard({ product }: ProductCardProps) {
  const coverImage = product.images[0]?.stored_url || "/editorial/community.png";
  const hoverImage = product.images[1]?.stored_url || coverImage;

  return (
    <article className="ad-lift group min-w-0 overflow-hidden rounded-[1.35rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-soft)] sm:rounded-[1.75rem]">
      <Link
        href={`/products/${product.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ad-accent)]"
        aria-label={`View ${product.title}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ad-card-2)]">
          <ProductImage
            src={coverImage}
            alt={product.images[0]?.alt || product.title}
            fill
            sizes="(max-width: 430px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-opacity duration-[800ms] md:group-hover:opacity-0"
          />

          <ProductImage
            src={hoverImage}
            alt={product.images[1]?.alt || product.title}
            fill
            sizes="(max-width: 430px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-[800ms] md:group-hover:opacity-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,20,17,0.18)] via-transparent to-transparent" />

          <div className="absolute left-3 top-3 rounded-full bg-[rgba(255,250,242,0.92)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ad-accent-dark)] backdrop-blur-md">
            {formatStatus(product.status)}
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={`Save ${product.title}`}
        className="absolute sr-only"
      />

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 truncate text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
            {product.category?.name || "Men’s Lifestyle"}
          </p>
          <button
            type="button"
            aria-label={`Save ${product.title}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--ad-border)] bg-[var(--ad-card-2)] text-[var(--ad-text)] hover:border-[var(--ad-accent)] hover:text-[var(--ad-accent-dark)]"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <h3 className="mt-3 min-h-14 break-words font-display text-2xl font-bold leading-[0.98] tracking-[-0.03em] text-[var(--ad-text)] sm:min-h-16 sm:text-3xl">
          {product.title}
        </h3>

        <div className="mt-4 grid gap-2 text-sm text-[var(--ad-text-soft)]">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-[var(--ad-accent)]" />
            <span className="min-w-0 truncate">
              ETA: {product.preorder_eta || "Quote first"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-[var(--ad-accent)]" />
            <span className="min-w-0 truncate">Malaysia source reference</span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
              Starting from
            </p>
            <p className="mt-1 text-lg font-bold text-[var(--ad-text)]">
              {formatPrice(product.price_bdt)}
            </p>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ad-black)] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
          >
            View Product <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}