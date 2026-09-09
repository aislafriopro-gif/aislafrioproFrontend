import type { Metadata } from "next";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ProductGrid } from "@/components/products/ProductGrid/ProductGrid";
import { Badge } from "@/components/ui/Badge/Badge";
import { TEMPORARY_PRODUCTS } from "@/features/products/data/temporaryProducts";

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

export default function Page() {
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
            Explora nuestro catálogo provisional de soluciones industriales.
          </p>
        </header>

        <div className="mt-xl">
          <ProductGrid products={TEMPORARY_PRODUCTS} />
        </div>
      </Container>
    </Section>
  );
}