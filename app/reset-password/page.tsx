"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePasswordUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (password !== confirmPassword) {
      setLoading(false);
      setMessage("Passwords do not match.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <AuthShell
      eyebrow="New Password"
      title="Choose a new password."
      description="After opening the reset link from your email, enter a new password for your Arctic Daze account."
      footer={
        <p className="text-sm leading-7 text-[var(--ad-text-soft)]">
          Want to sign in instead?{" "}
          <Link
            href="/login"
            className="font-bold text-[var(--ad-accent-dark)] hover:underline"
          >
            Back to login
          </Link>
        </p>
      }
    >
      <form onSubmit={handlePasswordUpdate} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
            New password
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
            Confirm new password
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
          {loading ? "Updating..." : "Update Password"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </AuthShell>
  );
}