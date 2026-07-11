"use client";

import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type SaveDraftButtonProps = {
  productId: string;
  productSlug: string;
};

export function SaveDraftButton({
  productId,
  productSlug,
}: SaveDraftButtonProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (loading) return;

    setLoading(true);
    setMessage("");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(
        `/login?redirectTo=${encodeURIComponent(
          `/products/${productSlug}`,
        )}`,
      );

      return;
    }

    const { error } = await supabase
      .from("saved_order_drafts")
      .upsert(
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
      setMessage(error.message);
      return;
    }

    setMessage("Order draft saved.");
    router.refresh();
  }

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Bookmark className="h-4 w-4" />

        {loading ? "Saving Draft..." : "Save Order Draft"}
      </button>

      {message ? (
        <p className="text-center text-xs font-semibold text-[var(--ad-accent-dark)]">
          {message}
        </p>
      ) : null}
    </div>
  );
}