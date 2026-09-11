import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { quoteRequestsService } from "@/services/quote-requests.service";

export const QUOTE_REQUESTS_KEY = "quote-requests";

export function useQuoteRequests() {
  return useQuery({
    queryKey: [QUOTE_REQUESTS_KEY],
    queryFn: quoteRequestsService.getAll,
  });
}

export function useQuoteRequest(id: string) {
  return useQuery({
    queryKey: [QUOTE_REQUESTS_KEY, id],
    queryFn: () => quoteRequestsService.getById(id),
    enabled: !!id, 
  });
}

export function useUpdateQuoteStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: quoteRequestsService.updateStatus,
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: [QUOTE_REQUESTS_KEY] });
      queryClient.setQueryData([QUOTE_REQUESTS_KEY, updatedData.id], updatedData);
    },
  });
}

export function useAddQuoteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: quoteRequestsService.addNote,
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: [QUOTE_REQUESTS_KEY] });
      queryClient.setQueryData([QUOTE_REQUESTS_KEY, updatedData.id], updatedData);
    },
  });
}