import { useQuery } from '@tanstack/vue-query';
import { findAllComments } from '../api/commentsApi';
import { computed, ref } from 'vue';
export const useCommentsResponseQuery = () => {
  const parentId = ref<number | null>(null);

  const commentsResponseQuery = useQuery({
    queryKey: ['commentsResponse', parentId],
    queryFn: () => findAllComments({ parentId: parentId.value! }),
    retry: 0,
    staleTime: 1000 * 60 * 3,
    enabled: computed(() => !!parentId.value),
  });

  return { commentsResponseQuery, parentId };
};
