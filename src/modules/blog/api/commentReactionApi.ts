import { api } from 'src/boot/axios';

import type {
  FindCommentReactionResponseI,
  CommentReactionI,
} from '../interfaces/commentReactionInterface';
import type { CommentReactionDto } from '../interfaces/commentReactionDto';
import type { CommentReactionFilterDto } from '../interfaces/commentReactionDto';

const commentReactionsUrl = 'comment-reactions';

export const createCommentReaction = async (
  payload: CommentReactionDto,
): Promise<CommentReactionI> => {
  const res = await api.post<CommentReactionI>(commentReactionsUrl, payload, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para crear la reacción al comentario.',
  });
  return res.data;
};

export const findAllCommentReactions = async (
  params?: CommentReactionFilterDto,
): Promise<FindCommentReactionResponseI> => {
  const res = await api.get<FindCommentReactionResponseI>(commentReactionsUrl, {
    params,
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para buscar las reacciones a comentarios.',
  });
  return res.data;
};

export const deleteCommentReaction = async (reactionId: number) => {
  const res = await api.delete(`${commentReactionsUrl}/${reactionId}`, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para eliminar la reacción al comentario.',
  });
  return res.data;
};
