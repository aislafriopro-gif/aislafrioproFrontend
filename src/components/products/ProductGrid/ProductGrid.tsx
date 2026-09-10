import {
  ProductCard,
  type IProductCardData,
} from "@/components/products/ProductCard/ProductCard";
import { Card } from "@/components/ui/Card/Card";

export interface IProductGridProps {
  products: readonly IProductCardData[];
}

export function ProductGrid({
  products,
}: IProductGridProps) {
  if (products.length === 0) {
    return (
      <Card
        role="status"
        className="text-center"
      >
        <h2 className="text-h5 font-semibold text-gray-900">
          No hay productos disponibles
        </h2>

        <p className="mt-sm text-body text-gray-700">
          Los productos se mostrarán cuando la información esté disponible.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-md tablet:grid-cols-2 tablet:gap-lg desktop:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.slug}
          product={product}
        />
      ))}
    </div>
  );
}