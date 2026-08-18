// src/components/quote-requests/QuoteRequestsView.tsx
import React from 'react';

interface QuoteRequest {
  id: number;
  cliente: string;
  servicio: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
  fecha: string;
}

const mockCotizaciones: QuoteRequest[] = [
  { id: 1, cliente: 'Empresa A', servicio: 'Mantenimiento de Aires', estado: 'Pendiente', fecha: '2026-06-01' },
  { id: 2, cliente: 'Empresa B', servicio: 'Instalación de Sistema VRF', estado: 'Aprobada', fecha: '2026-06-03' },
];

export default function QuoteRequestsView() {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Listado de Solicitudes de Cotización</h2>
      
      {/* Contenedor principal de la lista */}
      <ul className="divide-y divide-gray-200">
        
        {/* Cabecera simulada con un li */}
        <li className="grid grid-cols-5 py-2 font-semibold text-gray-600 text-sm">
          <span>ID</span>
          <span>Cliente</span>
          <span>Servicio</span>
          <span>Estado</span>
          <span>Fecha</span>
        </li>

        {/* Elementos mapeados */}
        {mockCotizaciones.map((cotizacion) => (
          <li key={cotizacion.id} className="grid grid-cols-5 py-3 items-center text-sm hover:bg-gray-50">
            <span className="font-medium text-gray-900">#{cotizacion.id}</span>
            <span className="text-gray-700">{cotizacion.cliente}</span>
            <span className="text-gray-700">{cotizacion.servicio}</span>
            <div>
              <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                {cotizacion.estado}
              </span>
            </div>
            <span className="text-gray-500">{cotizacion.fecha}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}