"use client";

import Link from "next/link";
import { useId, useState, type ReactNode, useEffect } from "react";
import { Container } from "../Container/Container";
import Image from "next/image";
import Cookies from "js-cookie";

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
  brand = (
    <span className="inline-flex items-center justify-center gap-sm font-semibold">
      <Image
        src="/logos/aislafriopro-mark-on-dark.jpeg"
        alt=""
        width={56}
        height={56}
        priority
        className="block size-14 shrink-0 rounded-full object-contain object-center"
      />
      <span aria-label="AislaFrioPro" className="inline-flex">
        <span aria-hidden="true" className="text-secondary-light">Aisla</span>
        <span aria-hidden="true" className="text-primary">Frio</span>
        <span aria-hidden="true" className="text-white">Pro</span>
      </span>
    </span>
  ),
  brandHref = "/",
  links = [],
  action,
  className = "",
}: INavbarProps) {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuId = useId();

  const token = typeof window !== "undefined" ? Cookies.get("token") : null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const isLoggedIn = isMounted && Boolean(token);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-700 bg-gray-900/95 shadow-sm backdrop-blur ${className}`}
    >
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-md py-sm">
          <Link
            href={brandHref}
            className="inline-flex items-center text-h5 font-semibold leading-none focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                className="text-body font-medium text-gray-300 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:text-accent"
              >
                {link.label}
              </Link>
            ))}

            {action}

            {isMounted && !isLoggedIn && (
              <Link
                href="/login"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Loguearse
              </Link>
            )}
          </nav>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((current) => !current)}
            className="inline-flex size-xxl items-center justify-center rounded-md text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:bg-gray-700 tablet:hidden"
          >
            <span aria-hidden="true" className="text-h4">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>

        <nav
            id={menuId}
            aria-label="Navegación móvil"
            aria-hidden={!open}
            inert={!open}
            className={`absolute inset-x-0 top-full flex flex-col gap-xs border-t border-gray-700 bg-gray-900 px-md py-sm shadow-md transition-[opacity,transform,visibility] duration-400 ease-out motion-reduce:transition-none tablet:hidden ${
              open
                ? "visible translate-y-0 opacity-100"
                : "invisible pointer-events-none -translate-y-sm opacity-0"
            }`}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-md py-sm text-body font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:bg-gray-700"
              >
                {link.label}
              </Link>
            ))}

            {action}

            {isMounted && !isLoggedIn && (
              <div className="p-md">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Loguearse
                </Link>
              </div>
            )}
        </nav>
      </Container>
    </header>
  );
}
