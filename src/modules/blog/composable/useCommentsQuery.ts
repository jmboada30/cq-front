import { useQuery } from '@tanstack/vue-query';
import { findAllComments } from '../api/commentsApi';
import { useManageBlogStore } from './useManageBlogStore';
import { computed } from 'vue';
export const useCommentsQuery = () => {
  const { comments, commentFilter } = useManageBlogStore();
  const commentsQuery = useQuery({
    queryKey: ['comments', commentFilter],
    queryFn: () => findAllComments(commentFilter.value!),
    retry: 0,
    staleTime: 1000 * 60 * 3,
    enabled: computed(() => !!commentFilter.value?.postId),
  });

  return { commentsQuery, comments, commentFilter };
};
