"use client";

import { FormEvent, useState, useTransition } from "react";

import { createClient } from "@/lib/supabase/client";

type Profile = {
  full_name: string | null;
  phone: string | null;
  messenger_url: string | null;
  whatsapp: string | null;
  preferred_contact_method: string | null;
} | null;

type ProfileFormProps = {
  userId: string;
  profile: Profile;
};

export function ProfileForm({ userId, profile }: ProfileFormProps) {
  const supabase = createClient();

  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [messengerUrl, setMessengerUrl] = useState(
    profile?.messenger_url ?? "",
  );
  const [whatsapp, setWhatsapp] = useState(profile?.whatsapp ?? "");
  const [preferredContactMethod, setPreferredContactMethod] = useState(
    profile?.preferred_contact_method ?? "phone",
  );

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    startTransition(async () => {
      const { error } = await supabase.from("profiles").upsert(
        {
          id: userId,
          full_name: fullName.trim() || null,
          phone: phone.trim() || null,
          messenger_url: messengerUrl.trim() || null,
          whatsapp: whatsapp.trim() || null,
          preferred_contact_method: preferredContactMethod,
        },
        {
          onConflict: "id",
        },
      );

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setMessage("Profile saved successfully.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-sm font-bold text-[var(--ad-text)]">
          Full name
        </label>
        <input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-[var(--ad-border)] bg-white px-4 py-3 text-sm outline-none"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label className="text-sm font-bold text-[var(--ad-text)]">
          Phone
        </label>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-[var(--ad-border)] bg-white px-4 py-3 text-sm outline-none"
          placeholder="+880..."
        />
      </div>

      <div>
        <label className="text-sm font-bold text-[var(--ad-text)]">
          Messenger link
        </label>
        <input
          value={messengerUrl}
          onChange={(event) => setMessengerUrl(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-[var(--ad-border)] bg-white px-4 py-3 text-sm outline-none"
          placeholder="https://m.me/..."
        />
      </div>

      <div>
        <label className="text-sm font-bold text-[var(--ad-text)]">
          WhatsApp
        </label>
        <input
          value={whatsapp}
          onChange={(event) => setWhatsapp(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-[var(--ad-border)] bg-white px-4 py-3 text-sm outline-none"
          placeholder="+880..."
        />
      </div>

      <div>
        <label className="text-sm font-bold text-[var(--ad-text)]">
          Preferred contact method
        </label>
        <select
          value={preferredContactMethod}
          onChange={(event) => setPreferredContactMethod(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-[var(--ad-border)] bg-white px-4 py-3 text-sm outline-none"
        >
          <option value="phone">Phone</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="messenger">Messenger</option>
        </select>
      </div>

      {errorMessage ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      {message ? (
        <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-[var(--ad-text)] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}