import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../type";
import axios from "axios";

const token = localStorage.getItem("token");
const apiUrl = import.meta.env.VITE_API_URL;
const URL = `${apiUrl}`;

const initialState: UsersState = {
  setUsersInfo: [],
  incomingFriendRequestList: [],
  mergedIncomingRequestsList: [],
  status: "idle",
  error: null,
};

export const fetchUsersInfo = createAsyncThunk("fetchUsersInfo", async () => {
  const response = await axios.get(`${URL}/allUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.allUsers;
});

export const myPendingFriendsList = createAsyncThunk(
  "fetchPendingReceivingList",
  async () => {
    const response = await axios.get(`${URL}/myPendingFriendsList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.incomingRequests;
  }
);

export const mergedIncomingRequests = createAsyncThunk(
  "mergedIncomingRequests",
  async () => {
    const response = await axios.get(`${URL}/myPendingFriendsList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.mergedIncomingRequests;
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersInfo.fulfilled, (state, action) => {
        state.setUsersInfo = action.payload;
      })
      .addCase(myPendingFriendsList.fulfilled, (state, action) => {
        state.incomingFriendRequestList = action.payload;
      })
      .addCase(mergedIncomingRequests.fulfilled, (state, action) => {
        state.mergedIncomingRequestsList = action.payload;
      });
  },
});

export const {} = UserSlice.actions;
export default UserSlice.reducer;
