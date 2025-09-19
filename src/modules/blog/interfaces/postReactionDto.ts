import type { ReactionType } from './postReactionsInterfaces';

export interface PostReactionDto {
  id?: number;
  postId: number;
  type: ReactionType;
}
export interface PostReactionFilterDto {
  limit?: number;
  offset?: number;
  postId?: number;
  userId?: number;
  type?: ReactionType;
}
