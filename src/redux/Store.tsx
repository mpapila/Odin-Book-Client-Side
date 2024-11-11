import { configureStore } from "@reduxjs/toolkit";
import UserErrorReducer from "./UserErrorSlice";
import SideBarReducer from "./SideBarSlice";
import PostFeedSlice from "./PostFeedSlice";
import NotificationReducer from "./NotificationSlice";
import UserReducer from "./UserSlice";
import PostDetailReducer from "./PostDetailSlice";
import UserProfileReducer from "./UserProfileSlice";
import PhotoReducer from "./PhotoSlice";
export const store = configureStore({
  reducer: {
    UserError: UserErrorReducer,
    Sidebar: SideBarReducer,
    PostFeed: PostFeedSlice,
    Notification: NotificationReducer,
    UserInfo: UserReducer,
    PostDetail: PostDetailReducer,
    UserProfile: UserProfileReducer,
    Photo: PhotoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
