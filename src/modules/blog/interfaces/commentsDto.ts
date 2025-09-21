import type { CommentStatus } from './commentsInterfaces';

export interface CommentsDto {
  id?: number;
  postId: number;
  parentId?: number;
  content: string;
  status?: string;
}

export interface CommentsFilterDto {
  limit?: number;
  offset?: number;
  postId?: number;
  parentId?: number | null;
  authorId?: number;
  status?: CommentStatus;
}
