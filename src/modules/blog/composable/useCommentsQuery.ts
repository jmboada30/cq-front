import { useQuery } from '@tanstack/vue-query';
import { watch } from 'vue';
import { findAllComments } from '../api/commentsApi';
import { useManageBlogStore } from './useManageBlogStore';
export const useCommentsQuery = () => {
  const { comments, commentFilter, setComments, resetComments } = useManageBlogStore();
  const commentsQuery = useQuery({
    queryKey: ['comments', commentFilter],
    queryFn: () => findAllComments(),
    retry: 0,
    staleTime: 1000 * 60 * 3,
  });

  watch(commentsQuery.data, (newVal) => {
    if (!newVal?.data.length) return resetComments();

    setComments(newVal.data);
  });
  return { commentsQuery, comments };
};
