import type { ReactNode } from "react";

export interface IEmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: IEmptyStateProps) {
  return (
    <div
      role="status"
      className="flex min-h-52 flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 p-lg text-center"
    >
      {icon && (
        <span
          aria-hidden="true"
          className="mb-md flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          {icon}
        </span>
      )}

      <h3 className="text-body font-semibold text-gray-900">{title}</h3>

      <p className="mt-sm max-w-md text-small leading-relaxed text-gray-600">
        {description}
      </p>

      {action && <div className="mt-md">{action}</div>}
    </div>
  );
}