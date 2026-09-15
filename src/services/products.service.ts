// src/services/products.service.ts

import { api } from "@/lib/api";
import { IProduct } from "@/interfaces/IProduct";

export const productsService = {
    async getAll(): Promise<IProduct[]> {
        const response = await api.get("/products");
        const responseData = response.data;

        console.log("RESPUESTA REAL DE LA API:", JSON.stringify(responseData, null, 2));

        let list: Record<string, unknown>[] = [];

        // Manejo robusto para arrays directos o respuestas paginadas con { data: [...] }
        if (Array.isArray(responseData)) {
            list = responseData as Record<string, unknown>[];
        } else if (responseData && typeof responseData === "object") {
            const typedData = responseData as Record<string, unknown>;
            if (Array.isArray(typedData.data)) {
                list = typedData.data as Record<string, unknown>[];
            } else if (Array.isArray(typedData.products)) {
                list = typedData.products as Record<string, unknown>[];
            } else {
                // Si es un objeto único pero válido
                list = [typedData];
            }
        }

        return list.map((item) => {
            const rawId = item.id || item._id;
            const realId = rawId ? String(rawId) : "";
            return {
                ...item,
                id: realId,
                _id: realId,
            } as unknown as IProduct;
        });
    },

    async getById(id: string): Promise<IProduct> {
        const { data } = await api.get(`/products/${id}`);
        const typedData = data as Record<string, unknown>;
        const rawId = typedData?.id || typedData?._id;
        const realId = rawId ? String(rawId) : "";
        return {
            ...typedData,
            id: realId,
            _id: realId,
        } as unknown as IProduct;
    },

    async getBySlug(slug: string): Promise<IProduct> {
        const { data } = await api.get(`/products/slug/${slug}`);
        const typedData = data as Record<string, unknown>;
        const rawId = typedData?.id || typedData?._id;
        const realId = rawId ? String(rawId) : "";
        return {
            ...typedData,
            id: realId,
            _id: realId,
        } as unknown as IProduct;
    },

    async create(productData: Partial<IProduct>): Promise<IProduct> {
        const formData = new FormData();
        formData.append("name", productData.name || "");
        formData.append("slug", productData.name ? productData.name.toLowerCase().replace(/\s+/g, "-") : "");
        formData.append("description", productData.description || "");
        formData.append("price", String(productData.price || 0));

        const { data } = await api.post("/products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data as IProduct;
    },

    async update(id: string, productData: Partial<IProduct>): Promise<IProduct> {
        if (!id || id === "undefined") {
            throw new Error("ID de producto no válido");
        }

        const formData = new FormData();
        if (productData.name !== undefined) {
            formData.append("name", productData.name);
            formData.append("slug", productData.name.toLowerCase().replace(/\s+/g, "-"));
        }
        if (productData.description !== undefined) {
            formData.append("description", productData.description);
        }
        if (productData.price !== undefined) {
            formData.append("price", String(productData.price));
        }
        if (productData.status !== undefined) {
            formData.append("status", String(productData.status));
        }

        const { data } = await api.patch(`/products/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data as IProduct;
    },

    async remove(id: string): Promise<void> {
        if (!id || id === "undefined") {
            throw new Error("ID de producto no válido para eliminar");
        }
        await api.delete(`/products/${id}`);
    },

    async uploadImage(id: string, formData: FormData): Promise<IProduct> {
        const { data } = await api.post(`/products/${id}/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data as IProduct;
    },
};