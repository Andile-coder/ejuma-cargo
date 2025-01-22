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

      if (res.status == 200) {
        console.log("orders true");
        console.log("response orders", res.status == 200);
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

export const getOrderById = (id) => {
  return async (dispatch) => {
    const handleGetOrderById = async (id) => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get(`/orders/${id}`, {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleGetOrderById(id);
      console.log("response order", res);

      if (res.status == 200) {
        dispatch(orderActions.setOrder(res.data));
        // dispatch(authActions.login());
        // dispatch(authActions.setUser(res.data));
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};

export const deleteOrderById = (id) => {
  return async (dispatch) => {
    const handleDeleteWarehouseById = async (id) => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.delete(`/orders/${id}`, {
        headers: {
          "Content-Type": "application/json",

          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleDeleteWarehouseById(id);
      console.log("response orders", res);

      if (res.status == 200) {
        dispatch(orderActions.removeOrder());
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};

export const createOrder = (data) => {
  return async () => {
    const handleCreateOrder = async (data) => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.post(`/orders`, data, {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      console.log("response create order", response);
      return response;
    };

    try {
      const res = await handleCreateOrder(data);
      console.log("response create order", res);

      if (res.status == 200) {
        // dispatch(warehouseActions.removeWarehouse());
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};

export const createOrderShipment = ({ id, warehouse_id }) => {
  return async () => {
    const handleCreateOrder = async ({ id, warehouse_id }) => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.post(
        `/orders/${id}/shipment/${warehouse_id}`,
        {
          headers: {
            "Content-Type": "Application/json",
            Accept: "application/json",
            DOLAPIKEY: token,
          },
        }
      );
      console.log("response create shipment for order", response);
      return response;
    };

    try {
      const res = await handleCreateOrder({ id, warehouse_id });
      console.log("response create shipment for order", res);

      if (res.status == 200) {
        // dispatch(warehouseActions.removeWarehouse());
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};
