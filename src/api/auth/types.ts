import { Response } from '../types';

export type RoleName = {
  id: number;
  roleName: string;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  roles: RoleName[];
  createdAt: number;
  updatedAt: number;
};

// 401
export type Unauthorized = number;

export type AuthUser = Response<User | Unauthorized>;

export type Error = AuthUser;

export type LoginRequestDto = {
  username: string;
  password: string;
};

export type ForgotPasswordRequestDto = {
  email: string;
};

export type PasswordResetRequestDto = {
  password: string;
};

export type RegisterRequestDto = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export type ActivationEmailResendResponseDto = Response<null>;

export type ActivationResponseDto = Response<null>;

export type ForgotPasswordResponseDto = Response<User>;

export type PasswordResetResponseDto = Response<null>;
