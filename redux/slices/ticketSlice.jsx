import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    ticket: {},
    tickets: [],
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
});

export const ticketActions = ticketSlice.actions;

export default ticketSlice.reducer;
