import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    title: "",
    message: "",
    description: "",
    sidebarCollapse: false,
    userLocation: [],
  },
  reducers: {
    setNotification: (state, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.description = action.payload.description;
    },

    setSidebarCollape: (state) => {
      state.sidebarCollapse = !state.sidebarCollapse;
    },

    setLocation: (state, action) => {
      state.userLocation = action.payload;
    },
  },
});

export const commonActions = commonSlice.actions;

export default commonSlice.reducer;
