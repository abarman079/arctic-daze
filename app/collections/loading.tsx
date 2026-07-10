import { ProductGridSkeleton } from "@/components/products/product-card-skeleton";

export default function CollectionsLoading() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 h-20 animate-pulse rounded-3xl bg-[var(--ad-card)]" />
        <div className="mb-8 h-80 animate-pulse rounded-[2rem] bg-[var(--ad-card)]" />
        <ProductGridSkeleton count={8} />
      </div>
    </main>
  );
}