<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUi from '../composables/useUi';
import type { MenuItem } from '../interfaces/menuItem';

export interface EssentialLinkProps {
  menuItems: MenuItem[];
  currentRoute: string;
}
defineProps<EssentialLinkProps>();

const { toggleSubItem, isMiniState, isMenuOpen } = useUi();
const router = useRouter();

const navigateTo = async (link: string = '') => {
  toggleSubItem();
  isMiniState.value = true;
  if (isMenuOpen.value == true) isMenuOpen.value = false;
  if (!link) return;
  if (link.startsWith('http')) {
    window.open(link);
  } else {
    await router.push({ path: '/' + link });
  }
};

const compareRoute = (link: string, currentRoute: string) => {
  return link.split('/').slice(0, 2).join('/') === currentRoute.split('/').slice(1, 3).join('/');
};
</script>

<template>
  <q-item
    v-for="links in menuItems"
    :key="links.title"
    v-bind="links"
    class="listItem"
    clickable
    tag="a"
    v-ripple
    :active="compareRoute(links.link!, currentRoute)"
    active-class="activeItem"
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
