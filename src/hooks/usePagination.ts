"use client";

import { useCallback, useState } from "react";

export interface IUsePaginationOptions {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export interface IUsePaginationReturn {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  goToPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
}

export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: IUsePaginationOptions): IUsePaginationReturn {
  const safeTotalItems = Math.max(0, totalItems);
  const safeItemsPerPage = Math.max(1, itemsPerPage);
  const totalPages = Math.max(
    1,
    Math.ceil(safeTotalItems / safeItemsPerPage),
  );

  const [page, setPage] = useState(Math.max(1, initialPage));
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * safeItemsPerPage;
  const endIndex = Math.min(
    startIndex + safeItemsPerPage,
    safeTotalItems,
  );

  const goToPage = useCallback(
    (newPage: number) => {
      setPage(Math.min(Math.max(1, newPage), totalPages));
    },
    [totalPages],
  );

  const previousPage = useCallback(() => {
    setPage((current) => Math.max(1, current - 1));
  }, []);

  const nextPage = useCallback(() => {
    setPage((current) => Math.min(totalPages, current + 1));
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    canGoPrevious: currentPage > 1,
    canGoNext: currentPage < totalPages,
    goToPage,
    previousPage,
    nextPage,
  };
}