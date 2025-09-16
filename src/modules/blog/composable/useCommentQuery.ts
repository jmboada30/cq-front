import { useQuery } from '@tanstack/vue-query';
import { watch } from 'vue';
import { findCommentById } from '../api/commentsApi';
import { useManageBlogStore } from './useManageBlogStore';
export const useCommentQuery = (commentId: number) => {
  const { comment, resetComment, setComment } = useManageBlogStore();
  const commentQuery = useQuery({
    queryKey: ['comment'],
    queryFn: () => findCommentById(commentId),
    retry: 0,
    staleTime: 1000 * 60 * 3,
    enabled: !!commentId,
  });

  watch(
    commentQuery.data,
    (newVal) => {
      if (!newVal) return resetComment();

      setComment(newVal);
    },
    {
      immediate: true,
    },
  );
  return { commentQuery, comment };
};
