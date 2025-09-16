export enum CommentStatus {
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
  DELETED = 'DELETED',
  PENDING = 'PENDING',
}

export interface CommentI {
  id: number;
  postId: number;
  authorId: number;
  parentId: null;
  content: string;
  status: CommentStatus;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  userId: null;
}

export interface FindCommentsResponse {
  data: CommentI[];
  total: number;
}
