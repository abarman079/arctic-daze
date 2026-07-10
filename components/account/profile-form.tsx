"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type ProfileFormProps = {
  userId: string;
  profile: {
    full_name: string | null;
    phone: string | null;
    messenger_url: string | null;
    whatsapp: string | null;
    preferred_contact_method: string | null;
  } | null;
};

export function ProfileForm({ userId, profile }: ProfileFormProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();

    const { error } = await supabase.from("profiles").upsert(
      {
        id: userId,
        full_name: String(formData.get("full_name") || "").trim() || null,
        phone: String(formData.get("phone") || "").trim() || null,
        messenger_url:
          String(formData.get("messenger_url") || "").trim() || null,
        whatsapp: String(formData.get("whatsapp") || "").trim() || null,
        preferred_contact_method:
          String(formData.get("preferred_contact_method") || "").trim() ||
          "Messenger",
      },
      {
        onConflict: "id",
      },
    );

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Profile saved successfully.");
  }

  return (
    <form onSubmit={handleSave} className="grid gap-4">
      <label className="grid gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
          Full name
        </span>
        <input
          name="full_name"
          defaultValue={profile?.full_name || ""}
          className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          placeholder="Your full name"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
          Phone
        </span>
        <input
          name="phone"
          defaultValue={profile?.phone || ""}
          className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          placeholder="Your phone number"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
          Messenger link
        </span>
        <input
          name="messenger_url"
          defaultValue={profile?.messenger_url || ""}
          className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          placeholder="Facebook Messenger profile link"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
          WhatsApp
        </span>
        <input
          name="whatsapp"
          defaultValue={profile?.whatsapp || ""}
          className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          placeholder="WhatsApp number"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
          Preferred contact method
        </span>
        <select
          name="preferred_contact_method"
          defaultValue={profile?.preferred_contact_method || "Messenger"}
          className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
        >
          <option>Messenger</option>
          <option>WhatsApp</option>
          <option>Phone</option>
          <option>Email</option>
        </select>
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
        {loading ? "Saving..." : "Save Profile"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}