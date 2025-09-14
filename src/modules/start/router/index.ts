import type { RouteRecordRaw } from 'vue-router';
import { SettingsRouter } from 'src/modules/settings/router';
import { BlogRouter } from 'src/modules/blog/router';

const StartRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    beforeEnter: [],
    component: () => import('../layouts/MainLayout.vue'),

    children: [SettingsRouter, BlogRouter],
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
