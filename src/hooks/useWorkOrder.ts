import { useQuery } from "@tanstack/react-query";
import { workOrdersService } from "@/services/work-orders.service";

export const useWorkOrder = (id: string) => {
    return useQuery({
    queryKey: ["work-order", id],
    queryFn: () => workOrdersService.getById(id),
    enabled: !!id,
    });
};