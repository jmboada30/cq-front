import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { PostDto, PostFilterDto } from '../interfaces/postDto';
import type { PostI } from '../interfaces/postInterfaces';

const initialStateDto: PostDto = {
  title: '',
  slug: '',
  excerpt: '',
  contentMd: '',
  status: '',
  isPinned: false,
  scheduledAt: '',
};

export const usePostStore = defineStore('post', () => {
  const postDto = ref<PostDto>(initialStateDto);
  const post = ref<PostI | undefined>(undefined);
  const posts = ref<PostI[]>([]);
  const postFilter = ref<PostFilterDto | undefined>(undefined);

  const setPost = (newVal: PostI) => {
    post.value = newVal;
  };
  const setPostDto = (newVal: PostDto) => {
    postDto.value = newVal;
  };

  const setPosts = (newVal: PostI[]) => {
    posts.value = newVal;
  };

  const setPostFilter = (newVal: PostFilterDto) => {
    postFilter.value = newVal;
  };

  const resetPostDto = () => {
    postDto.value = structuredClone(initialStateDto);
  };

  const resetPosts = () => {
    posts.value = [];
  };

  const resetPost = () => {
    post.value = undefined;
  };

  const resetPostFilter = () => {
    postFilter.value = undefined;
  };

  return {
    postDto,
    post,
    posts,
    postFilter,
    setPost,
    setPostDto,
    setPosts,
    setPostFilter,
    resetPostDto,
    resetPost,
    resetPosts,
    resetPostFilter,
  };
});
