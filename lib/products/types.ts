export type ProductStatus =
  | "draft"
  | "needs_review"
  | "pre_order"
  | "in_stock"
  | "sold_out"
  | "supplier_unavailable"
  | "discontinued"
  | "cancelled"
  | "archived";

export type ProductImage = {
  id: string;
  stored_url: string;
  alt: string | null;
  position: number;
  status: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
} | null;

export type ProductListItem = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price_bdt: number | null;
  status: ProductStatus;
  preorder_eta: string | null;
  supplier_status: string | null;
  category: ProductCategory;
  images: ProductImage[];
};

export type ProductDetail = ProductListItem & {
  facebook_url: string | null;
  supplier_url: string | null;
  advance_required: boolean;
  hashtags: string[];
  created_at: string;
};