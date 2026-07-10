"use client";
import { GoogleButton } from "@/components/auth/google-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (password !== confirmPassword) {
      setLoading(false);
      setMessage("Passwords do not match.");
      return;
    }

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/account`,
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.session) {
      router.push("/account");
      router.refresh();
      return;
    }

    setMessage(
      "Account created. Please check your email to confirm your account before signing in.",
    );
  }

  return (
    <AuthShell
      eyebrow="Create Account"
      title="Start your Arctic Daze profile."
      description="Create an account to save products, request pre-orders, and track your customer details as the store grows."
      footer={
        <p className="text-sm leading-7 text-[var(--ad-text-soft)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[var(--ad-accent-dark)] hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <div className="grid gap-5">
        <GoogleButton />

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-[var(--ad-border)]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-muted)]">
            Or create with email
          </span>
          <div className="h-px flex-1 bg-[var(--ad-border)]" />
        </div>

        <form onSubmit={handleSignup} className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
              Full name
            </span>
            <input
              name="fullName"
              type="text"
              required
              className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
              placeholder="Your full name"
            />
          </label>

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
              minLength={6}
              className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
              placeholder="Minimum 6 characters"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
              Confirm password
            </span>
            <input
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
              placeholder="Repeat password"
            />
          </label>

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
            {loading ? "Creating account..." : "Create Account"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
