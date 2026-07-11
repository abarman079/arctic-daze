"use client";

import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type PreorderRequestFormProps = {
  productId: string;
  productSlug: string;
  profile: {
    full_name: string | null;
    phone: string | null;
    messenger_url: string | null;
    whatsapp: string | null;
    preferred_contact_method: string | null;
  } | null;
  email: string;
};

export function PreorderRequestForm({
  productId,
  productSlug,
  profile,
  email,
}: PreorderRequestFormProps) {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const termsAccepted = formData.get("terms_accepted") === "on";

    if (!termsAccepted) {
      setLoading(false);
      setMessage("You must accept the pre-order terms before submitting.");
      return;
    }

    const customerName = String(
      formData.get("customer_name") || "",
    ).trim();

    const phone = String(formData.get("phone") || "").trim();

    const customerEmail = String(
      formData.get("email") || "",
    ).trim();

    const messengerUrl = String(
      formData.get("messenger_url") || "",
    ).trim();

    const whatsapp = String(
      formData.get("whatsapp") || "",
    ).trim();

    const preferredContactMethod = String(
      formData.get("preferred_contact_method") || "Messenger",
    );

    const size = String(formData.get("size") || "").trim();
    const color = String(formData.get("color") || "").trim();
    const note = String(formData.get("note") || "").trim();

    const quantity = Math.max(
      1,
      Math.min(20, Number(formData.get("quantity") || 1)),
    );

    if (customerName.length < 2) {
      setLoading(false);
      setMessage("Please enter your full name.");
      return;
    }

    if (phone.length < 6) {
      setLoading(false);
      setMessage("Please enter a valid phone number.");
      return;
    }

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(
        `/login?redirectTo=${encodeURIComponent(
          `/products/${productSlug}/preorder`,
        )}`,
      );

      return;
    }

    const { data, error } = await supabase
      .from("preorder_requests")
      .insert({
        user_id: user.id,
        product_id: productId,

        customer_name: customerName,
        phone,
        email: customerEmail || user.email || null,

        messenger_url: messengerUrl || null,
        whatsapp: whatsapp || null,
        preferred_contact_method: preferredContactMethod,

        size: size || null,
        color: color || null,
        quantity,

        note: note || null,

        terms_accepted: true,
        terms_version: "2026-07-v1",
      })
      .select("id")
      .single();

    if (error) {
      setLoading(false);

      console.error("Pre-order submission error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      setMessage(error.message);
      return;
    }

    await supabase
      .from("saved_order_drafts")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    router.push(`/account/preorders?submitted=${data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Full name
          </span>

          <input
            name="customer_name"
            type="text"
            required
            defaultValue={profile?.full_name || ""}
            placeholder="Your full name"
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Phone number
          </span>

          <input
            name="phone"
            type="tel"
            inputMode="tel"
            required
            defaultValue={profile?.phone || ""}
            placeholder="+880..."
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
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
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Preferred contact method
          </span>

          <select
            name="preferred_contact_method"
            defaultValue={
              profile?.preferred_contact_method || "Messenger"
            }
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          >
            <option value="Messenger">Messenger</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Messenger link
          </span>

          <input
            name="messenger_url"
            type="text"
            defaultValue={profile?.messenger_url || ""}
            placeholder="Messenger profile or conversation link"
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            WhatsApp
          </span>

          <input
            name="whatsapp"
            type="tel"
            inputMode="tel"
            defaultValue={profile?.whatsapp || ""}
            placeholder="WhatsApp number"
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Size
          </span>

          <input
            name="size"
            type="text"
            placeholder="M, L, XL, 42"
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Color
          </span>

          <input
            name="color"
            type="text"
            placeholder="Black, cream..."
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
            Quantity
          </span>

          <input
            name="quantity"
            type="number"
            required
            min={1}
            max={20}
            defaultValue={1}
            className="min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
          Extra note
        </span>

        <textarea
          name="note"
          maxLength={1000}
          placeholder="Sizing questions, alternate color, supplier link, delivery notes, or anything else we should know."
          className="min-h-32 min-w-0 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
        />
      </label>

      <div className="rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-accent-soft)] p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ad-accent-dark)]" />

          <div>
            <p className="text-sm font-bold text-[var(--ad-text)]">
              Pre-order acknowledgement
            </p>

            <p className="mt-2 text-sm leading-7 text-[var(--ad-text-soft)]">
              Final price, supplier availability, advance payment, and delivery
              estimate will be confirmed before the order is booked.
            </p>
          </div>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3">
          <input
            name="terms_accepted"
            type="checkbox"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--ad-accent-dark)]"
          />

          <span className="text-sm leading-7 text-[var(--ad-text-soft)]">
            I have read and accept the{" "}
            <Link
              href="/policy/pre-order"
              target="_blank"
              className="font-bold text-[var(--ad-accent-dark)] underline"
            >
              Arctic Daze pre-order terms
            </Link>
            .
          </span>
        </label>
      </div>

      {message ? (
        <div className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-5 py-4 text-sm font-semibold leading-7 text-[var(--ad-text-soft)]">
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting Request..." : "Submit Pre-Order Request"}

        {loading ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </button>

      <p className="text-center text-xs leading-6 text-[var(--ad-muted)]">
        This request does not charge you or place the supplier order
        automatically. Arctic Daze will contact you with the confirmed quote.
      </p>
    </form>
  );
}