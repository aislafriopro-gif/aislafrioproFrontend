import type { ReactNode, TextareaHTMLAttributes } from "react";
import { Loader } from "../Loader/Loader";

export interface ITextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: string;
  loading?: boolean;
}

export function Textarea({
  label,
  error,
  loading = false,
  disabled = false,
  rows = 4,
  className = "",
  ...props
}: ITextareaProps) {
  const isDisabled = disabled || loading;

  return (
    <label className="flex w-full flex-col gap-xs text-body text-gray-900">
      {label && <span className="font-medium">{label}</span>}

      <span className="relative">
        <textarea
          {...props}
          rows={rows}
          disabled={isDisabled}
          aria-busy={loading}
          aria-invalid={Boolean(error)}
          className={`w-full resize-y rounded-md border bg-white px-md py-sm text-body text-gray-900 outline-none transition-colors placeholder:text-gray-500 hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 active:border-primary disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 ${
            error ? "border-accent" : "border-gray-200"
          } ${className}`}
        />

        {loading && (
          <Loader
            size="md"
            label="Cargando campo"
            className="absolute right-md top-md"
          />
        )}
      </span>

      {error && <span className="text-small text-accent">{error}</span>}
    </label>
  );
}