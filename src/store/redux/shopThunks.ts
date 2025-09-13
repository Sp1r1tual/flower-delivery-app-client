import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IShop, ICategory, IApiError } from "@/types";

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
  IShop[],
  void,
  { rejectValue: IApiError }
>("shop/fetchAllProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await ShopService.getAllProducts();

    return response.data.map(mapBackendProductToShopType);
  } catch (error) {
    const err = error as AxiosError<IApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Error loading products" },
    );
  }
});

const fetchProductsByCategory = createAsyncThunk<
  IShop[],
  string,
  { rejectValue: IApiError }
>("shop/fetchProductsByCategory", async (categoryId, { rejectWithValue }) => {
  try {
    const response = await ShopService.getProductsByCategory(categoryId);

    return response.data.map(mapBackendProductToShopType);
  } catch (error) {
    const err = error as AxiosError<IApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Error loading products" },
    );
  }
});

export { fetchAllProducts, fetchProductsByCategory, fetchCategories };
