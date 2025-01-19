import { axiosInstance } from "../../config";
import { authActions } from "../slices/authSlice";

export const getUserInfo = () => {
  return async (dispatch) => {
    const handleGetUserInfo = async () => {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get("/users/info", {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: token,
        },
      });
      return response;
    };

    try {
      const res = await handleGetUserInfo();
      // update user to login
      if (res.status == 200) {
        dispatch(authActions.login());
        dispatch(authActions.setUser(res.data));
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};

export const login = ({ username, password, reset }) => {
  return async (dispatch) => {
    console.log(
      `username ${username}, password: ${password} , reset: ${reset}`
    );
    const handleLogin = async ({ username, password }) => {
      const response = await axiosInstance.post(
        "/login",
        { login: username, password, reset },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    };

    try {
      const res = await handleLogin({ username, password, reset });

      if (res.status == 200) {
        const token = res.data.success.token;
        sessionStorage.setItem("token", token);

        // get user information
        const user_response = await dispatch(getUserInfo());

        if (user_response.status == 200) {
          // set user information on redux
          dispatch(authActions.login());
          // dispatch(authActions.setUser(user_response.data));
        }

        console.log("user", user_response);
      }

      return res;
    } catch (error) {
      return error;
    }
  };
};
