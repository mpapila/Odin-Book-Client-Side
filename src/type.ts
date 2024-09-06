export interface RegisterFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  dateOfBirth: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface ErrorDetail {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
