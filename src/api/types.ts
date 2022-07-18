export type RoleName = {
  id: number;
  roleName: string;
};

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: RoleName[];
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
