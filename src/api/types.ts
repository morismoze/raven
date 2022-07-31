export type FieldError = {
  field: string;
  error: string;
};

export type Response<T> = {
  data: T;
  fieldErrors: FieldError[];
  hasErrors: boolean;
  message?: string;
};
