<script setup lang="ts">
import PreviewArticleCard from '../components/PreviewArticleCard.vue';

const articles = [
  {
    id: 1,
    title: 'Entendiendo los Hooks de React',
    content:
      'Los Hooks son una nueva incorporación en React 16.8. Te permiten usar estado y otras características de React sin escribir una clase. En este post, exploraremos `useState`, `useEffect` y `useContext` ...',
    author: 'Jonh Doe',
    date: '2025-09-01T12:00:00Z',
    image: 'https://cdn.quasar.dev/img/avatar.png',
    likes: 4,
    comments: 2,
  },
  {
    id: 2,
    title: 'Guía de inicio a Tailwind CSS',
    content:
      'Tailwind CSS es un framework de CSS "utility-first" para un rápido desarrollo de interfaces de usuario. A diferencia de otros frameworks como Bootstrap, no viene con componentes pre-diseñados. En su lugar, proporciona clases de utilidad que puedes combinar para crear diseños personalizados.',
    author: 'Jane Smith',
    date: '2025-09-02T12:00:00Z',
    image: 'https://cdn.quasar.dev/img/avatar.png',
    likes: 5,
    comments: 3,
  },
];
</script>

<template>
  <q-page class="q-pa-lg q-pb-lg row q-col-gutter-md">
    <section class="col-sm-12 col-md-8 col-lg-8 col-xl-9 flex justify-center">
      <PreviewArticleCard v-for="article in articles" :key="article.id" :article="article" />
    </section>
    <section class="col-sm-3 col-md-4 col-lg-4 col-xl-3 gt-sm">
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
