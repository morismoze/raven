export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'USER';
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export type RegisterCredentialsDTO = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export type User = {
  name: string;
  surname: string;
};
