import { CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { PendingWishlistHandler } from "@/components/wishlist/pending-wishlist-handler";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, preferred_contact_method, role")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <header className="flex flex-col justify-between gap-5 border-b border-[var(--ad-border)] pb-8 sm:flex-row sm:items-center">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] text-xs font-bold tracking-[0.18em] text-[var(--ad-accent-dark)]">
              AD
            </span>
            <span className="font-display text-2xl font-bold tracking-[0.16em] text-[var(--ad-text)] sm:text-3xl">
              ARCTIC DAZE
            </span>
          </a>

          <SignOutButton />
        </header>

        <section className="paper-panel mt-10 rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
            Customer Dashboard
          </p>

          <h1 className="font-display mt-4 text-[clamp(2.7rem,5.5vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.045em]">
            Your Arctic Daze account.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)]">
            Manage your profile, wishlist, saved products, pre-order requests,
            and account details from your Arctic Daze dashboard.
          </p>

          <PendingWishlistHandler />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Signed In",
                text: user.email || "Authenticated customer",
              },
              {
                title: "Profile",
                text: profile?.full_name || "Profile will be completed later",
              },
              {
                title: "Role",
                text: profile?.role || "customer",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card)] p-6"
              >
                <CheckCircle2 className="h-5 w-5 text-[var(--ad-accent)]" />

                <h2 className="mt-5 text-sm font-bold uppercase tracking-[0.16em]">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-[var(--ad-text-soft)]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <a
            href="/account/profile"
            className="rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card)] p-6 text-sm font-semibold text-[var(--ad-text-soft)] hover:-translate-y-1 hover:border-[var(--ad-accent)]"
          >
            Edit your contact profile
          </a>

          <a
            href="/account/wishlist"
            className="rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card)] p-6 text-sm font-semibold text-[var(--ad-text-soft)] hover:-translate-y-1 hover:border-[var(--ad-accent)]"
          >
            View your wishlist
          </a>

          <div className="rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card)] p-6 text-sm font-semibold text-[var(--ad-text-soft)]">
            Pre-order requests coming in Phase 5
          </div>
        </section>
      </div>
    </main>
  );
}