<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { MenuItem } from '../interfaces/menuItemInterfaces';
import { useMenuUi } from '../composables/usMenuUi';
import useMenuItems from '../composables/useMenuItems';

export interface EssentialLinkProps {
  menuItems: MenuItem[];
  currentRoute: string;
}
defineProps<EssentialLinkProps>();

const { isMenuOpen } = useMenuUi();
const { currentMenuItemLink, setCurrentMenuItemLink } = useMenuItems();
const router = useRouter();

const navigateTo = (link: string = '') => {
  setCurrentMenuItemLink(link);
  if (isMenuOpen.value == true) isMenuOpen.value = false;
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
  <q-item
    class="q-ml-md"
    v-for="links in menuItems"
    :key="links.title!"
    clickable
    tag="a"
    v-ripple
    :active="compareRoute(links.link!)"
    @click="navigateTo(links.link)"
  >
    <q-item-section v-if="links.icon" avatar>
      <q-icon :name="links.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ links.title }}</q-item-label>
      <q-item-label class="item_caption" caption>{{ links.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
