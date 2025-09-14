import isAuthenticatedGuard from 'src/modules/auth/router/guards/isAuthenticatedGuard';
import type { RouteRecordRaw } from 'vue-router';

export enum BlogRoutesEnum {
  RECENT_ARTICLES = 'recent-articles',
}

export const BlogRouter: RouteRecordRaw = {
  path: '/',
  name: BlogRoutesEnum.RECENT_ARTICLES,
  beforeEnter: [isAuthenticatedGuard],

  redirect: {
    name: 'home',
  },
  children: [
    {
      path: 'home',
      name: 'home',
      meta: {
        title: 'Blog',
      },
      component: () => import('../pages/HomeBlogPage.vue'),
    },
  ],
};
