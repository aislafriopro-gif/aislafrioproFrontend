import { useQuery, useQueryClient } from "@tanstack/react-query";
import { clientsService, ClientMeResponse } from "@/services/clients.service";

export function useClientMe() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<ClientMeResponse, Error>({
    queryKey: ["client-me"],
    queryFn: () => clientsService.getMe(),
  });

  const mutate = () => {
    queryClient.invalidateQueries({ queryKey: ["client-me"] });
  };

  return {
    data,
    isLoading,
    isError,
    error,
    mutate,
  };
}