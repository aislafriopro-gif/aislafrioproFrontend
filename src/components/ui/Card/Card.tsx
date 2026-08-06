import type { HTMLAttributes, ReactNode } from "react";
import { Loader } from "../Loader/Loader";

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "outlined" | "elevated" | "dark";
  interactive?: boolean;
  animated?: boolean;
  loading?: boolean;
}

const variantClasses = {
  default: "border border-gray-200 bg-white text-gray-900",
  outlined: "border-2 border-primary bg-white text-gray-900",
  elevated: "border border-gray-100 bg-white text-gray-900 shadow-md",
  dark: "bg-gray-700 text-white shadow-md",
} as const;

export function Card({
  children,
  variant = "default",
  interactive = false,
  animated = false,
  loading = false,
  className = "",
  tabIndex,
  ...props
}: ICardProps) {
  return (
    <div
      {...props}
      tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
      aria-busy={loading}
      className={`rounded-lg p-lg ${
        variantClasses[variant]
      } ${
        interactive
          ? "cursor-pointer transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:shadow-sm"
          : ""
      } ${
        animated
          ? "transform-gpu will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-sm hover:scale-[1.01] motion-reduce:transform-none motion-reduce:transition-none"
          : ""
      } ${className}`}
    >
      {loading ? (
        <span className="flex min-h-24 items-center justify-center">
          <Loader label="Cargando contenido" />
        </span>
      ) : (
        children
      )}
    </div>
  );
}
