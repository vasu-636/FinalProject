import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice";
import transactionReducer from "../Features/transactions/transactionSlice";
import categoryReducer from "../Features/categories/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    categories: categoryReducer,
  },
});
