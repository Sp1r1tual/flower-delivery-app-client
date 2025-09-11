import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { CartCheckoutPayload, OrderResponse, ApiError } from "@/types";

import { CartService } from "@/services/cartService";

const checkoutCart = createAsyncThunk<
  OrderResponse,
  CartCheckoutPayload,
  { rejectValue: ApiError }
>("cart/checkout", async (payload, { rejectWithValue }) => {
  try {
    const response = await CartService.checkoutCart(payload);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Cart checkout error" },
    );
  }
});

export { checkoutCart };
