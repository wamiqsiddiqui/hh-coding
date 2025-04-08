import axios, { AxiosError, AxiosResponse } from "axios";
import { PARENT_ROUTES } from "../parentRoutes";
import { KEY_NAMES } from "../utils/constants";

interface ResponseType<T> extends AxiosResponse {
  data: T;
  status: number;
  statusText: string;
}
const getReturnResponse = <T>(response: AxiosResponse<any, any>) => {
  const customResponse: ResponseType<T> = {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    config: response.config,
    headers: response.headers,
  };
  return customResponse;
};
export const APP_BASE_URL = process.env.REACT_APP_APP_BASE_URL;
// export const API_BASE_URL = "http://localhost:8080";
export const BASE_PATH = "/service-provider/portal";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, //"http://34.207.150.6:8080/api/v1",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      KEY_NAMES.accessToken
    )}`;
    config.headers["Permissions"] =
      localStorage.getItem(KEY_NAMES.permissions) ?? JSON.stringify({});
    config.headers["merchantId"] = localStorage.getItem(KEY_NAMES.merchantId);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Modify response data or handle common errors
    response = getReturnResponse(response);
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error?.response?.data?.code === 401) {
        if (`${window.location.pathname}` !== `${BASE_PATH}/login`) {
          localStorage?.clear();
          window.location.href = `${BASE_PATH}${PARENT_ROUTES.login}`;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
