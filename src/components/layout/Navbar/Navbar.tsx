"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { Container } from "../Container/Container";

export interface INavbarLink {
  label: string;
  href: string;
}

export interface INavbarProps {
  brand?: ReactNode;
  brandHref?: string;
  links?: INavbarLink[];
  action?: ReactNode;
  className?: string;
}

export function Navbar({
  brand = "Aislafriopro",
  brandHref = "/",
  links = [],
  action,
  className = "",
}: INavbarProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur ${className}`}
    >
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-md">
          <Link
            href={brandHref}
            className="text-h5 font-semibold text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setOpen(false)}
          >
            {brand}
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-lg tablet:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body font-medium text-gray-700 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:text-primary/80"
              >
                {link.label}
              </Link>
            ))}

            {action}
          </nav>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((current) => !current)}
            className="inline-flex size-xxl items-center justify-center rounded-md text-gray-900 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:bg-gray-200 tablet:hidden"
          >
            <span aria-hidden="true" className="text-h4">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>

        {open && (
          <nav
            id={menuId}
            aria-label="Navegación móvil"
            className="flex flex-col gap-xs border-t border-gray-200 py-sm tablet:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-md py-sm text-body font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:bg-gray-200"
              >
                {link.label}
              </Link>
            ))}

            {action && <div className="p-md">{action}</div>}
          </nav>
        )}
      </Container>
    </header>
  );
}