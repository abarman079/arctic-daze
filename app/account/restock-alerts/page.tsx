import {
  BellRing,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductImage } from "@/components/products/product-image";
import { RemoveRestockAlertButton } from "@/components/restock/remove-restock-alert-button";
import {
  formatProductStatus,
  isProductUnavailable,
} from "@/lib/products/status";
import { getCustomerRestockAlerts } from "@/lib/restock/queries";
import { createClient } from "@/lib/supabase/server";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export default async function RestockAlertsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      "/login?redirectTo=/account/restock-alerts",
    );
  }

  const alerts = await getCustomerRestockAlerts(
    user.id,
  );

  return (
    <div className="min-w-0">
      <section className="paper-panel rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
          Restock Alerts
        </p>

        <h1 className="font-display mt-4 max-w-4xl break-words text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em]">
          Products you want us to check again.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)]">
          Review products you asked Arctic Daze to
          monitor for availability, a restock, or a
          suitable alternative.
        </p>
      </section>

      {alerts.length === 0 ? (
        <section className="mt-6 rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-8 text-center shadow-[var(--shadow-soft)] sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ad-accent-soft)] text-[var(--ad-accent-dark)]">
            <BellRing className="h-6 w-6" />
          </span>

          <h2 className="font-display mt-6 text-4xl font-bold tracking-[-0.04em]">
            No restock alerts yet.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--ad-text-soft)]">
            When a sold-out or unavailable product
            interests you, use Notify Me If Available on
            its product page.
          </p>

          <Link
            href="/collections"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
          >
            Browse Products
          </Link>
        </section>
      ) : (
        <section className="mt-6 grid gap-5">
          {alerts.map((restockAlert) => {
            const product = restockAlert.product;

            const availableAgain =
              product &&
              !isProductUnavailable(product.status);

            return (
              <article
                key={restockAlert.id}
                className="grid min-w-0 overflow-hidden rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-soft)] md:grid-cols-[210px_minmax(0,1fr)]"
              >
                <Link
                  href={
                    product
                      ? `/products/${product.slug}`
                      : "/collections"
                  }
                  className="relative min-h-[280px] overflow-hidden bg-[var(--ad-card-2)]"
                >
                  <ProductImage
                    src={
                      product?.image?.stored_url ||
                      "/editorial/community.png"
                    }
                    fallbackSrc="/editorial/community.png"
                    alt={
                      product?.image?.alt ||
                      product?.title ||
                      "Arctic Daze product"
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 210px"
                    className="object-cover"
                  />
                </Link>

                <div className="min-w-0 p-6 sm:p-8">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-[var(--ad-accent-soft)] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-accent-dark)]">
                          {restockAlert.status === "new"
                            ? "Alert active"
                            : restockAlert.status}
                        </span>

                        {product ? (
                          <span className="rounded-full border border-[var(--ad-border)] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-text-soft)]">
                            {formatProductStatus(
                              product.status,
                            )}
                          </span>
                        ) : null}
                      </div>

                      <h2 className="font-display mt-5 break-words text-3xl font-bold leading-none tracking-[-0.04em]">
                        {product?.title ||
                          "Product no longer listed"}
                      </h2>
                    </div>

                    {product ? (
                      <Link
                        href={`/products/${product.slug}`}
                        className="shrink-0 text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-accent-dark)]"
                      >
                        View Product
                      </Link>
                    ) : null}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-[var(--ad-card-2)] p-4">
                      <CalendarDays className="h-4 w-4 text-[var(--ad-accent)]" />

                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
                        Registered
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatDate(
                          restockAlert.created_at,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[var(--ad-card-2)] p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
                        Size
                      </p>

                      <p className="mt-2 text-sm font-semibold">
                        {restockAlert.size ||
                          "Any suitable size"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[var(--ad-card-2)] p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
                        Color
                      </p>

                      <p className="mt-2 text-sm font-semibold">
                        {restockAlert.color ||
                          "Any suitable color"}
                      </p>
                    </div>
                  </div>

                  {availableAgain ? (
                    <div className="mt-5 flex items-start gap-3 rounded-3xl bg-[var(--ad-accent-soft)] p-5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ad-accent-dark)]" />

                      <div>
                        <p className="text-sm font-bold">
                          This product is available again.
                        </p>

                        <p className="mt-1 text-sm leading-7 text-[var(--ad-text-soft)]">
                          Open the product page to review
                          its current price and availability.
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {restockAlert.note ? (
                    <div className="mt-5 border-t border-[var(--ad-border)] pt-5">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
                        Your note
                      </p>

                      <p className="mt-2 text-sm leading-7 text-[var(--ad-text-soft)]">
                        {restockAlert.note}
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-6">
                    <RemoveRestockAlertButton
                      alertId={restockAlert.id}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}