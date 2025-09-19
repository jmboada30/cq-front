import { useMutation } from '@tanstack/vue-query';
import { createPostReaction } from '../api/postReactionApi';
import type { PostReactionDto } from '../interfaces/postReactionDto';
export const usePostReactionMutation = () => {
  const PostReactionMutation = useMutation({
    mutationFn: (params: PostReactionDto) => createPostReaction(params),
  });

  return { PostReactionMutation };
};
