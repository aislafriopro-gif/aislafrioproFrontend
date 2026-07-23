import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader } from "../Loader/Loader";

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-primary",
  secondary:
    "bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80 focus-visible:ring-secondary",
} as const;

const sizeClasses = {
  sm: "px-sm py-xs text-small",
  md: "px-md py-sm text-body",
  lg: "px-lg py-md text-h6",
} as const;

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  ...props
}: IButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-sm rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading && (
        <Loader size="md" variant="light" label="Cargando" />
      )}
      <span>{children}</span>
    </button>
  );
}
