export interface RegisterForm {
  email: string;
  password: string;
  name: string;
}

export interface ApiErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}
