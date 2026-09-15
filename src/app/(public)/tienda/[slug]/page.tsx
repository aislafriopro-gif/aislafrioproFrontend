// src/app/(public)/tienda/[slug]/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ProductInterestAction } from "@/components/products/ProductInterestAction/ProductInterestAction";
import { Badge } from "@/components/ui/Badge/Badge";
import { productsService } from "@/services/products.service";
import { IProduct } from "@/interfaces/IProduct";

export interface IProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const products = await productsService.getAll();
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: IProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  let product: IProduct | null = null;
  try {
    product = await productsService.getBySlug(slug);
  } catch {
    product = null;
  }

  if (!product) {
    return {
      title: "Producto no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `/tienda/${product.slug}`;
  const description = product.description || "Explora los detalles de este producto en AislaFrioPro.";
  
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

  return {
    title: product.name,
    description,
    keywords: [
      product.name,
      "cortinas industriales",
      "cortinas de PVC",
      "AislaFrioPro",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} | AislaFrioPro`,
      description,
      url,
      siteName: "AislaFrioPro",
      locale: "es_CO",
      type: "website",
      images: [
        {
          url: imgSrc,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: IProductDetailPageProps) {
  const { slug } = await params;

  let product: IProduct | null = null;
  try {
    product = await productsService.getBySlug(slug);
  } catch {
    product = null;
  }

  if (!product) {
    notFound();
  }

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

  return (
    <Section
      aria-labelledby="product-detail-title"
      className="bg-gray-50"
    >
      <Container>
        <article className="grid items-start gap-xl desktop:grid-cols-2">
          <div className="relative min-h-[24rem] overflow-hidden rounded-lg bg-gray-100 tablet:min-h-[32rem]">
            <Image
              src={imgSrc}
              alt={product.name || "Detalle de producto"}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col items-start">
            <Badge variant="secondary">
              Detalle de Producto
            </Badge>

            <h1
              id="product-detail-title"
              className="mt-md text-h3 font-semibold leading-tight text-gray-900 tablet:text-h2 desktop:text-h1"
            >
              {product.name}
            </h1>

            <div className="mt-lg">
              <p className="text-small font-semibold uppercase tracking-wide text-gray-500">
                Precio referencial
              </p>

              <p className="mt-xs text-h3 font-semibold text-primary">
                {formattedPrice}
              </p>
            </div>

            <section
              aria-labelledby="product-description-title"
              className="mt-lg w-full"
            >
              <h2
                id="product-description-title"
                className="text-h5 font-semibold text-gray-900"
              >
                Descripción
              </h2>

              <p className="mt-sm text-body leading-relaxed text-gray-700">
                {product.description || "Sin descripción disponible para este producto."}
              </p>
            </section>

            <ProductInterestAction
              productSlug={product.slug || slug}
              productName={product.name || "Producto"}
              className="mt-xl"
            />
          </div>
        </article>
      </Container>
    </Section>
  );
}