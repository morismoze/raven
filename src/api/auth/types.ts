export type RoleName = {
  id: number;
  roleName: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  roles: RoleName[];
  createdAt: number;
  updatedAt: number;
};

export type FieldError = {
  field: string;
  error: string;
};

// 401
export type Unauthorized = number;

export type AuthUser = {
  data: User | Unauthorized;
  fieldErrors: FieldError[];
  hasErrors: boolean;
  message?: string;
};

export type Error = AuthUser;

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
