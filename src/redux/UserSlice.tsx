import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersInfo, UsersState } from "../type";

const initialState: UsersState = {
  setUsersInfo: [],
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersInfo: (state, action: PayloadAction<UsersInfo[]>) => {
      state.setUsersInfo = action.payload;
    },
  },
});

export const { setUsersInfo } = UserSlice.actions;
export default UserSlice.reducer;
