<script setup lang="ts"></script>
<template>
  <div class="loader-container" style="flex-grow: 1">
    <q-spinner color="primary" size="3em" />
    <span>Cargando..</span>
  </div>
</template>
<style lang="scss" scoped>
.loader-container {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
