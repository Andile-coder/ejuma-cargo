import { axiosInstance } from "../../config";
import { orderActions } from "../slices/orderSlice";

export const getOrders = () => {
  return async (dispatch) => {
    const handleGetOrders = async () => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get("/orders", {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleGetOrders();
      console.log("response", res);

      if (res.status == 200) {
        dispatch(orderActions.setOrders(res.data));
        // dispatch(authActions.login());
        // dispatch(authActions.setUser(res.data));
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};
