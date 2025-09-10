import { configureStore, combineReducers } from "@reduxjs/toolkit";

import shopReducer from "./redux/shopSlice";
import cartReducer from "./redux/cartSlice";
import sortShopReducer from "./redux/sortShopSlice";

const rootReducer = combineReducers({
  shop: shopReducer,
  cart: cartReducer,
  sort: sortShopReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
