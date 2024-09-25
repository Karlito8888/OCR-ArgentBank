// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    user: authReducer,
  },
  devTools: true,
});

export default store;
