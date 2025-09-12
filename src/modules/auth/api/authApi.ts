import { api } from 'src/boot/axios';
import type { AuthUser, LoginForm } from '../interfaces/auth';

export const signIn = async (loginForm: LoginForm) => {
  const { email, password } = loginForm;
  const resp = await api.post<{ jwt: string }>(
    'auth/login',
    {
      email,
      password,
    },
    {
      timeout: 1000 * 5,
      timeoutErrorMessage: 'Tiempo de espera agotado para iniciar sesión',
    },
  );
  return resp.data.jwt;
};

export const validateJwt = async () => {
  const resp = await api.get<AuthUser>('auth/check-auth-token', {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para validar el token',
  });
  return resp.data;
};
