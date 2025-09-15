import { useQuery } from '@tanstack/vue-query';
import { findAllPosts } from '../api/postsApi';
import { watch } from 'vue';
import { useManageBlogStore } from './useManageBlogStore';

export const usePostsQuery = () => {
  const { postFilter, posts, setPosts, resetPosts } = useManageBlogStore();
  const postsQuery = useQuery({
    queryKey: ['posts', postFilter],
    queryFn: () => findAllPosts(postFilter.value!),
    retry: 0,
    staleTime: 1000 * 60 * 3,
  });

  watch(
    postsQuery.data,
    (newVal) => {
      if (!newVal?.data.length) return resetPosts();

      setPosts(newVal.data);
    },
    {
      immediate: true,
    },
  );
  return { postFilter, posts, setPosts };
};
