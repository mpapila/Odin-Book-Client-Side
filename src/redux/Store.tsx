import { configureStore } from "@reduxjs/toolkit";
import UserErrorReducer from "./UserErrorSlice";

export const store = configureStore({
  reducer: { UserError: UserErrorReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
