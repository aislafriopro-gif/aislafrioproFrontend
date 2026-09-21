"use client";

import {
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

export interface IPasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  label: ReactNode;
  error?: string;
}

export function PasswordInput({
  id,
  label,
  error,
  disabled = false,
  className = "",
  ...props
}: IPasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-900"
      >
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          id={id}
          type={isVisible ? "text" : "password"}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className={`w-full rounded-md border px-4 py-2 pr-12 text-base text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 ${
            error ? "border-accent" : "border-gray-300"
          } ${className}`}
        />

        <button
          type="button"
          disabled={disabled}
          aria-label={
            isVisible ? "Ocultar contraseña" : "Mostrar contraseña"
          }
          aria-pressed={isVisible}
          onClick={() => setIsVisible((current) => !current)}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-md text-gray-500 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-5"
          >
            {isVisible ? (
              <>
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                <path d="M9.9 4.2A10.7 10.7 0 0112 4c6 0 9 8 9 8a15.7 15.7 0 01-2.1 3.4" />
                <path d="M6.6 6.6C4.2 8.2 3 12 3 12s3 8 9 8a9.8 9.8 0 004.1-.9" />
              </>
            ) : (
              <>
                <path d="M3 12s3-8 9-8 9 8 9 8-3 8-9 8-9-8-9-8z" />
                <circle cx="12" cy="12" r="3" />
              </>
            )}
          </svg>
        </button>
      </div>

      {error && (
        <span className="text-small text-accent">{error}</span>
      )}
    </div>
  );
}