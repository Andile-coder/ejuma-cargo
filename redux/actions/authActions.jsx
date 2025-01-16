import axiosInstance from "../../config";

export const getUserInfo = (token) => {
  return async (dispatch) => {
    const handleGetUserInfo = async () => {
      const response = await axiosInstance.get("/users/info", {
        headers: {
          "Content-Type": "application/json",
          DOLAPIKEY: "L7b1uRmWgS02C42o1DbGvzHByRb3y2R0",
        },
      });
      return response;
    };

    try {
      const res = await handleGetUserInfo(token);

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

      return res;
    } catch (error) {
      return error;
    }
  };
};
