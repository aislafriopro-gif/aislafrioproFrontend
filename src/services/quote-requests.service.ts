import { api } from "@/lib/api";
import type { QuoteRequestFormValues } from "@/schemas/quote-request.schema";

export interface IQuoteRequestResponse {
  id?: string;
  message: string;
  createdAt?: string;
}

export async function createQuoteRequest(
  payload: QuoteRequestFormValues,
): Promise<IQuoteRequestResponse> {
  const response = await api.post<IQuoteRequestResponse>(
    "/quote-requests",
    payload,
  );

  return response.data;
}