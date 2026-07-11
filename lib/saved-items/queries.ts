import { createClient } from "@/lib/supabase/server";

export type SavedOrderDraft = {
  id: string;
  product_id: string;
  size: string | null;
  color: string | null;
  quantity: number;
  note: string | null;
  updated_at: string;
  product: {
    id: string;
    title: string;
    slug: string;
    price_bdt: number | null;
    status: string;
    preorder_eta: string | null;
    image: {
      stored_url: string;
      alt: string | null;
    } | null;
  } | null;
};

export async function getSavedOrderDrafts(
  userId: string,
): Promise<SavedOrderDraft[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_order_drafts")
    .select(`
      id,
      product_id,
      size,
      color,
      quantity,
      note,
      updated_at,
      product:products (
        id,
        title,
        slug,
        price_bdt,
        status,
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
    .order("updated_at", {
      ascending: false,
    });

  if (error) {
    console.error("getSavedOrderDrafts error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return [];
  }

  return (data || []).map((row) => {
    const productValue = Array.isArray(row.product)
      ? row.product[0]
      : row.product;

    const images =
      productValue &&
      Array.isArray(productValue.product_images)
        ? productValue.product_images
            .filter(
              (image) =>
                image.status === "stored" &&
                Boolean(image.stored_url),
            )
            .sort(
              (a, b) =>
                Number(a.position || 0) -
                Number(b.position || 0),
            )
        : [];

    return {
      id: String(row.id),
      product_id: String(row.product_id),
      size: row.size ? String(row.size) : null,
      color: row.color ? String(row.color) : null,
      quantity: Number(row.quantity || 1),
      note: row.note ? String(row.note) : null,
      updated_at: String(row.updated_at),
      product: productValue
        ? {
            id: String(productValue.id),
            title: String(productValue.title),
            slug: String(productValue.slug),
            price_bdt:
              productValue.price_bdt === null
                ? null
                : Number(productValue.price_bdt),
            status: String(productValue.status),
            preorder_eta: productValue.preorder_eta
              ? String(productValue.preorder_eta)
              : null,
            image: images[0]
              ? {
                  stored_url: String(images[0].stored_url),
                  alt: images[0].alt
                    ? String(images[0].alt)
                    : null,
                }
              : null,
          }
        : null,
    };
  });
}