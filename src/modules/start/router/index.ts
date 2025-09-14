import type { RouteRecordRaw } from 'vue-router';
import { SettingsRouter } from 'src/modules/settings/router';
import isAuthenticatedGuard from 'src/modules/auth/router/guards/isAuthenticatedGuard';

const StartRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('../layouts/MainLayout.vue'),

    children: [SettingsRouter],
  },
  {
    path: '/start',
    name: 'start',
    redirect: { name: 'settings' },
    component: () => import('../layouts/BasicLayout.vue'),
    children: [],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue'),
  },
];

export default StartRouter;
