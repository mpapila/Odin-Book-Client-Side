import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Params } from "react-router-dom";

const initialState = {
  userProfile: [],
  posts: [],
  profileInformation: [],
};

export const fetchProfileById = createAsyncThunk(
  "fetchProfile",
  async (profileId: string) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const URL = `${apiUrl}`;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/profileById/${profileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setProfileInformation: (state, action) => {
      state.profileInformation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileById.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
  },
});

export const { setPosts, setProfileInformation } = UserProfileSlice.actions;
export default UserProfileSlice.reducer;
