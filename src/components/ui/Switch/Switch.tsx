import type { InputHTMLAttributes, ReactNode } from "react";
import { Loader } from "../Loader/Loader";

export interface ISwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  loading?: boolean;
}

export function Switch({
  label,
  loading = false,
  disabled = false,
  className = "",
  ...props
}: ISwitchProps) {
  const isDisabled = disabled || loading;

  return (
    <label
      className={`group inline-flex items-center gap-sm text-body text-gray-900 ${
        isDisabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer"
      }`}
    >
      <span className="relative inline-flex h-lg w-xxl shrink-0">
        <input
          {...props}
          type="checkbox"
          role="switch"
          disabled={isDisabled}
          aria-busy={loading}
          className={`peer sr-only ${className}`}
        />

        <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors group-hover:bg-gray-400 peer-checked:bg-primary peer-checked:group-hover:bg-primary/90 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 group-active:scale-95" />

        <span className="pointer-events-none absolute left-xs top-xs size-md rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-lg" />
      </span>

      {loading && <Loader size="sm" label="Actualizando" />}

      <span>{label}</span>
    </label>
  );
}