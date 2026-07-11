import type { ProductStatus } from "@/lib/products/types";

export const PUBLIC_PRODUCT_STATUSES = [
  "pre_order",
  "in_stock",
  "sold_out",
  "supplier_unavailable",
  "discontinued",
] as const;

export type PublicProductStatus =
  (typeof PUBLIC_PRODUCT_STATUSES)[number];

export const UNAVAILABLE_PRODUCT_STATUSES = [
  "sold_out",
  "supplier_unavailable",
  "discontinued",
] as const;

export function isPublicProductStatus(
  value: string | undefined,
): value is PublicProductStatus {
  return (
    typeof value === "string" &&
    PUBLIC_PRODUCT_STATUSES.includes(
      value as PublicProductStatus,
    )
  );
}

export function isProductUnavailable(
  status: ProductStatus | string,
) {
  return UNAVAILABLE_PRODUCT_STATUSES.includes(
    status as (typeof UNAVAILABLE_PRODUCT_STATUSES)[number],
  );
}

export function formatProductStatus(status: string) {
  const labels: Record<string, string> = {
    pre_order: "Pre-order",
    in_stock: "In stock",
    sold_out: "Sold out",
    supplier_unavailable: "Supplier unavailable",
    discontinued: "Discontinued",
  };

  return labels[status] || status.replaceAll("_", " ");
}

export function getUnavailableProductCopy(status: string) {
  if (status === "supplier_unavailable") {
    return {
      title: "The supplier cannot confirm this item.",
      text: "Supplier availability has changed. Leave your contact details and Arctic Daze will check again or help you find a similar product.",
      timing: "Supplier availability changed",
    };
  }

  if (status === "discontinued") {
    return {
      title: "This product has been discontinued.",
      text: "The current supplier listing is no longer active. We can still help search for a similar style, alternative seller, or replacement item.",
      timing: "No confirmed restock date",
    };
  }

  return {
    title: "This item is currently sold out.",
    text: "The product is not available for pre-order right now. Register your interest and Arctic Daze will contact you if it becomes available again.",
    timing: "Restock timing unavailable",
  };
}