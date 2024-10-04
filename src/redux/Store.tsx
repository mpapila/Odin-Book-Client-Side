import { configureStore } from "@reduxjs/toolkit";
import UserErrorReducer from "./UserErrorSlice";
import SideBarReducer from "./SideBarSlice";
import PostFeedSlice from "./PostFeedSlice";
import NotificationReducer from "./NotificationSlice";
import UserReducer from "./UserSlice";
import PostDetailReducer from "./PostDetailSlice";
import PostReactionReducer from "./PostReactionSlice";
export const store = configureStore({
  reducer: {
    UserError: UserErrorReducer,
    Sidebar: SideBarReducer,
    PostFeed: PostFeedSlice,
    Notification: NotificationReducer,
    UserInfo: UserReducer,
    PostDetail: PostDetailReducer,
    PostReaction: PostReactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
