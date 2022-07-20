import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Pace from 'pace-js';

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  /* const token = 'token';
  console.log(config);

  if (token) {
    config.headers!.authorization = `Bearer ${token}`;
  } */

  config.headers!.Accept = 'application/json';
  Pace.restart();

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
