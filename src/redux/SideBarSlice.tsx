import { createSlice } from "@reduxjs/toolkit";
import { SidebarState } from "../type";

const initialState: SidebarState = {
  setNotificationBar: false,
  setActiveButton: "home",
};

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setNotificationBar: (state: SidebarState, action) => {
      state.setNotificationBar = action.payload;
    },
    setActiveButton: (state: SidebarState, action) => {
      state.setActiveButton = action.payload;
    },
  },
});

export const { setNotificationBar, setActiveButton } = SidebarSlice.actions;
export default SidebarSlice.reducer;
