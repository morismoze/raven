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

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshTooken = localStorage.getItem('refresh_token');

  if (config.url?.includes(REFRESH_TOKEN_ROUTE)) {
    config.headers = {
      Authorization: `Bearer ${refreshTooken}`,
    };
  } else {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  Pace.restart();

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const accessToken = response.headers.access_token;
    const refreshToken = response.headers.refresh_token;

    if (accessToken && refreshToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const errorHeader = error.response?.headers.error;

    if (
      errorHeader &&
      errorHeader === 'expired_access_token' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refreshAccessToken();
      return axiosInstance(originalRequest);
    } else if (errorHeader && errorHeader === 'expired_refresh_token') {
      window.history.pushState(window.location.pathname, '', '/signin');
    }

    return Promise.reject(error);
  },
);
