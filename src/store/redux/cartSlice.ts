import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartType, CartSyncPayload } from "@/types";

import { fetchCart, syncCart } from "@/store/redux/cartThunks";

interface ICartState {
  items: CartType[];
  isLoading: boolean;
  error: string | null;
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
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeItem: (state, action: PayloadAction<CartSyncPayload>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity -= action.payload.quantity;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id,
          );
        }
      }
    },

    updateItemQuantity: (state, action: PayloadAction<CartSyncPayload>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<CartType[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        },
      )
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? null;
      })

      .addCase(syncCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        syncCart.fulfilled,
        (state, action: PayloadAction<CartSyncPayload>) => {
          state.isLoading = false;

          const item = state.items.find((i) => i.id === action.payload.id);

          if (item) {
            item.quantity = action.payload.quantity;
          }
        },
      )
      .addCase(syncCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? null;
      });
  },
});

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
