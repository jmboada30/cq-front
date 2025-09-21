<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import CommentItem from './CommentItem.vue';

// --- Asunciones sobre API y tipos ---
import type { CommentI } from '../interfaces/commentsInterfaces';
import { useCommentsQuery } from '../composable/useCommentsQuery';
import { useCommentMutation } from '../composable/useCommentMutation';
import useNotify from 'src/modules/shared/composables/useNotify';

const props = defineProps<{
  postId: number;
}>();
const comments = ref<CommentI[]>([]);
const newComment = ref('');

const { commentsQuery, commentFilter } = useCommentsQuery();
const { createCommentsMutation } = useCommentMutation();
const { errorNotify } = useNotify();

const handleAddComment = async () => {
  try {
    await createCommentsMutation.mutateAsync({ postId: props.postId, content: newComment.value });
  } catch {
    errorNotify('Error al crear comentario');
  }
};

watch(
  commentsQuery.data,
  (newVal) => {
    if (
      !newVal?.data.length &&
      commentFilter.value?.postId === props.postId &&
      !commentFilter.value.parentId
    )
      return (comments.value = []);

    if (commentFilter.value?.postId === props.postId && !commentFilter.value.parentId)
      return (comments.value = newVal?.data ?? []);
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  commentFilter.value = {
    postId: props.postId,
    parentId: null,
  };
});
</script>

<template>
  <div class="q-pa-md">
    <!-- Formulario para dejar un comentario nuevo -->
    <div class="q-mb-md">
      <q-input
        v-model="newComment"
        placeholder="Escribe un comentario..."
        dense
        outlined
        autogrow
        @keyup.enter.prevent="handleAddComment"
      >
        <template v-slot:after>
          <q-btn
            round
            dense
            flat
            icon="sym_r_send"
            @click="handleAddComment"
            :loading="createCommentsMutation.isPending.value"
            aria-label="Enviar comentario"
          />
        </template>
      </q-input>
    </div>

    <!-- Lista de comentarios -->
    <div
      v-if="commentFilter?.postId === postId && commentsQuery.isLoading.value"
      class="text-center"
    >
      <q-spinner-dots color="primary" size="2em" />
    </div>
    <q-list v-else-if="comments.length" separator>
      <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
    </q-list>
    <div v-else class="text-grey text-center q-py-md">Sé el primero en comentar.</div>

    <!-- Botón para cargar más comentarios -->
    <!-- <div v-if="hasNextPage" class="text-center q-mt-md">
      <q-btn
        label="Ver más comentarios"
        @click="() => fetchNextPage()"
        :loading="isFetchingNextPage"
        flat
        color="primary"
        size="sm"
      />
    </div> -->
  </div>
</template>
