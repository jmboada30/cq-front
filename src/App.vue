<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import useUi from './modules/start/composables/useUi';
const { setForceDarkMode } = useUi();

setForceDarkMode();
</script>

<template>
  <router-view />
  <VueQueryDevtools buttonPosition="top-right" />
</template>
