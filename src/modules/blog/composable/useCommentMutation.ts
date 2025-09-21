import { useMutation } from '@tanstack/vue-query';
import { createComments, deleteComment, updateComment } from '../api/commentsApi';
import type { CommentsDto } from '../interfaces/commentsDto';
export const useCommentMutation = () => {
  const createCommentsMutation = useMutation({
    mutationFn: (commentDto: CommentsDto) => createComments(commentDto),
  });

  const updateCommentMutation = useMutation({
    mutationFn: (commentDto: CommentsDto) => updateComment(commentDto),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
  });

  return { createCommentsMutation, updateCommentMutation, deleteCommentMutation };
};
