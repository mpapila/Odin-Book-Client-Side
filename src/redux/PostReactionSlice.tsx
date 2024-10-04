import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postLikeAttribution: null,
  isLiked: false,
  likesCount: 0,
};

export const getLikeAttribution = createAsyncThunk(
  "getAttforPostLike",
  async (postId: string) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const URL = `${apiUrl}`;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/postAttribute`, {
      params: { postId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const PostReactionSlice = createSlice({
  name: "postReaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLikeAttribution.fulfilled, (state, action) => {
      state.postLikeAttribution = action.payload;
      state.isLiked = action.payload.alreadyLiked;
      state.likesCount = action.payload.postLikeCount;
    });
  },
});

export const {} = PostReactionSlice.actions;
export default PostReactionSlice.reducer;
