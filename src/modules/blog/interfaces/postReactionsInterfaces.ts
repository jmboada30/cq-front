export enum ReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  LAUGH = 'LAUGH',
  WOW = 'WOW',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
}
export interface FindPostReactionsResponse {
  data: PostReactionI[];
  total: number;
}

export interface PostReactionI {
  id: number;
  postId: number;
  userId: number;
  type: string;
  createdAt: Date;
}
