import { useEffect, useCallback } from "react";

import { useAppSelector, useAppDispatch } from "@/types/reduxHooks";

import { setSelectedCategory, setCurrentPage } from "@/store/redux/shopSlice";
import {
  fetchCategories,
  fetchProductsByCategory,
  fetchAllProducts,
} from "@/store/redux/shopThunks";

export const useShop = () => {
  const dispatch = useAppDispatch();

  const {
    categories,
    productsCache,
    isCategoriesLoading,
    isProductsLoading,
    selectedCategoryId,
    hasLoaded,
    currentPage,
  } = useAppSelector((state) => state.shop);

  const limit = 8;

  const getPageNumbers = (
    totalPages: number,
    maxVisible: number = 5,
  ): number[] => {
    const pages: number[] = [];

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);

    return pages;
  };

  const categoryKey = selectedCategoryId || "all";
  const cacheEntry = productsCache[categoryKey]?.[currentPage];

  const products = cacheEntry?.products || [];
  const totalPages = cacheEntry?.totalPages || 0;
  const total = cacheEntry?.total || 0;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const loadCategories = useCallback(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const selectCategory = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(setCurrentPage(1));
  };

  const showAllProducts = () => {
    dispatch(setSelectedCategory(undefined));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (cacheEntry) return;

    if (selectedCategoryId) {
      dispatch(
        fetchProductsByCategory({
          categoryId: selectedCategoryId,
          page: currentPage,
          limit,
        }),
      );
    } else {
      dispatch(fetchAllProducts({ page: currentPage, limit }));
    }
  }, [dispatch, selectedCategoryId, currentPage, limit, cacheEntry]);

  return {
    categories,
    products,
    isCategoriesLoading,
    isProductsLoading,
    selectedCategoryId,
    hasLoaded,
    currentPage,
    totalPages,
    total,
    hasPrev,
    hasNext,
    getPageNumbers,
    loadCategories,
    selectCategory,
    showAllProducts,
    handlePageChange,
  };
};
