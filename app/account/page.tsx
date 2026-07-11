import {
  ArrowRight,
  BellRing,
  Bookmark,
  Heart,
  PackageSearch,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PendingWishlistHandler } from "@/components/wishlist/pending-wishlist-handler";
import { getAccountOverview } from "@/lib/account/queries";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, overview] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        "full_name, phone, messenger_url, whatsapp, preferred_contact_method",
      )
      .eq("id", user.id)
      .maybeSingle(),

    getAccountOverview(user.id),
  ]);

  const profileFields = [
    profile?.full_name,
    profile?.phone,
    profile?.preferred_contact_method,
  ];

  const completedFields = profileFields.filter(Boolean).length;
  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100,
  );

  const stats = [
    {
      title: "Wishlist",
      value: overview.wishlistCount,
      text: "Products saved for later.",
      href: "/account/wishlist",
      icon: Heart,
    },
    {
      title: "Saved Drafts",
      value: overview.savedDraftCount,
      text: "Order details saved before confirmation.",
      href: "/account/saved-items",
      icon: Bookmark,
    },
    {
      title: "Pre-Orders",
      value: overview.preorderCount,
      text: "Submitted requests and order progress.",
      href: "/account/preorders",
      icon: PackageSearch,
    },
    {
      title: "Restock Alerts",
      value: overview.restockAlertCount,
      text: "Product availability notifications.",
      href: "/collections",
      icon: BellRing,
    },
  ];

  return (
    <div className="min-w-0">
      <section className="paper-panel rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
          Customer Dashboard
        </p>

        <h1 className="font-display mt-4 max-w-4xl break-words text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em]">
          Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)]">
          Manage your saved products, order drafts, contact details, and future
          pre-order updates from one place.
        </p>

        <PendingWishlistHandler />
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="ad-lift rounded-[1.6rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-6 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ad-accent-soft)] text-[var(--ad-accent-dark)]">
                  <Icon className="h-5 w-5" />
                </span>

                <span className="font-display text-4xl font-bold">
                  {item.value}
                </span>
              </div>

              <h2 className="mt-7 text-lg font-bold">{item.title}</h2>

              <p className="mt-2 text-sm leading-7 text-[var(--ad-text-soft)]">
                {item.text}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-accent-dark)]">
                Open <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-7 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="flex items-center gap-3">
            <UserRound className="h-5 w-5 text-[var(--ad-accent)]" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--ad-muted)]">
              Profile progress
            </p>
          </div>

          <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.04em]">
            {profileCompletion}% complete
          </h2>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--ad-bg-soft)]">
            <div
              className="h-full rounded-full bg-[var(--ad-accent)]"
              style={{
                width: `${profileCompletion}%`,
              }}
            />
          </div>

          <p className="mt-5 text-sm leading-7 text-[var(--ad-text-soft)]">
            Complete your phone and contact preference so Arctic Daze can send
            quote and delivery updates clearly.
          </p>

          <Link
            href="/account/profile"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--ad-black)] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
          >
            Edit Profile <ArrowRight className="h-4 w-4" />
          </Link>
        </article>

        <article className="dark-panel rounded-[2rem] p-7 text-[var(--ad-white)] shadow-[var(--shadow-strong)] sm:p-8">
          <PackageSearch className="h-7 w-7 text-[var(--ad-accent-soft)]" />

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[var(--ad-accent-soft)]">
            Next customer feature
          </p>

          <h2 className="font-display mt-4 text-4xl font-bold leading-none tracking-[-0.04em]">
            Pre-order tracking arrives in Phase 5.
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#cabcad]">
            Submitted requests will later show quote, payment, sourcing,
            transit, arrival, and delivery status here.
          </p>

          <Link
            href="/account/preorders"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--ad-white)] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-black)]"
          >
            View Pre-Orders <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </section>
    </div>
  );
}
