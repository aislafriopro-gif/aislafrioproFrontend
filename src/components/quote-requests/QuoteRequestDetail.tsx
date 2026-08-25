"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { useQuoteRequest } from "@/hooks/useQuoteRequests";
import { quoteRequestsService } from "@/services/quote-requests.service";
import { QuoteRequestNotes } from "@/components/quote-requests/QuoteRequestNotes";

interface QuoteRequestDetailProps {
  id: string;
}

export function QuoteRequestDetail({ id }: QuoteRequestDetailProps) {
  const { data: quote, isLoading, isError, error, mutate } = useQuoteRequest(id);

  // Derivación de estado local e inicialización
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [prevQuoteStatus, setPrevQuoteStatus] = useState<string | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Sincronización declarativa durante el render en vez de useEffect
  if (quote?.status && quote.status !== prevQuoteStatus) {
    setPrevQuoteStatus(quote.status);
    setSelectedStatus(quote.status);
  }

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-gray-500">Cargando detalles de la cotización...</p>
        </div>
      </div>
    );
  }

  if (isError || !quote) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/cotizaciones" className="text-sm font-medium text-primary hover:underline">
          &larr; Volver al listado
        </Link>
        <div className="flex h-64 w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-semibold text-red-600">Error al cargar la cotización</p>
            <p className="mt-1 text-xs text-red-500">
              {error instanceof Error ? error.message : "No se pudo encontrar la solicitud solicitada."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = async () => {
    if (!selectedStatus || selectedStatus === quote.status) return;

    setIsUpdating(true);
    setUpdateMessage(null);

    try {
      await quoteRequestsService.updateStatus({ id, status: selectedStatus });
      setUpdateMessage({ type: "success", text: "Estado actualizado exitosamente." });
      if (mutate) mutate();
    } catch (err: unknown) {
      let errorMessage = "Ocurrió un error al actualizar el estado.";
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setUpdateMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/cotizaciones" className="text-sm font-medium text-primary hover:underline">
          &larr; Volver al listado
        </Link>
      </div>

      {updateMessage && (
        <div
          className={`rounded-lg p-4 text-sm ${
            updateMessage.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {updateMessage.text}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cotización #{quote.id}</h1>
            <p className="text-sm text-gray-500">
              Creada el {quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : "-"}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <span className="text-xs font-semibold uppercase text-gray-600">Estado:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="NEW">NEW</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={isUpdating || selectedStatus === quote.status}
              className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isUpdating ? "Actualizando..." : "Guardar"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Datos de la Cotización</h2>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700 flex flex-col gap-2">
                <p><strong>Nombre:</strong> {quote.name || "-"}</p>
                <p><strong>Email:</strong> {quote.email || "-"}</p>
                <p><strong>Teléfono:</strong> {quote.phone || "-"}</p>
                <p><strong>Materiales:</strong> {quote.materials || "No especificados"}</p>
                <p><strong>Mensaje / Proyecto:</strong> {quote.message || "Sin mensaje"}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Información Relevante</h2>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700 flex flex-col gap-2">
                <p><strong>ID:</strong> {quote.id}</p>
                <p><strong>Fecha de registro:</strong> {quote.createdAt ? new Date(quote.createdAt).toLocaleString() : "-"}</p>
                <p><strong>Última actualización:</strong> {quote.updatedAt ? new Date(quote.updatedAt).toLocaleString() : "-"}</p>
              </div>
            </div>
          </div>

          <div>
            <QuoteRequestNotes
              quoteId={quote.id}
              notes={quote.notes}
              onNoteAdded={() => {
                if (mutate) mutate();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}