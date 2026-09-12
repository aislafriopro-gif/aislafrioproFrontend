// src/app/(dashboard)/mis-servicios/page.tsx
import React from "react";
import PDFDownloadButton from "@/components/work-orders/PDFDownloadButton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PERMISSIONS } from "@/config/permissions";
import { PageHeader } from "@/components/dashboard/PageHeader/PageHeader";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { Badge } from "@/components/ui/Badge/Badge";

export interface ServiceItem {
  id: string;
  type: "cotizacion" | "ot";
  title: string;
  description?: string;
  status: string;
  detailUrl?: string;
}

interface ClientServicesListProps {
  quotes?: ServiceItem[];
  workOrders?: ServiceItem[];
}

export default function ClientServicesList({ quotes = [], workOrders = [] }: ClientServicesListProps) {
  const safeQuotes = Array.isArray(quotes) ? quotes : [];
  const safeWorkOrders = Array.isArray(workOrders) ? workOrders : [];
  const allServices = [...safeQuotes, ...safeWorkOrders];

  return (
    <ProtectedRoute allowedRoles={PERMISSIONS.dashboard}>
      <section aria-labelledby="client-services-title">
        <PageHeader
          id="client-services-title"
          title="Mis servicios"
          description="Consulta tus cotizaciones y órdenes de trabajo."
        />

        <div className="mt-lg">
          {allServices.length === 0 ? (
            <EmptyState
              title="No hay servicios disponibles"
              description="Tus cotizaciones y órdenes de trabajo aparecerán aquí."
            />
          ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-100 text-small font-semibold uppercase text-gray-700">
                <th className="p-md">ID / OT</th>
                <th className="p-md">Descripción</th>
                <th className="p-md">Estado</th>
                <th className="p-md text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-small">
              {allServices.map((service) => (
                <tr key={service.id} className="transition-colors hover:bg-gray-100">
                  <td className="p-md font-medium text-gray-900">
                    {service.type === "ot" ? `OT #${service.id.slice(0, 8)}...` : service.title}
                  </td>
                  <td className="p-md text-gray-700">
                    {service.description || "Sin descripción"}
                  </td>
                  <td className="p-md">
                    <Badge variant="secondary">{service.status}</Badge>
                  </td>
                  <td className="p-md text-right">
                    {service.type === "ot" && (
                      <div className="inline-flex justify-end">
                        <PDFDownloadButton workOrderId={service.id} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}
