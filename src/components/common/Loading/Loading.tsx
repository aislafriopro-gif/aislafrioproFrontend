"use client";

import React from "react";

interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Cargando..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
      <p className="mt-3 text-sm font-medium text-gray-500">{message}</p>
    </div>
  );
}