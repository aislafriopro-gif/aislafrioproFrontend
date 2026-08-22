import api from "@/lib/api";

export interface IProductsQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IProductsResponse {
  data: readonly unknown[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productsService = {
  async getAll(
    params: IProductsQuery = {},
  ): Promise<IProductsResponse> {
    const response = await api.get<IProductsResponse>(
      "/products",
      {
        params,
      },
    );

    return response.data;
  },

  async getBySlug(slug: string): Promise<unknown> {
    const response = await api.get(
      `/products/by-slug/${encodeURIComponent(slug)}`,
    );

    return response.data;
  },
};