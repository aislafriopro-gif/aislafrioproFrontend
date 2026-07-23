import type { InputHTMLAttributes, ReactNode } from "react";
import { Loader } from "../Loader/Loader";

export interface ICheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  loading?: boolean;
}

export function Checkbox({
  label,
  loading = false,
  disabled = false,
  className = "",
  ...props
}: ICheckboxProps) {
  const isDisabled = disabled || loading;

  return (
    <label
      className={`inline-flex items-center gap-sm text-body text-gray-900 ${
        isDisabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer"
      }`}
    >
      <input
        {...props}
        type="checkbox"
        disabled={isDisabled}
        aria-busy={loading}
        className={`size-md rounded-sm border-gray-300 accent-primary outline-none hover:ring-2 hover:ring-primary/20 focus-visible:ring-2 focus-visible:ring-primary active:scale-95 disabled:cursor-not-allowed ${className}`}
      />

      {loading && <Loader size="sm" label="Actualizando" />}

      <span>{label}</span>
    </label>
  );
}