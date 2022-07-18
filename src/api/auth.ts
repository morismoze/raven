import { Loader } from '@/components';
import axios from 'axios';
import { initReactQueryAuth } from 'react-query-auth';

import { AuthUser, LoginCredentialsDTO, RegisterCredentialsDTO } from './types';

const API_URL = import.meta.env.VITE_API_URL;

const loadUser = async () => {
  if (false) {
    const response = await axios.get(`${API_URL}/user/current`, {
      headers: {
        Authorization: 'Bearer token',
      },
    });

    return response.data;
  }
  return null;
};

const loginFn = async (data: LoginCredentialsDTO) => {
  const response = await axios.post(`${API_URL}/login`, data);

  const user = null;
  return user;
};

const registerFn = async (data: RegisterCredentialsDTO): Promise<AuthUser> => {
  const response = await axios.post(`${API_URL}/user/create`, data);
  const user = await response.data;

  return user;
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
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
