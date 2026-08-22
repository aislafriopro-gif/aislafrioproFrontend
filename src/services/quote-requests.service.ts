import { api } from "@/lib/api";
import type { QuoteRequestFormValues } from "@/schemas/quote-request.schema";

export interface ICreateQuoteRequestPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  materials?: string;
}

export interface IQuoteRequestResponse {
  id?: string;
  message: string;
  createdAt?: string;
}

export async function createQuoteRequest(
  values: QuoteRequestFormValues,
): Promise<IQuoteRequestResponse> {
  const payload: ICreateQuoteRequestPayload = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    message: values.description,
    materials: values.materials || undefined,
  };

  const response = await api.post<IQuoteRequestResponse>(
    "/quote-requests",
    payload,
  );

  return response.data;
}