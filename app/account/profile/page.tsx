import Link from "next/link";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/account/profile-form";
import { createClient } from "@/lib/supabase/server";

export default async function AccountProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, phone, messenger_url, whatsapp, preferred_contact_method",
    )
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/account"
            className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ad-accent-dark)] hover:underline"
          >
            ← Back to account
          </Link>

          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-[0.16em]"
          >
            ARCTIC DAZE
          </Link>
        </div>

        <section className="paper-panel rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
            Profile
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.7rem,5vw,5.2rem)] font-bold leading-[0.94] tracking-[-0.045em]">
            Your contact details.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)]">
            Add your phone, WhatsApp, Messenger link, and preferred contact method.
            This helps Arctic Daze confirm quotes and pre-order updates clearly.
          </p>

          <div className="mt-8">
            <ProfileForm userId={user.id} profile={profile} />
          </div>
        </section>
      </div>
    </main>
  );
}