import { Search } from "lucide-react";
import Link from "next/link";

type ProductEmptyStateProps = {
  title?: string;
  text?: string;
};

export function ProductEmptyState({
  title = "No products found yet.",
  text = "New drops are added from Arctic Daze Facebook updates and supported Malaysian store requests.",
}: ProductEmptyStateProps) {
  return (
    <div className="paper-panel rounded-[2rem] border border-[var(--ad-border)] p-8 text-center shadow-[var(--shadow-soft)] sm:p-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ad-accent-soft)] text-[var(--ad-accent-dark)]">
        <Search className="h-6 w-6" />
      </div>

      <h2 className="font-display mx-auto mt-6 max-w-xl text-4xl font-bold leading-none tracking-[-0.04em]">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--ad-text-soft)]">
        {text}
      </p>

      <Link
        href="/#contact"
        className="mt-7 inline-flex items-center justify-center rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
      >
        Request a Product
      </Link>
    </div>
  );
}