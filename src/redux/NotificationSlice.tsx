import { createSlice } from "@reduxjs/toolkit";
import { NotificationState } from "../type";

const initialState: NotificationState = {
  setNotificationRead: true,
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationRead: (state: NotificationState, action) => {
      state.setNotificationRead = action.payload;
    },
  },
});

export const { setNotificationRead } = NotificationSlice.actions;
export default NotificationSlice.reducer;
