<script setup lang="ts">
interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  likes: number;
  comments: number;
}

interface Props {
  article: Article;
}

const props = defineProps<Props>();
</script>

<template>
  <article class="bg-dark q-pa-lg rounded-borders q-mb-sm">
    <div class="flex items-center text-caption q-gutter-sm">
      <q-avatar size="48px">
        <img :src="props.article.image" />
      </q-avatar>
      <span class="text-weight-bold">{{ props.article.author }}</span>
      <time :datetime="props.article.date">Hace 3 horas</time>
    </div>

    <h2>{{ props.article.title }}</h2>
    <p>
      {{ props.article.content }}
    </p>
    <q-img height="400px" :src="props.article.image" class="rounded-borders" />
    <div class="q-gutter-sm q-mt-md">
      <q-btn flat icon="sym_r_thumb_up" :label="props.article.likes" color="primary" />
      <q-btn flat icon="sym_r_comment" :label="props.article.comments" color="primary" />
      <q-btn flat icon="sym_r_share" label="Compartir" color="primary" no-caps />
    </div>
  </article>
</template>

<style scoped></style>
