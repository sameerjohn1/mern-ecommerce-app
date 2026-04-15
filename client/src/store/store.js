import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductSlice from "./admin/products-slice";
import shopProductSlice from "./shop/product-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shopProductSlice,
  },
});

export default store;
