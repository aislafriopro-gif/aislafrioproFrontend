import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card/Card";

export interface IProductCardData {
  slug: string;
  name: string;
  price: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface IProductCardProps {
  product: IProductCardData;
}

export function ProductCard({
  product,
}: IProductCardProps) {
  return (
    <article className="h-full">
      <Card
        variant="elevated"
        animated
        className="flex h-full flex-col overflow-hidden !p-0"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
          />
        </div>

        <div className="flex flex-1 flex-col p-md">
            <h2 className="text-md font-semibold text-gray-900">
                {product.name}
            </h2>

            <div className="mt-sm flex items-end justify-between gap-sm">
                <div>
                <p className="text-small font-medium text-gray-500">
                    Precio referencial
                </p>

                <p className="mt-xs text-small font-semibold text-secondary">
                    {product.price}
                </p>
                </div>

                <Link
                href={`/tienda/${product.slug}`}
                aria-label={`Ver detalle de ${product.name}`}
                className="inline-flex shrink-0 items-center justify-center gap-xs rounded-md bg-primary px-sm py-xs text-md font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                Ver detalle
                <span aria-hidden="true">→</span>
                </Link>
            </div>
            </div>
      </Card>
    </article>
  );
}