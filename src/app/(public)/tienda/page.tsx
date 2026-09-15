// src/app/(public)/tienda/page.tsx

import type { Metadata } from "next";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ProductGrid } from "@/components/products/ProductGrid/ProductGrid";
import { Badge } from "@/components/ui/Badge/Badge";
import { productsService } from "@/services/products.service";
import { IProductCardData } from "@/components/products/ProductCard/ProductCard";
import { IProduct } from "@/interfaces/IProduct";

const title = "Tienda de cortinas industriales de PVC";
const description =
  "Explora el catálogo de cortinas industriales de PVC de AislaFrioPro para separación y control de espacios.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "tienda de cortinas industriales",
    "comprar cortinas de PVC",
    "cortinas industriales de PVC",
    "productos AislaFrioPro",
  ],
  alternates: {
    canonical: "/tienda",
  },
  openGraph: {
    title: `${title} | AislaFrioPro`,
    description,
    url: "/tienda",
    siteName: "AislaFrioPro",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/cotizador/cot1.png",
        alt: "Catálogo de cortinas industriales de PVC",
      },
    ],
  },
};

// Función de mapeo dinámica para transformar el modelo del backend a la tarjeta
function mapProductToCardData(product: IProduct): IProductCardData {
  let imgSrc = "/images/cotizador/cot1.png";
  
  const rawImages = (product as unknown as { images?: unknown[] }).images;
  if (Array.isArray(rawImages) && rawImages.length > 0) {
    const firstImage = rawImages[0];
    if (typeof firstImage === "string") {
      imgSrc = firstImage;
    } else if (firstImage && typeof firstImage === "object" && "url" in firstImage) {
      imgSrc = (firstImage as { url: string }).url;
    }
  }

  const formattedPrice = product.price
    ? `$ ${Number(product.price).toLocaleString("es-CO")}`
    : "Precio a consultar";

  return {
    slug: product.slug || "",
    name: product.name || "Producto sin nombre",
    price: formattedPrice,
    image: {
      src: imgSrc,
      alt: product.name || "Cortina industrial de PVC",
    },
  };
}

export default async function Page() {
  let mappedProducts: IProductCardData[] = [];
  
  try {
    const rawProducts = await productsService.getAll();
    mappedProducts = rawProducts.map(mapProductToCardData);
  } catch (error) {
    console.error("Error al cargar los productos de la tienda:", error);
  }

  return (
    <Section
      aria-labelledby="store-page-title"
      className="bg-gray-50"
    >
      <Container>
        <header className="w-full text-center">
          <Badge variant="secondary">
            Tienda
          </Badge>

          <h1
            id="store-page-title"
            className="mt-md text-h3 font-semibold leading-tight text-gray-900 tablet:text-h2 desktop:text-h1"
          >
            Productos para diferentes necesidades
          </h1>

          <p className="mt-md text-body leading-relaxed text-gray-700">
            Explora nuestro catálogo de soluciones industriales y encuentra la protección ideal para tus espacios.
          </p>
        </header>

        <div className="mt-xl">
          <ProductGrid products={mappedProducts} />
        </div>
      </Container>
    </Section>
  );
}