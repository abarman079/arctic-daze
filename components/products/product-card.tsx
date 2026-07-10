import { ArrowRight, Clock, Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProductListItem } from "@/lib/products/types";

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
  const coverImage =
    product.images[0]?.stored_url || "/editorial/arctic-daze-flatlay-community.png";
  const hoverImage = product.images[1]?.stored_url || coverImage;

  return (
    <article className="ad-lift group overflow-hidden rounded-[1.5rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-soft)] sm:rounded-[1.75rem]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ad-card-2)]">
        <Image
          src={coverImage}
          alt={product.images[0]?.alt || product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-opacity duration-[800ms] group-hover:opacity-0"
        />

        <Image
          src={hoverImage}
          alt={product.images[1]?.alt || product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover opacity-0 transition-opacity duration-[800ms] group-hover:opacity-100"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,20,17,0.22)] via-transparent to-transparent" />

        <div className="absolute left-3 top-3 rounded-full bg-[rgba(255,250,242,0.92)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ad-accent-dark)] backdrop-blur-md">
          {formatStatus(product.status)}
        </div>

        <button
          type="button"
          aria-label="Save product"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,250,242,0.92)] text-[var(--ad-text)] backdrop-blur-md hover:text-[var(--ad-accent-dark)]"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
            {product.category?.name || "Men’s Lifestyle"}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ad-accent-dark)]">
            Malaysia
          </p>
        </div>

        <h3 className="mt-3 min-h-16 font-display text-2xl font-bold leading-[0.95] tracking-[-0.03em] text-[var(--ad-text)] sm:text-3xl">
          {product.title}
        </h3>

        <div className="mt-4 grid gap-2 text-sm text-[var(--ad-text-soft)]">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[var(--ad-accent)]" />
            <span>ETA: {product.preorder_eta || "Quote first"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[var(--ad-accent)]" />
            <span>Source reference on request</span>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
              Starting from
            </p>
            <p className="mt-1 text-lg font-bold text-[var(--ad-text)]">
              {formatPrice(product.price_bdt)}
            </p>
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--ad-black)] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
            aria-label={`View ${product.title}`}
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}