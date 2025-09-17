import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IShop, ICategory } from "@/types";

import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchCategories,
} from "./shopThunks";

interface IShopState {
  products: IShop[];
  categories: ICategory[];
  selectedCategoryId?: string | undefined;
  isProductsLoading: boolean;
  isCategoriesLoading: boolean;
  hasLoaded: boolean;
  error: string | null;
  total: number;
  totalPages: number;
}

const initialState: IShopState = {
  products: [],
  categories: [],
  selectedCategoryId: undefined,
  isProductsLoading: false,
  isCategoriesLoading: false,
  hasLoaded: false,
  error: null,
  total: 0,
  totalPages: 0,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string | undefined>) {
      state.selectedCategoryId = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.selectedCategoryId = undefined;
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
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.hasLoaded = true;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.error = action.payload?.message ?? null;
      })

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
      });
  },
});

export const { setSelectedCategory, clearError } = shopSlice.actions;
export default shopSlice.reducer;
