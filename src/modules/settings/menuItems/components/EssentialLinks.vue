<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import type { MenuItemFormatted } from '../interfaces/menuItemInterfaces';
import { ItemType } from '../interfaces/menuItemInterfaces';
import { useMenuUi } from '../composables/usMenuUi';
import EssentialSubLinks from './EssentialSubLinks.vue';
import useMenuItems from '../composables/useMenuItems';

const { isSubItemOpen, currentTitle } = useMenuUi();
const { currentMenuItemLink, setCurrentMenuItemLink } = useMenuItems();
const route = useRoute();

const props = withDefaults(defineProps<MenuItemFormatted>(), {
  caption: '',
  link: '#',
  icon: '',
});
const router = useRouter();

const navigateTo = (link: string = '') => {
  currentTitle.value = props.title!;
  isSubItemOpen.value = false;
  setCurrentMenuItemLink(link);

  if (!link) return;
  if (link.startsWith('http')) {
    window.open(link);
  } else {
    router.push({ path: '/' + link });
  }
};

const compareRoute = (link: string) => {
  return (
    link.split('/').slice(0, 2).join('/') ===
    currentMenuItemLink.value.split('/').slice(0, 2).join('/')
  );
};
</script>

<template>
  <q-expansion-item
    v-if="type === ItemType.dropdown"
    group="somegroup"
    clickable
    :label="title"
    :icon="icon"
    class="rounded-borders text-weight-medium"
  >
    <q-list>
      <EssentialSubLinks :current-route="route.fullPath" :menu-items="subItems" />
    </q-list>
  </q-expansion-item>

  <q-item
    v-else
    clickable
    v-ripple
    class="rounded-borders text-weight-medium"
    :active="compareRoute(link!)"
    @click="navigateTo(link)"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label class="item_caption" caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
