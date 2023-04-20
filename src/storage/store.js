import { configureStore } from "@reduxjs/toolkit";
import { api } from "../utils/api";
// import productSlice from "./products/productSlice";
import userSlice from "./user/userSlice";
import productSlice from "./products/productSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  })
});

export default store;
