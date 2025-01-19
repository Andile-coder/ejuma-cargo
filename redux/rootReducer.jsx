import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import commonReducer from "./slices/commonSlice";
import orderReducer from "./slices/orderSlice";
import shipmentReducer from "./slices/shipmentSlice";
import invoiceReducer from "./slices/invoiceSlice";
import warehouseReducer from "./slices/warehouseSlice";
import ticketReducer from "./slices/ticketSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  order: orderReducer,
  shipment: shipmentReducer,
  invoice: invoiceReducer,
  warehouse: warehouseReducer,
  ticket: ticketReducer,
});

export default rootReducer;
