import isAuthenticatedGuard from 'src/modules/auth/router/guards/isAuthenticatedGuard';
import type { RouteRecordRaw } from 'vue-router';

import { BlogRoutesEnum } from '../interfaces/blog-routes';

export const BlogRouter: RouteRecordRaw = {
  path: '/',
  name: BlogRoutesEnum.RECENT_ARTICLES,
  beforeEnter: [isAuthenticatedGuard],

  redirect: {
    name: BlogRoutesEnum.HOME,
  },
  children: [
    {
      path: 'home',
      name: BlogRoutesEnum.HOME,
      meta: {
        title: 'Blog',
      },
      component: () => import('../pages/HomeBlogPage.vue'),
    },
    {
      path: 'posts/:id',
      name: BlogRoutesEnum.POST_DETAILS,
      component: () => import('../pages/PostDetailPage.vue'),
    },
    {
      path: 'my-posts/new',
      name: BlogRoutesEnum.MY_POSTS_NEW,
      component: () => import('../pages/CreatePostPage.vue'),
    },
    {
      path: 'my-posts/:id',
      name: BlogRoutesEnum.MY_POSTS_EDIT,
      component: () => import('../pages/CreatePostPage.vue'),
    },
  ],
};
