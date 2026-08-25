"use client";

import React from "react";
import { useParams } from "next/navigation";
import { QuoteRequestDetail } from "@/components/quote-requests/QuoteRequestDetail";

export default function CotizacionDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  return (
    <div className="flex flex-col gap-6 p-6">
      <QuoteRequestDetail id={id} />
    </div>
  );
}