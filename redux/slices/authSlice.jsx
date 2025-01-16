import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    user: [],
  },
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
      state.user = [];
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPartner: (state, action) => {
      state.partner = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
