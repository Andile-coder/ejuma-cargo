import { createSlice } from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    warehouse: {},
    warehouses: [],
  },
  reducers: {
    setWarehouses: (state, action) => {
      state.warehouses = action.payload;
    },

    setWarehouse: (state, action) => {
      state.warehouse = action.payload;
    },
    removeWarehouse: (state) => {
      // call when you delete warehouse to remove from state
      state.warehouse = {};
    },
  },
});

export const warehouseActions = warehouseSlice.actions;

export default warehouseSlice.reducer;
