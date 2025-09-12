import type { RouteRecordRaw } from 'vue-router';

import isAuthenticatedGuard from 'src/modules/auth/router/guards/isAuthenticatedGuard';
import { MenuItemRouter, MenuRoutesEnum } from '../menuItems/router';
import { UsersRouter } from '../users/router';
import { ProfileRouter } from '../profiles/router';

export const SettingsRouter: RouteRecordRaw = {
  path: '/settings',
  beforeEnter: isAuthenticatedGuard,
  redirect: {
    name: MenuRoutesEnum.MENU_LIST,
  },
  children: [MenuItemRouter, ProfileRouter, UsersRouter],
};
