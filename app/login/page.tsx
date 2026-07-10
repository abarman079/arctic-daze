"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { createClient } from "@/lib/supabase/client";
import { GoogleButton } from "@/components/auth/google-button";
export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    const redirectTo =
      new URLSearchParams(window.location.search).get("redirectTo") ||
      "/account";

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <AuthShell
      eyebrow="Customer Login"
      title="Welcome back."
      description="Sign in to view your Arctic Daze profile, pre-order requests, wishlist, and saved product details."
      footer={
        <p className="text-sm leading-7 text-[var(--ad-text-soft)]">
          New to Arctic Daze?{" "}
          <Link
            href="/signup"
            className="font-bold text-[var(--ad-accent-dark)] hover:underline"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <div className="grid gap-5">
        <GoogleButton />

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-[var(--ad-border)]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-muted)]">
            Or use email
          </span>
          <div className="h-px flex-1 bg-[var(--ad-border)]" />
        </div>

        <form onSubmit={handleLogin} className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
              placeholder="Your password"
            />
          </label>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-[var(--ad-accent-dark)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {message ? (
            <div className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-3 text-sm leading-6 text-[var(--ad-text-soft)]">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:-translate-y-1 hover:bg-[var(--ad-accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
