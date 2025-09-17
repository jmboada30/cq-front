import type { ReactionType } from './postReactionsInterfaces';

export interface CommentReactionDto {
  id?: number;
  commentId: number;
  type: ReactionType;
}
export interface CommentReactionFilterDto {
  limit?: number;
  offset?: number;
  commentId?: number;
  userId?: number;
  type?: ReactionType;
}
