import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workOrdersService, IWorkOrder } from "@/services/work-orders.service";

    export const useWorkOrders = () => {
    return useQuery({
        queryKey: ["work-orders"],
        queryFn: () => workOrdersService.getAll(),
    });
    };

    export const useMyWorkOrders = () => {
    return useQuery({
        queryKey: ["work-orders", "my-orders"],
        queryFn: () => workOrdersService.getMyWorkOrders(),
    });
    };

    export const useCreateWorkOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<IWorkOrder>) => workOrdersService.create(data),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["work-orders"] });
        },
    });
    };

    export const useUpdateWorkOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<IWorkOrder> }) =>
        workOrdersService.update(id, data),
        onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ["work-orders"] });
        queryClient.invalidateQueries({ queryKey: ["work-order", id] });
        },
    });
    };

    export const useUpdateWorkOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) =>
        workOrdersService.updateStatus(id, status),
        onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ["work-orders"] });
        queryClient.invalidateQueries({ queryKey: ["work-order", id] });
        },
    });
    };