import { api } from 'src/boot/axios';
import type { CommentsDto, CommentsFilterDto } from '../interfaces/commentsDto';
import type { CommentI, FindCommentsResponse } from '../interfaces/commentsInterfaces';

const commentsUrl = 'comments';

export const createComments = async (payload: CommentsDto): Promise<CommentI> => {
  const res = await api.post<CommentI>(commentsUrl, payload, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para crear el comentario',
  });
  return res.data;
};

export const findAllComments = async (
  params?: CommentsFilterDto,
): Promise<FindCommentsResponse> => {
  const res = await api.get<FindCommentsResponse>(commentsUrl, {
    params,
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para buscar comentario',
  });
  return res.data;
};

export const findCommentById = async (commentId: number): Promise<CommentI> => {
  const res = await api.get<CommentI>(`${commentsUrl}/${commentId}`, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para buscar el comentario',
  });
  return res.data;
};

export const updateComment = async (payload: CommentsDto) => {
  const { id, ...data } = payload;
  const res = await api.patch<CommentI>(`${commentsUrl}/${id}`, data, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para actualizar el comentario',
  });
  return res.data;
};

export const deleteComment = async (commentId: number) => {
  const res = await api.delete(`${commentsUrl}/${commentId}`, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para eliminar el comentario',
  });
  return res.data;
};
