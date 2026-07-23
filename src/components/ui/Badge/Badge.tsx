import type { HTMLAttributes, ReactNode } from "react";

export interface IBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "neutral";
  size?: "sm" | "md";
}

const variantClasses = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/15 text-gray-900",
  neutral: "bg-gray-100 text-gray-700",
} as const;

const sizeClasses = {
  sm: "px-sm py-xs text-small",
  md: "px-md py-xs text-body",
} as const;

export function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className = "",
  ...props
}: IBadgeProps) {
  return (
    <span
      {...props}
      className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}