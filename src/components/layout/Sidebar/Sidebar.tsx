"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ISidebarItem {
  id: string;
  label: string;
  href: string;
}

export interface ISidebarProps {
  items: readonly ISidebarItem[];
  open?: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
}

export function Sidebar({
  items,
  open = false,
  onNavigate,
  onClose,
}: ISidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Cerrar menú lateral"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-gray-900/50 desktop:hidden"
        />
      )}

      <aside
        aria-label="Navegación del panel"
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-gray-900 text-white transition-transform duration-200 motion-reduce:transition-none desktop:!translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-20 items-center justify-between gap-md border-b border-gray-700 px-lg">
          <Link
            href="/dashboard"
            onClick={onNavigate}
            className="inline-flex items-center gap-sm font-semibold focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Image
              src="/logos/aislafriopro-mark-on-dark.jpeg"
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-full object-contain"
            />

            <span aria-label="AislaFrioPro">
              <span aria-hidden="true" className="text-secondary">
                Aisla
              </span>
              <span aria-hidden="true" className="text-primary">
                Frio
              </span>
              <span aria-hidden="true" className="text-white">
                Pro
              </span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={onClose}
            className="inline-flex size-xxl items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent desktop:hidden"
          >
            <span aria-hidden="true" className="text-h5">
              ×
            </span>
          </button>
        </div>

        <nav
          aria-label="Opciones del panel"
          className="flex flex-1 flex-col gap-xs overflow-y-auto p-md"
        >
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-md py-sm text-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-700 p-md">
          <p className="text-small text-gray-400">
            Menú preparado para permisos por rol.
          </p>
        </div>
      </aside>
    </>
  );
}