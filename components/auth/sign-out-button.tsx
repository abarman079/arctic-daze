"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-text)] hover:border-[var(--ad-accent)]"
    >
      Sign Out
    </button>
  );
}