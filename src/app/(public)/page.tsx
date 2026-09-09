import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

const title = "Cortinas industriales de PVC";
const description =
  "Soluciones en instalación de cortinas industriales de PVC para separación de espacios y aislamiento térmico.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "cortinas industriales",
    "cortinas de PVC",
    "instalación de cortinas",
    "AislaFrioPro",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${title} | AislaFrioPro`,
    description,
    url: "/",
    siteName: "AislaFrioPro",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/hero/hero1.png",
        alt: "Soluciones industriales de AislaFrioPro",
      },
    ],
  },
};

export default function Page() {
  return <HomePage />;
}