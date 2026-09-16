"use client";

import Link from "next/link";
import { useId, useState, type ReactNode, useEffect } from "react";
import { Container } from "../Container/Container";
import Image from "next/image";
import { useAuthStore } from "@/store/auth.store";

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

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const isLoggedIn = isMounted && isAuthenticated;

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
            className="hidden items-center gap-md desktop:flex"
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

            {isMounted && (
              isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="rounded-md bg-primary px-md py-sm text-small font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Ir al panel
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-md border border-gray-500 px-md py-sm text-small font-medium text-white transition-colors hover:border-white hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Iniciar sesión
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-md bg-primary px-md py-sm text-small font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Registrarse
                  </Link>
                </>
              )
            )}
          </nav>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((current) => !current)}
            className="inline-flex size-xxl items-center justify-center rounded-md text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:bg-gray-700 desktop:hidden"
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
            className={`absolute inset-x-0 top-full flex flex-col gap-xs border-t border-gray-700 bg-gray-900 px-md py-sm shadow-md max-h-[calc(100dvh-5rem)] overflow-y-auto transition-[opacity,transform,visibility] duration-400 ease-out motion-reduce:transition-none desktop:hidden ${
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

            {isMounted && (
              <div className="mt-sm flex flex-col gap-sm border-t border-gray-700 pt-sm">
                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-primary px-md py-sm text-center text-body font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Ir al panel
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="rounded-md border border-gray-500 px-md py-sm text-center text-body font-medium text-white transition-colors hover:border-white hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Iniciar sesión
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="rounded-md bg-primary px-md py-sm text-center text-body font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            )}
        </nav>
      </Container>
    </header>
  );
}
