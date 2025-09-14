<script setup lang="ts">
import EssentialLinks from './EssentialLinks.vue';
import { useMenuItemByUserQuery } from '../composables/useMenuItemByUserQuery';

const { menuItemsFormatted } = useMenuItemByUserQuery();
</script>
<template>
  <q-list class="q-px-sm q-gutter-sm sidebar__menu text-blue-grey-9" padding>
    <EssentialLinks v-for="link in menuItemsFormatted" :key="link.title!" v-bind="link" />
  </q-list>
</template>
