import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PreorderRequestForm } from "@/components/preorders/preorder-request-form";
import { ProductImage } from "@/components/products/product-image";
import { getProductBySlug } from "@/lib/products/queries";
import { createClient } from "@/lib/supabase/server";

type ProductPreorderPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(value: number | null) {
  if (!value) return "Quote on request";

  return `৳${value.toLocaleString("en-BD")}`;
}

export default async function ProductPreorderPage({
  params,
}: ProductPreorderPageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/login?redirectTo=${encodeURIComponent(
        `/products/${slug}/preorder`,
      )}`,
    );
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, phone, messenger_url, whatsapp, preferred_contact_method",
    )
    .eq("id", user.id)
    .maybeSingle();

  const image =
    product.images[0]?.stored_url || "/editorial/community.png";

  return (
    <main className="min-h-screen overflow-x-hidden px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1300px]">
        <header className="flex flex-col justify-between gap-5 border-b border-[var(--ad-border)] pb-8 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-[0.16em] sm:text-3xl"
          >
            ARCTIC DAZE
          </Link>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
        </header>

        <section className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[0.82fr_minmax(0,1.18fr)]">
          <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ad-card-2)]">
                <ProductImage
                  src={image}
                  alt={product.images[0]?.alt || product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-accent)]">
                  Pre-Order Product
                </p>

                <h1 className="font-display mt-4 break-words text-4xl font-bold leading-[0.95] tracking-[-0.045em]">
                  {product.title}
                </h1>

                <p className="mt-5 text-2xl font-bold">
                  {formatPrice(product.price_bdt)}
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="flex items-start gap-3 rounded-2xl bg-[var(--ad-card-2)] p-4">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ad-accent)]" />

                    <div>
                      <p className="text-sm font-bold">Estimated delivery</p>

                      <p className="mt-1 text-sm text-[var(--ad-text-soft)]">
                        {product.preorder_eta ||
                          "Confirmed with the quotation"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-[var(--ad-card-2)] p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ad-accent)]" />

                    <div>
                      <p className="text-sm font-bold">Advance payment</p>

                      <p className="mt-1 text-sm text-[var(--ad-text-soft)]">
                        {product.advance_required
                          ? "Required after quote confirmation"
                          : "Confirmed during the quotation"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="paper-panel min-w-0 rounded-[2rem] border border-[var(--ad-border)] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
              Request Pre-Order
            </p>

            <h2 className="font-display mt-4 break-words text-[clamp(2.8rem,5vw,5rem)] font-bold leading-[0.92] tracking-[-0.05em]">
              Tell us exactly what you need.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)]">
              Submit the product details below. Arctic Daze will verify supplier
              stock and contact you with the final quotation before confirming
              the order.
            </p>

            <div className="mt-8">
              <PreorderRequestForm
                productId={product.id}
                productSlug={product.slug}
                profile={profile}
                email={user.email || ""}
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}