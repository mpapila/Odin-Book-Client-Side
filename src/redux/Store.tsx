import { configureStore } from "@reduxjs/toolkit";
import UserErrorReducer from "./UserErrorSlice";
import SideBarReducer from "./SideBarSlice";
import PostFeedSlice from "./PostFeedSlice";

export const store = configureStore({
  reducer: {
    UserError: UserErrorReducer,
    Sidebar: SideBarReducer,
    PostFeed: PostFeedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
