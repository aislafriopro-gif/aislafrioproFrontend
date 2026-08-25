"use client";

import React from "react";
import { useClientMe } from "@/hooks/useClientMe";
import { ClientProfile } from "@/components/clients/ClientProfile";
import { ClientServicesList } from "@/components/clients/ClientServicesList";

export default function MisServiciosPage() {
  const { data: client, isLoading, isError, error } = useClientMe();

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError || !client) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="font-semibold">Error al cargar la información</p>
        <p className="text-sm">{error instanceof Error ? error.message : "No se pudo obtener el perfil del cliente."}</p>
      </div>
    );
  }

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
        <ClientServicesList services={client.services || []} />
      </div>
    </div>
  );
}