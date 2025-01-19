import { axiosInstance } from "../../config";
import { ticketActions } from "../slices/ticketSlice";

export const getTickets = () => {
  return async (dispatch) => {
    const handleGetTickets = async () => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get("/tickets", {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleGetTickets();
      console.log("response tickets", res);

      if (res.status == 200) {
        dispatch(ticketActions.setTickets(res.data));
        // dispatch(authActions.login());
        // dispatch(authActions.setUser(res.data));
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};
