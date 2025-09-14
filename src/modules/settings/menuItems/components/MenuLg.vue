<script setup lang="ts">
import MenuContent from './MenuContent.vue';
import { useMenuUi } from '../composables/usMenuUi';
import { useQuasar } from 'quasar';

const { drawer } = useMenuUi();
const $q = useQuasar();
</script>
<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="280"
    :breakpoint="900"
    :mini-width="72"
    bordered
    :class="[$q.dark.isActive ? 'bg-secondary' : 'bg-white', 'sidebar']"
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <MenuContent />
    </q-scroll-area>
  </q-drawer>
</template>
