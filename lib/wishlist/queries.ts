import { createClient } from "@/lib/supabase/server";
import { getPublicProducts } from "@/lib/products/queries";
import type { ProductListItem } from "@/lib/products/types";

export async function getWishlistProducts(
  userId: string,
): Promise<ProductListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wishlist_items")
    .select("product_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getWishlistProducts error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return [];
  }

  const productIds = (data || []).map((item) => item.product_id);

  if (productIds.length === 0) {
    return [];
  }

  return getPublicProducts({
    productIds,
  });
}