import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ShopType, Category, ApiError } from "@/types";

import { ShopService } from "@/services/shopService";

import {
  mapBackendCategoryToCategory,
  mapBackendProductToShopType,
} from "@/utils/mappers/mapTypesShop";

const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: ApiError }
>("shop/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await ShopService.getCategories();

    return response.data.map(mapBackendCategoryToCategory);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Error loading categories" },
    );
  }
});

const fetchAllProducts = createAsyncThunk<
  ShopType[],
  void,
  { rejectValue: ApiError }
>("shop/fetchAllProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await ShopService.getAllProducts();

    return response.data.map(mapBackendProductToShopType);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Error loading products" },
    );
  }
});

const fetchProductsByCategory = createAsyncThunk<
  ShopType[],
  string,
  { rejectValue: ApiError }
>("shop/fetchProductsByCategory", async (categoryId, { rejectWithValue }) => {
  try {
    const response = await ShopService.getProductsByCategory(categoryId);

    return response.data.map(mapBackendProductToShopType);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Error loading products" },
    );
  }
});

export { fetchAllProducts, fetchProductsByCategory, fetchCategories };
