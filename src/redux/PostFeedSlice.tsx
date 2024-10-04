import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostFeedState } from "../type";
import axios from "axios";

const initialState: PostFeedState = {
  setCreatePost: false,
  friendPosts: [],
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

const PostFeedSlice = createSlice({
  name: "postfeed",
  initialState,
  reducers: {
    setCreatePost: (state: PostFeedState, action) => {
      state.setCreatePost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriendsPosts.fulfilled, (state, action) => {
      state.friendPosts = action.payload;
    });
  },
});

export const { setCreatePost } = PostFeedSlice.actions;
export default PostFeedSlice.reducer;
