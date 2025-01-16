import axios from "axios";
const config = {
  baseURL: import.meta.env.VITE_DOLIBARR_API_URL,
  // withCredentials: true,
};
const axiosInstance = axios.create(config);

export default axiosInstance;
