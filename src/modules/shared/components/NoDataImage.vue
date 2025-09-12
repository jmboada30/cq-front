<script setup lang="ts">
interface Props {
  width: string;
}

defineProps<Props>();
</script>

<template>
  <q-img src="vectors/no_data.svg" :width="width" no-spinner />
</template>
