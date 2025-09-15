import { watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { findPostById } from '../api/postsApi';
import { useManageBlogStore } from './useManageBlogStore';

export const usePostQuery = (postId: number) => {
  const { post, setPost } = useManageBlogStore();

  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => findPostById(postId),
    retry: 0,
    staleTime: 1000 * 60 * 3,
  });

  watch(
    postQuery.data,
    (newVal) => {
      if (!newVal) return;

      setPost(newVal);
    },
    {
      immediate: true,
    },
  );
  return { post, postQuery };
};
