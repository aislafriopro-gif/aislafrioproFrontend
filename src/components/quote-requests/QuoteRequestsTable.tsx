"use client";

import React, { useState } from "react";
import { useQuoteRequests } from "@/hooks/useQuoteRequests";
import { QuoteRequest } from "@/services/quote-requests.service";
import Link from "next/link";

export function QuoteRequestsTable() {
  const { data: responseData, isLoading, isError, error } = useQuoteRequests();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-gray-500">Cargando cotizaciones...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
        <div className="text-center">
          <p className="text-sm font-semibold text-red-600">Error al cargar las cotizaciones</p>
          <p className="mt-1 text-xs text-red-500">
            {error instanceof Error ? error.message : "Ocurrió un error inesperado."}
          </p>
        </div>
      </div>
    );
  }

  const quotes: QuoteRequest[] = Array.isArray(responseData)
    ? responseData
    : (responseData as any)?.data || (responseData as any)?.results || [];

  if (quotes.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">No hay cotizaciones registradas</p>
          <p className="mt-1 text-xs text-gray-400">Las nuevas solicitudes aparecerán aquí.</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(quotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuotes = quotes.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "pendiente":
        return <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">Pendiente</span>;
      case "approved":
      case "aprobada":
        return <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">Aprobada</span>;
      case "rejected":
      case "rechazada":
        return <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">Rechazada</span>;
      default:
        return <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">{status}</span>;
    }
  };

  // Función segura para extraer texto de las notas sin importar si es array, string u objeto
  const renderNotesSummary = (notes: any) => {
    if (!notes) return "Sin notas";
    if (Array.isArray(notes)) {
      if (notes.length === 0) return "Sin notas";
      const lastNote = notes[notes.length - 1];
      if (typeof lastNote === "string") return lastNote;
      return lastNote?.note || lastNote?.content || "Nota registrada";
    }
    if (typeof notes === "object") {
      return notes?.note || notes?.content || "Nota registrada";
    }
    return String(notes);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Notas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {currentQuotes.map((quote: QuoteRequest) => (
              <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <Link
                    href={`/cotizaciones/${quote.id}`}
                    className="text-primary hover:underline font-semibold"
                  >
                    {quote.id}
                  </Link>
                </td>
                <td className="px-6 py-4">{quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : "-"}</td>
                <td className="px-6 py-4">{getStatusBadge(quote.status)}</td>
                <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{renderNotesSummary(quote.notes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-gray-500">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, quotes.length)} de {quotes.length} resultados
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}