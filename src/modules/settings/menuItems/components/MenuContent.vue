<script setup lang="ts">
import EssentialLinks from './EssentialLinks.vue';
import { useMenuItemByUserQuery } from '../composables/useMenuItemByUserQuery';
import { useQuasar } from 'quasar';

const { menuItemsFormatted } = useMenuItemByUserQuery();
const $q = useQuasar();
</script>
<template>
  <div
    class="logo__container flex items-center justify-start q-pt-lg q-px-md q-mb-lg"
    loading="eager"
    no-spinner
  >
    <template v-if="$q.platform.is.mobile">
      <q-img
        src=" images/favicon-128x128.png"
        height="72px"
        width="93px"
        fit="contain"
        no-spinner
      />
    </template>

    <template v-else>
      <q-img
        src="png/logo-b.png"
        height="26px"
        width="93px"
        fit="contain"
        no-spinner
        transition-show="jump-down"
        transition-hide="jump-up"
      />
    </template>
  </div>
  <q-list class="q-px-sm q-gutter-sm sidebar__menu text-blue-grey-9" padding>
    <EssentialLinks v-for="link in menuItemsFormatted" :key="link.title!" v-bind="link" />
  </q-list>
</template>
