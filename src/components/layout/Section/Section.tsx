import type { HTMLAttributes, ReactNode } from "react";

export interface ISectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({
  children,
  className = "",
  ...props
}: ISectionProps) {
  return (
    <section
      {...props}
      className={`w-full py-xl tablet:py-xxl ${className}`}
    >
      {children}
    </section>
  );
}