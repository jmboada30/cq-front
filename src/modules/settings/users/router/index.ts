import type { RouteRecordRaw } from 'vue-router';

export enum UsersRoutesEnum {
  USER_LIST = 'users-list',
}
export const UsersRouter: RouteRecordRaw = {
  path: 'users',
  name: UsersRoutesEnum.USER_LIST,
  meta: {
    title: 'Listado de Menu Items',
  },
  component: () => import('../pages/UsersPage.vue'),
};
