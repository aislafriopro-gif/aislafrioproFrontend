// src/app/(dashboard)/mis-servicios/page.tsx
import React from "react";
import PDFDownloadButton from "@/components/work-orders/PDFDownloadButton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PERMISSIONS } from "@/config/permissions";

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
      {allServices.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500 bg-white">
          No se encontraron cotizaciones ni órdenes de trabajo (OTs) disponibles.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                <th className="p-4">ID / OT</th>
                <th className="p-4">Descripción</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {allServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">
                    {service.type === "ot" ? `OT #${service.id.slice(0, 8)}...` : service.title}
                  </td>
                  <td className="p-4 text-gray-600">
                    {service.description || "Sin descripción"}
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">
                      {service.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
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
    </ProtectedRoute>
  );
}