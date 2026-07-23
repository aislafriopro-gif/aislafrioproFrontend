import type { InputHTMLAttributes, ReactNode } from "react";
import { Loader } from "../Loader/Loader";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  loading?: boolean;
}

export function Input({
  label,
  error,
  loading = false,
  disabled = false,
  className = "",
  ...props
}: IInputProps) {
  const isDisabled = disabled || loading;

  return (
    <label className="flex w-full flex-col gap-xs text-body text-gray-900">
      {label && <span className="font-medium">{label}</span>}

      <span className="relative">
        <input
          {...props}
          disabled={isDisabled}
          aria-busy={loading}
          aria-invalid={Boolean(error)}
          className={`w-full rounded-md border bg-white px-md py-sm text-body text-gray-900 outline-none transition-colors placeholder:text-gray-500 hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 active:border-primary disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 ${
            error ? "border-accent" : "border-gray-200"
          } ${loading ? "pr-xxl" : ""} ${className}`}
        />

        {loading && (
          <Loader
            size="md"
            label="Cargando campo"
            className="absolute right-md top-1/2 -translate-y-1/2"
          />
        )}
      </span>

      {error && <span className="text-small text-accent">{error}</span>}
    </label>
  );
}