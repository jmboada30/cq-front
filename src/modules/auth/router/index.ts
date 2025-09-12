import type { RouteRecordRaw } from 'vue-router';
import { AuthRoutes } from '../interfaces/auth-routes';

const AuthRouter: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  component: () => import('../layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: AuthRoutes.LOGIN,
      component: () => import('../pages/SigninPage.vue'),
    },
  ],
};

export default AuthRouter;
