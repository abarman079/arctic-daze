"use client";

import { Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type WishlistButtonProps = {
  productId: string;
  productTitle: string;
  variant?: "icon" | "full";
};

export function WishlistButton({
  productId,
  productTitle,
  variant = "icon",
}: WishlistButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (loading) return;

    setLoading(true);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      localStorage.setItem("ad_pending_wishlist_product_id", productId);
      localStorage.setItem("ad_pending_wishlist_from", pathname || "/collections");

      router.push(`/login?redirectTo=/account`);
      return;
    }

    const { error } = await supabase.from("wishlist_items").upsert(
      {
        user_id: user.id,
        product_id: productId,
      },
      {
        onConflict: "user_id,product_id",
        ignoreDuplicates: true,
      },
    );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSaved(true);
    router.refresh();
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleSave}
        disabled={loading || saved}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text)] hover:border-[var(--ad-accent)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Heart className={saved ? "h-4 w-4 fill-current" : "h-4 w-4"} />
        {saved ? "Saved to Wishlist" : loading ? "Saving..." : "Save to Wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={loading || saved}
      aria-label={
        saved ? `${productTitle} saved to wishlist` : `Save ${productTitle}`
      }
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--ad-border)] bg-[var(--ad-card-2)] text-[var(--ad-text)] hover:border-[var(--ad-accent)] hover:text-[var(--ad-accent-dark)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <Heart className={saved ? "h-4 w-4 fill-current" : "h-4 w-4"} />
    </button>
  );
}