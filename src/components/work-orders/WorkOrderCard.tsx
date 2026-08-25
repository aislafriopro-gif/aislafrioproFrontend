import React from "react";
import { Badge } from "@/components/ui/Badge/Badge";

export interface WorkOrderCardProps {
  id: string;
  title: string;
  client: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
}

const STATUS_MAP = {
  PENDING: { label: "Pendiente", variant: "secondary" as const },
  IN_PROGRESS: { label: "En Proceso", variant: "accent" as const },
  COMPLETED: { label: "Completada", variant: "primary" as const },
};

export function WorkOrderCard({
  id,
  title,
  client,
  description,
  status,
  createdAt,
}: WorkOrderCardProps) {
  const currentStatus = STATUS_MAP[status] || STATUS_MAP.PENDING;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-gray-400">{id}</span>
          <Badge variant={currentStatus.variant}>{currentStatus.label}</Badge>
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs font-medium text-primary mb-3">{client}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>Asignado: {createdAt}</span>
      </div>
    </div>
  );
}