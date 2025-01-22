import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    getOrders: (state) => {
      return state.orders;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    getOrder: (state) => {
      return state.order;
    },
    removeOrder: (state) => {
      // call when you delete Shipment to remove from state
      state.order = {};
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
