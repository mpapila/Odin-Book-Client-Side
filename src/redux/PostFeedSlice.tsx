import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostFeedState } from "../type";
import axios from "axios";

const initialState: PostFeedState = {
  setCreatePost: false,
  friendPosts: [],
  rightSidebarOpen: false,
  leftSidebarOpen: false,
  isServerOkay: false,
};

export const fetchFriendsPosts = createAsyncThunk(
  "fetchFriendsPosts",
  async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const URL = `${apiUrl}`;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/myFriendsPost`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.friendsPostswithInfo;
  }
);

export const healthCheck = createAsyncThunk("healthCheck", async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}`;
  const response = await axios.get(`${URL}/health-check`);
  return response.data;
});

const PostFeedSlice = createSlice({
  name: "postfeed",
  initialState,
  reducers: {
    setCreatePost: (state: PostFeedState, action) => {
      state.setCreatePost = action.payload;
    },
    setRightSideBarOpen: (state: PostFeedState, action) => {
      state.rightSidebarOpen = action.payload;
    },
    setLeftSidebarOpen: (state, action) => {
      state.leftSidebarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriendsPosts.fulfilled, (state, action) => {
      state.friendPosts = action.payload;
    }),
      builder.addCase(healthCheck.fulfilled, (state, action) => {
        state.isServerOkay = action.payload;
      });
  },
});

export const { setCreatePost, setRightSideBarOpen, setLeftSidebarOpen } =
  PostFeedSlice.actions;
export default PostFeedSlice.reducer;
