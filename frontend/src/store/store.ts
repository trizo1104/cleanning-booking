import { configureStore } from "@reduxjs/toolkit";
import authsReducer from "../slices/authSlice";
import serviceReducer from "../slices/serviceSlice";
import productReducer from "../slices/productSlice";
import bookingReducer from "../slices/bookingSlice";
import employeeReducer from "../slices/employeeSlice";
import blogReducer from "../slices/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authsReducer,
    service: serviceReducer,
    product: productReducer,
    booking: bookingReducer,
    employee: employeeReducer,
    blog: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
