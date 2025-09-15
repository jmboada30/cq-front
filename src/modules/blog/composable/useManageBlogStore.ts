import { storeToRefs } from 'pinia';
import { usePostStore } from '../stores/postStore';

export const useManageBlogStore = () => {
  const postStore = usePostStore();
  const { post, postDto, posts } = storeToRefs(postStore);

  return {
    post,
    postDto,
    posts,
    setPost: postStore.setPost,
    setPostDto: postStore.setPostDto,
    setPosts: postStore.setPosts,
  };
};
