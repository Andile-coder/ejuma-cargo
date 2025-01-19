import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order_detail: {},
    orders: [],
  },
  reducers: {
    setorders: (state, action) => {
      state.orders = action.payload;
    },
    getOrders: (state) => {
      return state.orders;
    },
    getOrder: (state) => {
      return state.order_detail;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
