import { useMutation } from '@tanstack/vue-query';
import { createPost, updatePostById } from '../api/postsApi';
import { useManageBlogStore } from './useManageBlogStore';
export const usePostMutation = () => {
  const { postDto } = useManageBlogStore();
  const createPostMutation = useMutation({
    mutationFn: () => createPost(postDto.value),
  });

  const updatePostMutation = useMutation({
    mutationFn: () => updatePostById(postDto.value),
  });

  return { createPostMutation, updatePostMutation };
};
