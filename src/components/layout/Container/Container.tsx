import type { HTMLAttributes, ReactNode } from "react";

export interface IContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({
  children,
  className = "",
  ...props
}: IContainerProps) {
  return (
    <div
      {...props}
      className={`mx-auto w-full max-w-7xl px-md tablet:px-lg desktop:px-xl ${className}`}
    >
      {children}
    </div>
  );
}