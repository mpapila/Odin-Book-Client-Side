import { configureStore } from "@reduxjs/toolkit";
import UserErrorReducer from "./UserErrorSlice";
import SideBarReducer from "./SideBarSlice";

export const store = configureStore({
  reducer: { UserError: UserErrorReducer, Sidebar: SideBarReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
