"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function GoogleButton() {
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/account`,
      },
    });

    if (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text)] hover:-translate-y-1 hover:border-[var(--ad-accent)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-black text-[var(--ad-text)]">
        G
      </span>
      {loading ? "Opening Google..." : "Continue with Google"}
    </button>
  );
}