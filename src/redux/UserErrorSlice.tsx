import { createSlice } from "@reduxjs/toolkit";
import { UserErrorState } from "../type";

const initialState: UserErrorState = {
  setErrorMessage: null,
};

const UserErrorSlice = createSlice({
  name: "userError",
  initialState,
  reducers: {
    setErrorMessage: (state: UserErrorState, action) => {
      state.setErrorMessage = action.payload;
    },
  },
});

export const { setErrorMessage } = UserErrorSlice.actions;
export default UserErrorSlice.reducer;
