import { useEffect, useCallback } from "react";

import { useAppSelector, useAppDispatch } from "@/types/reduxHooks";
import { usePagination } from "@/hooks/usePagination";

import { setSelectedCategory } from "@/store/redux/shopSlice";
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
  } = useAppSelector((state) => state.shop);

  const { currentPage, setCurrentPage, getPageNumbers, limit } =
    usePagination();

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
    setCurrentPage(1);
    loadProductsByCategory(categoryId, 1);
  };

  const showAllProducts = () => {
    dispatch(setSelectedCategory(undefined));
    setCurrentPage(1);
    dispatch(fetchAllProducts({ page: 1, limit }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

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
        setCurrentPage(1);
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
  }, [
    dispatch,
    selectedCategoryId,
    products,
    limit,
    currentPage,
    setCurrentPage,
  ]);

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
