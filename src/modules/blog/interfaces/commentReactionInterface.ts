export interface FindCommentReactionResponseI {
  data: CommentReactionI[];
  total: number;
}

export interface CommentReactionI {
  id: number;
  commentId: number;
  userId: number;
  type: string;
  createdAt: Date;
}
