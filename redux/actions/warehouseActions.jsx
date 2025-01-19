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

export const getWarehouseById = (id) => {
  return async (dispatch) => {
    const handleGetWarehouseById = async (id) => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get(`/warehouses/${id}`, {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleGetWarehouseById(id);
      console.log("response warehouses", res);

      if (res.status == 200) {
        dispatch(warehouseActions.setWarehouse(res.data));
        // dispatch(authActions.login());
        // dispatch(authActions.setUser(res.data));
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};

export const deleteWarehouseById = (id) => {
  return async (dispatch) => {
    const handleDeleteWarehouseById = async (id) => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.delete(`/warehouses/${id}`, {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleDeleteWarehouseById(id);
      console.log("response warehouses", res);

      if (res.status == 200) {
        dispatch(warehouseActions.removeWarehouse());
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};

export const createWarehouse = (data) => {
  return async () => {
    const handleCreateWarehouse = async (data) => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.post(`/warehouses`, data, {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      console.log("response create warehouse", response);
      return response;
    };

    try {
      const res = await handleCreateWarehouse(data);
      console.log("response create warehouse", res);

      if (res.status == 200) {
        // dispatch(warehouseActions.removeWarehouse());
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};
