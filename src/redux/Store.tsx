import { configureStore } from "@reduxjs/toolkit";
import UserErrorReducer from "./UserErrorSlice";
import SideBarReducer from "./SideBarSlice";
import PostFeedSlice from "./PostFeedSlice";
import NotificationReducer from "./NotificationSlice";
import UserReducer from "./UserSlice";
export const store = configureStore({
  reducer: {
    UserError: UserErrorReducer,
    Sidebar: SideBarReducer,
    PostFeed: PostFeedSlice,
    Notification: NotificationReducer,
    UserInfo: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
