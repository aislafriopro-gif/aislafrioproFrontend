import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card/Card";

export type MetricCardStatus = "ready" | "loading" | "empty" | "error";

export interface IMetricCardProps {
  label: string;
  value?: string | number;
  description?: string;
  icon?: ReactNode;
  status?: MetricCardStatus;
}

export function MetricCard({
  label,
  value,
  description,
  icon,
  status = "ready",
}: IMetricCardProps) {
  const isLoading = status === "loading";

  return (
    <Card
      variant="elevated"
      loading={isLoading}
      aria-live="polite"
      className="min-h-40"
    >
      <div className="flex items-start justify-between gap-md">
        <div>
          <h3 className="text-small font-medium text-gray-500">{label}</h3>

          {status === "ready" && (
            <p className="mt-sm text-h3 font-semibold text-gray-900">
              {value}
            </p>
          )}

          {status === "empty" && (
            <p className="mt-sm text-body text-gray-500">Sin datos disponibles</p>
          )}

          {status === "error" && (
            <p className="mt-sm text-body text-accent">
              No se pudo cargar la información
            </p>
          )}
        </div>

        {icon && (
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"
          >
            {icon}
          </span>
        )}
      </div>

      {description && status === "ready" && (
        <p className="mt-md text-small text-gray-600">{description}</p>
      )}
    </Card>
  );
}