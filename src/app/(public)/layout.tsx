import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { ROUTES } from "@/constants/routes";

const NAVIGATION_LINKS = [
  { label: "Inicio", href: ROUTES.home },
  { label: "Nosotros", href: ROUTES.about },
  { label: "Servicios", href: ROUTES.services },
  { label: "Proyectos", href: ROUTES.projects },
  { label: "Contacto", href: ROUTES.contact },
];

const FOOTER_SECTIONS = [
  {
    title: "Navegación",
    links: NAVIGATION_LINKS,
  },
];

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Navbar links={NAVIGATION_LINKS} />

      <main className="flex-1">{children}</main>

      <Footer
        description="Soluciones especializadas en refrigeración y aislamiento."
        sections={FOOTER_SECTIONS}
      />
    </>
  );
}