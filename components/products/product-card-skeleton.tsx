export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-soft)] sm:rounded-[1.75rem]">
      <div className="aspect-[4/5] animate-pulse bg-[var(--ad-bg-soft)]" />
      <div className="space-y-4 p-5">
        <div className="h-3 w-24 animate-pulse rounded-full bg-[var(--ad-bg-soft)]" />
        <div className="h-8 w-4/5 animate-pulse rounded-full bg-[var(--ad-bg-soft)]" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-[var(--ad-bg-soft)]" />
        <div className="flex items-end justify-between">
          <div className="h-6 w-20 animate-pulse rounded-full bg-[var(--ad-bg-soft)]" />
          <div className="h-11 w-11 animate-pulse rounded-full bg-[var(--ad-bg-soft)]" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}