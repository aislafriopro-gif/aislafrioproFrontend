"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  type ISidebarItem,
} from "@/components/layout/Sidebar/Sidebar";
import { Header } from "@/components/layout/Header/Header";

const DASHBOARD_ITEMS: readonly ISidebarItem[] = [
  {
    id: "dashboard",
    label: "Resumen",
    href: "/dashboard",
  },
  {
    id: "users",
    label: "Usuarios",
    href: "/usuarios",
  },
  {
    id: "settings",
    label: "Configuración",
    href: "/configuracion",
  },
];

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Panel de control",
  "/usuarios": "Usuarios",
  "/configuracion": "Configuración",
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const title = PAGE_TITLES[pathname] ?? "Panel de control";

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        items={DASHBOARD_ITEMS}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen desktop:pl-72">
        <Header
          title={title}
          user={{
            name: "Usuario provisional",
            role: "Rol pendiente",
          }}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        <main className="p-md tablet:p-lg desktop:p-xl">
          {children}
        </main>
      </div>
    </div>
  );
}