export default function ProductLoading() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 h-20 animate-pulse rounded-3xl bg-[var(--ad-card)]" />

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4">
            <div className="aspect-[4/5] animate-pulse rounded-[2rem] bg-[var(--ad-card)] lg:aspect-[5/6]" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/5] animate-pulse rounded-3xl bg-[var(--ad-card)]"
                />
              ))}
            </div>
          </div>

          <div className="h-[620px] animate-pulse rounded-[2rem] bg-[var(--ad-card)]" />
        </section>
      </div>
    </main>
  );
}