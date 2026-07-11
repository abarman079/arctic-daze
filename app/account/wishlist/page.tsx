import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductCard } from "@/components/products/product-card";
import { ProductEmptyState } from "@/components/products/product-empty-state";
import { RemoveWishlistButton } from "@/components/wishlist/remove-wishlist-button";
import { getWishlistProducts } from "@/lib/wishlist/queries";
import { createClient } from "@/lib/supabase/server";

export default async function AccountWishlistPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/account/wishlist");
  }

  const products = await getWishlistProducts(user.id);

  return (
    <main className="min-h-screen overflow-x-hidden px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <header className="flex flex-col justify-between gap-5 border-b border-[var(--ad-border)] pb-8 sm:flex-row sm:items-center">
          <Link href="/account" className="font-display text-2xl font-bold tracking-[0.16em]">
            ARCTIC DAZE
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/account"
              className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
            >
              Account
            </Link>
            <Link
              href="/collections"
              className="rounded-full bg-[var(--ad-black)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
            >
              Browse Products
            </Link>
          </div>
        </header>

        <section className="paper-panel my-8 rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
            Wishlist
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.9] tracking-[-0.055em]">
            Saved Arctic Daze finds.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)] sm:text-lg">
            Save products you like, come back later, and send a product request when
            you are ready to confirm a quote.
          </p>
        </section>

        {products.length === 0 ? (
          <ProductEmptyState
            title="Your wishlist is empty."
            text="Save your favorite Arctic Daze finds and come back when you are ready to order."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {products.map((product) => (
              <div key={product.id} className="grid gap-3">
                <ProductCard product={product} />
                <RemoveWishlistButton productId={product.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}