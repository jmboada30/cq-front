<script setup lang="ts">
import { useRouter } from 'vue-router';

import { StartRoutes } from '../../start/interfaces/startRoutes';

const router = useRouter();

const modalPassword = async () => {
  await router.push({ name: StartRoutes.BACKEND_CONN });
};
</script>

<template>
  <q-img
    @dblclick="modalPassword"
    :src="`images/favicon-128x128.png`"
    style="max-width: 220px"
    no-spinner
    fetchpriority="high"
  />
</template>
