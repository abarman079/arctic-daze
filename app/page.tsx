"use client";

import {
  ArrowRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  Mail,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Search,
  Send,
  Store,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { label: "Shop", href: "/collections" },
  { label: "How to Order", href: "#process" },
  { label: "Stores", href: "#stores" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const trustSignals = [
  "Malaysia-Based Sourcing",
  "Men’s Lifestyle Categories",
  "Facebook-Guided Ordering",
];

const collections = [
  {
    title: "Hoodies",
    note: "Layered comfort for daily wear.",
    image: "/editorial/hoodie-1.png",
    href: "/category/men-hoodies-sweatshirts",
  },
  {
    title: "Polos",
    note: "Clean fits for casual and smart looks.",
    image: "/editorial/polo-3.png",
    href: "/category/men-shirts-polos",
  },
  {
    title: "Sneakers",
    note: "Everyday icons and statement pairs.",
    image: "/editorial/shoe-1.png",
    href: "/category/sneakers",
  },
  {
    title: "Fragrance",
    note: "Signature scents and daily essentials.",
    image: "/editorial/fragrance-3.png",
    href: "/category/fragrance-cologne",
  },
  {
    title: "Premium Layers",
    note: "Warm pieces with refined texture.",
    image: "/editorial/hoodie-2.png",
    href: "/category/men-hoodies-sweatshirts",
  },
  {
    title: "Smart Casual",
    note: "Relaxed clothing with a polished finish.",
    image: "/editorial/polo-2.png",
    href: "/category/men-shirts-polos",
  },
  {
    title: "Footwear",
    note: "Loafers, sneakers, slides, and seasonal picks.",
    image: "/editorial/shoe-2.png",
    href: "/category/sneakers",
  },
  {
    title: "Grooming",
    note: "Personal care, fragrance, and finishing details.",
    image: "/editorial/fragrance-3.png",
    href: "/category/daily-essentials",
  },
];

const whyCards = [
  {
    number: "01",
    title: "Real Store Sourcing",
    text: "We source from supported Malaysian stores and supplier links, then confirm availability before you pay.",
  },
  {
    number: "02",
    title: "Transparent Quotes",
    text: "You receive a clear all-in price before confirming the order.",
  },
  {
    number: "03",
    title: "Personal Shopper Support",
    text: "We help with product links, screenshots, sizing questions, and order updates.",
  },
  {
    number: "04",
    title: "Men’s Lifestyle Focus",
    text: "Every collection is built around men’s fashion, footwear, grooming, fragrance, and daily essentials.",
  },
  {
    number: "05",
    title: "Easy Facebook Ordering",
    text: "Send the product link through Messenger and we guide the rest.",
  },
  {
    number: "06",
    title: "Clear Pre-Order Process",
    text: "You know the expected timeline, payment step, and order status before committing.",
  },
];

const orderSteps = [
  {
    icon: Eye,
    number: "01",
    title: "Browse",
    text: "Choose a product from a supported Malaysian store or Arctic Daze Facebook post.",
  },
  {
    icon: Copy,
    number: "02",
    title: "Copy Link",
    text: "Copy the product link or take a clear screenshot.",
  },
  {
    icon: Send,
    number: "03",
    title: "Send To Us",
    text: "Message us on Facebook or WhatsApp with the item details.",
  },
  {
    icon: MessageCircle,
    number: "04",
    title: "Get Quote",
    text: "We check availability and send a transparent all-in price.",
  },
  {
    icon: PackageCheck,
    number: "05",
    title: "Confirm",
    text: "Approve the order and complete the required advance payment.",
  },
  {
    icon: Truck,
    number: "06",
    title: "Receive",
    text: "We source, import, update, and arrange local delivery or handover.",
  },
];

const storeGroups = [
  {
    title: "Fashion",
    stores: [
      "SHEIN Malaysia",
      "Zalora Malaysia",
      "H&M Malaysia",
      "UNIQLO Malaysia",
    ],
  },
  {
    title: "Sports",
    stores: [
      "Adidas Malaysia",
      "Nike Malaysia",
      "Puma Malaysia",
      "Under Armour Malaysia",
    ],
  },
  {
    title: "Marketplaces",
    stores: ["Shopee Malaysia", "Lazada Malaysia"],
  },
  {
    title: "Accessories",
    stores: [
      "Fossil Malaysia",
      "Casio Malaysia",
      "Seiko Malaysia",
      "Ray-Ban Malaysia",
    ],
  },
  {
    title: "Grooming & Perfume",
    stores: ["Sephora Malaysia", "Guardian Malaysia", "Watsons Malaysia"],
  },
];

const labels = [
  "Nike",
  "Adidas",
  "Puma",
  "Jordan",
  "New Balance",
  "ASICS",
  "UNIQLO",
  "Zara",
  "Levi’s",
  "Fossil",
  "Casio",
  "Seiko",
];

const marqueeLabels = [
  "Malaysia to Bangladesh",
  "Send the product link",
  "Transparent quote",
  "Facebook-guided ordering",
  "Men’s fashion",
  "Footwear",
  "Fragrance",
  "Grooming",
  "Lifestyle essentials",
];

const footerColumns = [
  {
    title: "Shop",
    links: ["New In", "Clothing", "Footwear", "Accessories", "Grooming"],
  },
  {
    title: "Customer Care",
    links: [
      "How to Order",
      "Pre-Order Policy",
      "Returns",
      "Size Guide",
      "FAQs",
    ],
  },
  {
    title: "About",
    links: ["Our Story", "Malaysian Stores", "Community", "Contact"],
  },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main id="top" className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-[var(--ad-border)] bg-[rgba(244,239,230,0.92)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] text-xs font-bold tracking-[0.18em] text-[var(--ad-accent-dark)]">
              AD
            </span>
            <span className="font-display text-2xl font-bold tracking-[0.16em] text-[var(--ad-text)] sm:text-3xl">
              ARCTIC DAZE
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text-soft)] hover:text-[var(--ad-accent-dark)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#stores"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] text-[var(--ad-text)] hover:border-[var(--ad-accent)]"
              aria-label="Browse stores"
            >
              <Search className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] text-[var(--ad-text)] hover:border-[var(--ad-accent)]"
              aria-label="Contact Arctic Daze"
            >
              <UserRound className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="rounded-full bg-[var(--ad-black)] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:-translate-y-0.5 hover:bg-[var(--ad-accent-dark)]"
            >
              Order Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] text-[var(--ad-text)] lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[80] bg-[rgba(23,20,17,0.42)] backdrop-blur-sm lg:hidden">
          <div className="ml-auto flex min-h-screen w-[86%] max-w-sm flex-col border-l border-[var(--ad-border)] bg-[var(--ad-card)] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--ad-accent)]">
                  Menu
                </p>
                <p className="font-display text-3xl font-bold tracking-[0.14em]">
                  ARCTIC DAZE
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ad-border)]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[var(--ad-text)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto rounded-3xl bg-[var(--ad-black)] p-5 text-[var(--ad-white)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--ad-accent-soft)]">
                Facebook-guided ordering
              </p>
              <p className="mt-3 text-sm leading-6 text-[#d7cabb]">
                Send a product link, post, or screenshot. We check availability,
                prepare the quote, and guide your pre-order.
              </p>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ad-white)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-black)]"
              >
                Message Us <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      <section className="px-5 pb-16 pt-10 sm:px-8 lg:px-12 lg:pb-24">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1.03fr_0.97fr] lg:items-stretch">
          <div className="paper-panel relative overflow-hidden rounded-[2rem] border border-[var(--ad-border)] p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-accent-dark)]">
                Est. Arctic Daze
              </span>
              <span className="rounded-full border border-[var(--ad-border)] bg-[rgba(255,250,242,0.7)] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text-soft)]">
                Malaysia to Bangladesh
              </span>
            </div>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[var(--ad-accent)]">
              Men’s Malaysian import-commerce
            </p>

            <h1 className="font-display max-w-4xl text-[clamp(3rem,7.2vw,8.1rem)] font-black leading-[0.88] tracking-[-0.055em] text-[var(--ad-text)]">
              Premium Men’s Fashion
              <br />
              From Malaysia
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--ad-text-soft)] sm:text-lg">
              Curated menswear, sneakers, watches, fragrance, grooming, and
              daily essentials — sourced from trusted Malaysian stores and
              brought to Bangladesh through Arctic Daze.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/collections"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:-translate-y-1 hover:bg-[var(--ad-accent-dark)] sm:w-auto"
              >
                Browse Products <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--ad-border-strong)] bg-[var(--ad-card)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text)] hover:-translate-y-1 hover:border-[var(--ad-accent)] sm:w-auto"
              >
                Order on Facebook <MessageCircle className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-6 max-w-2xl rounded-3xl border border-[var(--ad-border)] bg-[rgba(255,250,242,0.72)] px-5 py-4 text-sm leading-7 text-[var(--ad-text-soft)]">
              Send us the product link. We check availability, quote clearly,
              and guide your pre-order.
            </p>

            <div className="mt-8 grid gap-3 border-t border-[var(--ad-border)] pt-6 sm:grid-cols-3">
              {trustSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-4 py-4"
                >
                  <CheckCircle2 className="h-4 w-4 text-[var(--ad-accent)]" />
                  <p className="mt-3 text-xs font-bold uppercase leading-5 tracking-[0.14em] text-[var(--ad-text)]">
                    {signal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-strong)] md:min-h-[520px] lg:min-h-[650px]">
            <Image
              src="/editorial/hero-man.png"
              alt="Arctic Daze premium men’s fashion editorial model"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover object-[center_38%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,20,17,0.22)] via-transparent to-transparent" />
            <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[var(--ad-white)] backdrop-blur-md">
              Editorial Drop
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--ad-border)] bg-[var(--ad-card)] py-5">
        <div className="marquee-track flex gap-4">
          {[...marqueeLabels, ...marqueeLabels, ...marqueeLabels].map(
            (item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-text-soft)]"
              >
                {item}
              </span>
            ),
          )}
        </div>
      </section>

      <section id="about" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-soft)] md:min-h-[520px]">
            <Image
              src="/editorial/about-editorial.png"
              alt="Arctic Daze premium menswear editorial portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-[center_35%]"
            />
          </div>

          <div className="paper-panel rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
              About Arctic Daze
            </p>
            <h2 className="font-display mt-5 max-w-3xl text-[clamp(2.4rem,5vw,5.35rem)] font-bold leading-[0.94] tracking-[-0.045em]">
              A sharper way to shop men’s essentials from Malaysia.
            </h2>
            <p className="mt-7 text-base leading-8 text-[var(--ad-text-soft)] sm:text-lg">
              Arctic Daze is a men-focused import-commerce service built for
              customers in Bangladesh who want access to selected Malaysian
              fashion, footwear, fragrance, grooming, and lifestyle products
              without the confusion of international ordering.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--ad-text-soft)] sm:text-lg">
              You choose the item. We check the source, confirm availability,
              prepare a transparent quote, and guide the pre-order from request
              to delivery.
            </p>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Curated Men’s Categories",
                  text: "Fashion, footwear, grooming, fragrance, accessories, and daily essentials.",
                },
                {
                  title: "Transparent Quote Process",
                  text: "You receive the full cost before confirming your order.",
                },
                {
                  title: "Facebook-Guided Support",
                  text: "Send a link, post, or screenshot and we help you through the process.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card)] p-5"
                >
                  <CheckCircle2 className="h-5 w-5 text-[var(--ad-accent)]" />
                  <p className="mt-4 text-sm font-bold uppercase leading-5 tracking-[0.13em]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--ad-text-soft)]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="collections"
        className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex flex-col justify-between gap-5 border-t border-[var(--ad-border)] pt-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
                Featured Collections
              </p>
              <h2 className="font-display mt-4 text-[clamp(2.5rem,5.3vw,5.65rem)] font-bold leading-none tracking-[-0.045em]">
                Selected for how men actually dress.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[var(--ad-text-soft)]">
              From everyday hoodies and polos to sneakers, fragrance, grooming,
              and accessories — every category is built around practical style,
              clean presentation, and reliable pre-order sourcing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 lg:grid-cols-4">
            {collections.map((item) => (
              <article
                key={item.title}
                className="ad-lift group overflow-hidden rounded-[1.35rem] border border-[var(--ad-border)] bg-[var(--ad-card)] shadow-[var(--shadow-soft)] sm:rounded-[1.75rem]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ad-card-2)]">
                  <Image
                    src={item.image}
                    alt={`Arctic Daze ${item.title}`}
                    fill
                    sizes="(max-width: 430px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover duration-500 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,20,17,0.08)] to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-3xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--ad-text-soft)]">
                    {item.note}
                  </p>
                  <a
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-accent-dark)]"
                  >
                    Browse category <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href="/collections"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:bg-[var(--ad-accent-dark)]"
            >
              View All Products <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="why-us"
        className="dark-panel px-5 py-24 text-[var(--ad-white)] sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent-soft)]">
                Why Choose Us
              </p>
              <h2 className="font-display mt-4 text-[clamp(2.7rem,5.5vw,5.8rem)] font-bold leading-[0.94] tracking-[-0.045em]">
                Sourcing You Can Trust
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#d7cabb]">
              Pre-order shopping depends on clarity. Arctic Daze keeps the
              process simple: clear product request, clear quote, clear
              confirmation, and clear communication until delivery.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((item) => (
              <article
                key={item.title}
                className="ad-lift rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-md"
              >
                <p className="font-display text-3xl font-bold text-[var(--ad-accent-soft)]">
                  {item.number}
                </p>
                <h3 className="mt-7 text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#cabcad]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
              The Process
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.5rem,5.3vw,5.6rem)] font-bold leading-none tracking-[-0.045em]">
              How to order with Arctic Daze.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {orderSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="ad-lift paper-panel rounded-[1.6rem] border border-[var(--ad-border)] p-6 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-bold text-[var(--ad-accent)]">
                      {step.number}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)]">
                      <Icon className="h-5 w-5 text-[var(--ad-accent-dark)]" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--ad-text-soft)]">
                    {step.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="stores" className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="paper-panel rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:self-start">
            <Store className="h-10 w-10 text-[var(--ad-accent)]" />
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
              Malaysian Shopping Websites
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.4rem,5vw,5rem)] font-bold leading-none tracking-[-0.045em]">
              Browse the stores. We handle the sourcing.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--ad-text-soft)]">
              Explore supported Malaysian retailers, choose the item you want,
              and send the product link to Arctic Daze. We check availability,
              prepare the quote, and guide the pre-order.
            </p>
            <div className="mt-8 rounded-3xl border border-[var(--ad-border)] bg-[rgba(255,250,242,0.72)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-muted)]">
                Source-reference note
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--ad-text-soft)]">
                Store and brand names are shown as source references only.
                Arctic Daze does not claim official partnership unless
                specifically verified.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {storeGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-[1.6rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="font-display text-3xl font-bold">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-col gap-2.5">
                  {group.stores.map((store) => (
                    <div
                      key={store}
                      className="flex items-center justify-between rounded-2xl bg-[var(--ad-card-2)] px-4 py-3"
                    >
                      <span className="text-sm font-semibold text-[var(--ad-text-soft)]">
                        {store}
                      </span>
                      <ExternalLink className="h-4 w-4 text-[var(--ad-accent)]" />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1440px] rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
                Source References
              </p>
              <h2 className="font-display mt-4 text-[clamp(2.2rem,4.5vw,4.8rem)] font-bold leading-none tracking-[-0.04em]">
                Labels Customers Often Request
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--ad-text-soft)]">
              From sneakers and watches to fragrance and everyday menswear,
              customers often ask us to source items from these popular labels
              and Malaysian stores.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {labels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-text-soft)]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="dark-panel mx-auto grid max-w-[1440px] overflow-hidden rounded-[2rem] border border-[var(--ad-black)] text-[var(--ad-white)] shadow-[var(--shadow-strong)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent-soft)]">
              Facebook Community
            </p>
            <h2 className="font-display mt-4 max-w-4xl text-[clamp(2.7rem,5.7vw,6.1rem)] font-bold leading-[0.92] tracking-[-0.05em]">
              Join the Arctic Daze Community
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#d7cabb]">
              Follow our Facebook page and group for new drops, weekly finds,
              restock updates, Malaysian store picks, and men’s fashion
              inspiration.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--ad-white)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-black)] hover:-translate-y-1"
              >
                Facebook Page <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:-translate-y-1 hover:bg-white/10"
              >
                Message Us <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:-translate-y-1 hover:bg-white/10"
              >
                Join Group <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative min-h-[360px] bg-[#211b16] lg:min-h-[520px]">
            <Image
              src="/editorial/community.png"
              alt="Arctic Daze premium menswear flat-lay with ordering lifestyle"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-[center_50%] opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[rgba(23,20,17,0.22)]" />
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="paper-panel rounded-[2rem] border border-[var(--ad-border)] p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--ad-accent)]">
              Contact Arctic Daze
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.5rem,5.3vw,5.6rem)] font-bold leading-none tracking-[-0.045em]">
              Have a Product in Mind?
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--ad-text-soft)]">
              Send us the product link, screenshot, or Facebook post. We will
              check availability, prepare a quote, confirm the order details,
              and guide you through the pre-order process.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                [
                  "Messenger / WhatsApp",
                  "Best for quick product requests.",
                  MessageCircle,
                ],
                ["Email Support", "Best for detailed order questions.", Mail],
                [
                  "Phone Confirmation",
                  "Add your number for quote and delivery updates.",
                  Phone,
                ],
              ].map(([title, text, Icon]) => {
                const ContactIcon = Icon as typeof MessageCircle;

                return (
                  <div
                    key={title as string}
                    className="flex items-center gap-4 rounded-3xl border border-[var(--ad-border)] bg-[var(--ad-card)] p-5"
                  >
                    <ContactIcon className="h-5 w-5 text-[var(--ad-accent)]" />
                    <div>
                      <p className="text-sm font-bold">{title as string}</p>
                      <p className="text-sm text-[var(--ad-text-soft)]">
                        {text as string}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="rounded-[2rem] border border-[var(--ad-border)] bg-[var(--ad-card)] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                  Name
                </span>
                <input
                  className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
                  placeholder="Your name"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                  Phone
                </span>
                <input
                  className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
                  placeholder="Your phone number"
                />
              </label>

              <label className="grid gap-2 sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                  Messenger or WhatsApp
                </span>
                <input
                  className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
                  placeholder="Profile link or WhatsApp number"
                />
              </label>

              <label className="grid gap-2 sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                  Product link
                </span>
                <input
                  className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
                  placeholder="Paste Malaysian store product link"
                />
              </label>

              <label className="grid gap-2 sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                  Preferred contact method
                </span>
                <select className="rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]">
                  <option>Messenger</option>
                  <option>WhatsApp</option>
                  <option>Phone call</option>
                  <option>Email</option>
                </select>
              </label>

              <label className="grid gap-2 sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ad-muted)]">
                  Message
                </span>
                <textarea
                  className="min-h-36 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card-2)] px-4 py-4 outline-none focus:border-[var(--ad-accent)]"
                  placeholder="Tell us size, color, quantity, or screenshot details"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--ad-black)] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ad-white)] hover:-translate-y-1 hover:bg-[var(--ad-accent-dark)]"
            >
              Send Request <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 text-center text-xs leading-6 text-[var(--ad-muted)]">
              We will contact you with availability and quote details before
              confirming any order.
            </p>
          </form>
        </div>
      </section>

      <footer className="dark-panel px-5 py-12 text-[var(--ad-white)] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.1fr_1.4fr_0.9fr]">
            <div>
              <p className="font-display text-4xl font-bold tracking-[0.16em]">
                ARCTIC DAZE
              </p>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#cabcad]">
                Premium men’s fashion and lifestyle products sourced from
                Malaysian stores for customers in Bangladesh.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--ad-accent-soft)]">
                    {column.title}
                  </p>

                  <div className="mt-5 grid gap-3">
                    {column.links.map((link) => (
                      <a
                        href={
                          link === "New In"
                            ? "/collections"
                            : link === "Clothing"
                              ? "/category/men-shirts-polos"
                              : link === "Footwear"
                                ? "/category/sneakers"
                                : link === "Accessories"
                                  ? "/category/accessories"
                                  : link === "Grooming"
                                    ? "/category/daily-essentials"
                                    : link === "How to Order"
                                      ? "/#process"
                                      : link === "Malaysian Stores"
                                        ? "/#stores"
                                        : link === "Community"
                                          ? "/#community"
                                          : link === "Contact"
                                            ? "/#contact"
                                            : "/collections"
                        }
                        key={link}
                        className="text-sm text-[#cabcad] hover:text-[var(--ad-white)]"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--ad-accent-soft)]">
                Join the Journey
              </p>
              <p className="mt-5 text-sm leading-7 text-[#cabcad]">
                Sign up for early access, weekly finds, store updates, and
                exclusive offers.
              </p>
              <div className="mt-5 flex overflow-hidden rounded-full border border-white/15 bg-white/5">
                <input
                  className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm text-[var(--ad-white)] outline-none placeholder:text-[#8c8074]"
                  placeholder="Enter your email"
                />
                <button
                  type="button"
                  className="bg-[var(--ad-accent)] px-5 text-[var(--ad-white)]"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 pt-8 text-xs text-[#a99b8b] sm:flex-row">
            <p>© 2026 Arctic Daze. All rights reserved.</p>
            <p className="font-display italic tracking-wide">
              Designed for a life well lived.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
