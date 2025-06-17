import { configureStore } from "@reduxjs/toolkit";
import authsReducer from "../slices/authSlice";
import serviceReducer from "../slices/serviceSlice";
import productReducer from "../slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authsReducer,
    service: serviceReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
