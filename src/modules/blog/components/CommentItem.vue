<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { CommentI } from '../interfaces/commentsInterfaces';
import { useCommentMutation } from '../composable/useCommentMutation';
import useNotify from 'src/modules/shared/composables/useNotify';
import { useCommentsResponseQuery } from '../composable/useCommentsResponseQuery';

// --- Asunciones sobre API y Composables ---

const props = defineProps<{
  comment: CommentI;
}>();

const commentsResponse = ref<CommentI[]>([]);
const showReplyInput = ref(false);
const replyInputValue = ref('');

const { commentsResponseQuery, parentId } = useCommentsResponseQuery();
const { createCommentsMutation } = useCommentMutation();
const { errorNotify } = useNotify();

const handleAddComment = async () => {
  try {
    await createCommentsMutation.mutateAsync({
      postId: props.comment.postId,
      parentId: props.comment.id,
      content: replyInputValue.value,
    });
  } catch {
    errorNotify('Error al crear comentario');
  }
};

watch(
  commentsResponseQuery.data,
  (newVal) => {
    if (!newVal?.data.length && parentId.value === props.comment.id)
      return (commentsResponse.value = []);

    if (parentId.value === props.comment.id) return (commentsResponse.value = newVal?.data ?? []);
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  parentId.value = props.comment.id;
});
</script>

<template>
  <q-item class="q-py-md">
    <q-item-section top avatar>
      <q-avatar>
        <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'" alt="Avatar" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-weight-bold">Jhon Doe</q-item-label>
      <q-item-label>{{ comment.content }}</q-item-label>

      <!-- Acciones del comentario -->
      <div class="row items-center q-mt-sm q-gutter-x-md">
        <q-btn
          @click="showReplyInput = !showReplyInput"
          flat
          dense
          size="sm"
          label="Responder"
          color="grey-7"
        />
      </div>

      <!-- Input para responder (podría ser otro componente) -->
      <div v-if="showReplyInput" class="q-mt-md">
        <div class="q-mb-md">
          <q-input
            v-model="replyInputValue"
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
      </div>

      <!-- Renderizado de respuestas (comentarios anidados) -->
      <div v-if="commentsResponse && commentsResponse.length" class="q-mt-md">
        <CommentItem v-for="reply in commentsResponse" :key="reply.id" :comment="reply" />
      </div>
    </q-item-section>
  </q-item>
</template>
