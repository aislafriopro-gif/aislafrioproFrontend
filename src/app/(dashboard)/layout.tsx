"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { useAuthStore } from "@/store/auth.store";
import { Header } from "@/components/layout/Header/Header";

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
  const user = useAuthStore((state) => state.user);

  const title = PAGE_TITLES[pathname] ?? "Panel de control";

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen desktop:pl-72">
        <Header
          title={title}
          user={{
            name: user?.name ?? "Usuario",
            role: user?.role ?? "Rol no definido",
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