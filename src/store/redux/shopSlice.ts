import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ShopType, Category } from "@/types";

import { fetchProducts, fetchCategories } from "./shopThunks";

interface IShopState {
  products: ShopType[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IShopState = {
  products: [],
  categories: [],
  isLoading: false,
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ShopType[]>) => {
          state.isLoading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? null;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.isLoading = false;
          state.categories = action.payload;
        },
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? null;
      });
  },
});

export default shopSlice.reducer;
