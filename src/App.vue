<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
// import TableActionButtonHover from './modules/shared/components/TableActionButtonHover.vue';
</script>
<template>
  <router-view />
  <!-- <TableActionButtonHover /> -->
  <VueQueryDevtools buttonPosition="top-right" />
</template>
