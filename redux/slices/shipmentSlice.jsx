import { createSlice } from "@reduxjs/toolkit";

const shipmentSlice = createSlice({
  name: "shipment",
  initialState: {
    shipment: {},
    shipments: [],
  },
  reducers: {
    setShipments: (state, action) => {
      state.shipments = action.payload;
    },
  },
});

export const shipmentActions = shipmentSlice.actions;

export default shipmentSlice.reducer;
