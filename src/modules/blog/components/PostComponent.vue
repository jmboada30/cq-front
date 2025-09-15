<script setup lang="ts">
import type { PostI } from '../interfaces/postInterfaces';

interface Props {
  data: PostI;
}

defineProps<Props>();
</script>
<template>
  <article class="bg-dark q-pa-lg rounded-borders">
    <div class="flex items-center text-tiny q-gutter-sm">
      <q-avatar size="48px">
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
      <span class="text-weight-bold">Jhon Doe</span>
      <time datetime="2025-09-01T12:00:00Z">Hace 2 horas</time>
    </div>

    <h2>Entendiendo los Hooks de React</h2>
    <p>
      Los Hooks son una nueva incorporación en React 16.8. Te permiten usar estado y otras
      características de React sin escribir una clase. En este post, exploraremos `useState`,
      `useEffect` y `useContext` ...
    </p>
    <q-img height="400px" src="https://cdn.quasar.dev/img/avatar.png" class="rounded-borders" />
    <!-- <q-separator class="" /> -->
    <div class="q-gutter-sm q-mt-md">
      <q-btn flat icon="sym_r_thumb_up" label="4" color="primary" />
      <q-btn flat icon="sym_r_comment" label="2" color="primary" />
      <q-btn flat icon="sym_r_share" label="Compartir" color="primary" no-caps />
    </div>
  </article>
</template>
<style lang="scss" scoped></style>
