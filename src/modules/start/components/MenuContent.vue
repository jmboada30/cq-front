<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

/* import useUi from '../composables/useUi'; */

import useMenuItems from '../composables/useMenuItems';

import EssentialLinks from './EssentialLinks.vue';
import useUi from '../composables/useUi';
import useAuth from 'src/modules/auth/composables/useAuth';
import { AuthRoutes } from 'src/modules/auth/interfaces/auth-routes';

const router = useRouter();
const route = useRoute();
const { menuItems } = useMenuItems();
const { isMiniState } = useUi();
const { logout } = useAuth();

const redirect = async (route: string) => {
  await router.push({
    name: route,
  });
};
const logoutUser = async () => {
  logout();
  await redirect(AuthRoutes.LOGIN);
};
</script>
<template>
  <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between">
    <div class="self-center q-pt-xl" loading="eager" no-spinner>
      <q-img
        v-if="isMiniState"
        :class="isMiniState ? 'q-mb-sm' : 'hidden'"
        src="images/isotipo.png"
        width="40px"
        loading="eager"
        no-spinner
      />

      <q-img
        v-else
        class="'q-mb-sm"
        src=" images/logo_app_light.png"
        width=" 120px"
        loading="eager"
        no-spinner
        transition-show="jump-down"
        transition-hide="jump-up"
      />
    </div>
    <q-list class="q-px-sm menuList">
      <EssentialLinks
        v-for="link in menuItems"
        :key="link.title"
        v-bind="link"
        :current-route="route.fullPath"
      />
    </q-list>

    <q-item clickable class="listItem" tag="a" v-ripple @click="logoutUser">
      <q-item-section avatar>
        <q-icon name="sym_r_logout" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Cerrar sesión</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>
