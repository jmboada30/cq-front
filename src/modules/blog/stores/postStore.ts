import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PostDto } from '../interfaces/postDto';
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

  const setPost = (newVal: PostI) => {
    post.value = newVal;
  };
  const setPostDto = (newVal: PostDto) => {
    postDto.value = newVal;
  };

  const setPosts = (newVal: PostI[]) => {
    posts.value = newVal;
  };

  const resetPostDto = () => {
    postDto.value = structuredClone(initialStateDto);
  };

  return {
    postDto,
    post,
    posts,
    setPost,
    setPostDto,
    setPosts,
    resetPostDto,
  };
});
