<script setup lang="ts"></script>

<template>
  <q-page class="q-pa-lg q-pb-lg row q-col-gutter-md">
    <section class="col-sm-9 col-lg-8 col-xl-9 flex justify-center">
      <article class="bg-dark q-pa-lg rounded-borders">
        <div class="flex items-center text-tiny q-gutter-sm">
          <q-avatar size="48px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <span class="text-weight-bold">Jonh Doe</span>
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
    </section>
    <section class="col-sm-3 col-lg-4 col-xl-3">
      <!-- sidebar -->
      <q-card flat class="bg-dark rounded-borders">
        <q-card-section>
          <p>Populares</p>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<style scoped></style>
