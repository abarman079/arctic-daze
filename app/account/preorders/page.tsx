import { CheckCircle2, PackageSearch } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PreorderStatusCard } from "@/components/preorders/preorder-status-card";
import { getCustomerPreorders } from "@/lib/preorders/queries";
import { createClient } from "@/lib/supabase/server";

type AccountPreordersPageProps = {
  searchParams?: Promise<{
    submitted?: string;
  }>;
};

export default async function AccountPreordersPage({
  searchParams,
}: AccountPreordersPageProps) {
  const params = (await searchParams) || {};

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/account/preorders");
  }

  const requests = await getCustomerPreorders(user.id);

  return (
    <div className="min-w-0">
      <section className="paper-panel rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
          Pre-Order Requests
        </p>

        <h1 className="font-display mt-4 max-w-4xl break-words text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em]">
          Follow each request from quote to delivery.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)]">
          Review your submitted product requests and follow their quotation,
          advance-payment, supplier, transit, arrival, and delivery status.
        </p>
      </section>

      {params.submitted ? (
        <div className="mt-6 flex items-start gap-3 rounded-[1.75rem] border border-[var(--ad-border)] bg-[var(--ad-accent-soft)] p-5">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ad-accent-dark)]" />

          <div>
            <p className="text-sm font-bold text-[var(--ad-text)]">
              Pre-order request submitted
            </p>

            <p className="mt-1 text-sm leading-7 text-[var(--ad-text-soft)]">
              Arctic Daze will check supplier availability and contact you
              with the confirmed quotation.
            </p>
          </div>
        </div>
      ) : null}

      {requests.length === 0 ? (
        <section className="mt-6 rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-8 text-center shadow-[var(--shadow-soft)] sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ad-accent-soft)] text-[var(--ad-accent-dark)]">
            <PackageSearch className="h-6 w-6" />
          </span>

          <h2 className="font-display mt-6 text-4xl font-bold tracking-[-0.04em]">
            No pre-orders yet.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--ad-text-soft)]">
            When you submit a product request, its quotation and delivery
            progress will appear here.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
            >
              Browse Products
            </Link>

            <Link
              href="/account/saved-items"
              className="inline-flex items-center justify-center rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text)] hover:border-[var(--ad-accent)]"
            >
              Saved Drafts
            </Link>
          </div>
        </section>
      ) : (
        <section className="mt-6 grid gap-5">
          {requests.map((request) => (
            <PreorderStatusCard
              key={request.id}
              request={request}
            />
          ))}
        </section>
      )}
    </div>
  );
}