import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICart } from "@/types";

import { checkoutCart } from "@/store/redux/cartThunks";

import {
  saveCartToLocalStorage,
  loadCartFromLocalStorage,
} from "@/utils/state/localStorageCart";

interface ICartState {
  items: ICart[];
  isLoading: boolean;
  error: string | null;
  lastOrderNumber?: number;
}

const initialState: ICartState = {
  items: loadCartFromLocalStorage(),
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICart>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);

      if (!existing) {
        state.items.push(action.payload);
        saveCartToLocalStorage(state.items);
        return;
      }

      existing.quantity += action.payload.quantity;
      saveCartToLocalStorage(state.items);
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: string; quantity?: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (!item) return;

      if (!action.payload.quantity) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
        saveCartToLocalStorage(state.items);
        return;
      }

      item.quantity -= action.payload.quantity;

      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }

      saveCartToLocalStorage(state.items);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
      }

      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];

      saveCartToLocalStorage(state.items);
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

        saveCartToLocalStorage(state.items);
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? null;
      });
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
