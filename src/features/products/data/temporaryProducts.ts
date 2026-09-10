export interface ITemporaryProduct {
  slug: string;
  name: string;
  price: string;
  shortDescription: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  details: readonly {
    label: string;
    value: string;
  }[];
}

export const TEMPORARY_PRODUCTS: readonly ITemporaryProduct[] = [
  {
    slug: "cortina-pvc-industrial",
    name: "Cortina PVC industrial",
    price: "$350.000 COP",
    shortDescription:
      "Solución provisional para separar y organizar ambientes industriales.",
    description:
      "Producto provisional diseñado para representar una cortina industrial de PVC. Sus características, medidas y precio deberán reemplazarse cuando esté disponible la información oficial.",
    image: {
      src: "/images/cotizador/cot1.png",
      alt: "Vista frontal de una cortina industrial transparente",
    },
    details: [
      {
        label: "Material",
        value: "PVC industrial",
      },
      {
        label: "Aplicación",
        value: "Separación de ambientes",
      },
    ],
  },
  {
    slug: "cortina-termica",
    name: "Cortina térmica",
    price: "$480.000 COP",
    shortDescription:
      "Alternativa provisional para espacios que requieren control térmico.",
    description:
      "Presentación visual provisional de una cortina destinada a reducir el intercambio térmico entre diferentes ambientes.",
    image: {
      src: "/images/cotizador/cot2.png",
      alt: "Vista lateral de una cortina industrial",
    },
    details: [
      {
        label: "Material",
        value: "PVC térmico",
      },
      {
        label: "Aplicación",
        value: "Control de temperatura",
      },
    ],
  },
  {
    slug: "cortina-divisoria",
    name: "Cortina divisoria",
    price: "$320.000 COP",
    shortDescription:
      "Solución provisional para delimitar zonas de trabajo.",
    description:
      "Producto provisional orientado a representar la separación flexible de espacios industriales, comerciales o logísticos.",
    image: {
      src: "/images/cotizador/cot3.png",
      alt: "Vista complementaria de una cortina divisoria",
    },
    details: [
      {
        label: "Material",
        value: "PVC transparente",
      },
      {
        label: "Aplicación",
        value: "División de espacios",
      },
    ],
  },
];

export function findTemporaryProductBySlug(slug: string) {
  return TEMPORARY_PRODUCTS.find(
    (product) => product.slug === slug,
  );
}