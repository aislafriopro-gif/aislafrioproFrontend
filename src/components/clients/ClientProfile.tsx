"use client";

import React from "react";

interface ClientProfileProps {
  name: string;
  email: string;
  phone?: string;
}

export function ClientProfile({ name, email, phone }: ClientProfileProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Datos del Cliente</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
        <div><strong>Nombre:</strong> {name || "-"}</div>
        <div><strong>Email:</strong> {email || "-"}</div>
        <div><strong>Teléfono:</strong> {phone || "-"}</div>
      </div>
    </div>
  );
}