import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartType } from "@/types";

import { checkoutCart } from "@/store/redux/cartThunks";

interface ICartState {
  items: CartType[];
  isLoading: boolean;
  error: string | null;
  lastOrderNumber?: number;
}

const initialState: ICartState = {
  items: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartType>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.lastOrderNumber = action.payload.orderNumber;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Checkout failed";
      });
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
