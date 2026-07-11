import { Bookmark } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SavedDraftCard } from "@/components/saved-items/saved-draft-card";
import { getSavedOrderDrafts } from "@/lib/saved-items/queries";
import { createClient } from "@/lib/supabase/server";

export default async function SavedItemsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/account/saved-items");
  }

  const drafts = await getSavedOrderDrafts(user.id);

  return (
    <div className="min-w-0">
      <section className="paper-panel rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
          Saved Items
        </p>

        <h1 className="font-display mt-4 max-w-4xl break-words text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em]">
          Prepare an order before confirming.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)]">
          Save size, color, quantity, and product notes. A saved draft is not
          an order and does not reserve supplier stock.
        </p>
      </section>

      {drafts.length === 0 ? (
        <section className="mt-6 rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-8 text-center shadow-[var(--shadow-soft)] sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ad-accent-soft)] text-[var(--ad-accent-dark)]">
            <Bookmark className="h-6 w-6" />
          </span>

          <h2 className="font-display mt-6 text-4xl font-bold tracking-[-0.04em]">
            No saved order drafts yet.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--ad-text-soft)]">
            Open a product and choose Save Order Draft to prepare your size,
            color, quantity, and notes.
          </p>

          <Link
            href="/collections"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
          >
            Browse Products
          </Link>
        </section>
      ) : (
        <section className="mt-6 grid gap-5">
          {drafts.map((draft) => (
            <SavedDraftCard key={draft.id} draft={draft} />
          ))}
        </section>
      )}
    </div>
  );
}