"use client";

import React from "react";
import Link from "next/link";
import { Loading } from "@/components/common/Loading/Loading";
import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";

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
  isLoading?: boolean;
  errorMessage?: string;
}

export function ClientServicesList({
  quotes = [],
  workOrders = [],
  isLoading = false,
  errorMessage = "",
}: ClientServicesListProps) {
  if (isLoading) {
    return <Loading />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  const hasItems = quotes.length > 0 || workOrders.length > 0;

  if (!hasItems) {
    return (
      <EmptyState
        title="Sin registros"
        description="No se encontraron cotizaciones ni órdenes de trabajo (OTs) disponibles."
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Cotizaciones (SCRUM-520) */}
      {quotes.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-gray-900">Cotizaciones</h3>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <th className="px-6 py-3">ID / Cotización</th>
                  <th className="px-6 py-3">Descripción</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {quotes.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.title || item.id}</td>
                    <td className="px-6 py-4">{item.description || "Sin descripción"}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.detailUrl && (
                        <Link
                          href={item.detailUrl}
                          className="font-medium text-primary hover:underline"
                        >
                          Ver detalle
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Órdenes de Trabajo (SCRUM-520) */}
      {workOrders.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-gray-900">Órdenes de Trabajo (OTs)</h3>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <th className="px-6 py-3">ID / OT</th>
                  <th className="px-6 py-3">Descripción</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {workOrders.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.title || item.id}</td>
                    <td className="px-6 py-4">{item.description || "Sin descripción"}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.detailUrl && (
                        <Link
                          href={item.detailUrl}
                          className="font-medium text-primary hover:underline"
                        >
                          Ver detalle
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}