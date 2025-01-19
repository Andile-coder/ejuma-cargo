import { axiosInstance } from "../../config";
import { warehouseActions } from "../slices/warehouseSlice";

export const getWarehouses = () => {
  return async (dispatch) => {
    const handleGetWarehouses = async () => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get("/warehouses", {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleGetWarehouses();
      console.log("response warehouses", res);

      if (res.status == 200) {
        dispatch(warehouseActions.setWarehouses(res.data));
        // dispatch(authActions.login());
        // dispatch(authActions.setUser(res.data));
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};
