import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { CartType, CartSyncPayload, ApiError } from "@/types";

import { CartService } from "@/services/cartService";

const fetchCart = createAsyncThunk<CartType[], void, { rejectValue: ApiError }>(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await CartService.getCart();

      return data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data || { message: "Cart loading error" },
      );
    }
  },
);

const syncCart = createAsyncThunk<
  CartSyncPayload,
  CartSyncPayload,
  { rejectValue: ApiError }
>("cart/syncCart", async (payload, { rejectWithValue }) => {
  try {
    await CartService.syncCart(payload);

    return payload;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Cart sync error" },
    );
  }
});

export { fetchCart, syncCart };
