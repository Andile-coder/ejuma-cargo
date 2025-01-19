import { axiosInstance } from "../../config";
import { invoiceActions } from "../slices/invoiceSlice";

export const getInvoices = () => {
  return async (dispatch) => {
    const handleGetInvoices = async () => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get("/invoices", {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleGetInvoices();
      console.log("response invoices", res);

      if (res.status == 200) {
        dispatch(invoiceActions.setInvoices(res.data));
        // dispatch(authActions.login());
        // dispatch(authActions.setUser(res.data));
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};
