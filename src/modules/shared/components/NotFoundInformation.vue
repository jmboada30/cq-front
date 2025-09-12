<script setup lang="ts">
interface Props {
  description?: string;
  iconName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  description: 'error',
  iconName: 'priority_high',
});
</script>

<template>
  <section class="column items-center justify-center">
    <div class="bg-primary exclamationDiv">
      <q-icon class="text-white" :name="iconName" size="md" />
    </div>
    <span class="text-center text-h6 q-pa-md">
      {{ props.description }}
    </span>
    <slot name="additional-content"></slot>
  </section>
</template>
