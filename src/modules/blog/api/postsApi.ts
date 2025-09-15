import { api } from 'src/boot/axios';
import type { CreatedPostResponseI, PostI, PostsResponseI } from '../interfaces/postInterfaces';
import type { PostDto, PostFilterDto } from '../interfaces/postDto';

const postUrl = 'posts';
export const createPost = async (payload: PostDto): Promise<CreatedPostResponseI> => {
  const res = await api.post<CreatedPostResponseI>(`${postUrl}`, payload, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para crear los posts',
  });
  return res.data;
};

export const findAllPosts = async (params: PostFilterDto): Promise<PostsResponseI> => {
  const res = await api.get<PostsResponseI>(`${postUrl}`, {
    params,
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para obtener los posts',
  });
  return res.data;
};

export const findPostById = async (postId: number): Promise<PostI> => {
  const res = await api.get<PostI>(`${postUrl}/${postId}`, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para buscar un post por su id',
  });
  return res.data;
};

export const updatePostById = async (payload: PostDto) => {
  const { id, ...data } = payload;
  const res = await api.patch(`${postUrl}/ ${id}`, data, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para actualizar un post',
  });
  return res.data;
};

export const deletePost = async (postId: number) => {
  const res = await api.delete(`${postUrl}/${postId}`, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para eliminar un post',
  });
  return res.data;
};
