// src/components/quote-requests/QuoteRequestsView.tsx
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/Button/Button";
import api from "@/lib/api";

interface QuoteNote {
  id?: string;
  content?: string;
  note?: string;
  createdAt?: string;
}

interface QuoteRequest {
  id: string;
  client?: string;
  name?: string;
  service?: string;
  status?: string;
  createdAt?: string;
  notes?: QuoteNote[];
}

const ALLOWED_STATUSES = ["NEW", "IN_PROGRESS", "RESOLVED", "REJECTED"];

export default function QuoteRequestsView() {
  const [cotizaciones, setCotizaciones] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [quoteDetail, setQuoteDetail] = useState<QuoteRequest | null>(null);
  const [newNote, setNewNote] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const fetchCotizaciones = useCallback(async () => {
    try {
      const response = await api.get<{ data: QuoteRequest[] } | QuoteRequest[]>("/quote-requests");
      const rawData = response.data;
      const list = Array.isArray(rawData) 
        ? rawData 
        : (rawData && Array.isArray((rawData as { data: QuoteRequest[] }).data) ? (rawData as { data: QuoteRequest[] }).data : []);

      setCotizaciones(list);
    } catch (error) {
      console.error("Error al cargar las solicitudes de cotización:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      fetchCotizaciones();
    });
  }, [fetchCotizaciones]);

  const fetchQuoteDetail = async (id: string) => {
    setIsDetailLoading(true);
    try {
      const response = await api.get<QuoteRequest | { data: QuoteRequest }>(`/quote-requests/${id}`);
      const data = "data" in response.data ? response.data.data : response.data;
      setQuoteDetail(data);
      setSelectedStatus(data.status || "NEW");
    } catch (error) {
      console.error("Error al obtener detalle de la cotización:", error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleStatusChange = async (id: string, nuevoEstado: string) => {
    if (!nuevoEstado) return;
    try {
      await api.patch(`/quote-requests/${id}/status`, {
        status: nuevoEstado,
      });
      fetchCotizaciones();
      if (quoteDetail && quoteDetail.id === id) {
        fetchQuoteDetail(id);
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la cotización:", error);
    }
  };

  const handleAddNote = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      await api.post(`/quote-requests/${id}/notes`, {
        content: newNote,
      });
      setNewNote("");
      await fetchQuoteDetail(id);
    } catch (error) {
      console.error("Error al agregar nota interna:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Listado de Solicitudes de Cotización</h2>
        <Button size="sm" onClick={() => alert("Modal para crear cotización próximamente")}>
          Crear cotización
        </Button>
      </div>
      
      <ul className="divide-y divide-gray-200">
        <li className="grid grid-cols-5 py-2 font-semibold text-gray-600 text-sm">
          <span>ID</span>
          <span>Cliente</span>
          <span>Servicio</span>
          <span>Estado</span>
          <span className="text-right">Acciones</span>
        </li>

        {isLoading ? (
          <li className="py-6 text-center text-sm text-gray-500">Cargando cotizaciones...</li>
        ) : cotizaciones.length === 0 ? (
          <li className="py-6 text-center text-sm text-gray-500">No hay cotizaciones registradas.</li>
        ) : (
          cotizaciones.map((cotizacion) => {
            const clientName = cotizacion.client || cotizacion.name || "Sin cliente";
            return (
              <li key={cotizacion.id} className="grid grid-cols-5 py-3 items-center text-sm hover:bg-gray-50">
                <span className="font-medium text-gray-900">#{cotizacion.id.slice(0, 6)}</span>
                <span className="text-gray-700">{clientName}</span>
                <span className="text-gray-700">{cotizacion.service || "Sin servicio"}</span>
                <div>
                  <span className={`px-2 py-1 text-xs rounded font-semibold ${
                    cotizacion.status === 'RESOLVED'
                      ? 'bg-green-100 text-green-800' 
                      : cotizacion.status === 'REJECTED'
                      ? 'bg-red-100 text-red-800' 
                      : cotizacion.status === 'IN_PROGRESS'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cotizacion.status || "NEW"}
                  </span>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => {
                      setSelectedQuote(cotizacion);
                      fetchQuoteDetail(cotizacion.id);
                    }}
                  >
                    Gestionar / Detalles
                  </Button>
                </div>
              </li>
            );
          })
        )}
      </ul>

      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-200 rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Gestionar Cotización</h2>
            <p className="text-xs text-gray-400 mb-4">ID: {selectedQuote.id}</p>

            {isDetailLoading ? (
              <p className="text-sm text-gray-500 py-4">Cargando detalles y notas...</p>
            ) : quoteDetail ? (
              <div className="flex flex-col gap-5">
                <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 flex flex-col gap-2">
                  <p><strong>Cliente:</strong> {quoteDetail.client || quoteDetail.name || "N/A"}</p>
                  <p><strong>Servicio:</strong> {quoteDetail.service || "N/A"}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <strong className="text-xs">Estado:</strong>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="rounded-md border border-gray-300 px-2 py-1 text-xs bg-white text-gray-900 focus:border-primary focus:outline-none"
                    >
                      {ALLOWED_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <Button 
                      size="sm" 
                      onClick={() => handleStatusChange(quoteDetail.id, selectedStatus)}
                    >
                      Actualizar Estado
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">Notas Internas</h3>
                  {quoteDetail.notes && quoteDetail.notes.length > 0 ? (
                    <ul className="space-y-2 mb-4">
                      {quoteDetail.notes.map((n, index) => (
                        <li key={n.id || index} className="bg-gray-100 p-2 rounded text-xs text-gray-800">
                          <p>{n.content || n.note || "Sin contenido"}</p>
                          <span className="text-[10px] text-gray-400">
                            {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-500 mb-4">No hay notas internas registradas.</p>
                  )}

                  <form onSubmit={(e) => handleAddNote(e, quoteDetail.id)} className="flex flex-col gap-2">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Agregar una nota interna..."
                      className="w-full rounded-md border border-gray-300 p-2 text-xs text-gray-900 focus:border-primary focus:outline-none"
                      rows={2}
                      required
                    />
                    <div className="flex justify-end">
                      <Button type="submit" size="sm">
                        Guardar nota
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            ) : null}

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="secondary" onClick={() => setSelectedQuote(null)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}