import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserProfile } from "../type";

const initialState: UserProfile = {
  userProfile: {
    userPostById: [],
    userProfileById: {
      createdAt: "",
      dateOfBirth: "",
      firstName: "",
      lastName: "",
      username: "",
      profilePhoto: "",
    },
  },
  posts: [],
  profileInformation: {
    createdAt: "",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    username: "",
    profilePhoto: "",
  },
  editProfileButton: false,
  myName: "",
  loading: false,
  error: "",
  success: "",
};

export const addFriend = createAsyncThunk(
  "addFriend",
  async (friendId: string) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const URL = `${apiUrl}`;
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${URL}/addFriend`,
      { friendId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

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

export const editProfile = createAsyncThunk(
  "editProfile",
  async ({
    body,
    profileId,
  }: {
    body: { firstName: string; lastName: string; dateOfBirth: string };
    profileId: string;
  }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const URL = `${apiUrl}`;
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${URL}/profile/${profileId}/edit`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    setEditProfile: (state) => {
      state.editProfileButton = !state.editProfileButton;
    },

    setMyName: (state, action) => {
      state.myName = action.payload;
    },
    setClearError: (state) => {
      state.error = "";
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(editProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = "Successful";
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === "Request failed with status code 400") {
          state.error = "Failed to update profile";
        }

        // state.error = action.payload || "Failed to update profile";
      });
  },
});

export const {
  setClearError,
  setPosts,
  setProfileInformation,
  setMyName,
  setEditProfile,
} = UserProfileSlice.actions;
export default UserProfileSlice.reducer;
