import type { ReactNode, SelectHTMLAttributes } from "react";
import { Loader } from "../Loader/Loader";

export interface ISelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ISelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  error?: string;
  loading?: boolean;
  options: ISelectOption[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  loading = false,
  disabled = false,
  options,
  placeholder,
  className = "",
  ...props
}: ISelectProps) {
  const isDisabled = disabled || loading;

  return (
    <label className="flex w-full flex-col gap-xs text-body text-gray-900">
      {label && <span className="font-medium">{label}</span>}

      <span className="relative">
        <select
          {...props}
          disabled={isDisabled}
          aria-busy={loading}
          aria-invalid={Boolean(error)}
          className={`w-full appearance-none rounded-md border bg-white px-md py-sm pr-xxl text-body text-gray-900 outline-none transition-colors hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 active:border-primary disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 ${
            error ? "border-accent" : "border-gray-200"
          } ${className}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {loading && (
          <Loader
            size="md"
            label="Cargando opciones"
            className="absolute right-md top-1/2 -translate-y-1/2"
          />
        )}
      </span>

      {error && <span className="text-small text-accent">{error}</span>}
    </label>
  );
}