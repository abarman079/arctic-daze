"use client";

import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-strong)] lg:grid-cols-[0.95fr_1.05fr]">
          <section className="dark-panel hidden p-10 text-[var(--ad-white)] lg:flex lg:flex-col lg:justify-between">
            <a href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold tracking-[0.18em]">
                AD
              </span>
              <span className="font-display text-3xl font-bold tracking-[0.16em]">
                ARCTIC DAZE
              </span>
            </a>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent-soft)]">
                Malaysia to Bangladesh
              </p>
              <h1 className="font-display mt-5 max-w-xl text-[clamp(3.4rem,5.3vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                Men’s import-commerce, made clearer.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-[#d7cabb]">
                Browse supported Malaysian stores, send us the product link, receive a
                transparent quote, and confirm your pre-order with guided support.
              </p>
            </div>

            <p className="text-xs uppercase tracking-[0.22em] text-[#a99b8b]">
              Premium menswear sourcing • Facebook-guided ordering
            </p>
          </section>

          <section className="paper-panel p-6 sm:p-10 lg:p-14">
            <a
              href="/"
              className="mb-10 inline-flex items-center gap-3 text-[var(--ad-text)] lg:hidden"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] text-xs font-bold tracking-[0.18em] text-[var(--ad-accent-dark)]">
                AD
              </span>
              <span className="font-display text-2xl font-bold tracking-[0.16em]">
                ARCTIC DAZE
              </span>
            </a>

            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
              {eyebrow}
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ad-text-soft)]">
              {description}
            </p>

            <div className="mt-8">{children}</div>

            {footer ? <div className="mt-7">{footer}</div> : null}
          </section>
        </div>
      </div>
    </main>
  );
}