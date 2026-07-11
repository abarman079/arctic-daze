import { createClient } from "@/lib/supabase/server";

type CountResult = {
  count: number | null;
  error: {
    message: string;
  } | null;
};

function safeCount(result: CountResult) {
  if (result.error) {
    console.error("Account count error:", result.error.message);
    return 0;
  }

  return result.count || 0;
}

export async function getAccountOverview(userId: string) {
  const supabase = await createClient();

  const [wishlistResult, draftsResult, restockResult] = await Promise.all([
    supabase
      .from("wishlist_items")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId),

    supabase
      .from("saved_order_drafts")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId),

    supabase
      .from("restock_alerts")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId),
  ]);

  return {
    wishlistCount: safeCount(wishlistResult),
    savedDraftCount: safeCount(draftsResult),
    restockAlertCount: safeCount(restockResult),
  };
}