"use client";

import { useQuery } from "@tanstack/react-query";
import {
  productsService,
  type IProductsQuery,
} from "@/services/products.service";

export function useProducts(
  params: IProductsQuery = {},
) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productsService.getAll(params),
  });
}