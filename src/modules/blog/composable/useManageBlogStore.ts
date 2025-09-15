import { storeToRefs } from 'pinia';
import { usePostStore } from '../stores/postStore';

export const useManageBlogStore = () => {
  const postStore = usePostStore();
  const { post, postDto, posts, postFilter } = storeToRefs(postStore);

  return {
    post,
    postDto,
    posts,
    postFilter,
    setPost: postStore.setPost,
    setPostDto: postStore.setPostDto,
    setPosts: postStore.setPosts,
    setPostFilter: postStore.setPostFilter,
    resetPosts: postStore.resetPosts,
    resetPost: postStore.resetPost,
    resetPostFilter: postStore.resetPostFilter,
  };
};
