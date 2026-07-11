import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  PackageSearch,
} from "lucide-react";
import Link from "next/link";
import { ProductImage } from "@/components/products/product-image";
import type {
  CustomerPreorder,
  PreorderStatus,
} from "@/lib/preorders/queries";

type PreorderStatusCardProps = {
  request: CustomerPreorder;
};

const normalSteps: PreorderStatus[] = [
  "new",
  "contacted",
  "waiting_for_advance",
  "confirmed",
  "ordered_from_supplier",
  "in_transit",
  "arrived",
  "ready_for_delivery",
  "completed",
];

const statusLabels: Record<PreorderStatus, string> = {
  new: "Request received",
  contacted: "Customer contacted",
  waiting_for_advance: "Waiting for advance",
  confirmed: "Order confirmed",
  ordered_from_supplier: "Ordered from supplier",
  in_transit: "In transit",
  arrived: "Arrived",
  ready_for_delivery: "Ready for delivery",
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
  supplier_unavailable: "Supplier unavailable",
};

const exceptionalStatuses: PreorderStatus[] = [
  "cancelled",
  "refunded",
  "supplier_unavailable",
];

function formatPrice(value: number | null) {
  if (!value) return "Quote pending";

  return `৳${value.toLocaleString("en-BD")}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function PreorderStatusCard({
  request,
}: PreorderStatusCardProps) {
  const product = request.product;

  const exceptional = exceptionalStatuses.includes(
    request.status,
  );

  const activeStep = normalSteps.indexOf(request.status);

  const progress =
    activeStep >= 0
      ? Math.round(
          ((activeStep + 1) / normalSteps.length) * 100,
        )
      : 0;

  const requestReference = `AD-${request.id
    .slice(0, 8)
    .toUpperCase()}`;

  return (
    <article className="min-w-0 overflow-hidden rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-soft)]">
      <div className="grid min-w-0 md:grid-cols-[190px_minmax(0,1fr)]">
        <div className="relative min-h-[260px] overflow-hidden bg-[var(--ad-card-2)] md:min-h-full">
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
            sizes="(max-width: 768px) 100vw, 190px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 p-6 sm:p-8">
          <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={
                    exceptional
                      ? "rounded-full border border-[var(--ad-border)] bg-[var(--ad-bg-soft)] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-text-soft)]"
                      : "rounded-full bg-[var(--ad-accent-soft)] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-accent-dark)]"
                  }
                >
                  {statusLabels[request.status]}
                </span>

                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
                  {requestReference}
                </span>
              </div>

              <h2 className="font-display mt-5 break-words text-3xl font-bold leading-none tracking-[-0.04em]">
                {product?.title || "Product no longer listed"}
              </h2>

              <p className="mt-3 text-lg font-bold">
                {formatPrice(product?.price_bdt ?? null)}
              </p>
            </div>

            {product ? (
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-accent-dark)]"
              >
                Product
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-[var(--ad-card-2)] p-4">
              <CalendarDays className="h-4 w-4 text-[var(--ad-accent)]" />

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
                Requested
              </p>

              <p className="mt-1 text-sm font-semibold">
                {formatDate(request.created_at)}
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--ad-card-2)] p-4">
              <PackageSearch className="h-4 w-4 text-[var(--ad-accent)]" />

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
                Quantity
              </p>

              <p className="mt-1 text-sm font-semibold">
                {request.quantity}
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--ad-card-2)] p-4">
              <CheckCircle2 className="h-4 w-4 text-[var(--ad-accent)]" />

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
                Selection
              </p>

              <p className="mt-1 text-sm font-semibold">
                {[request.size, request.color]
                  .filter(Boolean)
                  .join(" / ") || "To be confirmed"}
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--ad-card-2)] p-4">
              <Clock3 className="h-4 w-4 text-[var(--ad-accent)]" />

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-muted)]">
                ETA
              </p>

              <p className="mt-1 text-sm font-semibold">
                {product?.preorder_eta ||
                  "Confirmed after quotation"}
              </p>
            </div>
          </div>

          {exceptional ? (
            <div className="mt-6 rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-bg-soft)] p-5">
              <p className="text-sm font-bold">
                {statusLabels[request.status]}
              </p>

              <p className="mt-2 text-sm leading-7 text-[var(--ad-text-soft)]">
                Contact Arctic Daze if you need additional information
                about this request.
              </p>
            </div>
          ) : (
            <div className="mt-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                  Order progress
                </p>

                <p className="text-sm font-bold text-[var(--ad-accent-dark)]">
                  {progress}%
                </p>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--ad-bg-soft)]">
                <div
                  className="h-full rounded-full bg-[var(--ad-accent)] transition-[width] duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {normalSteps.map((step, index) => {
                  const complete = index <= activeStep;

                  return (
                    <div
                      key={step}
                      className={
                        complete
                          ? "rounded-2xl bg-[var(--ad-accent-soft)] px-3 py-3 text-xs font-bold text-[var(--ad-accent-dark)]"
                          : "rounded-2xl border border-[var(--ad-border)] px-3 py-3 text-xs font-semibold text-[var(--ad-muted)]"
                      }
                    >
                      {statusLabels[step]}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {request.note ? (
            <div className="mt-6 border-t border-[var(--ad-border)] pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--ad-muted)]">
                Your note
              </p>

              <p className="mt-2 text-sm leading-7 text-[var(--ad-text-soft)]">
                {request.note}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}