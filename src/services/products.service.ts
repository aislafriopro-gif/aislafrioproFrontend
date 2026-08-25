import { api } from "@/lib/api";
import { IProduct } from "@/interfaces/IProduct";

export const productsService = {
    async getAll(): Promise<IProduct[]> {
    return api.get("/api/v1/products");
    },

    async getById(id: string): Promise<IProduct> {
    return api.get(`/api/v1/products/${id}`);
    },

    async getBySlug(slug: string): Promise<IProduct> {
    return api.get(`/api/v1/products/slug/${slug}`);
    },
};