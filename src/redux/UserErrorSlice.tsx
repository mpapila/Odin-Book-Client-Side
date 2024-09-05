import { createSlice } from "@reduxjs/toolkit";

interface UserErrorState {
  setErrorMessage?: string | null;
}

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
