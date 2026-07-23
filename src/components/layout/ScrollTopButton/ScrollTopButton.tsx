"use client";

import {
  useEffect,
  useState,
  type ButtonHTMLAttributes,
} from "react";

export interface IScrollTopButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  threshold?: number;
  label?: string;
}

export function ScrollTopButton({
  threshold = 400,
  label = "Volver al inicio",
  className = "",
  onClick,
  type = "button",
  ...props
}: IScrollTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY >= threshold);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  if (!visible) return null;

  return (
    <button
      {...props}
      type={type}
      aria-label={label}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }}
      className={`fixed bottom-[calc(var(--spacing-lg)+var(--spacing-xxl))] right-md z-40 inline-flex size-xxl items-center justify-center rounded-full bg-primary text-h5 text-white shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:bg-primary/80 tablet:right-lg desktop:right-xl ${className}`}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}