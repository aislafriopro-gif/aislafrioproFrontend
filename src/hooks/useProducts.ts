import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products.service";

export const useProducts = () => {
    return useQuery({
    queryKey: ["products"],
    queryFn: () => productsService.getAll(),
    });
};

export const useProduct = (id: string) => {
    return useQuery({
    queryKey: ["products", id],
    queryFn: () => productsService.getById(id),
    enabled: !!id,
    });
};

export const useProductBySlug = (slug: string) => {
    return useQuery({
    queryKey: ["products", "slug", slug],
    queryFn: () => productsService.getBySlug(slug),
    enabled: !!slug,
    });
};