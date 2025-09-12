<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import useUi from '../composables/useUi';
import { useQuasar } from 'quasar';

import EssentialSubLinks from './EssentialSubLinks.vue';
import { useMenuItemStore } from '../stores/useMenuItemStore';
import type { MenuItem } from '../interfaces/menuItem';

const { isSubItemOpen, currentTitle, toggleSubItem } = useUi();
const route = useRoute();
const $q = useQuasar();
const { menuItemsMaster, menuItemsOperations } = useMenuItemStore();

const props = withDefaults(defineProps<MenuItem>(), {
  caption: '',
  link: '#',
  icon: '',
});
const router = useRouter();

const navigateTo = async (link: string = '') => {
  currentTitle.value = props.title;
  isSubItemOpen.value = false;

  if (!link) return;
  if (link.startsWith('http')) {
    window.open(link);
  } else {
    await router.push({ path: '/' + link });
  }
};

/* const compareRoute = (link: string, currentRoute: string) => {
  return link.split('/').slice(0, 2).join('/') === currentRoute.split('/').slice(1, 3).join('/');
}; */
const toggle = () => {
  currentTitle.value = props.title;
  toggleSubItem();
};

const subLinks = {
  Principales: menuItemsMaster,
  Operaciones: menuItemsOperations,
};
</script>

<template>
  <q-item
    clickable
    tag="a"
    v-ripple
    class="listItem items-center"
    :active="title === currentTitle"
    active-class="activeItem"
    auto-close
    @click="title !== 'Principales' && title !== 'Operaciones' ? navigateTo(link) : toggle()"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label class="item_caption" caption>{{ caption }}</q-item-label>
    </q-item-section>

    <q-menu
      auto-close
      v-if="title === 'Principales' || title === 'Operaciones'"
      :anchor="$q.screen.lt.sm ? 'top start' : 'center right'"
      :self="$q.screen.lt.sm ? 'bottom start' : 'center left'"
      class="q-mt-xs"
    >
      <q-list @vue:unmounted="isSubItemOpen = false">
        <EssentialSubLinks :menuItems="subLinks[title]" :current-route="route.fullPath" />
      </q-list>
    </q-menu>

    <q-item-section v-if="subMenu" avatar>
      <q-icon :name="$q.screen.lt.sm ? 'sym_r_keyboard_arrow_down' : 'sym_r_chevron_right'" />
    </q-item-section>
  </q-item>
</template>
