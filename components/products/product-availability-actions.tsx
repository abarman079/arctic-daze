import {
  ArrowRight,
  ExternalLink,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";
import { RestockAlertForm } from "@/components/restock/restock-alert-form";
import { SaveDraftButton } from "@/components/saved-items/save-draft-button";
import { WishlistButton } from "@/components/wishlist/wishlist-button";
import {
  getUnavailableProductCopy,
  isProductUnavailable,
} from "@/lib/products/status";
import type { ProductDetail } from "@/lib/products/types";
import { createClient } from "@/lib/supabase/server";

type ProductAvailabilityActionsProps = {
  product: ProductDetail;
};

export async function ProductAvailabilityActions({
  product,
}: ProductAvailabilityActionsProps) {
  const unavailable = isProductUnavailable(
    product.status,
  );

  if (!unavailable) {
    return (
      <>
        <div className="mt-7 grid gap-3">
          <Link
            href={`/products/${product.slug}/preorder`}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--ad-black)] px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
          >
            Request Pre-Order
            <ArrowRight className="h-4 w-4" />
          </Link>

          <WishlistButton
            productId={product.id}
            productTitle={product.title}
            variant="full"
          />

          <SaveDraftButton
            productId={product.id}
            productSlug={product.slug}
          />

          {product.facebook_url ? (
            <a
              href={product.facebook_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
            >
              View Facebook Post
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <div className="mt-7 rounded-3xl bg-[var(--ad-accent-soft)] p-5">
          <p className="text-sm font-bold text-[var(--ad-text)]">
            Pre-order note
          </p>

          <p className="mt-2 text-sm leading-7 text-[var(--ad-text-soft)]">
            This item is imported by pre-order. Final
            availability depends on supplier stock at
            purchase time.
          </p>
        </div>
      </>
    );
  }

  const availabilityCopy =
    getUnavailableProductCopy(product.status);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select(
          "full_name, phone, preferred_contact_method",
        )
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };

  const similarHref = product.category
    ? `/category/${product.category.slug}`
    : "/collections";

  return (
    <div className="mt-7">
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="inline-flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-full bg-[var(--ad-muted)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] opacity-70"
      >
        <LockKeyhole className="h-4 w-4" />
        Pre-Order Unavailable
      </button>

      <div className="mt-5 rounded-3xl bg-[var(--ad-accent-soft)] p-5 sm:p-6">
        <p className="text-lg font-bold text-[var(--ad-text)]">
          {availabilityCopy.title}
        </p>

        <p className="mt-3 text-sm leading-7 text-[var(--ad-text-soft)]">
          {availabilityCopy.text}
        </p>

        <RestockAlertForm
          productId={product.id}
          productTitle={product.title}
          profile={profile}
          email={user?.email || ""}
        />
      </div>

      <Link
        href={similarHref}
        className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text)] hover:border-[var(--ad-accent)]"
      >
        Find Similar Items
        <ArrowRight className="h-4 w-4" />
      </Link>

      {product.facebook_url ? (
        <a
          href={product.facebook_url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
        >
          View Original Post
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}
    </div>
  );
}