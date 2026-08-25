"use client";

import React from "react";
import { useClientMe } from "@/hooks/useClientMe";
import { ClientProfile } from "@/components/clients/ClientProfile";
import { ClientServicesList, ServiceItem } from "@/components/clients/ClientServicesList";

export default function MisServiciosPage() {
  const { data: clientData, isLoading, isError, error } = useClientMe();

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError || !clientData) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="font-semibold">Error al cargar la información</p>
        <p className="text-sm">{error instanceof Error ? error.message : "No se pudo obtener el perfil del cliente."}</p>
      </div>
    );
  }

  const { client, quoteRequests = [], workOrders = [] } = clientData;

  // Mapeo seguro de solicitudes de cotización a ServiceItem
  const quotesList: ServiceItem[] = quoteRequests.map((q) => ({
    id: q.id,
    type: "cotizacion",
    title: q.serviceName || `Cotización #${q.id}`,
    description: q.message,
    status: q.status,
    detailUrl: `/cotizaciones/${q.id}`,
  }));

  // Mapeo seguro de Órdenes de Trabajo a ServiceItem
  const workOrdersList: ServiceItem[] = workOrders.map((w) => {
    const item = w as { id?: string; title?: string; description?: string; status?: string };
    return {
      id: item.id || "N/A",
      type: "ot",
      title: item.title || `OT #${item.id}`,
      description: item.description,
      status: item.status || "Pendiente",
    };
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Mis Servicios</h1>
      
      <ClientProfile 
        name={client.name} 
        email={client.email} 
        phone={client.phone} 
      />

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-800">Listado de Servicios / OTs</h2>
        <ClientServicesList quotes={quotesList} workOrders={workOrdersList} />
      </div>
    </div>
  );
}