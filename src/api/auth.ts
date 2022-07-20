import { initReactQueryAuth } from 'react-query-auth';

import { Loader } from '@/components';
import {
  AuthUser,
  Error,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
} from './types';
import { axiosInstance } from '@/lib';

const API_URL = import.meta.env.VITE_API_URL;

const loadUser = async () => {
  if (false) {
    const response = await axiosInstance.get(`${API_URL}/user/current`, {
      headers: {
        Authorization: 'Bearer token',
      },
    });

    return response.data;
  }
  return null;
};

const loginFn = async (data: LoginCredentialsDTO) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const registerFn = async (data: RegisterCredentialsDTO): Promise<AuthUser> => {
  try {
    const response = await axiosInstance.post(`${API_URL}/user/create`, data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const logoutFn = async () => {
  // clear jwt from LS
  window.location.assign(window.location.origin as unknown as string);
};

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent: Loader,
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser,
  Error,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
