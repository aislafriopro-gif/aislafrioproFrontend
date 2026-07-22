"use client";

import { useEffect, type ReactNode } from "react";
import { Loader } from "../Loader/Loader";

export interface IModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  loading?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  loading = false,
  closeOnOverlayClick = true,
  className = "",
}: IModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-md"
      onMouseDown={(event) => {
        if (
          closeOnOverlayClick &&
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-busy={loading}
        className={`max-h-[90vh] w-full max-w-lg overflow-auto rounded-xl bg-white p-lg text-gray-900 shadow-lg ${className}`}
      >
        <header className="mb-md flex items-center justify-between gap-md">
          <h2 className="text-h5 font-semibold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="rounded-md px-sm py-xs text-h5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:bg-gray-200"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        {loading ? (
          <div className="flex min-h-32 items-center justify-center">
            <Loader label="Cargando contenido" />
          </div>
        ) : (
          children
        )}
      </section>
    </div>
  );
}