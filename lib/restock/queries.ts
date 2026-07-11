import type { ProductStatus } from "@/lib/products/types";
import { createClient } from "@/lib/supabase/server";

export type CustomerRestockAlert = {
  id: string;
  status: string;
  size: string | null;
  color: string | null;
  note: string | null;
  created_at: string;
  notified_at: string | null;

  product: {
    id: string;
    title: string;
    slug: string;
    status: ProductStatus;

    image: {
      stored_url: string;
      alt: string | null;
    } | null;
  } | null;
};

type RawProduct = {
  id: string;
  title: string;
  slug: string;
  status: string;

  product_images:
    | {
        stored_url: string | null;
        alt: string | null;
        position: number | null;
        status: string | null;
      }[]
    | null;
};

type RawAlert = {
  id: string;
  status: string;
  size: string | null;
  color: string | null;
  note: string | null;
  created_at: string;
  notified_at: string | null;
  product: RawProduct | RawProduct[] | null;
};

export async function getCustomerRestockAlerts(
  userId: string,
): Promise<CustomerRestockAlert[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("restock_alerts")
    .select(`
      id,
      status,
      size,
      color,
      note,
      created_at,
      notified_at,
      product:products (
        id,
        title,
        slug,
        status,
        product_images (
          stored_url,
          alt,
          position,
          status
        )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("getCustomerRestockAlerts error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return [];
  }

  return (data || []).map((row) => {
    const raw = row as unknown as RawAlert;

    const product = Array.isArray(raw.product)
      ? raw.product[0]
      : raw.product;

    const images = (product?.product_images || [])
      .filter(
        (image) =>
          image.status === "stored" &&
          Boolean(image.stored_url),
      )
      .sort(
        (first, second) =>
          Number(first.position || 0) -
          Number(second.position || 0),
      );

    return {
      id: raw.id,
      status: raw.status,
      size: raw.size,
      color: raw.color,
      note: raw.note,
      created_at: raw.created_at,
      notified_at: raw.notified_at,

      product: product
        ? {
            id: product.id,
            title: product.title,
            slug: product.slug,
            status: product.status as ProductStatus,

            image: images[0]?.stored_url
              ? {
                  stored_url: images[0].stored_url,
                  alt: images[0].alt,
                }
              : null,
          }
        : null,
    };
  });
}