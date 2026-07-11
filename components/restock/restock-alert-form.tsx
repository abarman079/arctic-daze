"use client";

import {
  BellRing,
  CheckCircle2,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type RestockAlertFormProps = {
  productId: string;
  productTitle: string;

  profile: {
    full_name: string | null;
    phone: string | null;
    preferred_contact_method: string | null;
  } | null;

  email: string;
};

export function RestockAlertForm({
  productId,
  productTitle,
  profile,
  email,
}: RestockAlertFormProps) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading || submitted) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);

    // Simple spam honeypot.
    const website = String(
      formData.get("website") || "",
    ).trim();

    if (website) {
      setLoading(false);
      setSubmitted(true);
      setMessage("Your request has been received.");
      return;
    }

    const name = String(
      formData.get("name") || "",
    ).trim();

    const customerEmail = String(
      formData.get("email") || "",
    ).trim();

    const phone = String(
      formData.get("phone") || "",
    ).trim();

    const preferredContactMethod = String(
      formData.get("preferred_contact_method") ||
        "Email",
    );

    const size = String(
      formData.get("size") || "",
    ).trim();

    const color = String(
      formData.get("color") || "",
    ).trim();

    const note = String(
      formData.get("note") || "",
    ).trim();

    if (name.length < 2) {
      setLoading(false);
      setMessage("Please enter your name.");
      return;
    }

    if (!customerEmail && !phone) {
      setLoading(false);
      setMessage(
        "Please enter an email address or phone number.",
      );
      return;
    }

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("restock_alerts")
      .insert({
        user_id: user?.id || null,
        product_id: productId,
        name,
        email: customerEmail || null,
        phone: phone || null,
        preferred_contact_method:
          preferredContactMethod,
        size: size || null,
        color: color || null,
        note: note || null,
        status: "new",
      });

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        setSubmitted(true);
        setMessage(
          "You already have an active alert for this product.",
        );
        return;
      }

      console.error("Restock alert error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      setMessage(error.message);
      return;
    }

    setSubmitted(true);
    setMessage(
      `You will be contacted if ${productTitle} becomes available.`,
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid gap-4"
    >
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Name
          </span>

          <input
            name="name"
            required
            defaultValue={profile?.full_name || ""}
            placeholder="Your name"
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Preferred contact
          </span>

          <select
            name="preferred_contact_method"
            defaultValue={
              profile?.preferred_contact_method || "Email"
            }
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          >
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="Messenger">Messenger</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Email
          </span>

          <input
            name="email"
            type="email"
            defaultValue={email}
            placeholder="you@example.com"
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Phone
          </span>

          <input
            name="phone"
            type="tel"
            inputMode="tel"
            defaultValue={profile?.phone || ""}
            placeholder="+880..."
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Preferred size
          </span>

          <input
            name="size"
            placeholder="M, L, XL, 42..."
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Preferred color
          </span>

          <input
            name="color"
            placeholder="Black, cream..."
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
          Note
        </span>

        <textarea
          name="note"
          maxLength={1000}
          placeholder="Alternative size, similar style, supplier preference, or anything else we should know."
          className="min-h-28 min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
        />
      </label>

      {message ? (
        <div className="flex items-start gap-3 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-5 py-4">
          {submitted ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ad-accent-dark)]" />
          ) : null}

          <p className="text-sm font-semibold leading-7 text-[var(--ad-text-soft)]">
            {message}
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading || submitted}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <BellRing className="h-4 w-4" />

        {submitted
          ? "Alert Registered"
          : loading
            ? "Registering..."
            : "Notify Me If Available"}
      </button>
    </form>
  );
}