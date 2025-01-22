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

export const getShipmentById = (id) => {
  return async (dispatch) => {
    const handleGetShipmentById = async (id) => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get(`/shipments/${id}`, {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleGetShipmentById(id);

      if (res.status == 200) {
        dispatch(shipmentActions.setShipment(res.data));
        // dispatch(authActions.login());
        // dispatch(authActions.setUser(res.data));
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};

export const deleteShipmentById = (id) => {
  return async (dispatch) => {
    const handleDeleteShipmentById = async (id) => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.delete(`/shipments/${id}`, {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleDeleteShipmentById(id);

      if (res.status == 200) {
        dispatch(shipmentActions.removeShipment());
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};

export const createShipment = (data) => {
  return async () => {
    const handleCreateShipment = async (data) => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.post(`/shipments`, data, {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });

      return response;
    };

    try {
      const res = await handleCreateShipment(data);

      if (res.status == 200) {
        // dispatch(shipmentActions.removeWarehouse());
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};
