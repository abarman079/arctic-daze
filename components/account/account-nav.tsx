"use client";

import {
  Bookmark,
  Heart,
  LayoutDashboard,
  PackageSearch,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const accountLinks = [
  {
    label: "Overview",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    label: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
  },
  {
    label: "Saved Items",
    href: "/account/saved-items",
    icon: Bookmark,
  },
  {
    label: "Pre-Orders",
    href: "/account/preorders",
    icon: PackageSearch,
  },
  {
    label: "Profile",
    href: "/account/profile",
    icon: UserRound,
  },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible lg:pb-0"
      aria-label="Customer account navigation"
    >
      {accountLinks.map((item) => {
        const Icon = item.icon;

        const active =
          item.href === "/account"
            ? pathname === "/account"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active
                ? "inline-flex min-h-12 shrink-0 items-center gap-3 rounded-2xl bg-[var(--ad-black)] px-5 py-3 text-sm font-bold text-[var(--ad-white)]"
                : "inline-flex min-h-12 shrink-0 items-center gap-3 rounded-2xl border border-[var(--ad-border)] bg-[var(--ad-card)] px-5 py-3 text-sm font-bold text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)] hover:text-[var(--ad-text)]"
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}