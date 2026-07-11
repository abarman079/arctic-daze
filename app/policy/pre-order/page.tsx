import Link from "next/link";

const terms = [
  {
    title: "Availability confirmation",
    text: "Submitting a request does not guarantee supplier stock. Arctic Daze will check availability before confirming the order.",
  },
  {
    title: "Final quotation",
    text: "Displayed prices may be starting estimates. The final quotation will be confirmed before advance payment is requested.",
  },
  {
    title: "Advance payment",
    text: "Where advance payment is required, the order is not booked until the requested advance has been received and confirmed.",
  },
  {
    title: "Estimated delivery",
    text: "Delivery estimates are approximate and begin after the order is confirmed. Supplier, customs, transit, or local-delivery delays may affect the final date.",
  },
  {
    title: "Supplier changes",
    text: "Supplier stock, sizing, color availability, and pricing may change before purchase. Arctic Daze will contact the customer if an adjustment is required.",
  },
  {
    title: "Cancellation and refund",
    text: "Cancellation and refund eligibility depend on whether the supplier order has already been placed and on the circumstances of the request.",
  },
  {
    title: "Customer information",
    text: "Customers are responsible for providing accurate size, color, quantity, phone, and contact details before confirming the order.",
  },
];

export default function PreorderPolicyPage() {
  return (
    <main className="min-h-screen overflow-x-hidden px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1000px]">
        <header className="flex flex-col justify-between gap-5 border-b border-[var(--ad-border)] pb-8 sm:flex-row sm:items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] text-xs font-bold tracking-[0.18em] text-[var(--ad-accent-dark)]">
              AD
            </span>

            <span className="font-display text-2xl font-bold tracking-[0.16em] sm:text-3xl">
              ARCTIC DAZE
            </span>
          </Link>

          <Link
            href="/collections"
            className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)]"
          >
            Browse Products
          </Link>
        </header>

        <section className="paper-panel mt-8 rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
            Pre-Order Policy
          </p>

          <h1 className="font-display mt-4 max-w-4xl text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.9] tracking-[-0.055em]">
            Clear terms before you confirm.
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--ad-text-soft)]">
            Arctic Daze imports selected products from Malaysian stores and
            suppliers. Please review these operational terms before submitting
            a pre-order request.
          </p>
        </section>

        <section className="mt-6 grid gap-4">
          {terms.map((term, index) => (
            <article
              key={term.title}
              className="rounded-[1.75rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-6 shadow-[var(--shadow-soft)] sm:p-8"
            >
              <div className="flex items-start gap-5">
                <span className="font-display text-3xl font-bold text-[var(--ad-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h2 className="text-lg font-bold text-[var(--ad-text)]">
                    {term.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[var(--ad-text-soft)]">
                    {term.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="dark-panel mt-6 rounded-[2rem] p-7 text-[var(--ad-white)] sm:p-10">
          <h2 className="font-display text-4xl font-bold tracking-[-0.04em]">
            Questions before ordering?
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#cabcad]">
            Contact Arctic Daze before submitting the request if you need help
            with sizing, supplier availability, payment, or the expected
            delivery period.
          </p>

          <Link
            href="/#contact"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[var(--ad-white)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-black)]"
          >
            Contact Arctic Daze
          </Link>
        </section>
      </div>
    </main>
  );
}