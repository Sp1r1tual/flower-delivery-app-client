import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ICategory, IProductsResponse, IApiError } from "@/types";

import { ShopService } from "@/services/shopService";

import {
  mapBackendCategoryToCategory,
  mapBackendProductToShopType,
} from "@/utils/mappers/mapTypesShop";

const fetchCategories = createAsyncThunk<
  ICategory[],
  void,
  { rejectValue: IApiError }
>("shop/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await ShopService.getCategories();

    return response.data.map(mapBackendCategoryToCategory);
  } catch (error) {
    const err = error as AxiosError<IApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Error loading categories" },
    );
  }
});

const fetchAllProducts = createAsyncThunk<
  IProductsResponse,
  { page: number; limit: number },
  { rejectValue: IApiError }
>("shop/fetchAllProducts", async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await ShopService.getAllProducts(page, limit);

    return {
      products: response.data.items.map(mapBackendProductToShopType),
      total: response.data.total,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    const err = error as AxiosError<IApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Error loading products" },
    );
  }
});

const fetchProductsByCategory = createAsyncThunk<
  IProductsResponse,
  { categoryId: string; page: number; limit: number },
  { rejectValue: IApiError }
>(
  "shop/fetchProductsByCategory",
  async ({ categoryId, page, limit }, { rejectWithValue }) => {
    try {
      const response = await ShopService.getProductsByCategory(
        categoryId,
        page,
        limit,
      );

      return {
        products: response.data.items.map(mapBackendProductToShopType),
        total: response.data.total,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      const err = error as AxiosError<IApiError>;

      return rejectWithValue(
        err.response?.data || { message: "Error loading products" },
      );
    }
  },
);

export { fetchAllProducts, fetchProductsByCategory, fetchCategories };
