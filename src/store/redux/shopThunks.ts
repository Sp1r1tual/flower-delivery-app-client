import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ShopType, Category, ApiError } from "@/types";

import { ShopService } from "@/services/shopService";

const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: ApiError }
>("shop/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await ShopService.getCategories();

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Error loading categories" },
    );
  }
});

const fetchProducts = createAsyncThunk<
  ShopType[],
  string | undefined,
  { rejectValue: ApiError }
>("shop/fetchProducts", async (categoryId, { rejectWithValue }) => {
  try {
    const response = await ShopService.getShop(categoryId);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Error loading products" },
    );
  }
});

export { fetchProducts, fetchCategories };
