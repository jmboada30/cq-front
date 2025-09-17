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
      meta: { isPublic: true },
    },
    {
      path: 'callback',
      name: AuthRoutes.CALLBACK,
      component: () => import('src/modules/auth/pages/CallbackPage.vue'),
      meta: { isPublic: true },
    },
  ],
};

export default AuthRouter;
