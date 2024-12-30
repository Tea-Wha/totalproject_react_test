import axios from "axios";
import Commons from "../utils/Common";

const AxiosInstance = axios.create({
  baseURL: Commons.KH_DOMAIN,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Commons.getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const newToken = await Commons.handleUnauthorized();
      if (newToken) {
        error.config.headers.Authorziation = `Bearer ${Commons.getAccessToken()}`;
        return AxiosInstance.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
