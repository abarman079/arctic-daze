import { createClient } from "@/lib/supabase/server";
import {
  PUBLIC_PRODUCT_STATUSES,
  type PublicProductStatus,
} from "@/lib/products/status";
import type {
  ProductCategory,
  ProductDetail,
  ProductImage,
  ProductListItem,
  ProductStatus,
} from "@/lib/products/types";

type ProductQueryOptions = {
  categoryId?: string;
  productIds?: string[];
  limit?: number;
  excludeSlug?: string;
  search?: string;
  status?: PublicProductStatus;
  sort?: "newest" | "price-asc" | "price-desc";
};

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.length > 0) return Number(value);
  return null;
}

function normalizeCategory(category: unknown): ProductCategory {
  if (!category || typeof category !== "object") return null;

  const value = Array.isArray(category) ? category[0] : category;
  if (!value || typeof value !== "object") return null;

  const item = value as {
    id?: string | null;
    name?: string | null;
    slug?: string | null;
  };

  if (!item.id || !item.name || !item.slug) return null;

  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
  };
}

function normalizeImages(images: unknown): ProductImage[] {
  if (!Array.isArray(images)) return [];

  return images
    .map((image) => image as Partial<ProductImage>)
    .filter((image) => image.status === "stored" && Boolean(image.stored_url))
    .map((image) => ({
      id: String(image.id),
      stored_url: String(image.stored_url),
      alt: image.alt ?? null,
      position: Number(image.position ?? 0),
      status: String(image.status),
    }))
    .sort((a, b) => a.position - b.position);
}

function normalizeProduct(row: Record<string, unknown>): ProductDetail {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    description: row.description ? String(row.description) : null,
    price_bdt: toNumber(row.price_bdt),
    status: String(row.status) as ProductStatus,
    preorder_eta: row.preorder_eta ? String(row.preorder_eta) : null,
    supplier_status: row.supplier_status ? String(row.supplier_status) : null,
    category: normalizeCategory(row.category),
    images: normalizeImages(row.product_images),
    facebook_url: row.facebook_url ? String(row.facebook_url) : null,
    supplier_url: row.supplier_url ? String(row.supplier_url) : null,
    advance_required: Boolean(row.advance_required),
    hashtags: Array.isArray(row.hashtags)
      ? row.hashtags.map((tag) => String(tag))
      : [],
    created_at: String(row.created_at),
  };
}

const productSelect = `
  id,
  title,
  slug,
  description,
  price_bdt,
  status,
  preorder_eta,
  supplier_status,
  facebook_url,
  supplier_url,
  advance_required,
  hashtags,
  created_at,
  category:categories (
    id,
    name,
    slug
  ),
  product_images (
    id,
    stored_url,
    alt,
    position,
    status
  )
`;

function cleanSearch(value?: string) {
  return (value || "").trim().replaceAll("%", "").replaceAll(",", "");
}

export async function getPublicProducts(
  options: ProductQueryOptions = {},
): Promise<ProductListItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(productSelect)
    .not("published_at", "is", null);

  if (options.status) {
    query = query.eq("status", options.status);
  } else {
    query = query.in("status", [...PUBLIC_PRODUCT_STATUSES]);
  }

  if (options.categoryId) {
    query = query.eq("category_id", options.categoryId);
  }
  if (options.productIds && options.productIds.length > 0) {
    query = query.in("id", options.productIds);
  }

  if (options.excludeSlug) {
    query = query.neq("slug", options.excludeSlug);
  }

  const search = cleanSearch(options.search);

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  if (options.sort === "price-asc") {
    query = query.order("price_bdt", { ascending: true, nullsFirst: false });
  } else if (options.sort === "price-desc") {
    query = query.order("price_bdt", { ascending: false, nullsFirst: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("getPublicProducts error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return [];
  }

  return (data || []).map((row) =>
    normalizeProduct(row as Record<string, unknown>),
  );
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("slug", slug)
    .in("status", [...PUBLIC_PRODUCT_STATUSES])
    .not("published_at", "is", null)
    .maybeSingle();

  if (error) {
    console.error("getProductBySlug error:", {
      slug,
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return null;
  }

  if (!data) return null;

  return normalizeProduct(data as Record<string, unknown>);
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("getCategoryBySlug error:", {
      slug,
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return null;
  }

  return data;
}

export async function getActiveCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, parent_id, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getActiveCategories error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return [];
  }

  return data || [];
}
