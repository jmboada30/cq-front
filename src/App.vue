<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import useUi from './modules/start/composables/useUi';
const { checkDarkMode, isDarkMode } = useUi();

checkDarkMode();
isDarkMode.value = true;
</script>

<template>
  <router-view />
  <VueQueryDevtools buttonPosition="top-right" />
</template>
