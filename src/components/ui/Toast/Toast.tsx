"use client";

import { useEffect } from "react";
import { Loader } from "../Loader/Loader";

export interface IToastProps {
  open: boolean;
  message: string;
  variant?: "info" | "success" | "warning" | "loading";
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const variantClasses = {
  info: "bg-primary text-white",
  success: "bg-secondary text-white",
  warning: "bg-accent text-black",
  loading: "bg-primary text-white",
} as const;

export function Toast({
  open,
  message,
  variant = "info",
  duration = 4000,
  onClose,
  className = "",
}: IToastProps) {
  useEffect(() => {
    if (
      !open ||
      !onClose ||
      variant === "loading" ||
      duration <= 0
    ) {
      return;
    }

    const timeout = window.setTimeout(onClose, duration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [duration, onClose, open, variant]);

  if (!open) return null;

  return (
    <div
      role={variant === "warning" ? "alert" : "status"}
      className={`fixed right-md top-md z-50 flex max-w-sm items-center gap-sm rounded-lg px-md py-sm shadow-md ${variantClasses[variant]} ${className}`}
    >
      {variant === "loading" && (
        <Loader
          size="sm"
          variant="light"
          label="Procesando"
        />
      )}

      <span className="flex-1 text-body">{message}</span>

      {onClose && variant !== "loading" && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="rounded-sm px-xs text-h6 opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:opacity-60"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
}