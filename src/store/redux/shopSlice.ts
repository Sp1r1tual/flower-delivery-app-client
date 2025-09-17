import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IShop, ICategory } from "@/types";

import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchCategories,
} from "./shopThunks";

interface IProductsCache {
  [categoryId: string]: {
    [page: number]: {
      products: IShop[];
      totalPages: number;
      total: number;
    };
  };
}

interface IShopState {
  productsCache: IProductsCache;
  categories: ICategory[];
  selectedCategoryId: string | undefined;
  isProductsLoading: boolean;
  isCategoriesLoading: boolean;
  hasLoaded: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: IShopState = {
  productsCache: {},
  categories: [],
  selectedCategoryId: undefined,
  isProductsLoading: false,
  isCategoriesLoading: false,
  hasLoaded: false,
  error: null,
  currentPage: 1,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string | undefined>) {
      state.selectedCategoryId = action.payload;
      state.currentPage = 1;
      state.hasLoaded = false;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isCategoriesLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isCategoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isCategoriesLoading = false;
        state.error = action.payload?.message ?? null;
      })

      .addCase(fetchAllProducts.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false;

        const categoryKey = "all";

        if (!state.productsCache[categoryKey])
          state.productsCache[categoryKey] = {};

        state.productsCache[categoryKey][state.currentPage] = {
          products: action.payload.products,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        };

        state.hasLoaded = true;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.error = action.payload?.message ?? null;
        state.hasLoaded = true;
      })

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isProductsLoading = false;

        const categoryKey = action.meta.arg.categoryId;

        if (!state.productsCache[categoryKey])
          state.productsCache[categoryKey] = {};

        state.productsCache[categoryKey][state.currentPage] = {
          products: action.payload.products,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        };

        state.hasLoaded = true;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.error = action.payload?.message ?? null;
        state.hasLoaded = true;
      });
  },
});

export const { setSelectedCategory, setCurrentPage, clearError } =
  shopSlice.actions;
export default shopSlice.reducer;
