import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ICartCheckoutPayload, IOrderResponse, IApiError } from "@/types";

import { CartService } from "@/services/cartService";

const checkoutCart = createAsyncThunk<
  IOrderResponse,
  ICartCheckoutPayload,
  { rejectValue: IApiError }
>("cart/checkout", async (payload, { rejectWithValue }) => {
  try {
    const response = await CartService.checkoutCart(payload);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<IApiError>;

    return rejectWithValue(
      err.response?.data || { message: "Cart checkout error" },
    );
  }
});

export { checkoutCart };
