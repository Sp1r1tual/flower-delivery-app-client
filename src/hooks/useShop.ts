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
    products,
    isCategoriesLoading,
    isProductsLoading,
    selectedCategoryId,
    hasLoaded,
    totalPages,
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

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const loadCategories = useCallback(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const loadProductsByCategory = useCallback(
    async (categoryId: string, page = currentPage) => {
      return await dispatch(
        fetchProductsByCategory({ categoryId, page, limit }),
      );
    },
    [dispatch, currentPage, limit],
  );

  const selectCategory = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(setCurrentPage(1));
    loadProductsByCategory(categoryId, 1);
  };

  const showAllProducts = () => {
    dispatch(setSelectedCategory(undefined));
    dispatch(setCurrentPage(1));
    dispatch(fetchAllProducts({ page: 1, limit }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));

    if (selectedCategoryId) {
      loadProductsByCategory(selectedCategoryId, page);
    } else {
      dispatch(fetchAllProducts({ page, limit }));
    }
  };

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      loadCategories();
    }
  }, [categories, loadCategories]);

  useEffect(() => {
    if (selectedCategoryId) {
      if (
        !products ||
        products.length === 0 ||
        products.some((p) => p.category.id !== selectedCategoryId)
      ) {
        dispatch(setCurrentPage(1));
        dispatch(
          fetchProductsByCategory({
            categoryId: selectedCategoryId,
            page: 1,
            limit,
          }),
        );
      }
    } else {
      if (!products || products.length === 0) {
        dispatch(fetchAllProducts({ page: currentPage, limit }));
      }
    }
  }, [dispatch, selectedCategoryId, products, limit, currentPage]);

  return {
    categories,
    products,
    isCategoriesLoading,
    isProductsLoading,
    selectedCategoryId,
    hasLoaded,
    currentPage,
    totalPages,
    hasPrev,
    hasNext,
    getPageNumbers,
    loadCategories,
    selectCategory,
    showAllProducts,
    handlePageChange,
  };
};
