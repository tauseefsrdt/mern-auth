import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;


export default store;
