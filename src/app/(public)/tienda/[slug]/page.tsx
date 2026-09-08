import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ProductInterestAction } from "@/components/products/ProductInterestAction/ProductInterestAction";
import { Badge } from "@/components/ui/Badge/Badge";
import { Card } from "@/components/ui/Card/Card";
import {
  TEMPORARY_PRODUCTS,
  findTemporaryProductBySlug,
} from "@/features/products/data/temporaryProducts";

export interface IProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return TEMPORARY_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: IProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findTemporaryProductBySlug(slug);

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

  return {
    title: product.name,
    description: product.shortDescription,
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
      description: product.shortDescription,
      url,
      siteName: "AislaFrioPro",
      locale: "es_CO",
      type: "website",
      images: [
        {
          url: product.image.src,
          alt: product.image.alt,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: IProductDetailPageProps) {
  const { slug } = await params;
  const product = findTemporaryProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <Section
      aria-labelledby="product-detail-title"
      className="bg-gray-50"
    >
      <Container>
        <article className="grid items-start gap-xl desktop:grid-cols-2">
          <div className="relative min-h-[24rem] overflow-hidden rounded-lg bg-gray-100 tablet:min-h-[32rem]">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col items-start">
            <Badge variant="secondary">
              Producto provisional
            </Badge>

            <h1
              id="product-detail-title"
              className="mt-md text-h3 font-semibold leading-tight text-gray-900 tablet:text-h2 desktop:text-h1"
            >
              {product.name}
            </h1>

            <p className="mt-md text-body leading-relaxed text-gray-700">
              {product.shortDescription}
            </p>

            <div className="mt-lg">
              <p className="text-small font-semibold uppercase tracking-wide text-gray-500">
                Precio referencial
              </p>

              <p className="mt-xs text-h3 font-semibold text-primary">
                {product.price}
              </p>
            </div>

            <Card
              variant="elevated"
              className="mt-lg w-full"
            >
              <h2 className="text-h5 font-semibold text-gray-900">
                Información del producto
              </h2>

              <dl className="mt-md grid gap-md tablet:grid-cols-2">
                {product.details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-small font-semibold text-gray-500">
                      {detail.label}
                    </dt>

                    <dd className="mt-xs text-body text-gray-900">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>

            <section
              aria-labelledby="product-description-title"
              className="mt-lg"
            >
              <h2
                id="product-description-title"
                className="text-h5 font-semibold text-gray-900"
              >
                Descripción
              </h2>

              <p className="mt-sm text-body leading-relaxed text-gray-700">
                {product.description}
              </p>
            </section>

            <ProductInterestAction
              productSlug={product.slug}
              className="mt-xl"
            />
          </div>
        </article>
      </Container>
    </Section>
  );
}