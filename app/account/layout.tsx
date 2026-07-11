import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AccountNav } from "@/components/account/account-nav";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { createClient } from "@/lib/supabase/server";

type AccountLayoutProps = {
  children: ReactNode;
};

export default async function AccountLayout({
  children,
}: AccountLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/account");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="min-h-screen overflow-x-hidden px-5 py-6 sm:px-8 lg:px-12 lg:py-8">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="flex flex-col justify-between gap-6 border-b border-[var(--ad-border)] pb-7 sm:flex-row sm:items-center">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] text-xs font-bold tracking-[0.18em] text-[var(--ad-accent-dark)]">
              AD
            </span>

            <span className="font-display text-2xl font-bold tracking-[0.16em] sm:text-3xl">
              ARCTIC DAZE
            </span>
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[var(--ad-text)]">
                {profile?.full_name || "Arctic Daze Customer"}
              </p>
              <p className="truncate text-xs text-[var(--ad-muted)]">
                {user.email}
              </p>
            </div>

            <SignOutButton />
          </div>
        </header>

        <div className="grid min-w-0 gap-8 py-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
            <AccountNav />
          </aside>

          <section className="min-w-0">{children}</section>
        </div>
      </div>
    </main>
  );
}