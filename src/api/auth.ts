import { Loader } from '@/components';
import axios from 'axios';
import { initReactQueryAuth } from 'react-query-auth';

import {
  AuthUser,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  UserResponse,
} from './types';

const API_URL = import.meta.env.VITE_API_URL;

const loadUser = async () => {
  // if jwt exists in LS check if it is valid, otherwise return null
  if (false) {
    const currentUser = await axios.get('/auth/current');
    return currentUser.data;
  }
  return null;
};

const loginFn = async (data: LoginCredentialsDTO) => {
  const response = await axios.post(`${API_URL}/login`, data);
  console.log(response.data);

  const user = null;
  return user;
};

const registerFn = async (data: RegisterCredentialsDTO) => {
  const response = await axios.post(`${API_URL}/user/create`, data);
  const user = null;

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
