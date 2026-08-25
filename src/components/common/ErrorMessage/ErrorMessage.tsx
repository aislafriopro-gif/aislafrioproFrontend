"use client";

import React from "react";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
      <p className="text-sm font-medium text-red-600">{message}</p>
    </div>
  );
}