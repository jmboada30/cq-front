<script setup lang="ts">
import { ref } from 'vue';
import MenuContent from './MenuContent.vue';
import useUi from '../composables/useUi';
const { isMiniState, isMenuOpen, isSubItemOpen } = useUi();

const drawer = ref(true);
</script>
<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="isMiniState"
    @mouseenter="if (!isMenuOpen) isMiniState = false;"
    @mouseleave="if (!isMenuOpen && !isSubItemOpen) isMiniState = true;"
    :width="250"
    bordered
    :mini-to-overlay="isMenuOpen ? false : true"
  >
    <MenuContent />
  </q-drawer>
</template>
