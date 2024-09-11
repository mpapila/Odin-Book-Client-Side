import { createSlice } from "@reduxjs/toolkit";
import { PostFeedState } from "../type";

const initialState: PostFeedState = {
  setCreatePost: false,
};

const PostFeedSlice = createSlice({
  name: "postfeed",
  initialState,
  reducers: {
    setCreatePost: (state: PostFeedState, action) => {
      state.setCreatePost = action.payload;
    },
  },
});

export const { setCreatePost } = PostFeedSlice.actions;
export default PostFeedSlice.reducer;
