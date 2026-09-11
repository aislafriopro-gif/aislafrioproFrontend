import { useQuery } from "@tanstack/react-query";
import { workOrdersService, IWorkOrder } from "@/services/work-orders.service";

export const useMyWorkOrders = () => {
    return useQuery<IWorkOrder[], Error>({
        queryKey: ["my-work-orders"],
        queryFn: () => workOrdersService.getMyWorkOrders(),
    });
};