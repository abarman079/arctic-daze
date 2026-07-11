"use client";

import { ArrowRight, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ProductImage } from "@/components/products/product-image";
import type { SavedOrderDraft } from "@/lib/saved-items/queries";
import { createClient } from "@/lib/supabase/client";

type SavedDraftCardProps = {
  draft: SavedOrderDraft;
};

function formatPrice(price: number | null) {
  if (!price) return "Quote on request";
  return `৳${price.toLocaleString("en-BD")}`;
}

export function SavedDraftCard({
  draft,
}: SavedDraftCardProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login?redirectTo=/account/saved-items");
      return;
    }

    const quantity = Math.max(
      1,
      Math.min(
        20,
        Number(formData.get("quantity") || 1),
      ),
    );

    const { error } = await supabase
      .from("saved_order_drafts")
      .update({
        size:
          String(formData.get("size") || "").trim() ||
          null,
        color:
          String(formData.get("color") || "").trim() ||
          null,
        quantity,
        note:
          String(formData.get("note") || "").trim() ||
          null,
      })
      .eq("id", draft.id)
      .eq("user_id", user.id);

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Draft updated.");
    router.refresh();
  }

  async function handleDelete() {
    setLoading(true);
    setMessage("");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login?redirectTo=/account/saved-items");
      return;
    }

    const { error } = await supabase
      .from("saved_order_drafts")
      .delete()
      .eq("id", draft.id)
      .eq("user_id", user.id);

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.refresh();
  }

  if (!draft.product) {
    return null;
  }

  const image =
    draft.product.image?.stored_url ||
    "/editorial/community.png";

  return (
    <article className="grid min-w-0 overflow-hidden rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-soft)] md:grid-cols-[220px_minmax(0,1fr)]">
      <Link
        href={`/products/${draft.product.slug}`}
        className="relative aspect-[4/5] min-h-[280px] overflow-hidden bg-[var(--ad-card-2)] md:aspect-auto md:min-h-full"
      >
        <ProductImage
          src={image}
          fallbackSrc="/editorial/community.png"
          alt={
            draft.product.image?.alt ||
            draft.product.title
          }
          fill
          sizes="(max-width: 768px) 100vw, 220px"
          className="object-cover"
        />
      </Link>

      <form
        onSubmit={handleUpdate}
        className="min-w-0 p-6 sm:p-7"
      >
        <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-accent)]">
              Saved order draft
            </p>

            <h2 className="font-display mt-3 break-words text-3xl font-bold leading-none tracking-[-0.04em]">
              {draft.product.title}
            </h2>

            <p className="mt-3 text-lg font-bold">
              {formatPrice(draft.product.price_bdt)}
            </p>
          </div>

          <Link
            href={`/products/${draft.product.slug}`}
            className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-accent-dark)]"
          >
            Product <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
              Size
            </span>

            <input
              name="size"
              defaultValue={draft.size || ""}
              placeholder="M, L, XL"
              className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-3 outline-none focus:border-[var(--ad-accent)]"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
              Color
            </span>

            <input
              name="color"
              defaultValue={draft.color || ""}
              placeholder="Black"
              className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-3 outline-none focus:border-[var(--ad-accent)]"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
              Quantity
            </span>

            <input
              name="quantity"
              type="number"
              min={1}
              max={20}
              defaultValue={draft.quantity}
              className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-3 outline-none focus:border-[var(--ad-accent)]"
            />
          </label>
        </div>

        <label className="mt-4 grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
            Note
          </span>

          <textarea
            name="note"
            defaultValue={draft.note || ""}
            placeholder="Preferred size, color, source link, or questions"
            className="min-h-28 min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-3 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>

        {message ? (
          <p className="mt-4 text-sm font-semibold text-[var(--ad-accent-dark)]">
            {message}
          </p>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--ad-black)] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)] disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : "Update Draft"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)] disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      </form>
    </article>
  );
}