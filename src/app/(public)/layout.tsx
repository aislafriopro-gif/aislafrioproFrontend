import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { WhatsAppButton } from "@/components/common/WhatsAppButton/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/constants/contact";
import { ROUTES } from "@/constants/routes";

const NAVIGATION_LINKS = [
  { label: "Inicio", href: ROUTES.home },
  { label: "Nosotros", href: ROUTES.about },
  { label: "Servicios", href: ROUTES.services },
  { label: "Proyectos", href: ROUTES.projects },
  { label: "Tienda", href: "/tienda" },
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
      <WhatsAppButton
        message={WHATSAPP_MESSAGES.general}
        floating
        aria-label="Contactar a AislaFrioPro por WhatsApp"
      />
    </>
  );
}
