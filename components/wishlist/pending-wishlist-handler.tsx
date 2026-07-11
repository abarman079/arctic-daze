"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function PendingWishlistHandler() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function savePendingWishlist() {
      const productId = localStorage.getItem("ad_pending_wishlist_product_id");

      if (!productId) return;

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

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

      localStorage.removeItem("ad_pending_wishlist_product_id");

      if (!error) {
        setMessage("Product saved to your wishlist.");
      }
    }

    savePendingWishlist();
  }, []);

  if (!message) return null;

  return (
    <div className="mt-6 rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-5 py-4 text-sm font-semibold text-[var(--ad-text-soft)]">
      {message}
    </div>
  );
}