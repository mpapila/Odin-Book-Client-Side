import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationState } from "../type";
import axios from "axios";

const initialState: NotificationState = {
  setNotificationRead: null,
  allNotifications: {
    birthdaysToday: [],
    notifications: [],
  },
};

export const fetchAllNotifications = createAsyncThunk(
  "notifications",
  async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const URL = `${apiUrl}`;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/notification`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationRead: (state: NotificationState, action) => {
      state.setNotificationRead = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllNotifications.fulfilled, (state, action) => {
      state.allNotifications = action.payload;
    });
  },
});

export const { setNotificationRead } = NotificationSlice.actions;
export default NotificationSlice.reducer;
