import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  openPhotoModal: false,
  photo: "",
  error: "",
  pending: false,
  success: "",
};

export const uploadPhoto = createAsyncThunk<string, File>(
  "uploadPhoto",
  async (file) => {
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const upload_preset = "odinbook";
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);

    const response = await axios.post(`${url}`, formData);
    console.log("data", response);
    return response.data.secure_url;
  }
);

export const sendPhotoToDB = createAsyncThunk(
  "savePhoto",
  async ({ photo, profileId }: { photo: string; profileId: string }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const URL = `${apiUrl}`;
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${URL}/${profileId}/addPhoto`,
      { photo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const removePhotoOnDB = createAsyncThunk("removePhoto", async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}`;
  const token = localStorage.getItem("token");
  console.log("token", token);
  const response = await axios.post(`${URL}/removePhoto`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const PhotoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setOpenPhotoModal: (state) => {
      state.openPhotoModal = !state.openPhotoModal;
      state.photo = "";
      state.error = "";
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.photo = action.payload;
        state.success = "Successfully Uploaded";
        state.pending = false;
      })
      .addCase(uploadPhoto.pending, (state) => {
        state.error = "";
        state.success = "";
        state.pending = true;
      })
      .addCase(uploadPhoto.rejected, (state) => {
        state.error = "There is an issue while uploading your picture";
        state.success = "";
        state.pending = false;
      })
      .addCase(sendPhotoToDB.rejected, (state) => {
        state.error = "There is an issue while uploading your picture";
        state.success = "";
        state.pending = false;
      })
      .addCase(sendPhotoToDB.fulfilled, (state) => {
        state.success = "Done";
        state.pending = false;
      })
      .addCase(sendPhotoToDB.pending, (state) => {
        state.error = "";
        state.success = "";
        state.pending = true;
      })
      .addCase(removePhotoOnDB.fulfilled, (state) => {
        state.success = "Removed Successfully";
        state.pending = false;
        state.error = "";
      })
      .addCase(removePhotoOnDB.pending, (state) => {
        state.error = "";
        state.success = "";
        state.pending = true;
      })
      .addCase(removePhotoOnDB.rejected, (state) => {
        state.success = "";
        state.pending = false;
        state.error =
          "There is no Photo. Please Click Close to Refresh the Page";
      });
  },
});

export const { setOpenPhotoModal } = PhotoSlice.actions;
export default PhotoSlice.reducer;
