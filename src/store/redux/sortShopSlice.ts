import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SortKeyType } from "@/types";

interface SortState {
  sort: SortKeyType;
}

const initialState: SortState = {
  sort: "byPrice",
};

const sortShopSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortKeyType>) {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = sortShopSlice.actions;
export default sortShopSlice.reducer;
