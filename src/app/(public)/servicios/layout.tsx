import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Servicios de instalación de cortinas industriales";
const description =
  "Conoce los servicios de instalación, mantenimiento y asesoría para cortinas industriales de PVC de AislaFrioPro.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "instalación de cortinas industriales",
    "mantenimiento de cortinas de PVC",
    "asesoría en cortinas industriales",
    "servicios AislaFrioPro",
  ],
  alternates: {
    canonical: "/servicios",
  },
  openGraph: {
    title: `${title} | AislaFrioPro`,
    description,
    url: "/servicios",
    siteName: "AislaFrioPro",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/hero/hero1.png",
        alt: "Servicios de instalación de cortinas industriales",
      },
    ],
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}