import { api } from 'src/boot/axios';
// TODO: Reemplaza estos tipos con los de tu proyecto
import type {
  FindPostReactionsResponse,
  PostReactionI,
} from '../interfaces/postReactionsInterfaces';
import type { PostReactionDto, PostReactionFilterDto } from '../interfaces/postReactionDto';

const postReactionsUrl = 'post-reactions';

export const createPostReaction = async (payload: PostReactionDto): Promise<PostReactionI> => {
  const res = await api.post<PostReactionI>(postReactionsUrl, payload, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para crear la reacción.',
  });
  return res.data;
};

export const findAllPostReactions = async (
  params?: PostReactionFilterDto,
): Promise<FindPostReactionsResponse> => {
  const res = await api.get<FindPostReactionsResponse>(postReactionsUrl, {
    params,
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para buscar las reacciones.',
  });
  return res.data;
};

export const deletePostReaction = async (reactionId: number) => {
  const res = await api.delete(`${postReactionsUrl}/${reactionId}`, {
    timeout: 1000 * 5,
    timeoutErrorMessage: 'Tiempo de espera agotado para eliminar la reacción.',
  });
  return res.data;
};
