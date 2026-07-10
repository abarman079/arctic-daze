"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password reset email sent. Please check your inbox.");
  }

  return (
    <AuthShell
      eyebrow="Password Help"
      title="Reset your password."
      description="Enter your email and we will send a secure password reset link through Supabase Auth."
      footer={
        <p className="text-sm leading-7 text-[var(--ad-text-soft)]">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="font-bold text-[var(--ad-accent-dark)] hover:underline"
          >
            Back to login
          </Link>
        </p>
      }
    >
      <form onSubmit={handleResetRequest} className="grid gap-4">
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
          {loading ? "Sending..." : "Send Reset Link"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </AuthShell>
  );
}
