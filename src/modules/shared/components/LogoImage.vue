<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUi from '../../start/composables/useUi';

interface Props {
  routerTo?: string;
}

const { isDarkMode } = useUi();
const router = useRouter();
const props = withDefaults(defineProps<Props>(), {
  routerTo: 'login',
});

const redirecTo = async () => {
  await router.push({ name: props.routerTo });
};
</script>

<template>
  <q-img
    @dblclick="redirecTo"
    :src="isDarkMode ? 'images/favicon-128x128.png' : 'images/favicon-128x128.png'"
    style="max-width: 160px"
    no-spinner
    fetchpriority="high"
  />
</template>

<style scoped></style>
