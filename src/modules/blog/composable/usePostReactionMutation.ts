import { useMutation } from '@tanstack/vue-query';
import { createPostReaction, deletePostReaction } from '../api/postReactionApi';
import type { PostReactionDto } from '../interfaces/postReactionDto';
export const usePostReactionMutation = () => {
  const createPostReactionMutation = useMutation({
    mutationFn: (params: PostReactionDto) => createPostReaction(params),
  });

  const deletePostReactionMutation = useMutation({
    mutationFn: (postReactionId: number) => deletePostReaction(postReactionId),
  });

  return { createPostReactionMutation, deletePostReactionMutation };
};
