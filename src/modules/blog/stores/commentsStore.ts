import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CommentsDto, CommentsFilterDto } from '../interfaces/commentsDto';
import type { CommentI } from '../interfaces/commentsInterfaces';

const initialStateDto: CommentsDto = {
  postId: 0,
  parentId: 0,
  content: '',
  status: '',
};

export const useCommentStore = defineStore('comment', () => {
  const commentDto = ref<CommentsDto>(initialStateDto);
  const comment = ref<CommentI | null>(null);
  const comments = ref<CommentI[]>([]);
  const commentFilter = ref<CommentsFilterDto | null>(null);

  return {
    commentDto,
    comment,
    comments,
    commentFilter,

    setComment(newVal: CommentI) {
      comment.value = newVal;
    },
    setComments(newVal: CommentI[]) {
      comments.value = newVal;
    },
    setCommentDto(newVal: CommentsDto) {
      commentDto.value = newVal;
    },
    setCommentFilter(newVal: CommentsFilterDto) {
      commentFilter.value = newVal;
    },

    resetCommentDto() {
      commentDto.value = { ...initialStateDto };
    },
    resetComment() {
      comment.value = null;
    },
    resetComments() {
      comments.value = [];
    },
    resetCommentFilter() {
      commentFilter.value = null;
    },
  };
});
