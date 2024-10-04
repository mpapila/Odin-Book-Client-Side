import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../type";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const URL = `${apiUrl}`;

const initialState: UsersState = {
  allUsers: [],
  incomingFriendRequestList: [],
  mergedIncomingRequestsList: [],
  myFriendsList: [],
  status: "idle",
  myPendingFriendsListforRequesterUsers: [],
  error: null,
};

export const fetchUsersInfo = createAsyncThunk("fetchUsersInfo", async () => {
  const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/myPendingFriendsList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.incomingRequests;
  }
);

export const myPendingFriendsListforRequesterUsers = createAsyncThunk(
  "fetchPendingReceivingListforRequesterUsers",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/myPendingFriendsList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.requestedFriends;
  }
);

export const mergedIncomingRequests = createAsyncThunk(
  "mergedIncomingRequests",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/myPendingFriendsList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.mergedIncomingRequests;
  }
);

export const myFriendsList = createAsyncThunk("myFriendList", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${URL}/myFriends`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.friends;
});

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersInfo.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(myPendingFriendsList.fulfilled, (state, action) => {
        state.incomingFriendRequestList = action.payload;
      })
      .addCase(mergedIncomingRequests.fulfilled, (state, action) => {
        state.mergedIncomingRequestsList = action.payload;
      })
      .addCase(myFriendsList.fulfilled, (state, action) => {
        state.myFriendsList = action.payload;
      })
      .addCase(
        myPendingFriendsListforRequesterUsers.fulfilled,
        (state, action) => {
          state.myPendingFriendsListforRequesterUsers = action.payload;
        }
      );
  },
});

export const {} = UserSlice.actions;
export default UserSlice.reducer;
