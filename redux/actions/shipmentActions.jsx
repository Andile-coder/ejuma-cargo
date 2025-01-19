import { axiosInstance } from "../../config";

import { shipmentActions } from "../slices/shipmentSlice";

export const getShipments = () => {
  return async (dispatch) => {
    const handleGetShipments = async () => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get("/shipments", {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleGetShipments();
      console.log("response", res);

      if (res.status == 200) {
        dispatch(shipmentActions.setShipments(res.data));
        // dispatch(authActions.login());
        // dispatch(authActions.setUser(res.data));
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};
