export default function RestockAlertsLoading() {
  return (
    <div className="min-w-0">
      <div className="h-72 animate-pulse rounded-[2rem] bg-[var(--ad-card)]" />

      <div className="mt-6 grid gap-5">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="h-[360px] animate-pulse rounded-[2rem] bg-[var(--ad-card)]"
          />
        ))}
      </div>
    </div>
  );
}