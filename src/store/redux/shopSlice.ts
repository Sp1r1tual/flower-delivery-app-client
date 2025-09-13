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
  error: string | null;
}

const initialState: IShopState = {
  products: [],
  categories: [],
  selectedCategoryId: undefined,
  isProductsLoading: false,
  isCategoriesLoading: false,
  error: null,
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
        state.products = action.payload;
        state.selectedCategoryId = undefined;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.error = action.payload?.message ?? null;
      })

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.products = action.payload;
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
