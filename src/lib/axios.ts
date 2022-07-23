import { refreshAccessToken } from '@/api';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Pace from 'pace-js';

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshTooken = localStorage.getItem('refresh_token');

  // set up sending refresh token only on route for refershing token

  config.headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

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
    const errorHeader = error.config.headers?.error;
    if (errorHeader && errorHeader === 'expired_token') {
      await refreshAccessToken();
    }

    return Promise.reject(error);
  },
);
