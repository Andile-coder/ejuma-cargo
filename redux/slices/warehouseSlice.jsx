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
  },
});

export const warehouseActions = warehouseSlice.actions;

export default warehouseSlice.reducer;
