import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EachPostDetail } from "../type";

const initialState: {
  eachPostDetail: EachPostDetail | null;
  nameInfoForComment?: string[];
} = {
  eachPostDetail: null,
  nameInfoForComment: [],
};

export const getPostbyId = createAsyncThunk(
  "getPostbyId",
  async (id: string) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const URL = `${apiUrl}`;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const PostDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostbyId.fulfilled, (state, action) => {
      state.eachPostDetail = action.payload;
    });
  },
});

export const {} = PostDetailSlice.actions;
export default PostDetailSlice.reducer;
