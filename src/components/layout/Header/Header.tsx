"use client";

import type { ReactNode } from "react";

export interface IDashboardUser {
  name: string;
  role?: string;
}

export interface IHeaderProps {
  user: IDashboardUser;
  title?: string;
  actions?: ReactNode;
  notifications?: ReactNode;
  onMenuOpen?: () => void;
}

export function Header({
  user,
  title = "Panel de control",
  actions,
  notifications,
  onMenuOpen,
}: IHeaderProps) {
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <div className="flex min-h-20 items-center justify-between gap-md px-md tablet:px-lg desktop:px-xl">
        <div className="flex min-w-0 items-center gap-md">
          <button
            type="button"
            aria-label="Abrir menú lateral"
            onClick={onMenuOpen}
            className="inline-flex size-xxl shrink-0 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary desktop:hidden"
          >
            <span aria-hidden="true" className="text-h5">
              ☰
            </span>
          </button>

          <h1 className="truncate text-h5 font-semibold text-gray-900 tablet:text-h4">
            {title}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-sm tablet:gap-md">
          {actions}

          {notifications ?? (
            <button
              type="button"
              aria-label="Notificaciones"
              disabled
              title="Notificaciones disponibles próximamente"
              className="inline-flex size-xxl items-center justify-center rounded-md text-gray-400 disabled:cursor-not-allowed"
            >
              <span aria-hidden="true" className="text-h6">
                ◉
              </span>
            </button>
          )}

          <div className="flex items-center gap-sm">
            <span
              aria-hidden="true"
              className="inline-flex size-xxl items-center justify-center rounded-full bg-primary text-small font-semibold text-white"
            >
              {initials || "U"}
            </span>

            <div className="hidden min-w-0 tablet:block">
              <p className="max-w-48 truncate text-body font-semibold text-gray-900">
                {user.name}
              </p>

              {user.role && (
                <p className="max-w-48 truncate text-small text-gray-500">
                  {user.role}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}