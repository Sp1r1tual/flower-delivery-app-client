import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ShopType, ApiError } from "@/types";

import { ShopService } from "@/services/shopService";

const fetchProducts = createAsyncThunk<
  ShopType[],
  void,
  { rejectValue: ApiError }
>("shop/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await ShopService.getShop();

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Error loading products" },
    );
  }
});

const fetchCategories = createAsyncThunk<
  string[],
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

export { fetchProducts, fetchCategories };
