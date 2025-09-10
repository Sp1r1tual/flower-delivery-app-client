import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SortKey } from "@/types";

interface SortState {
  sort: SortKey;
}

const initialState: SortState = {
  sort: "byPrice",
};

const sortShopSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortKey>) {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = sortShopSlice.actions;
export default sortShopSlice.reducer;
