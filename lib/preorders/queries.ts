import { createClient } from "@/lib/supabase/server";

export type PreorderStatus =
  | "new"
  | "contacted"
  | "waiting_for_advance"
  | "confirmed"
  | "ordered_from_supplier"
  | "in_transit"
  | "arrived"
  | "ready_for_delivery"
  | "completed"
  | "cancelled"
  | "refunded"
  | "supplier_unavailable";

export type CustomerPreorder = {
  id: string;
  customer_name: string;
  preferred_contact_method: string | null;
  size: string | null;
  color: string | null;
  quantity: number;
  status: PreorderStatus;
  note: string | null;
  created_at: string;
  updated_at: string;

  product: {
    id: string;
    title: string;
    slug: string;
    price_bdt: number | null;
    preorder_eta: string | null;

    image: {
      stored_url: string;
      alt: string | null;
    } | null;
  } | null;
};

type RawImage = {
  stored_url: string | null;
  alt: string | null;
  position: number | null;
  status: string | null;
};

type RawProduct = {
  id: string;
  title: string;
  slug: string;
  price_bdt: number | string | null;
  preorder_eta: string | null;
  product_images: RawImage[] | null;
};

type RawRequest = {
  id: string;
  customer_name: string;
  preferred_contact_method: string | null;
  size: string | null;
  color: string | null;
  quantity: number;
  status: string;
  note: string | null;
  created_at: string;
  updated_at: string;
  product: RawProduct | RawProduct[] | null;
};

export async function getCustomerPreorders(
  userId: string,
): Promise<CustomerPreorder[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("preorder_requests")
    .select(`
      id,
      customer_name,
      preferred_contact_method,
      size,
      color,
      quantity,
      status,
      note,
      created_at,
      updated_at,
      product:products (
        id,
        title,
        slug,
        price_bdt,
        preorder_eta,
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
    console.error("getCustomerPreorders error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return [];
  }

  return (data || []).map((row) => {
    const raw = row as unknown as RawRequest;

    const product = Array.isArray(raw.product)
      ? raw.product[0]
      : raw.product;

    const images = (product?.product_images || [])
      .filter(
        (image) =>
          image.status === "stored" && Boolean(image.stored_url),
      )
      .sort(
        (first, second) =>
          Number(first.position || 0) -
          Number(second.position || 0),
      );

    return {
      id: raw.id,
      customer_name: raw.customer_name,
      preferred_contact_method:
        raw.preferred_contact_method,
      size: raw.size,
      color: raw.color,
      quantity: Number(raw.quantity || 1),
      status: raw.status as PreorderStatus,
      note: raw.note,
      created_at: raw.created_at,
      updated_at: raw.updated_at,

      product: product
        ? {
            id: product.id,
            title: product.title,
            slug: product.slug,

            price_bdt:
              product.price_bdt === null
                ? null
                : Number(product.price_bdt),

            preorder_eta: product.preorder_eta,

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