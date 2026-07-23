import type { HTMLAttributes } from "react";

export interface ILoaderProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  label?: string;
  variant?: "primary" | "light";
}

const sizeClasses = {
  sm: "size-sm",
  md: "size-md",
  lg: "size-lg",
} as const;
const variantClasses = {
  primary: "border-gray-200 border-t-primary",
  light: "border-white/40 border-t-white",
} as const;

export function Loader({
  size = "md",
  variant = "primary",
  label = "Cargando",
  className = "",
  ...props
}: ILoaderProps) {
  return (
    <span
      {...props}
      role="status"
      aria-label={label}
      className={`inline-block shrink-0 animate-spin rounded-full border-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    />
  );
}