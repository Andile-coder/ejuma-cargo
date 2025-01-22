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
    setShipment: (state, action) => {
      state.shipment = action.payload;
    },
    removeShipment: (state) => {
      // call when you delete Shipment to remove from state
      state.shipment = {};
    },
  },
});

export const shipmentActions = shipmentSlice.actions;

export default shipmentSlice.reducer;
