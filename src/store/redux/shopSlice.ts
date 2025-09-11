import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ShopType, Category } from "@/types";

import { fetchProducts, fetchCategories } from "./shopThunks";

interface IShopState {
  products: ShopType[];
  categories: Category[];
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isProductsLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
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

export const { setSelectedCategory } = shopSlice.actions;
export default shopSlice.reducer;
