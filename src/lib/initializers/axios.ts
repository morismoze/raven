import { refreshAccessToken } from '@/api';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Pace from 'pace-js';

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const REFRESH_TOKEN_ROUTE = '/token/refresh';
export const ACCESS_TOKEN_HEADER = 'access_token';
export const REFRESH_TOKEN_HEADER = 'refresh_token';
const EXPIRED_ACCESS_TOKEN_ERROR = 'expired_access_token';
const EXPIRED_REFRESH_TOKEN_ERROR = 'expired_refresh_token';

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_HEADER);
  const refreshTooken = localStorage.getItem(REFRESH_TOKEN_HEADER);

  if (config.url?.includes(config.baseURL!)) {
    if (config.url?.includes(REFRESH_TOKEN_ROUTE)) {
      config.headers = {
        Authorization: `Bearer ${refreshTooken}`,
      };
    } else {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }

  Pace.restart();

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const accessToken = response.headers[ACCESS_TOKEN_HEADER];
    const refreshToken = response.headers[REFRESH_TOKEN_HEADER];
    localStorage.setItem(ACCESS_TOKEN_HEADER, accessToken);
    localStorage.setItem(REFRESH_TOKEN_HEADER, refreshToken);

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const errorHeader = error.response?.headers.error;

    if (
      errorHeader &&
      errorHeader === EXPIRED_ACCESS_TOKEN_ERROR &&
      // @ts-ignore
      !originalRequest._retry
    ) {
      // @ts-ignore
      originalRequest._retry = true;
      await refreshAccessToken();
      return axiosInstance(originalRequest);
    } else if (errorHeader && errorHeader === EXPIRED_REFRESH_TOKEN_ERROR) {
      // do nothing for now
    }

    return Promise.reject(error);
  },
);
