import type { ProductListItem } from "@/lib/products/types";
import { ProductCard } from "@/components/products/product-card";
import { ProductEmptyState } from "@/components/products/product-empty-state";

type ProductGridProps = {
  products: ProductListItem[];
  emptyTitle?: string;
  emptyText?: string;
};

export function ProductGrid({
  products,
  emptyTitle,
  emptyText,
}: ProductGridProps) {
  if (products.length === 0) {
    return <ProductEmptyState title={emptyTitle} text={emptyText} />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}