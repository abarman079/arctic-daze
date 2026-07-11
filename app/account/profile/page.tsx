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
    <div className="min-w-0">
      <section className="paper-panel rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
          Profile
        </p>

        <h1 className="font-display mt-4 max-w-4xl break-words text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em]">
          Your contact details.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)]">
          Add your phone, WhatsApp, Messenger link, and preferred contact
          method. These details will later prefill the pre-order form.
        </p>
      </section>

      <section className="mt-6 rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10">
        <ProfileForm userId={user.id} profile={profile} />
      </section>
    </div>
  );
}