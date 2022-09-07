import { initReactQueryAuth } from 'react-query-auth';

import { Loader } from '@/components';
import {
  AuthUser,
  Error,
  ForgotPasswordRequestDto,
  LoginRequestDto,
  PasswordResetRequestDto,
  RegisterRequestDto,
} from './types';
import {
  ACCESS_TOKEN_HEADER,
  axiosInstance,
  REFRESH_TOKEN_HEADER,
} from '@/lib';

const API_URL = import.meta.env.VITE_API_URL;

const loadUser = async () => {
  const response = await axiosInstance.get(`${API_URL}/user/current`);
  return response.data;
};

const loginFn = async (data: LoginRequestDto) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const sendPasswordResetEmail = async (
  email: ForgotPasswordRequestDto,
) => {
  const response = await axiosInstance.post(
    `${API_URL}/user/password/reset`,
    email,
  );
  return response.data;
};

export const resendPasswordResetEmail = async (userId: number) => {
  const response = await axiosInstance.put(
    `${API_URL}/user/password/reset/resend?id=${userId}`,
  );
  return response.data;
};

export const resetPassword = async (
  uuid: string,
  password: PasswordResetRequestDto,
) => {
  const response = await axiosInstance.put(
    `${API_URL}/user/password/reset?uuid=${uuid}`,
    password,
  );
  return response.data;
};

const registerFn = async (data: RegisterRequestDto): Promise<AuthUser> => {
  try {
    const response = await axiosInstance.post(`${API_URL}/user/create`, data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const resendActivationEmail = async (userId: number) => {
  const response = await axiosInstance.put(
    `${API_URL}/user/create/resend?id=${userId}`,
  );
  return response.data;
};

export const activateAccount = async (uuid: string) => {
  const response = await axiosInstance.put(
    `${API_URL}/user/activate?uuid=${uuid}`,
  );
  return response.data;
};

const logoutFn = async () => {
  try {
    await axiosInstance.get(`${API_URL}/logout`);
    localStorage.removeItem(ACCESS_TOKEN_HEADER);
    localStorage.removeItem(REFRESH_TOKEN_HEADER);
  } catch (error: any) {
    return error.response.data;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/user/token/refresh`);
    return response.status;
  } catch (error: any) {
    return error.response.status;
  }
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
  LoginRequestDto,
  RegisterRequestDto
>(authConfig);
