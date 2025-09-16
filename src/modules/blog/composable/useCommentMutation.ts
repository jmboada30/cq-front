import { useMutation } from '@tanstack/vue-query';
import { createComments, deleteComment, updateComment } from '../api/commentsApi';
import { useManageBlogStore } from './useManageBlogStore';
export const useCommentMutation = () => {
  const { commentDto } = useManageBlogStore();

  const createCommentsMutation = useMutation({
    mutationFn: () => createComments(commentDto.value),
  });

  const updateCommentMutation = useMutation({
    mutationFn: () => updateComment(commentDto.value),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
  });

  return { createCommentsMutation, updateCommentMutation, deleteCommentMutation };
};
