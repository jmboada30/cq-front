<script setup lang="ts">
import useUi from '../composables/useUi';
import MenuContent from './MenuContent.vue';
const { isMenuOpen } = useUi();
</script>
<template>
  <q-drawer v-model="isMenuOpen" show-if-above :width="280" class="shadow-1">
    <MenuContent />
  </q-drawer>
</template>
