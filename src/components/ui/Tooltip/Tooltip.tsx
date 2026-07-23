"use client";

import { useId, type ReactNode } from "react";

export interface ITooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom";
  className?: string;
}

const positionClasses = {
  top: "bottom-full left-1/2 mb-sm -translate-x-1/2",
  bottom: "left-1/2 top-full mt-sm -translate-x-1/2",
} as const;

export function Tooltip({
  content,
  children,
  position = "top",
  className = "",
}: ITooltipProps) {
  const tooltipId = useId();

  return (
    <span
      tabIndex={0}
      aria-describedby={tooltipId}
      className={`group relative inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      {children}

      <span
        id={tooltipId}
        role="tooltip"
        className={`pointer-events-none invisible absolute z-50 whitespace-nowrap rounded-md bg-gray-900 px-sm py-xs text-small text-white opacity-0 shadow-sm transition-opacity group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100 ${positionClasses[position]}`}
      >
        {content}
      </span>
    </span>
  );
}