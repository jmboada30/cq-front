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

import { ref } from "vue";
import { computed } from "vue";

const liked = ref(false);
const localLikes = ref(props.article.likes);

const toggleLike = () => {
  // toggle liked state and update local counter
  liked.value = !liked.value;
  localLikes.value += liked.value ? 1 : -1;

  // force a reflow/restart for the burst animation: remove and re-add the class quickly
  // so the burst spans will replay even if liked toggles quickly
  const el = document.querySelector(".like-wrap") as HTMLElement | null;
  if (el) {
    el.classList.remove("liked--anim");
    // read offsetWidth to force reflow
    void el.offsetWidth;
    if (liked.value) el.classList.add("liked--anim");
  }
};

const iconStyle = computed(() => {
  const value = liked.value
    ? '"FILL" 1, "wght" 300, "GRAD" 0, "opsz" 48'
    : '"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 48';
  return { ["font-variation-settings"]: value } as Record<string, string>;
});
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

    <h2 class="cursor-pointer">{{ props.article.title }}</h2>
    <p>
      {{ props.article.content }}
    </p>
    <q-img height="400px" :src="props.article.image" class="rounded-borders" />
    <div class="q-gutter-sm q-mt-md">
      <q-btn flat :color="liked ? 'pink' : 'primary'" @click="toggleLike">
        <template #default>
          <span class="like-wrap q-mr-sm" :class="{ 'liked--anim': liked }">
            <i
              class="q-icon material-symbols-rounded"
              :style="iconStyle"
              aria-hidden="true"
              >thumb_up</i
            >
          </span>
          <span class="q-btn__content text-weight-bold">{{ localLikes }}</span>
        </template>
      </q-btn>

      <q-btn
        flat
        icon="sym_r_comment"
        :label="props.article.comments"
        color="primary"
        class="text-weight-bold"
      />
      <q-btn flat icon="sym_r_share" label="Compartir" color="primary" no-caps />
    </div>
  </article>
</template>

<style scoped>
.liked--anim {
  animation: like-pop 420ms cubic-bezier(0.2, 0.9, 0.3, 1);
}

@keyframes like-pop {
  0% {
    transform: scale(1);
    opacity: 0.9;
  }
  30% {
    transform: scale(1.6) rotate(-10deg);
    opacity: 1;
  }
  60% {
    transform: scale(0.92) rotate(4deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.q-icon.material-symbols-rounded {
  display: inline-block;
  vertical-align: middle;
  transition: transform 200ms ease, color 240ms ease;
  will-change: transform;
}

.like-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  overflow: visible;
  z-index: 2;
}
</style>
