import type { ReactNode } from "react";

export interface IPageHeaderProps {
  id: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({
  id,
  title,
  description,
  actions,
}: IPageHeaderProps) {
  return (
    <header className="flex flex-col gap-md tablet:flex-row tablet:items-start tablet:justify-between">
      <div>
        <h2
          id={id}
          className="text-h4 font-semibold text-gray-900 tablet:text-h3"
        >
          {title}
        </h2>

        {description && (
          <p className="mt-sm max-w-2xl text-body leading-relaxed text-gray-700">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-sm">{actions}</div>
      )}
    </header>
  );
}